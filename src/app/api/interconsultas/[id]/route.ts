import { NextApiRequest, NextApiResponse } from 'next';
import { InterconsultaService } from '@/app/lib/interconsulta-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { id } = req.query;
    
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ error: 'ID de interconsulta requerido' });
    }

    const service = new InterconsultaService();
    const interconsulta = await service.obtenerInterconsulta(id);
    
    if (!interconsulta) {
      return res.status(404).json({ error: 'Interconsulta no encontrada' });
    }
    
    res.status(200).json({
      success: true,
      data: interconsulta
    });
    
  } catch (error) {
    console.error('Error en API:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
}