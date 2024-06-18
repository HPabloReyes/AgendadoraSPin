export default async function Citas() {
  const res = await fetch(
    "http://localhost:3000/api/citas" ||
      "https://agendadora-s-pin.vercel.app/api/citas"
  );
  const json = await res.json();
  console.log(json);
  return (
    <h1>
      {json.map((e) => (
        <div key={e._id}>{e.tienda}</div>
      ))}
    </h1>
  );
}
