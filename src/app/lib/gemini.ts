import { GoogleGenerativeAI } from '@google/generative-ai';
import { FormularioOriginal, DiagnosticoEstandarizado} from '../types/interconsulta';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function estandarizarDiagnostico(formulario: FormularioOriginal): Promise<DiagnosticoEstandarizado> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

  const prompt = `
Como experto médico, analiza la siguiente información de interconsulta y proporciona un diagnóstico estandarizado:

Datos del paciente:
- Nombre: ${formulario.nombre}
- Edad: ${formulario.edad} años
- Sexo: ${formulario.sexo}
- Previsión: ${formulario.prevision}
- Diagnóstico original: ${formulario.diagnostico}
- Prioridad: ${formulario.prioridad}
- Observaciones: ${formulario.observaciones || 'N/A'}

Responde ÚNICAMENTE con un JSON válido con la siguiente estructura:
{
  "codigo_cie10": "código CIE-10 más apropiado",
  "descripcion": "descripción estándar del diagnóstico CIE-10",
  "resumen_clinico": "resumen clínico profesional del caso",
  "especialidad_derivada": "especialidad médica más apropiada",
  "nivel_prioridad": "Urgente/Alta/Media/Baja"
}

No incluyas texto adicional, solo el JSON.
`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Limpiar la respuesta y parsear JSON
    const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const diagnosticoData = JSON.parse(cleanText);
    
    return {
      ...diagnosticoData,
      fuente_estandarizacion: 'Gemini API v1.5'
    };
  } catch (error) {
    console.error('Error al estandarizar diagnóstico:', error);
    throw new Error('Error en la estandarización del diagnóstico');
  }
}