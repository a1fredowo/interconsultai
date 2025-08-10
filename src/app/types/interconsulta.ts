export interface FormularioOriginal {
  rut: string;
  nombre: string;
  edad: number;
  sexo: string;
  prevision: string;
  diagnostico: string;
  prioridad: string;
  observaciones?: string;
}

export interface DiagnosticoEstandarizado {
  codigo_cie10: string;
  descripcion: string;
  resumen_clinico: string;
  especialidad_derivada: string;
  fuente_estandarizacion: string;
  nivel_prioridad: string;
}

export interface Interconsulta {
  id_interconsulta: string;
  fecha_registro: string;
  formulario_original: FormularioOriginal;
  diagnostico_estandarizado?: DiagnosticoEstandarizado;
}
