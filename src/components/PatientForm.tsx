"use client";

import React, { useState } from "react";

interface FormData {
  rut: string;
  nombre: string;
  edad: number | "";
  sexo: string;
  prevision: string;
  diagnostico: string;
  prioridad: string;
  observaciones: string;
}

export default function InterconsultaForm() {
  const [formData, setFormData] = useState<FormData>({
    rut: "",
    nombre: "",
    edad: "",
    sexo: "",
    prevision: "",
    diagnostico: "",
    prioridad: "",
    observaciones: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "edad" ? (value ? Number(value) : "") : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos en JSON:", JSON.stringify(formData, null, 2));
    alert("JSON generado en consola");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-8 px-4 sm:py-12">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Professional Header */}
          <div className="bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-700 px-8 py-8 relative">
            <div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
            <div className="relative">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                Sistema de Interconsultas
              </h1>
              <p className="text-white/90 text-lg">
                Plataforma de gestión médica especializada
              </p>
              <div className="mt-4 flex items-center space-x-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30">
                  Especialidades no GES
                </span>
                <span className="text-white/70 text-sm">
                  Fecha: {new Date().toLocaleDateString("es-CL")}
                </span>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-12">
            {/* Patient Info Section */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-slate-600 to-blue-600 rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 rounded-full bg-white/90"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Datos del Paciente
                  </h2>
                  <p className="text-gray-600">
                    Información personal e identificación
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-2xl p-6 border border-slate-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                      RUT / Identificación
                    </label>
                    <input
                      type="text"
                      name="rut"
                      value={formData.rut}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:ring-4 focus:ring-slate-100 transition-all text-gray-800 font-medium"
                      required
                    />
                  </div>

                  <div className="lg:col-span-2">
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                      Nombre Completo
                    </label>
                    <input
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:ring-4 focus:ring-slate-100 transition-all text-gray-800 font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                      Edad (años)
                    </label>
                    <input
                      type="number"
                      name="edad"
                      value={formData.edad}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:ring-4 focus:ring-slate-100 transition-all text-gray-800 font-medium"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                      Sexo Biológico
                    </label>
                    <div className="space-y-3">
                      {["Masculino", "Femenino", "Otro"].map((sexo) => (
                        <label key={sexo} className="flex items-center group cursor-pointer">
                          <input
                            type="radio"
                            name="sexo"
                            value={sexo}
                            checked={formData.sexo === sexo}
                            onChange={handleChange}
                            className="w-5 h-5 text-slate-600 border-2 border-gray-300 focus:ring-slate-500 focus:ring-2"
                            required
                          />
                          <span className="ml-3 text-gray-700 font-medium group-hover:text-slate-600 transition-colors">
                            {sexo}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                      Sistema Previsional
                    </label>
                    <div className="space-y-3">
                      {["FONASA", "ISAPRE", "Otro"].map((prev) => (
                        <label key={prev} className="flex items-center group cursor-pointer">
                          <input
                            type="radio"
                            name="prevision"
                            value={prev}
                            checked={formData.prevision === prev}
                            onChange={handleChange}
                            className="w-5 h-5 text-slate-600 border-2 border-gray-300 focus:ring-slate-500 focus:ring-2"
                            required
                          />
                          <span className="ml-3 text-gray-700 font-medium group-hover:text-slate-600 transition-colors">
                            {prev}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Info Section */}
            <div className="space-y-8">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 border-2 border-white rounded"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Información Clínica
                  </h2>
                  <p className="text-gray-600">Diagnóstico y evaluación médica</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-200">
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                      Diagnóstico Principal
                    </label>
                    <textarea
                      name="diagnostico"
                      value={formData.diagnostico}
                      onChange={handleChange}
                      rows={5}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all text-gray-800 font-medium resize-none"
                      placeholder="Describa detalladamente el diagnóstico, síntomas y hallazgos clínicos..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-4 uppercase tracking-wide">
                      Nivel de Prioridad Clínica
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { value: "Urgente", color: "from-red-600 to-red-700", bg: "from-red-50 to-red-100", text: "text-red-700", border: "border-red-300" },
                        { value: "Prioritario", color: "from-amber-600 to-amber-700", bg: "from-amber-50 to-amber-100", text: "text-amber-700", border: "border-amber-300" },
                        { value: "Electivo", color: "from-green-600 to-green-700", bg: "from-green-50 to-green-100", text: "text-green-700", border: "border-green-300" }
                      ].map(({ value, color, bg, text, border }) => (
                        <label key={value} className={`relative flex flex-col items-center p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                          formData.prioridad === value
                            ? `bg-gradient-to-br ${bg} ${border} ${text} shadow-lg transform scale-105`
                            : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                        }`}>
                          <input
                            type="radio"
                            name="prioridad"
                            value={value}
                            checked={formData.prioridad === value}
                            onChange={handleChange}
                            className="sr-only"
                            required
                          />
                          <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${color} mb-3 flex items-center justify-center`}>
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          </div>
                          <span className={`font-bold text-lg uppercase tracking-wide ${formData.prioridad === value ? text : "text-gray-700"}`}>
                            {value}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">
                      Observaciones Adicionales
                    </label>
                    <textarea
                      name="observaciones"
                      value={formData.observaciones}
                      onChange={handleChange}
                      rows={4}
                      className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all text-gray-800 font-medium resize-none"
                      placeholder="Información adicional, antecedentes relevantes, tratamientos previos..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-8">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-slate-700 via-blue-700 to-indigo-700 text-white py-5 px-8 rounded-2xl hover:from-slate-800 hover:via-blue-800 hover:to-indigo-800 focus:ring-4 focus:ring-slate-300 transition-all duration-300 font-bold text-xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] uppercase tracking-wide"
              >
                Enviar Solicitud de Interconsulta
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
