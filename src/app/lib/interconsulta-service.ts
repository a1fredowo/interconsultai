import { getDatabase } from './mongodb';
import { estandarizarDiagnostico } from './gemini';
import { FormularioOriginal, Interconsulta, DiagnosticoEstandarizado } from '../types/interconsulta';

export class InterconsultaService {
  private async generateId(): Promise<string> {
    const db = await getDatabase();
    const collection = db.collection('interconsultas');
    
    // Obtener el último ID para generar el siguiente
    const lastInterconsulta = await collection
      .findOne({}, { sort: { fecha_registro: -1 } });
    
    let nextNumber = 1;
    if (lastInterconsulta?.id_interconsulta) {
      const match = lastInterconsulta.id_interconsulta.match(/INT-\d{4}-(\d{4})/);
      if (match) {
        nextNumber = parseInt(match[1]) + 1;
      }
    }
    
    const year = new Date().getFullYear();
    return `INT-${year}-${nextNumber.toString().padStart(4, '0')}`;
  }

  async procesarInterconsulta(formularioOriginal: FormularioOriginal): Promise<Interconsulta> {
    try {
      // Generar ID único
      const id = await this.generateId();
      
      // Estandarizar diagnóstico con Gemini
      const diagnosticoEstandarizado = await estandarizarDiagnostico(formularioOriginal);
      
      // Crear objeto interconsulta completo
      const interconsulta: Interconsulta = {
        id_interconsulta: id,
        fecha_registro: new Date().toISOString(),
        formulario_original: formularioOriginal,
        diagnostico_estandarizado: diagnosticoEstandarizado
      };
      
      // Guardar en MongoDB
      const db = await getDatabase();
      const collection = db.collection('interconsultas');
      
      const result = await collection.insertOne(interconsulta);
      
      if (!result.acknowledged) {
        throw new Error('Error al guardar en la base de datos');
      }
      
      return interconsulta;
      
    } catch (error) {
      console.error('Error al procesar interconsulta:', error);
      throw error;
    }
  }

  
  async obtenerInterconsulta(id: string): Promise<Interconsulta | null> {
    const db = await getDatabase();
    const collection = db.collection<Interconsulta>('interconsultas'); // Tipado explícito
    
    const result = await collection.findOne(
      { id_interconsulta: id },
      { projection: { _id: 0 } }
    );
    
    return result as Interconsulta | null; // Conversión segura
  }

  async listarInterconsultas(limit: number = 50, skip: number = 0): Promise<Interconsulta[]> {
    const db = await getDatabase();
    const collection = db.collection('interconsultas');
    
    return await collection
      .find({}, { projection: { _id: 0 } })
      .sort({ fecha_registro: -1 })
      .limit(limit)
      .skip(skip)
      .toArray() as Interconsulta[];
  }
}