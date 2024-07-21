import dbConnect from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Users from "@/app/models/users";

dbConnect();

export async function GET() {
  try {
    const response = await Users.find();
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}

export async function POST(req) {
  const { usuario, contraseña } = await req.json();

  const userData = {
    usuario,
    contraseña,
  };

  try {
    const newUser = new Users(userData);
    const savedInfo = await newUser.save();
    console.log("Usuario guardado", savedInfo);
    return NextResponse.json({
      msg: "successful request",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}
