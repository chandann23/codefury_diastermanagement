import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "~/server/db";

export async function GET(req: Request) {
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const user = isUserAuthenticated ? await getUser() : null;


  if (!user) {
    return new Response("Unauthorized", { status: 401 });
  }
  try {
    const disasters = await db.disaster.findMany()
    return new Response(JSON.stringify(disasters), { status: 200 });
  } catch (error) {
    console.error("Error fetching information:", error);
    return new Response("Error fetching information", { status: 500 });
  }
}

export async function POST(req: Request) {


  try {
    const body = await req.json() as { name: string, location: string, description: string, date: string, imageUrl: string };

    const newDisaster = await db.disaster.create({
      data: {
        ...body,

      }
    });
    return new Response(JSON.stringify(newDisaster), { status: 201 });
  } catch (error) {
    console.error("Error uploading information:", error);
    return new Response("Error creating information", { status: 500 });
  }
}
