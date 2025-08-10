// pages/api/interconsultas/index.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { InterconsultaService } from '@/app/lib/interconsulta-service';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Método no permitido' });
  }

  try {
    const { limit = '50', skip = '0' } = req.query;
    
    const service = new InterconsultaService();
    const interconsultas = await service.listarInterconsultas(
      parseInt(limit as string),
      parseInt(skip as string)
    );
    
    res.status(200).json({
      success: true,
      data: interconsultas,
      count: interconsultas.length
    });
    
  } catch (error) {
    console.error('Error en API:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: error instanceof Error ? error.message : 'Error desconocido'
    });
  }
}