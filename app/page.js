import Form from "./components/form";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <img
        src="/spnegocios.png"
        className="rounded-md mb-6 max-w-xs mt-6"
        alt="Logo"
      ></img>
      <Form></Form>
    </main>
  );
}
