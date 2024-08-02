"use client";

import Link from "next/link";
import { useSelector } from "react-redux";

export default function Navigation() {
  const usuario = useSelector((state) => state.user.usuario);
  let links = ["Registro", "Citas", "Rutas"];

  return (
    <div className="p-4 border-b-4 border-gray-100">
      {usuario && Object.keys(usuario).length > 0 ? (
        <ul className="flex justify-around">
          {links.map((e, index) => (
            <li
              key={index}
              className="hover:text-black cursor-pointer font-medium"
            >
              <Link href={`/${e}`}>{e}</Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
