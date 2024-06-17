import { connect, connection } from "mongoose";

const conn = {
  iscConnected: false,
};

export default async function dbConnect() {
  if (conn.iscConnected) return;

  const DB_URI =
    "mongodb+srv://chugo940:oc1f2FYjC1jnE7hf@cluster0.8wn2qgf.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
  const db = await connect(DB_URI);
  conn.iscConnected = db.connections[0].readyState;

  console.log(db.connection.db.databaseName);
}

connection.on("connected", () => {
  console.log("Atlas successful connection");
});

connection.on("error", (err) => {
  console.log(err);
});
