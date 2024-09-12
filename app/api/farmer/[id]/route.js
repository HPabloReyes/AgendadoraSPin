import dbConnect from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import FarmerRutas from "@/app/models/farmer";

dbConnect();

export async function GET(req, { params }) {
  try {
    const { id } = params; // Obtener el ID de los parámetros de la ruta
    const route = await FarmerRutas.findById(id);

    if (!route) {
      return NextResponse.json({ message: "Route not found" }, { status: 404 });
    }

    return NextResponse.json(route);
  } catch (error) {
    console.error("Error fetching route by ID:", error.message);
    return NextResponse.json(
      { message: `Error fetching route by ID: ${error.message}` },
      { status: 500 }
    );
  }
}
