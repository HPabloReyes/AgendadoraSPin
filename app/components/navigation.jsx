import Link from "next/link";

export default function Navigation() {
  let links = ["Registro", "Citas"];

  return (
    <div className=" p-4  border-b-4 border-gray-100">
      <ul className="flex justify-around">
        {links.map((e, index) => (
          <li
            key={index}
            className=" hover:text-black cursor-pointer font-medium"
          >
            <Link href={e}>{e}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
