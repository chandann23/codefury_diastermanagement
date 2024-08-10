import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "~/server/db";
import nodemailer from "nodemailer";
import { Groq } from "groq-sdk";
import { NextRequest, NextResponse } from "next/server";

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Initialize Groq AI
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function GET(req: NextRequest) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = isUserAuthenticated ? await getUser() : null;

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const disasters = await db.disaster.findMany();
    return NextResponse.json(disasters);
  } catch (error) {
    console.error("Error fetching information:", error);
    return NextResponse.json({ error: "Error fetching information" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const newDisaster = await db.disaster.create({
      data: {
        name: body.name,
        description: body.description,
        date: new Date(body.date),
        location: body.location,
        imageUrl: body.imageUrl,
      },
    });

    // Fetch disaster guidelines from Groq AI
    const guidelinesPrompt = `Provide detailed guidelines to follow in case of ${newDisaster.name} in points.`;
    const completion = await groq.chat.completions.create({
      messages: [{ role: "user", content: guidelinesPrompt }],
      model: "mixtral-8x7b-32768",
      max_tokens: 150,
    });

    const guidelines = completion.choices[0]?.message.content?.trim() || "No guidelines available.";

    const { isAuthenticated, getUser } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();

    if (!isUserAuthenticated) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await getUser();

    if (!user || !user.email) {
      console.error("User or user email not found.");
      return NextResponse.json({ error: "User or user email not found" }, { status: 404 });
    }

    // Send email with disaster details and guidelines
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: `New Disaster Alert: ${newDisaster.name}`,
      text: `A new disaster has been reported:\n\nLocation: ${newDisaster.location}\nDate: ${newDisaster.date}\nDescription: ${newDisaster.description}\n\nGuidelines:\n${guidelines}`,
      html: `<p>A new disaster has been reported:</p><p><strong>Location:</strong> ${newDisaster.location}</p><p><strong>Date:</strong> ${newDisaster.date}</p><p><strong>Description:</strong> ${newDisaster.description}</p><p><strong>Guidelines:</strong></p><p>${guidelines}</p>`,
    });

    return NextResponse.json(newDisaster, { status: 201 });
  } catch (error) {
    console.error("Error creating information:", error);
    return NextResponse.json({ error: "Error creating information" }, { status: 500 });
  }
}