import Link from "next/link";

export default async function Rutas() {
  const getUrl = process.env.NEXT_PUBLIC_URL;
  console.log("URL", getUrl);
  const res = await fetch(`${getUrl}/api/rutas`, {
    cache: "no-store",
  });
  const json = await res.json();

  return (
    <div>
      {json.map((e) => (
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
