import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["Feature"],
  },
  properties: {
    Name: String,
    ID_Cliente: Number,
    COORDENADA_X: Number,
    COORDENADA_Y: Number,
    GEC: String,
    Subcanal_Kof: String,
    RUTA_FINAL: String,
    NUEVO_D__A_VISITA: String,
    "A VISITA": String,
    "ID Cliente": Number,
    "RUTA FINAL": String,
    "Subcanal Kof": String,
    X: Number,
    Y: Number,
  },
  geometry: {
    type: {
      type: String,
      required: true,
      enum: ["Point"],
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
  estatus: {
    type: String,
    enum: ["Perdido", "Proceso", "Ganado", "new"],
    required: true,
  },
});

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  features: [featureSchema],
});

const Rutas = mongoose.models.Rutas || mongoose.model("Rutas", routeSchema);

export default Rutas;
