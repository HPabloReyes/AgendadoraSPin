"use client";
import { useSelector } from "react-redux";
import FarmerForm from "./formularios/farmerform";
import HunterForm from "./formularios/hunterform";

export default function Form() {
  const usuario = useSelector((state) => state.user.usuario);

  return (
    <>
      {usuario.usuario == null ? null : usuario.usuario
          .toLowerCase()
          .includes("farmer") ? (
        <FarmerForm />
      ) : (
        <HunterForm />
      )}
    </>
  );
}
