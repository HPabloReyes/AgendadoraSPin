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
          return {
            type: feature.type,
            properties: feature.properties,
            geometry: feature.geometry,
          };
        } else {
          throw new Error("Invalid feature format");
        }
      });

      const existingRoute = await Rutas.findOne({ name: routeName });
      if (existingRoute) {
        // Append new features to existing route
        existingRoute.features = [...existingRoute.features, ...features];
        await existingRoute.save();
      } else {
        // Create a new route document
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

export async function GET() {
  try {
    const data = await Rutas.find();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(`Error Getting data: ${error.message}`);
  }
}
