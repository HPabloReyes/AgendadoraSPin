export default function Cita({
  tienda,
  telefono,
  dia,
  hora,
  ubicacion,
  dueño,
}) {
  return (
    <div className="grid grid-cols-2 text-center mb-4 p-1 shadow-sm shadow-gray-400 rounded-lg">
      <b className="col-span-2">
        <p>Nombre de la tienda: </p>
      </b>
      <p className="col-span-2">{tienda}</p>
      <p>Nombre del dueño</p>
      <p>{dueño}</p>
      <p>Teléfono de contacto</p>
      <p className="m-auto">{telefono}</p>
      <p className="col-span-2">
        <b>Datos de cita </b>{" "}
      </p>
      <div>
        <p>Fecha:</p>
        <p>{dia}</p>
      </div>
      <div>
        <p>Hora:</p>
        <p>{hora}</p>
      </div>
      <div className="mt-2 col-span-2">{ubicacion}</div>
    </div>
  );
}
