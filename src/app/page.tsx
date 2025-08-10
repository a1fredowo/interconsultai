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
            Sistema de Gestión de Pacientes
          </h1>
          <div className="flex items-center justify-center mb-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-blue-300"></div>
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-full mx-4 flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-emerald-300"></div>
          </div>
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-12">
            Proyecto del grupo <span className="font-bold text-transparent bg-gradient-to-r from-blue-600 to-emerald-600 bg-clip-text">InterconsultAI</span> para optimizar y automatizar la priorización de listas de espera médicas no GES en Chile usando IA generativa.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20">
            <button
              onClick={() => router.push("/formulario")}
              className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white py-5 px-10 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 w-full sm:w-auto min-w-[300px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <ClipboardList className="w-7 h-7 transition-transform group-hover:scale-110 relative z-10" />
              <span className="text-xl font-semibold relative z-10">Ir al Formulario</span>
            </button>

            <button
              onClick={() => router.push("/dashboard")}
              className="group relative flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white py-5 px-10 rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 w-full sm:w-auto min-w-[300px] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <BarChart3 className="w-7 h-7 transition-transform group-hover:scale-110 relative z-10" />
              <span className="text-xl font-semibold relative z-10">Ir al Dashboard</span>
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          
          {/* El Problema */}
          <div className="mb-16">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-shrink-0 text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-red-100 to-red-50 rounded-3xl mb-6 shadow-inner border border-red-100">
                  <AlertTriangle className="w-12 h-12 text-red-600" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
                  El Problemaㅤㅤ
                </h2>
              </div>
              <div className="flex-1 mt-4 lg:mt-8">
                <p className="text-2xl lg:text-3xl font-medium mb-8 leading-relaxed text-slate-800">
                  Las listas de espera no GES en Chile se gestionan manualmente, con datos clínicos en texto libre, lo que dificulta el análisis y priorización.
                </p>
                <div className="w-full h-px bg-gradient-to-r from-red-200 via-red-300 to-transparent mb-8"></div>
                <p className="text-lg lg:text-xl leading-relaxed text-slate-600">
                  El sistema público de salud en Chile enfrenta un desafío creciente en la gestión de listas de espera para consultas médicas de especialidad no GES. El problema principal no es solo la cantidad de pacientes, sino la demora en la resolución y priorización eficiente de los casos. Actualmente la información clínica para justificar interconsultas está en texto libre y poco estructurado, lo que dificulta su análisis automático. La priorización depende de procesos manuales, que consumen tiempo, son propensos a errores y no permiten una visión clara y oportuna de las listas de espera.
                </p>
              </div>
            </div>
          </div>

          {/* Nuestro Objetivo */}
          <div className="mb-16">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-shrink-0 text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl mb-6 shadow-inner border border-blue-100">
                  <Target className="w-12 h-12 text-blue-600" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
                  Nuestro Objetivo
                </h2>
              </div>
              <div className="flex-1 mt-4 lg:mt-8">
                <p className="text-2xl lg:text-3xl font-medium mb-8 leading-relaxed text-slate-800">
                  Facilitar una gestión más eficiente y equitativa de pacientes, reduciendo tiempos de espera y mejorando resultados en salud pública.
                </p>
                <div className="w-full h-px bg-gradient-to-r from-blue-200 via-blue-300 to-transparent mb-8"></div>
                <p className="text-lg lg:text-xl leading-relaxed text-slate-600">
                  Buscamos facilitar una gestión más eficiente, precisa y equitativa de los pacientes en espera, para reducir los tiempos de atención y mejorar los resultados en salud pública, apoyando la toma de decisiones clínicas y administrativas basadas en datos estructurados.
                </p>
              </div>
            </div>
          </div>

          {/* Nuestra Solución */}
          <div className="mb-16">
            <div className="flex flex-col lg:flex-row items-start gap-8">
              <div className="flex-shrink-0 text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-3xl mb-6 shadow-inner border border-emerald-100">
                  <Lightbulb className="w-12 h-12 text-emerald-600" />
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
                  Nuestra Solución
                </h2>
              </div>
              <div className="flex-1 mt-4 lg:mt-8">
                <p className="text-2xl lg:text-3xl font-medium mb-8 leading-relaxed text-slate-800">
                  Una app web con formulario estandarizado, API con IA para estructurar diagnósticos y un dashboard que permite visualizar, filtrar y ordenar las listas de espera por especialidad y prioridad.
                </p>
                <div className="w-full h-px bg-gradient-to-r from-emerald-200 via-emerald-300 to-transparent mb-8"></div>
                <p className="text-lg lg:text-xl leading-relaxed text-slate-600">
                  Desarrollamos una aplicación web que integra: un formulario digital inspirado en el Formulario Único de Evaluación de Salud chileno para el ingreso estandarizado de consultas médicas; una API que utiliza IA generativa para procesar y estandarizar el diagnóstico en texto libre, devolviendo datos estructurados que se almacenan en JSON; y un dashboard que permite visualizar, filtrar y ordenar las listas de espera por especialidad y prioridad, facilitando el trabajo del personal médico y administrativo. Buscamos aportar a la transformación digital del sistema de salud chileno, mejorando la eficiencia en la gestión de listas de espera, reduciendo tiempos de espera y apoyando la entrega de atención oportuna a los pacientes.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
