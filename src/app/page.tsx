"use client";

import { useRouter } from "next/navigation";
import { ClipboardList, BarChart3 } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-6 bg-gradient-to-br from-blue-50 to-blue-100">
      <h1 className="text-5xl font-extrabold mb-6 text-blue-800 drop-shadow-sm">
        Sistema de Gestión de Pacientes
      </h1>
      <p className="mb-12 text-lg text-gray-700 max-w-lg">
        Bienvenido al sistema de registro y monitoreo de pacientes. 
        Selecciona una opción para continuar.
      </p>

      <div className="flex flex-col gap-6 w-full max-w-xs">
        <button
          onClick={() => router.push("/formulario")}
          className="flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-2xl shadow-lg transform transition hover:scale-105 active:scale-95"
        >
          <ClipboardList className="w-6 h-6" />
          <span className="text-lg font-semibold">Ir al Formulario</span>
        </button>

        <button
          onClick={() => router.push("/dashboard")}
          className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-4 px-6 rounded-2xl shadow-lg transform transition hover:scale-105 active:scale-95"
        >
          <BarChart3 className="w-6 h-6" />
          <span className="text-lg font-semibold">Ir al Dashboard</span>
        </button>
      </div>
    </div>
  );
}