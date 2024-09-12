import RutaFarmer from "@/app/components/rutas/rutaFarmer";

export default async function RutaDetail({ params: { id } }) {
  const getUrl = process.env.NEXT_PUBLIC_URL;
  //console.log("URL", getUrl);
  const res = await fetch(`${getUrl}/api/farmer/${id}`, {
    cache: "no-store",
  });
  const json = await res.json();

  console.log(json.features);

  return (
    <div>
      <div className="text-center">{json.name}</div>
      <div>{<RutaFarmer features={json.features} />}</div>
    </div>
  );
}
