import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";

export default function HunterForm() {
  const [location, setLocation] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await fetch("api/citas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        console.log("Data submitted successfully:", data);
        toast.success("Cita guardada con éxito");
        reset();
        setLocation("");
      } else {
        console.error("Error submitting data:", response.statusText);
        toast.warn("Error submitting data: " + response.statusText);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error(`Error submitting data: ${error.message || error}`);
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = `Lat: ${latitude}, Lon: ${longitude}`;
          setLocation(newLocation);
          setValue("ubicacion", newLocation);
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
      className=" p-2 w-full max-w-md mx-auto"
      onSubmit={handleSubmit(onSubmit)}
    >
      <input
        className="w-full p-3 mb-4 border rounded text-center"
        placeholder="ID KOF"
        {...register("idKof")}
      ></input>
      <input
        className="w-full p-3 mb-4 border rounded text-center"
        placeholder="Nombre del Dueño"
        {...register("dueño")}
      ></input>
      <input
        className="w-full p-3 mb-4 border rounded text-center"
        placeholder="Nombre de la tienda"
        {...register("tienda")}
      ></input>
      <input
        className="w-full p-3 mb-4 border rounded text-center"
        placeholder="Telefono"
        {...register("telefono")}
      ></input>
      <input
        lang="es"
        type="date"
        className="w-full p-3 mb-4 border rounded text-center"
        placeholder="Día"
        {...register("dia")}
      ></input>
      <input
        type="time"
        className="w-full p-3 mb-4 border rounded text-center"
        placeholder="Hora"
        {...register("hora")}
      ></input>
      <button
        type="button"
        className="w-full bg-spin-secondary-blue text-white py-3 rounded mb-4 hover:bg-blue-500"
        onClick={getLocation}
      >
        Obtener Ubicación
      </button>
      <input
        className="w-full p-3 mb-4 border rounded text-center"
        placeholder="Ubicación"
        value={location}
        readOnly
      ></input>
      <button
        type="submit"
        className="w-full bg-orange-500 text-white py-3 rounded hover:bg-green-500"
      >
        Registrar
      </button>
    </form>
  );
}
