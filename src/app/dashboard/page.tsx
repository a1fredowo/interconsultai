"use client";
import React, { useState, useMemo, useEffect } from 'react';
import { ChevronDown, ChevronUp, User, Calendar, AlertTriangle, Heart, Eye, Brain, Bone, Stethoscope } from 'lucide-react';

const InterConsultaCard = ({ interconsulta, isExpanded, onToggle }) => {
  const { formulario_original, diagnostico_estandarizado, id_interconsulta, fecha_registro } = interconsulta;
  
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-CL', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getPriorityColor = (prioridad) => {
    switch (prioridad) {
      case 'Urgente': return 'bg-red-100 text-red-800 border-red-200';
      case 'Media': return 'bg-green-100 text-green-800 border-green-200';
      case 'Preferente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Prioritario': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Electivo': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSpecialtyIcon = (especialidad) => {
    switch (especialidad) {
      case 'Cardiología': return <Heart className="w-4 h-4" />;
      case 'Oftalmología': return <Eye className="w-4 h-4" />;
      case 'Neurología': return <Brain className="w-4 h-4" />;
      case 'Traumatología': return <Bone className="w-4 h-4" />;
      default: return <Stethoscope className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-4 overflow-hidden transition-all duration-200 hover:shadow-lg">
      {/* Header - Siempre visible */}
      <div 
        className="p-4 cursor-pointer hover:bg-gray-50 transition-colors duration-150"
        onClick={onToggle}
      >
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-lg font-semibold text-gray-900">
                {diagnostico_estandarizado?.codigo_cie10} - {diagnostico_estandarizado?.descripcion}
              </h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(diagnostico_estandarizado?.nivel_prioridad)}`}>
                {diagnostico_estandarizado?.nivel_prioridad}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <div className="flex items-center gap-1">
                <span className="font-medium">{id_interconsulta}</span>
              </div>
              <div className="flex items-center gap-1">
                <User className="w-4 h-4" />
                <span>{formulario_original?.nombre}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{formatDate(fecha_registro)}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              {getSpecialtyIcon(diagnostico_estandarizado?.especialidad_derivada)}
              <span className="text-sm font-medium text-blue-600">
                {diagnostico_estandarizado?.especialidad_derivada}
              </span>
            </div>

            <p className="text-sm text-gray-700 line-clamp-2">
              {formulario_original?.diagnostico}
            </p>
          </div>
          
          <div className="ml-4 flex-shrink-0">
            {isExpanded ? 
              <ChevronUp className="w-5 h-5 text-gray-400" /> : 
              <ChevronDown className="w-5 h-5 text-gray-400" />
            }
          </div>
        </div>
      </div>

      {/* Detalles expandibles */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Información del Paciente</h4>
              <div className="space-y-1 text-sm">
                <p><span className="font-medium">RUT:</span> {formulario_original?.rut}</p>
                <p><span className="font-medium">Edad:</span> {formulario_original?.edad} años</p>
                <p><span className="font-medium">Sexo:</span> {formulario_original?.sexo}</p>
                <p><span className="font-medium">Previsión:</span> {formulario_original?.prevision}</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Diagnóstico Original</h4>
              <p className="text-sm text-gray-700 mb-3">{formulario_original?.diagnostico}</p>
              
              {formulario_original?.observaciones && (
                <>
                  <h4 className="font-medium text-gray-900 mb-2">Observaciones</h4>
                  <p className="text-sm text-gray-700">{formulario_original.observaciones}</p>
                </>
              )}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-300">
            <h4 className="font-medium text-gray-900 mb-2">Resumen Clínico Estandarizado</h4>
            <p className="text-sm text-gray-700">{diagnostico_estandarizado?.resumen_clinico}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const InterConsultasDashboard = () => {
  const [interconsultasData, setInterconsultasData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCards, setExpandedCards] = useState(new Set());
  const [filtroEspecialidad, setFiltroEspecialidad] = useState('');
  const [filtroCIE10, setFiltroCIE10] = useState('');

  // Obtener datos de la API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/interconsultas/obtenerData');
        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`);
        }
        const data = await response.json();
        console.log('Datos recibidos:', data); // Para debug
        
        // Validar que data es un array
        if (!Array.isArray(data)) {
          throw new Error('Los datos recibidos no son un array válido');
        }
        
        setInterconsultasData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message || 'Error desconocido al cargar los datos');
        setInterconsultasData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getSpecialtyIcon = (especialidad) => {
    switch (especialidad) {
      case 'Cardiología': return <Heart className="w-4 h-4" />;
      case 'Oftalmología': return <Eye className="w-4 h-4" />;
      case 'Neurología': return <Brain className="w-4 h-4" />;
      case 'Traumatología': return <Bone className="w-4 h-4" />;
      default: return <Stethoscope className="w-4 h-4" />;
    }
  };

  // Obtener listas únicas para los filtros con validación
  const especialidades = useMemo(() => {
    const especialidadesSet = new Set();
    interconsultasData.forEach(item => {
      if (item?.diagnostico_estandarizado?.especialidad_derivada) {
        especialidadesSet.add(item.diagnostico_estandarizado.especialidad_derivada);
      }
    });
    return Array.from(especialidadesSet).sort();
  }, [interconsultasData]);

  const codigosCIE10 = useMemo(() => {
    const codigosMap = new Map();
    interconsultasData.forEach(item => {
      if (item?.diagnostico_estandarizado?.codigo_cie10 && item?.diagnostico_estandarizado?.descripcion) {
        const codigo = item.diagnostico_estandarizado.codigo_cie10;
        const descripcion = item.diagnostico_estandarizado.descripcion;
        if (!codigosMap.has(codigo)) {
          codigosMap.set(codigo, { codigo, descripcion });
        }
      }
    });
    return Array.from(codigosMap.values()).sort((a, b) => a.codigo.localeCompare(b.codigo));
  }, [interconsultasData]);

  // Estadísticas por especialidad
  const estadisticasEspecialidad = useMemo(() => {
    const conteos = {};
    interconsultasData.forEach(item => {
      const especialidad = item?.diagnostico_estandarizado?.especialidad_derivada;
      if (especialidad) {
        conteos[especialidad] = (conteos[especialidad] || 0) + 1;
      }
    });
    
    return Object.entries(conteos)
      .map(([especialidad, cantidad]) => ({
        especialidad,
        cantidad
      }))
      .sort((a, b) => b.cantidad - a.cantidad);
  }, [interconsultasData]);

  // Filtrar datos
  const datosFiltrados = useMemo(() => {
    if (!Array.isArray(interconsultasData)) return [];
    
    return interconsultasData.filter(item => {
      if (!item?.diagnostico_estandarizado) return false;
      
      const cumpleEspecialidad = !filtroEspecialidad || 
        item.diagnostico_estandarizado.especialidad_derivada === filtroEspecialidad;
      const cumpleCIE10 = !filtroCIE10 || 
        item.diagnostico_estandarizado.codigo_cie10 === filtroCIE10;
      
      return cumpleEspecialidad && cumpleCIE10;
    });
  }, [interconsultasData, filtroEspecialidad, filtroCIE10]);

  const toggleCard = (id) => {
    const newExpanded = new Set(expandedCards);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedCards(newExpanded);
  };

  const limpiarFiltros = () => {
    setFiltroEspecialidad('');
    setFiltroCIE10('');
  };

  const handleEspecialidadClick = (especialidad) => {
    if (filtroEspecialidad === especialidad) {
      setFiltroEspecialidad('');
    } else {
      setFiltroEspecialidad(especialidad);
      setFiltroCIE10(''); // Limpiar el otro filtro
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando interconsultas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen flex justify-center items-center">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Error al cargar datos</h3>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard de Interconsultas</h1>
        <p className="text-gray-600">Gestión y seguimiento de interconsultas médicas</p>
      </div>

      {/* Dashboard de estadísticas por especialidad */}
      {estadisticasEspecialidad.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Resumen por Especialidad</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {estadisticasEspecialidad.map(({ especialidad, cantidad }) => {
              const totalPorcentaje = interconsultasData.length > 0 
                ? ((cantidad / interconsultasData.length) * 100).toFixed(1)
                : '0.0';
              const isSelected = filtroEspecialidad === especialidad;
              
              return (
                <div 
                  key={especialidad}
                  className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                    isSelected 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 bg-gray-50 hover:border-gray-300'
                  }`}
                  onClick={() => handleEspecialidadClick(especialidad)}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getSpecialtyIcon(especialidad)}
                      <span className="text-sm font-medium text-gray-600 truncate">
                        {especialidad}
                      </span>
                    </div>
                    {isSelected && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-gray-900">
                      {cantidad}
                    </span>
                    <span className="text-sm text-gray-500">
                      ({totalPorcentaje}%)
                    </span>
                  </div>
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                    <div 
                      className={`h-1 rounded-full transition-all duration-300 ${
                        isSelected ? 'bg-blue-500' : 'bg-blue-400'
                      }`}
                      style={{ width: `${Math.min(parseFloat(totalPorcentaje), 100)}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <span>Total de interconsultas: <span className="font-semibold">{interconsultasData.length}</span></span>
            {filtroEspecialidad && (
              <span className="text-blue-600">
                Filtrando por: <span className="font-semibold">{filtroEspecialidad}</span>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Filtros */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Filtros</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Especialidad Derivada
            </label>
            <select
              value={filtroEspecialidad}
              onChange={(e) => setFiltroEspecialidad(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todas las especialidades</option>
              {especialidades.map(esp => (
                <option key={esp} value={esp}>{esp}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Código CIE-10
            </label>
            <select
              value={filtroCIE10}
              onChange={(e) => setFiltroCIE10(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Todos los códigos</option>
              {codigosCIE10.map(item => (
                <option key={item.codigo} value={item.codigo}>
                  {item.codigo} - {item.descripcion}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex items-end">
            <button
              onClick={limpiarFiltros}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors duration-150"
            >
              Limpiar Filtros
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-sm text-gray-600">
          Mostrando {datosFiltrados.length} de {interconsultasData.length} interconsultas
        </div>
      </div>

      {/* Lista de interconsultas */}
      <div className="space-y-4">
        {datosFiltrados.length > 0 ? (
          datosFiltrados.map(interconsulta => (
            <InterConsultaCard
              key={interconsulta._id}
              interconsulta={interconsulta}
              isExpanded={expandedCards.has(interconsulta._id)}
              onToggle={() => toggleCard(interconsulta._id)}
            />
          ))
        ) : interconsultasData.length > 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No se encontraron interconsultas
            </h3>
            <p className="text-gray-600">
              Intenta ajustar los filtros para ver más resultados
            </p>
            <button
              onClick={limpiarFiltros}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Limpiar Filtros
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No hay interconsultas disponibles
            </h3>
            <p className="text-gray-600">
              No se encontraron datos en la base de datos
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterConsultasDashboard;