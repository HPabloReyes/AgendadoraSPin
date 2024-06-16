"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Form() {
  const [location, setLocation] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude}, Lon: ${longitude}`);
        },
        (error) => {
          console.error("Error obteniendo la ubicación: ", error);
        }
      );
    } else {
      alert("Geolocalización no es soportada por este navegador.");
    }
  };

  return (
    <form
      className="bg-white p-10 rounded-lg shadow-md w-full max-w-md"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="w-full p-3 mb-4 border rounded text-center"
        placeholder="Nombre del Dueño"
        {...register("Dueño")}
      ></input>
      <input
        className="w-full p-3 mb-4 border rounded text-center"
        placeholder="Nombre de la tienda"
        {...register("Tienda")}
      ></input>
      <input
        className="w-full p-3 mb-4 border rounded text-center"
        placeholder="Telefono"
        {...register("Celular")}
      ></input>
      <input
        lang="es"
        type="date"
        className="w-full p-3 mb-4 border rounded text-center"
        {...register("Fecha")}
      ></input>
      <input
        type="time"
        className="w-full p-3 mb-4 border rounded text-center"
        {...register("Hora")}
      ></input>
      <input
        className="w-full p-3 mb-4 border rounded text-center"
        placeholder="Ubicación"
        value={location}
        readOnly
        {...register("Ubicacion")}
      ></input>
      <button
        type="button"
        className="w-full  bg-blue-400 text-white py-3 rounded mb-4 hover:bg-blue-600"
        onClick={getLocation}
      >
        Obtener Ubicación
      </button>
      <button
        type="submit"
        className="w-full bg-spin-blue text-white py-3 rounded hover:bg-green-600"
      >
        Registrar
      </button>
    </form>
  );
}
