import { NextResponse } from 'next/server';
import clientPromise from '@/app/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);
    
    const interconsultas = await db
      .collection('interconsultas')
      .find({})
      .sort({ fecha_registro: -1 })
      .toArray();

    // Convertir fechas a formato ISO de manera segura
    const serializedData = interconsultas.map(item => ({
      ...item,
      _id: item._id.toString(),
      fecha_registro: new Date(item.fecha_registro).toISOString()
    }));

    return NextResponse.json(serializedData);
  } catch (error) {
    console.error('Error fetching interconsultas:', error);
    return NextResponse.json(
      { error: 'Error al obtener interconsultas' },
      { status: 500 }
    );
  }
}