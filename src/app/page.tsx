import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Interconsultas
          </h1>
          <p className="text-gray-600">
            Seleccione una opción para continuar
          </p>
        </div>
        
        <div className="space-y-4">
          <Link 
            href="/formulario"
            className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition-all duration-200 font-semibold text-lg shadow-lg block text-center"
          >
            Nuevo Formulario
          </Link>
          
          <Link 
            href="/dashboard"
            className="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all duration-200 font-semibold text-lg shadow-lg block text-center"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}