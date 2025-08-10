"use client";

import jsPDF from 'jspdf';

interface FormData {
  rut: string;
  nombre: string;
  edad: number | "";
  sexo: string;
  prevision: string;
  diagnostico: string;
  prioridad: string;
  observaciones: string;
}

interface PDFMedicalProps {
  formData: FormData;
  interceptConsultaId: string;
}

export default function PDFdownload({ formData, interceptConsultaId }: PDFMedicalProps) {
  const generatePDF = () => {
    const doc = new jsPDF();
    
    // Header médico con cruz
    doc.setFillColor(220, 53, 69);
    doc.rect(0, 0, 210, 35, 'F');
    
    // Cruz médica
    doc.setFillColor(255, 255, 255);
    doc.rect(25, 8, 3, 19, 'F');
    doc.rect(17, 14, 19, 3, 'F');
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont('helvetica', 'bold');
    doc.text('SOLICITUD DE INTERCONSULTA', 45, 18);
    
    doc.setFontSize(11);
    doc.text('Especialidades no GES - Atención Médica', 45, 25);
    
    // Recuadro de información
    doc.setDrawColor(220, 53, 69);
    doc.setLineWidth(0.5);
    doc.rect(15, 45, 180, 200);
    
    let yPos = 55;
    
    // Tabla de datos del paciente
    doc.setFillColor(248, 249, 250);
    doc.rect(20, yPos, 170, 8, 'F');
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('IDENTIFICACIÓN DEL PACIENTE', 25, yPos + 5);
    yPos += 15;
    
    // Tabla con bordes
    const tableData = [
      ['RUT/Cédula:', formData.rut, 'Edad:', `${formData.edad} años`],
      ['Nombre Completo:', formData.nombre, '', ''],
      ['Sexo:', formData.sexo, 'Previsión:', formData.prevision]
    ];
    
    doc.setFontSize(10);
    tableData.forEach((row, index) => {
      doc.setFont('helvetica', 'bold');
      doc.text(row[0], 25, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(row[1], 60, yPos);
      if (row[2]) {
        doc.setFont('helvetica', 'bold');
        doc.text(row[2], 120, yPos);
        doc.setFont('helvetica', 'normal');
        doc.text(row[3], 150, yPos);
      }
      yPos += 8;
    });
    
    yPos += 10;
    
    // Sección clínica
    doc.setFillColor(248, 249, 250);
    doc.rect(20, yPos, 170, 8, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.text('EVALUACIÓN CLÍNICA', 25, yPos + 5);
    yPos += 18;
    
    // Prioridad con color
    const priorityColors = {
      'Urgente': [220, 53, 69],
      'Prioritario': [255, 193, 7],
      'Electivo': [40, 167, 69]
    };
    
    const color = priorityColors[formData.prioridad as keyof typeof priorityColors];
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(25, yPos - 3, 60, 8, 'F');
    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'bold');
    doc.text(`PRIORIDAD: ${formData.prioridad.toUpperCase()}`, 28, yPos + 2);
    yPos += 15;
    
    doc.setTextColor(0, 0, 0);
    doc.setFont('helvetica', 'bold');
    doc.text('DIAGNÓSTICO:', 25, yPos);
    yPos += 8;
    doc.setFont('helvetica', 'normal');
    const diagLines = doc.splitTextToSize(formData.diagnostico, 160);
    doc.text(diagLines, 25, yPos);
    yPos += diagLines.length * 5 + 15;
    
    if (formData.observaciones) {
      doc.setFont('helvetica', 'bold');
      doc.text('OBSERVACIONES CLÍNICAS:', 25, yPos);
      yPos += 8;
      doc.setFont('helvetica', 'normal');
      const obsLines = doc.splitTextToSize(formData.observaciones, 160);
      doc.text(obsLines, 25, yPos);
    }
    
    // Firma - Solo línea para firma médico
    yPos = 220;
    doc.line(25, yPos, 100, yPos);
    doc.setFontSize(9);
    doc.text('Firma Médico', 25, yPos + 5);
    
    doc.save(`Interconsulta_Medica_${formData.rut}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="bg-red-600 hover:bg-red-700 text-white py-2 px-3 rounded-lg text-sm font-medium transition-colors cursor-pointer flex items-center gap-2"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
       Descargar PDF
    </button>
  );
}