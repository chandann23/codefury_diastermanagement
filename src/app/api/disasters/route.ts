import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "~/server/db";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: 'gmail', 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function GET(req: Request) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = isUserAuthenticated ? await getUser() : null;

  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const disasters = await db.disaster.findMany();
    return new Response(JSON.stringify(disasters), { status: 200 });
  } catch (error) {
    console.error("Error fetching information:", error);
    return new Response("Error fetching information", { status: 500 });
  }
}

export async function POST(req: Request) {
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

    const { isAuthenticated, getUser } = getKindeServerSession();
    const isUserAuthenticated = await isAuthenticated();

    if (!isUserAuthenticated) {
      return new Response("Unauthorized", { status: 401 });
    }

    const user = await getUser();

    if (!user) {
      console.error("User not found.");
      return new Response("User not found", { status: 404 });
    }

    if(!user.email){
      console.error("User email not found.");
      return new Response("User email not found", { status: 404 });
    }

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: user.email, 
      subject: `New Disaster Alert: ${newDisaster.name}`,
      text: `A new disaster has been reported:\n\nLocation: ${newDisaster.location}\nDate: ${newDisaster.date}\nDescription: ${newDisaster.description}`,
      html: `<p>A new disaster has been reported:</p><p><strong>Location:</strong> ${newDisaster.location}</p><p><strong>Date:</strong> ${newDisaster.date}</p><p><strong>Description:</strong> ${newDisaster.description}</p>`,
    });

    return new Response(JSON.stringify(newDisaster), { status: 201 });
  } catch (error) {
    console.error("Error creating information:", error);
    return new Response("Error creating information", { status: 500 });
  }
}
