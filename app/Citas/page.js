import Cita from "../components/cita";

export default async function Citas() {
  const getUrl = process.env.NEXT_PUBLIC_URL;
  // console.log("URL", getUrl);
  //const getUrl = "https://agendadora-s-pin.vercel.app";
  const res = await fetch(`${getUrl}/api/citas`, {
    cache: "no-store",
  });
  const json = await res.json();
  // console.log(json);
  return (
    <div>
      {json.map((e) => (
        <Cita
          key={e._id}
          tienda={e.tienda}
          dueño={e.dueño}
          telefono={e.telefono}
          dia={e.dia}
          hora={e.hora}
          ubicacion={e.ubicacion}
        ></Cita>
      ))}
    </div>
  );
}
