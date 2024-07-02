import dbConnect from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Users from "@/app/models/apoiments";

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
  const { dueño, tienda, telefono, dia, hora, ubicacion, idKof } =
    await req.json();

  const apoimentData = {
    dueño,
    tienda,
    telefono,
    dia,
    hora,
    ubicacion,
    idKof,
  };
  try {
    const newApoiment = new Users(apoimentData);
    const savedInfo = await newApoiment.save();
    console.log("informacion guardada", savedInfo);
    return NextResponse.json({
      msg: "successful request",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}
