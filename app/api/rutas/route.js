import dbConnect from "@/app/lib/mongodb";
import { NextResponse } from "next/server";
import Rutas from "@/app/models/rutas";

dbConnect();

export async function POST(req) {
  try {
    const jsonData = await req.json();

    if (
      jsonData.type === "FeatureCollection" &&
      Array.isArray(jsonData.features)
    ) {
      const routeName = jsonData.name || "Unnamed Route";
      const features = jsonData.features.map((feature) => {
        if (
          feature.type === "Feature" &&
          feature.geometry &&
          feature.geometry.type === "Point" &&
          Array.isArray(feature.geometry.coordinates)
        ) {
          // Añade el campo "estatus" con valor "new" si no existe
          return {
            type: feature.type,
            properties: {
              ...feature.properties,
            },
            geometry: feature.geometry,
            estatus: feature.properties.estatus || "new", // Asigna "new" si estatus no está definido
          };
        } else {
          throw new Error("Invalid feature format");
        }
      });

      const existingRoute = await Rutas.findOne({ name: routeName });
      if (existingRoute) {
        // Agrega nuevas características a la ruta existente
        existingRoute.features = [...existingRoute.features, ...features];
        await existingRoute.save();
      } else {
        // Crea un nuevo documento de ruta
        const newRoute = new Rutas({ name: routeName, features });
        await newRoute.save();
      }

      return NextResponse.json({ message: "Route saved successfully!" });
    } else {
      return NextResponse.json(
        { message: "Invalid JSON format" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error processing JSON:", error.message);
    return NextResponse.json(
      { message: `Error processing JSON: ${error.message}` },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    const { idCliente, newStatus } = await req.json();

    if (!idCliente || !newStatus) {
      return NextResponse.json(
        { message: "Missing idCliente or newStatus" },
        { status: 400 }
      );
    }

    // Encuentra la ruta que contiene la característica con el ID de cliente especificado
    const route = await Rutas.findOne({
      "features.properties.ID_Cliente": idCliente,
    });

    if (!route) {
      return NextResponse.json(
        { message: "Route or feature not found" },
        { status: 404 }
      );
    }

    // Actualiza el estatus de la característica con el ID de cliente especificado
    let updated = false;
    route.features = route.features.map((feature) => {
      if (feature.properties.ID_Cliente === idCliente) {
        updated = true;
        return {
          ...feature,
          estatus: newStatus, // Actualiza el estatus
        };
      }
      return feature;
    });

    if (!updated) {
      return NextResponse.json(
        { message: "Feature not found" },
        { status: 404 }
      );
    }

    // Guarda los cambios en la base de datos
    await route.save();

    return NextResponse.json({
      message: "Feature status updated successfully!",
    });
  } catch (error) {
    console.error("Error updating feature status:", error.message);
    return NextResponse.json(
      { message: `Error updating feature status: ${error.message}` },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    const data = await Rutas.find();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(`Error Getting data: ${error.message}`);
  }
}
