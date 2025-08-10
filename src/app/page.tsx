"use client";

import { useRouter } from "next/navigation";
import { ClipboardList, BarChart3, AlertTriangle, Target, Lightbulb } from "lucide-react";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-purple-50 via-pink-50 via-orange-50 to-emerald-50">
      <div className="container mx-auto px-6 py-16">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-700 to-slate-800 bg-clip-text text-transparent mb-6 leading-tight">
            InterconsultAI
          </h1>
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-blue-300"></div>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-4 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-emerald-300"></div>
          </div>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
            <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text">InterconsultAI</span> es un proyecto que busca optimizar y automatizar la priorización de listas de espera médicas no GES en Chile usando IA generativa.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <button
              onClick={() => router.push("/formulario")}
              className="cursor-pointer group relative flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-5 px-10 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 w-full sm:w-auto min-w-[300px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <ClipboardList className="w-7 h-7 transition-transform group-hover:scale-110 relative z-10" />
              <span className="text-xl font-semibold relative z-10">Ir al Formulario</span>
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="cursor-pointer group relative flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-5 px-10 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 w-full sm:w-auto min-w-[300px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <BarChart3 className="w-7 h-7 transition-transform group-hover:scale-110 relative z-10" />
              <span className="text-xl font-semibold relative z-10">Ir al Dashboard</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* El Problema */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/3 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-red-50 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-inner border border-red-100">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">
                El Problema
              </h2>
            </div>
            <div className="lg:w-2/3">
              <p className="text-xl text-slate-800 mb-4 leading-relaxed">
                Las listas de espera no GES en Chile se gestionan manualmente, con datos clínicos en texto libre, 
                lo que dificulta el análisis y priorización eficiente.
              </p>
              <p className="text-slate-600 leading-relaxed">
                La información clínica poco estructurada genera procesos manuales propensos a errores 
                y no permite una visión clara de las listas de espera, consumiendo tiempo valioso 
                del personal médico y administrativo.
              </p>
            </div>
          </div>

          {/* Separador */}
          <div className="flex items-center justify-center">
            <div className="w-16 h-px bg-slate-300"></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full mx-4"></div>
            <div className="w-16 h-px bg-slate-300"></div>
          </div>

          {/* Nuestro Objetivo */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/3 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-inner border border-blue-100">
                <Target className="w-12 h-12 text-blue-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">
                Nuestro Objetivo
              </h2>
            </div>
            <div className="lg:w-2/3">
              <p className="text-xl text-slate-800 mb-4 leading-relaxed">
                Facilitar una gestión más eficiente y equitativa de pacientes, reduciendo tiempos de espera 
                y mejorando resultados en salud pública.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Buscamos apoyar la toma de decisiones clínicas y administrativas basadas en datos estructurados 
                para una gestión más precisa y equitativa de pacientes en espera.
              </p>
            </div>
          </div>

          {/* Separador */}
          <div className="flex items-center justify-center">
            <div className="w-16 h-px bg-slate-300"></div>
            <div className="w-2 h-2 bg-slate-400 rounded-full mx-4"></div>
            <div className="w-16 h-px bg-slate-300"></div>
          </div>

          {/* Nuestra Solución */}
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/3 text-center">
              <div className="w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-inner border border-emerald-100">
                <Lightbulb className="w-12 h-12 text-emerald-600" />
              </div>
              <h2 className="text-3xl font-bold text-slate-800">
                Nuestra Solución
              </h2>
            </div>
            <div className="lg:w-2/3">
              <p className="text-xl text-slate-800 mb-4 leading-relaxed">
                App web con formulario estandarizado, API con IA para estructurar diagnósticos 
                y dashboard que permite visualizar, filtrar y ordenar listas de espera por especialidad y prioridad.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Transformación digital del sistema de salud chileno mediante IA generativa 
                para procesar diagnósticos y facilitar el trabajo del personal médico y administrativo, 
                mejorando la eficiencia y reduciendo tiempos de espera.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
