import { NextResponse } from 'next/server';
import { InterconsultaService } from '@/app/lib/interconsulta-service';
import { FormularioOriginal } from '@/app/types/interconsulta';

export async function POST(req: Request) {
  try {
    const formularioOriginal: FormularioOriginal = await req.json();
    
    // Validar datos requeridos
    const camposRequeridos: (keyof FormularioOriginal)[] = 
      ['rut', 'nombre', 'edad', 'sexo', 'prevision', 'diagnostico', 'prioridad'];
    
    const camposFaltantes = camposRequeridos.filter(
      campo => !formularioOriginal[campo]
    );
    
    if (camposFaltantes.length > 0) {
      return NextResponse.json(
        { error: 'Campos requeridos faltantes', campos: camposFaltantes },
        { status: 400 }
      );
    }

    const service = new InterconsultaService();
    const interconsulta = await service.procesarInterconsulta(formularioOriginal);
    
    return NextResponse.json(
      { success: true, data: interconsulta },
      { status: 201 }
    );
    
  } catch (error: any) {
    console.error('Error en API:', error);
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        message: error.message || 'Error desconocido'
      },
      { status: 500 }
    );
  }
}