import mongoose, { Schema } from "mongoose";

const usersSchema = new Schema({
  usuario: { type: String, required: [true, "user is Required"] },
  contraseña: { type: String, required: [true, "Password is Required"] },
});

const Users = mongoose.models.Users || mongoose.model("Users", usersSchema);

export default Users;
