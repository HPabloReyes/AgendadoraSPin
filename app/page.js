"use client";

import Login from "./components/login";
import Welcome from "./components/welcome";
import { useSelector } from "react-redux";

export default function Home() {
  const usuario = useSelector((state) => state.user.usuario);
  //console.log("usuario", usuario);

  return (
    <main>
      {Object.keys(usuario).length > 0 ? <Welcome></Welcome> : <Login></Login>}
    </main>
  );
}
