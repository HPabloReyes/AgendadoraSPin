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

  try {
    const user = await Users.findOne({ usuario });
    if (!user) {
      return new NextResponse(
        JSON.stringify({ msg: "Usuario no encontrado" }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    if (contraseña === user.contraseña) {
      return new NextResponse(JSON.stringify({ usuario: user.usuario }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    } else {
      return new NextResponse(
        JSON.stringify({ msg: "Contraseña Incorrecta" }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
  } catch (error) {
    console.error(error);
    return new NextResponse(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
