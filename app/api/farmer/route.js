import dbConnect from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import FarmerRutas from "@/app/models/farmer";

dbConnect();

export async function POST(req) {
  try {
    // Parsear el cuerpo de la solicitud para obtener los datos
    const jsonData = await req.json();
    const { name, features } = jsonData;

    // Buscar y actualizar o crear una nueva ruta
    const existingRoute = await FarmerRutas.findOne({ name });
    if (existingRoute) {
      // Agregar nuevas características a la ruta existente
      existingRoute.features = [...existingRoute.features, ...features];
      await existingRoute.save();
    } else {
      // Crear un nuevo documento de ruta
      const newRoute = new FarmerRutas({ name, features });
      await newRoute.save();
    }

    return NextResponse.json({ message: "Ruta guardada con éxito!" });
  } catch (error) {
    console.error("Error procesando JSON:", error.message);
    return NextResponse.json(
      { message: `Error procesando JSON: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const data = await FarmerRutas.find();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(`Error Getting data: ${error.message}`);
  }
}
