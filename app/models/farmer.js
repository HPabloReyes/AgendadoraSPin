import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
  properties: {
    Name: { type: String, required: true },
    ID_Cliente: { type: String, required: true },
    COORDENADA_X: { type: String, required: true },
    COORDENADA_Y: { type: String, required: true },
    ultima_visita: { type: String, required: false },
  },
  estatus: {
    type: String,
    enum: ["inactivo", "activo"],
    required: false,
  },
});

const routeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  features: [farmerSchema],
});

const FarmerRutas =
  mongoose.models.FarmerRutas || mongoose.model("FarmerRutas", routeSchema);

export default FarmerRutas;
