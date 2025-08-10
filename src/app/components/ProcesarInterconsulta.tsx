import { useState } from 'react';

export default function DebugInterconsulta() {
  const [logs, setLogs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const testAPI = async () => {
    setLoading(true);
    setLogs([]);
    
    try {
      addLog('🚀 Iniciando prueba de API...');
      
      // Verificar que la API existe
      addLog('🔍 Verificando ruta de API...');
      
      const formulario = {
        rut: "12.345.678-9",
        nombre: "Juan Pérez Test",
        edad: 45,
        sexo: "Masculino",
        prevision: "FONASA",
        diagnostico: "Dolor de cabeza persistente",
        prioridad: "Media"
      };

      addLog('📤 Enviando request...');
      
      const response = await fetch('/api/interconsultas/procesar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formulario),
      });

      addLog(`📊 Status recibido: ${response.status}`);
      addLog(`📋 Content-Type: ${response.headers.get('content-type')}`);

      const text = await response.text();
      addLog(`📝 Response raw: ${text}`);

      if (response.ok) {
        const data = JSON.parse(text);
        addLog(`✅ Éxito! ID generado: ${data.data?.id_interconsulta}`);
      } else {
        addLog(`❌ Error ${response.status}: ${text}`);
      }

    } catch (error) {
      addLog(`💥 Exception: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">🔧 Debug Interconsulta API</h1>
      
      <button
        onClick={testAPI}
        disabled={loading}
        className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
      >
        {loading ? '⏳ Probando...' : '🧪 Probar API'}
      </button>

      <div className="bg-black text-green-400 p-4 rounded font-mono text-sm h-96 overflow-y-auto">
        {logs.length === 0 ? (
          <div className="text-gray-500">Presiona el botón para probar la API...</div>
        ) : (
          logs.map((log, index) => (
            <div key={index} className="mb-1">{log}</div>
          ))
        )}
      </div>

      <div className="mt-4 p-4 bg-yellow-100 rounded">
        <h3 className="font-bold">💡 Tips de solución:</h3>
        <ul className="list-disc ml-5 mt-2 space-y-1 text-sm">
          <li>Verificar que el servidor esté corriendo (npm run dev)</li>
          <li>Confirmar estructura de carpetas según tu versión de Next.js</li>
          <li>Revisar que las variables de entorno estén configuradas</li>
          <li>Verificar que todas las dependencias estén instaladas</li>
          <li>Comprobar que no haya errores de TypeScript</li>
        </ul>
      </div>
    </div>
  );
}