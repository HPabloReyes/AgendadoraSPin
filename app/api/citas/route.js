import dbConnect from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Users from "@/app/models/apoiments";

dbConnect();

export async function GET() {
  try {
    return NextResponse.json("La api funciona");
  } catch (error) {
    console.error(error);
    return NextResponse.error(error);
  }
}

export async function POST(req) {
  const { dueño, tienda, telefono, dia, hora, ubicacion } = await req.json();

  const apoimentData = {
    dueño,
    tienda,
    telefono,
    dia,
    hora,
    ubicacion,
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
