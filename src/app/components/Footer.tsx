"use client";

import { Github, Linkedin, Globe, Heart, Sparkles } from "lucide-react";

export default function Footer() {
  const teamMembers = [
    { name: "Alfredo Hernández", github: "https://github.com/a1fredowo", linkedin: "https://www.linkedin.com/in/alfredo-hernández-737372273/" },
    { name: "Guillermo González", github: "https://github.com/GGonzalezGG", linkedin: "https://www.linkedin.com/in/guillermo-ignacio-gonzález-olguín-4b8a51379/" },
    { name: "Benjamín Nuñez", github: "https://github.com/Bruh4519", linkedin: "https://www.linkedin.com/in/benjamin-núñez-rozas-a85861379/" },
  ];

  const technologies = [
    { name: "Next.js", color: "hover:bg-slate-800 hover:text-white" },
    { name: "Gemini", color: "hover:bg-blue-500 hover:text-white" },
    { name: "MongoDB", color: "hover:bg-green-500 hover:text-white" },
    { name: "Tailwind", color: "hover:bg-cyan-500 hover:text-white" }
  ];

  return (
    <footer className="bg-gradient-to-b from-emerald-50 via-blue-50 via-purple-50 to-pink-50 border-t border-white/20 py-16 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-purple-50/30 via-pink-50/30 to-emerald-100/30 pointer-events-none"></div>
      <div className="absolute top-10 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-200/20 to-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-10 right-1/4 w-40 h-40 bg-gradient-to-br from-emerald-200/20 to-blue-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
          
          {/* Left Section - Brand */}
          <div className="lg:w-1/3 space-y-6">
            <div className="group">
              <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                  InterconsultAI
                </h3>
              </div>
              <div className="h-1 w-0 bg-gradient-to-r from-blue-500 to-emerald-500 group-hover:w-full transition-all duration-500 rounded-full"></div>
            </div>
            
            <p className="text-slate-700 leading-relaxed">
              Revolucionando la gestión de listas de espera médicas en Chile con 
              <span className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> inteligencia artificial generativa</span>
            </p>
            
            <div className="flex items-center gap-3 p-4 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/30 shadow-lg">
              <Globe className="w-5 h-5 text-emerald-600 animate-spin" style={{animationDuration: '3s'}} />
              <span className="text-slate-700 font-medium">UAI Hackathon 2025</span>
              <Heart className="w-4 h-4 text-red-500 animate-pulse ml-auto" />
            </div>
          </div>

          {/* Center Section - Team */}
          <div className="lg:w-1/3">
            <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></span>
              Equipo de Desarrollo
            </h4>
            <div className="space-y-4">
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="group relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 via-purple-100/50 to-emerald-100/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></div>
                  <div className="relative bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-4 group-hover:shadow-xl transition-all duration-300 group-hover:scale-[1.02]">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-800 font-medium group-hover:text-slate-900 transition-colors duration-300">
                        {member.name}
                      </span>
                      <div className="flex gap-3">
                        <a 
                          href={member.github} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 bg-white/70 hover:bg-slate-800 text-slate-600 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 shadow-md"
                          title="GitHub"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                        <a 
                          href={member.linkedin} 
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 bg-white/70 hover:bg-blue-600 text-slate-600 hover:text-white rounded-xl flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-rotate-12 shadow-md"
                          title="LinkedIn"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Technologies */}
          <div className="lg:w-1/3">
            <h4 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full animate-pulse"></span>
              Tecnologías Utilizadas
            </h4>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className={`group bg-white/60 backdrop-blur-sm border border-white/40 rounded-2xl p-4 cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 ${tech.color}`}
                >
                  <div className="text-center">
                    <span className="text-sm font-medium text-slate-700 group-hover:text-inherit transition-colors duration-300">
                      {tech.name}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-white/40 backdrop-blur-sm rounded-2xl p-4 border border-white/30">
              <p className="text-xs text-slate-600 text-center">
                © 2025 InterconsultAI • Todos los derechos reservados
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}