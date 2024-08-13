"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";

export default function Rutas() {
  const usuario = useSelector((state) => state.user.usuario);
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredRutas, setFilteredRutas] = useState([]);

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const res = await fetch(`/api/rutas`, {
          cache: "no-store",
        });
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setRutas(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRutas();
  }, []);

  useEffect(() => {
    // Filtrar las rutas en función del usuario
    if (usuario && Object.keys(usuario).length > 0) {
      console.log("ya hay usuario");
      setFilteredRutas(
        rutas.filter((ruta) =>
          ruta.name?.toLowerCase().includes(usuario.usuario.toLowerCase())
        )
      );
    } else {
      // Si no hay usuario definido, filtrar por "Hunter"
      console.log("no hay usuario");
      setFilteredRutas(
        rutas.filter((ruta) =>
          ruta.name?.toLowerCase().includes("Hunter".toLowerCase())
        )
      );
    }
  }, [rutas, usuario]);

  console.log(usuario.usuario);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {filteredRutas.map((e) => (
        <Link key={e._id} href={`Rutas/${e._id}`}>
          <div className="bg-white shadow-md rounded-lg p-6 hover:bg-gray-100 transition duration-300 ease-in-out">
            <h2 className="text-xl font-semibold mb-2">{e.name}</h2>
            <p className="text-gray-700">Ver detalles</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
