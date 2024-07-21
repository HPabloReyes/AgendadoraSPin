"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await fetch("api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        toast.success("Usuario encontrado");
      } else {
        console.error("Error submitting data:", response.statusText);
        toast.warn("Error submitting data: " + response.statusText);
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      toast.error(`Error submitting data: ${error.message || error}`);
    }
  };

  return (
    <>
      <form
        className=" p-2 w-full max-w-md mx-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="w-full p-3 mb-4 border rounded text-center"
          placeholder="Usuario"
          {...register("usuario")}
        ></input>
        <div className="relative">
          <input
            className="w-full p-3 mb-4 border rounded text-center"
            type={showPassword ? "text" : "password"}
            placeholder="Contraseña"
            {...register("contraseña")}
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-4"
          >
            {showPassword ? (
              <img src="/hide.png" className="w-4 "></img>
            ) : (
              <img src="/show.png" className="w-4 "></img>
            )}
          </button>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-3 rounded hover:bg-green-500"
        >
          Login
        </button>
      </form>
    </>
  );
}
