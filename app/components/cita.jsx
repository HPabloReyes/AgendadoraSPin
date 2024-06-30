import Mapa from "./mapa";

export default function Cita({
  tienda,
  telefono,
  dia,
  hora,
  ubicacion,
  dueño,
}) {
  return (
    <div className="grid grid-cols-2 text-left mb-4 p-2 shadow-sm bg-slate-50 shadow-gray-400 rounded-lg font-medium">
      <div className="bg-custom-gradient2 h-1 col-span-2 my-2"> </div>
      <b className="col-span-2">
        <p className="text-orange-500 text-lg text-center">
          Datos de la tienda{" "}
        </p>
      </b>
      <p className="my-2 font-extrabold">Nombre de la tienda: </p>
      <p className="my-2 font-extrabold text-center">{tienda}</p>
      <p className="">Nombre del dueño: </p>
      <p className="text-center">{dueño}</p>
      <div className="bg-gradient-conic h-1 col-span-2"> </div>

      <p className="my-2 font-extrabold">Numero Telefónico: </p>
      <p className="my-2 font-extrabold text-center">{telefono}</p>
      <p className="col-span-2 text-center">
        <b className="text-orange-500 text-lg ">Datos de cita </b>{" "}
      </p>
      <div>
        <p className="font-extrabold text-center">Fecha:</p>
        <p className="text-center">{dia}</p>
      </div>
      <div>
        <p className="font-extrabold text-center">Hora:</p>
        <p className="text-center">{hora}</p>
      </div>
      <div className="mt-2 col-span-2">
        <div className="bg-custom-gradient2 h-1"> </div>
        <div className="my-2 text-center">{ubicacion}</div>
        <Mapa ubicacion={ubicacion}></Mapa>
      </div>
    </div>
  );
}
