import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema({
  dueño: { type: String, required: [true, "dueño is required"] },
  tienda: { type: String, required: [true, "tienda is required"] },
  telefono: { type: String, required: [true, "telefono is required"] },
  dia: { type: String, required: [true, "dia is required"] },
  hora: { type: String, required: [true, "hora is required"] },
  ubicacion: { type: String, required: [true, "ubicacion is required"] },
  idKof: { type: String, required: false },
});

const Users = mongoose.models.Users || mongoose.model("Users", usersSchema);

export default Users;
