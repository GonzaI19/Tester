import React, { useState, useEffect, useMemo } from 'react';

// ==========================================
// SVG ICON HELPERS (Lucide-style Clean SVGs)
// ==========================================
const Icon = ({ name, className = "w-5 h-5", ...props }) => {
  const icons = {
    dashboard: <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z"/>,
    users: <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 1 0 7.75"/>,
    fileText: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6M16 13H8M16 17H8M10 9H8"/>,
    building: <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/>,
    briefcase: <g><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></g>,
    folder: <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>,
    barChart: <path d="M12 20V10M18 20V4M6 20v-4"/>,
    settings: <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"/>,
    search: <g><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></g>,
    filter: <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>,
    plus: <path d="M5 12h14M12 5v14"/>,
    sun: <g><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></g>,
    moon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>,
    menu: <path d="M3 12h18M3 6h18M3 18h18"/>,
    x: <path d="M18 6 6 18M6 6l12 12"/>,
    chevronRight: <path d="m9 18 6-6-6-6"/>,
    chevronLeft: <path d="m15 18-6-6 6-6"/>,
    chevronDown: <path d="m6 9 6 6 6-6"/>,
    checkCircle: <g><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><path d="m9 11 3 3L22 4"/></g>,
    alertTriangle: <g><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4M12 17h.01"/></g>,
    xCircle: <g><circle cx="12" cy="12" r="10"/><path d="m15 9-6 6M9 9l6 6"/></g>,
    download: <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>,
    eye: <g><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></g>,
    edit: <g><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></g>,
    award: <g><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"/></g>,
    mapPin: <g><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></g>,
    calendar: <g><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><path d="M16 2v4M8 2v4M3 10h18"/></g>,
    clock: <g><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></g>,
    arrowUpRight: <path d="M7 17 17 7M7 7h10v10"/>,
    trendingUp: <g><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></g>,
    check: <polyline points="20 6 9 17 4 12"/>,
    info: <g><circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/></g>
  };

  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
      {...props}
    >
      {icons[name] || icons.info}
    </svg>
  );
};

// ==========================================
// MOCK DATA (20 Venezuelan Students)
// ==========================================
const INITIAL_STUDENTS = [
  {
    id: 1,
    nombre: "Alejandro Silva",
    cedula: "V-29.123.456",
    carrera: "Ingeniería en Computación",
    semestre: 8,
    universidadOrigen: "Universidad Local",
    localidad: "Cabimas",
    promedio: 16.5,
    porcentajeMaterias: 78,
    servicioComunitario1: true,
    servicioComunitario2: true,
    exoneracionAprobada: true,
    modalidad: "Presencial",
    avatar: "AS",
    correo: "alejandro.silva@unermb.edu.ve",
    telefono: "+58 414-6123456"
  },
  {
    id: 2,
    nombre: "Mariana Rivas",
    cedula: "V-30.456.789",
    carrera: "Administración",
    semestre: 6,
    universidadOrigen: "Universidad Local",
    localidad: "Maracaibo",
    promedio: 11.2,
    porcentajeMaterias: 42,
    servicioComunitario1: false,
    servicioComunitario2: false,
    exoneracionAprobada: true,
    modalidad: "Presencial",
    avatar: "MR",
    correo: "mariana.rivas@unermb.edu.ve",
    telefono: "+58 424-7890123"
  },
  {
    id: 3,
    nombre: "Carlos Mendoza",
    cedula: "V-28.987.654",
    carrera: "Ingeniería Industrial",
    semestre: 9,
    universidadOrigen: "Universidad Local",
    localidad: "Cabimas",
    promedio: 14.0,
    porcentajeMaterias: 82,
    servicioComunitario1: true,
    servicioComunitario2: false,
    exoneracionAprobada: true,
    modalidad: "Presencial",
    avatar: "CM",
    correo: "carlos.mendoza@unermb.edu.ve",
    telefono: "+58 412-3456789"
  },
  {
    id: 4,
    nombre: "Valeria Gómez",
    cedula: "V-31.111.222",
    carrera: "Contaduría Pública",
    semestre: 7,
    universidadOrigen: "LUZ",
    localidad: "Ciudad Ojeda",
    promedio: 13.5,
    porcentajeMaterias: 75,
    servicioComunitario1: true,
    servicioComunitario2: true,
    exoneracionAprobada: false,
    modalidad: "Presencial",
    avatar: "VG",
    correo: "valeria.gomez@student.luz.edu.ve",
    telefono: "+58 416-5554433"
  },
  {
    id: 5,
    nombre: "Jesús Pérez",
    cedula: "V-27.444.555",
    carrera: "Ingeniería de Petróleo",
    semestre: 10,
    universidadOrigen: "Universidad Local",
    localidad: "Cabimas",
    promedio: 17.8,
    porcentajeMaterias: 92,
    servicioComunitario1: true,
    servicioComunitario2: true,
    exoneracionAprobada: true,
    modalidad: "Presencial",
    avatar: "JP",
    correo: "jesus.perez@unermb.edu.ve",
    telefono: "+58 426-9998877"
  },
  {
    id: 6,
    nombre: "Gabriela Torres",
    cedula: "V-29.888.999",
    carrera: "Educación Integral",
    semestre: 6,
    universidadOrigen: "Universidad Local",
    localidad: "Lagunillas",
    promedio: 12.8,
    porcentajeMaterias: 60,
    servicioComunitario1: true,
    servicioComunitario2: true,
    exoneracionAprobada: true,
    modalidad: "Virtual",
    avatar: "GT",
    correo: "gabriela.torres@unermb.edu.ve",
    telefono: "+58 414-1112233"
  },
  {
    id: 7,
    nombre: "Luisana Blanco",
    cedula: "V-30.333.444",
    carrera: "Ingeniería Mecánica",
    semestre: 8,
    universidadOrigen: "Universidad Local",
    localidad: "Tía Juana",
    promedio: 15.0,
    porcentajeMaterias: 70,
    servicioComunitario1: true,
    servicioComunitario2: true,
    exoneracionAprobada: true,
    modalidad: "Presencial",
    avatar: "LB",
    correo: "luisana.blanco@unermb.edu.ve",
    telefono: "+58 424-3332211"
  },
  {
    id: 8,
    nombre: "Andrés Parra",
    cedula: "V-28.222.111",
    carrera: "Comunicación Social",
    semestre: 5,
    universidadOrigen: "URBE",
    localidad: "Maracaibo",
    promedio: 10.5,
    porcentajeMaterias: 38,
    servicioComunitario1: false,
    servicioComunitario2: false,
    exoneracionAprobada: false,
    modalidad: "Virtual",
    avatar: "AP",
    correo: "andres.parra@urbe.edu.ve",
    telefono: "+58 412-0009988"
  },
  {
    id: 9,
    nombre: "Daniela Ruiz",
    cedula: "V-31.555.666",
    carrera: "Ingeniería en Computación",
    semestre: 8,
    universidadOrigen: "Universidad Local",
    localidad: "Cabimas",
    promedio: 14.2,
    porcentajeMaterias: 68,
    servicioComunitario1: true,
    servicioComunitario2: true,
    exoneracionAprobada: true,
    modalidad: "Presencial",
    avatar: "DR",
    correo: "daniela.ruiz@unermb.edu.ve",
    telefono: "+58 416-7778899"
  },
  {
    id: 10,
    nombre: "José G. Hernández",
    cedula: "V-27.999.000",
    carrera: "Medicina",
    semestre: 11,
    universidadOrigen: "Universidad Local",
    localidad: "Cabimas",
    promedio: 18.5,
    porcentajeMaterias: 96,
    servicioComunitario1: true,
    servicioComunitario2: true,
    exoneracionAprobada: true,
    modalidad: "Presencial",
    avatar: "JH",
    correo: "jose.hernandez@unermb.edu.ve",
    telefono: "+58 414-5556677"
  },
  {
    id: 11,
    nombre: "Sofía Altuve",
    cedula: "V-30.777.888",
    carrera: "Administración",
    semestre: 7,
    universidadOrigen: "UNERMB",
    localidad: "Ciudad Ojeda",
    promedio: 13.0,
    porcentajeMaterias: 55,
    servicioComunitario1: true,
    servicioComunitario2: true,
    exoneracionAprobada: true,
    modalidad: "Presencial",
    avatar: "SA",
    correo: "sofia.altuve@unermb.edu.ve",
    telefono: "+58 424-8889900"
  },
  {
    id: 12,
    nombre: "Miguel A. Rodríguez",
    cedula: "V-29.444.333",
    carrera: "Ingeniería Civil",
    semestre: 7,
    universidadOrigen: "Universidad Local",
    localidad: "Cabimas",
    promedio: 11.8,
    porcentajeMaterias: 62,
    servicioComunitario1: true,
    servicioComunitario2: false,
    exoneracionAprobada: true,
    modalidad: "Presencial",
    avatar: "MA",
    correo: "miguel.rodriguez@unermb.edu.ve",
    telefono: "+58 412-4443322"
  },
  {
    id: 13,
    nombre: "Oriana Zambrano",
    cedula: "V-31.222.333",
    carrera: "Psicología",
    semestre: 8,
    universidadOrigen: "URBE",
    localidad: "Maracaibo",
    promedio: 16.0,
    porcentajeMaterias: 85,
    servicioComunitario1: true,
    servicioComunitario2: true,
    exoneracionAprobada: true,
    modalidad: "Presencial",
    avatar: "OZ",
    correo: "oriana.zambrano@urbe.edu.ve",
    telefono: "+58 414-2223344"
  },
  {
    id: 14,
    nombre: "Ricardo Montilla",
    cedula: "V-28.666.777",
    carrera: "Ingeniería Electricista",
    semestre: 9,
    universidadOrigen: "Universidad Local",
    localidad: "Cabimas",
    promedio: 14.5,
    porcentajeMaterias: 76,
    servicioComunitario1: true,
    servicioComunitario2: true,
    exoneracionAprobada: true,
    modalidad: "Presencial",
    avatar: "RM",
    correo: "ricardo.montilla@unermb.edu.ve",
    telefono: "+58 416-6665544"
  },
  {
    id: 15,
    nombre: "Adriana Lucena",
    cedula: "V-30.111.999",
    carrera: "Enfermería",
    semestre: 6,
    universidadOrigen: "Universidad Local",
    localidad: "Ciudad Ojeda",
    promedio: 12.5,
    porcentajeMaterias: 48,
    servicioComunitario1: false,
    servicioComunitario2: true,
    exoneracionAprobada: true,
    modalidad: "Presencial",
    avatar: "AL",
    correo: "adriana.lucena@unermb.edu.ve",
    telefono: "+58 424-1110099"
  },
  {
    id: 16,
    nombre: "Samuel Dávila",
    cedula: "V-29.555.444",
    carrera: "Ingeniería en Computación",
    semestre: 8,
    universidadOrigen: "Universidad Local",
    localidad: "Cabimas",
    promedio: 15.2,
    porcentajeMaterias: 80,
    servicioComunitario1: true,
    servicioComunitario2: true,
    exoneracionAprobada: true,
    modalidad: "Presencial",
    avatar: "SD",
    correo: "samuel.davila@unermb.edu.ve",
    telefono: "+58 412-5554433"
  },
  {
    id: 17,
    nombre: "Valeria Cedeño",
    cedula: "V-31.888.777",
    carrera: "Arquitectura",
    semestre: 7,
    universidadOrigen: "UNET",
    localidad: "Maracaibo",
    promedio: 13.8,
    porcentajeMaterias: 62,
    servicioComunitario1: true,
    servicioComunitario2: true,
    exoneracionAprobada: false,
    modalidad: "Presencial",
    avatar: "VC",
    correo: "valeria.cedeno@unet.edu.ve",
    telefono: "+58 414-8887766"
  },
  {
    id: 18,
    nombre: "Fernando Rincón",
    cedula: "V-28.333.222",
    carrera: "Ingeniería Industrial",
    semestre: 7,
    universidadOrigen: "Universidad Local",
    localidad: "Cabimas",
    promedio: 12.0,
    porcentajeMaterias: 50,
    servicioComunitario1: true,
    servicioComunitario2: true,
    exoneracionAprobada: true,
    modalidad: "Presencial",
    avatar: "FR",
    correo: "fernando.rincon@unermb.edu.ve",
    telefono: "+58 416-3332211"
  },
  {
    id: 19,
    nombre: "Mariangélica Páez",
    cedula: "V-30.999.111",
    carrera: "Contaduría Pública",
    semestre: 7,
    universidadOrigen: "Universidad Local",
    localidad: "Cabimas",
    promedio: 11.5,
    porcentajeMaterias: 70,
    servicioComunitario1: true,
    servicioComunitario2: true,
    exoneracionAprobada: true,
    modalidad: "Presencial",
    avatar: "MP",
    correo: "mariangelica.paez@unermb.edu.ve",
    telefono: "+58 424-9991122"
  },
  {
    id: 20,
    nombre: "Leonardo Fuenmayor",
    cedula: "V-27.111.333",
    carrera: "Ingeniería de Petróleo",
    semestre: 10,
    universidadOrigen: "LUZ",
    localidad: "Cabimas",
    promedio: 16.8,
    porcentajeMaterias: 88,
    servicioComunitario1: true,
    servicioComunitario2: true,
    exoneracionAprobada: true,
    modalidad: "Presencial",
    avatar: "LF",
    correo: "leonardo.fuenmayor@luz.edu.ve",
    telefono: "+58 412-1113355"
  }
];

const COMPANIES = [
  { id: 1, name: "PDVSA Exploración y Producción", location: "Cabimas", sector: "Petróleo y Energía" },
  { id: 2, name: "Complejo Petroquímico El Tablazo", location: "Tía Juana", sector: "Petroquímica" },
  { id: 3, name: "Bancamiga Banco Universal", location: "Maracaibo", sector: "Banca y Finanzas" },
  { id: 4, name: "C.A. La Electricidad de la Costa", location: "Ciudad Ojeda", sector: "Servicios Públicos" },
  { id: 5, name: "Tecnología y Software Zuliano C.A.", location: "Cabimas", sector: "Tecnología" }
];

const TUTORS = [
  { id: 1, name: "Prof. Dr. Humberto Chacín", department: "Ingeniería en Computación" },
  { id: 2, name: "Dra. Carmen Teresa Silva", department: "Ciencias Administrativas" },
  { id: 3, name: "Ing. Reinaldo Villalobos", department: "Ingeniería Industrial" },
  { id: 4, name: "Dra. Yolanda Bermúdez", department: "Ingeniería de Petróleo" }
];

const INITIAL_APPLICATIONS = [
  { id: "SOL-2026-001", estudiante: "Alejandro Silva", carrera: "Ingeniería en Computación", fecha: "2026-02-10", empresaDeseada: "PDVSA Exploración y Producción", estado: "Aprobada", observaciones: "Requisitos completados 100%" },
  { id: "SOL-2026-002", estudiante: "Mariana Rivas", carrera: "Administración", fecha: "2026-02-12", empresaDeseada: "Bancamiga Banco Universal", estado: "Rechazada", observaciones: "Falta Servicio Comunitario Fase I/II" },
  { id: "SOL-2026-003", estudiante: "Carlos Mendoza", carrera: "Ingeniería Industrial", fecha: "2026-02-14", empresaDeseada: "Complejo Petroquímico El Tablazo", estado: "En Revisión", observaciones: "Pendiente confirmación de exoneración" },
  { id: "SOL-2026-004", estudiante: "Valeria Gómez", carrera: "Contaduría Pública", fecha: "2026-02-15", empresaDeseada: "Tecnología y Software Zuliano C.A.", estado: "En Revisión", observaciones: "Documentos cargados recientemente" },
  { id: "SOL-2026-005", estudiante: "Jesús Pérez", carrera: "Ingeniería de Petróleo", fecha: "2026-02-16", empresaDeseada: "PDVSA Exploración y Producción", estado: "Aprobada", observaciones: "Asignación prioritaria por excelencia académica" }
];

const INITIAL_ASSIGNMENTS = [
  { id: "ASIG-101", estudiante: "Alejandro Silva", carrera: "Ingeniería en Computación", empresa: "PDVSA Exploración y Producción", tutorAcademico: "Prof. Dr. Humberto Chacín", fechaInicio: "01/03/2026", fechaFin: "30/06/2026", estado: "Activa" },
  { id: "ASIG-102", estudiante: "Jesús Pérez", carrera: "Ingeniería de Petróleo", empresa: "PDVSA Exploración y Producción", tutorAcademico: "Dra. Yolanda Bermúdez", fechaInicio: "01/03/2026", fechaFin: "30/06/2026", estado: "Activa" },
  { id: "ASIG-103", estudiante: "Luisana Blanco", carrera: "Ingeniería Mecánica", empresa: "Complejo Petroquímico El Tablazo", tutorAcademico: "Ing. Reinaldo Villalobos", fechaInicio: "15/03/2026", fechaFin: "15/07/2026", estado: "Pendiente Convenio" },
  { id: "ASIG-104", estudiante: "Samuel Dávila", carrera: "Ingeniería en Computación", empresa: "Tecnología y Software Zuliano C.A.", tutorAcademico: "Prof. Dr. Humberto Chacín", fechaInicio: "01/03/2026", fechaFin: "30/06/2026", estado: "Activa" }
];

const INITIAL_DOCUMENTS = [
  { id: 1, codigo: "DOC-01", titulo: "Carta de Postulación de Pasantía", tipo: "Formato Oficial PDF", peso: "1.2 MB", descargas: 142, estado: "Vigente" },
  { id: 2, codigo: "DOC-02", titulo: "Reglamento Interno de Pasantías UNERMB", tipo: "Normativa General", peso: "3.5 MB", descargas: 389, estado: "Vigente" },
  { id: 3, codigo: "DOC-03", titulo: "Planilla de Registro de Servicio Comunitario", tipo: "Formulario", peso: "850 KB", descargas: 215, estado: "Vigente" },
  { id: 4, codigo: "DOC-04", titulo: "Modelo de Informe Final de Pasantías", tipo: "Plantilla Word / PDF", peso: "2.1 MB", descargas: 510, estado: "Vigente" },
  { id: 5, codigo: "DOC-05", titulo: "Convenio Marco Universidad-Empresa", tipo: "Legal", peso: "4.8 MB", descargas: 88, estado: "Actualizado" }
];

// ==========================================
// ELIGIBILITY EVALUATION ENGINE
// ==========================================
function evaluateStudent(s) {
  let missing = [];
  if (s.porcentajeMaterias < 50) missing.push("Aprobar al menos el 50% de las materias");
  if (s.promedio < 12) missing.push("Elevar promedio a 12 o más");
  if (!s.servicioComunitario1) missing.push("Culminar y aprobar Servicio Comunitario Fase I");
  if (!s.servicioComunitario2) missing.push("Culminar y aprobar Servicio Comunitario Fase II");
  if (s.universidadOrigen !== 'Universidad Local' && !s.exoneracionAprobada) missing.push("Cargar constancia de exoneración");
  const validLocalities = ['Cabimas', 'Ciudad Ojeda', 'Lagunillas', 'Tía Juana', 'Maracaibo'];
  if (!validLocalities.includes(s.localidad)) missing.push("Verificar residencia dentro de la localidad universitaria");
  if (s.modalidad !== 'Presencial') missing.push("Confirmar modalidad presencial");

  let status = missing.length === 0 ? 'Elegible' : (s.promedio >= 10 && s.porcentajeMaterias >= 40 ? 'Pendiente' : 'No elegible');
  return { status, missing, passedCount: 7 - missing.length };
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('resumen');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    carrera: 'Todas',
    estado: 'Todos',
    universidad: 'Todas',
    localidad: 'Todas',
    modalidad: 'Todas'
  });
  const [students, setStudents] = useState(INITIAL_STUDENTS);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [activeDrawerStudent, setActiveDrawerStudent] = useState(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [assignedCount, setAssignedCount] = useState(8);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const evaluatedStudents = useMemo(() => {
    return students.map(s => {
      const evalRes = evaluateStudent(s);
      return { ...s, ...evalRes };
    });
  }, [students]);

  const filteredStudents = useMemo(() => {
    return evaluatedStudents.filter(s => {
      const matchesSearch = s.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            s.cedula.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            s.carrera.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCarrera = filters.carrera === 'Todas' || s.carrera === filters.carrera;
      const matchesEstado = filters.estado === 'Todos' || s.status === filters.estado;
      const matchesUniv = filters.universidad === 'Todas' || s.universidadOrigen === filters.universidad;
      const matchesLoc = filters.localidad === 'Todas' || s.localidad === filters.localidad;
      const matchesMod = filters.modalidad === 'Todas' || s.modalidad === filters.modalidad;
      return matchesSearch && matchesCarrera && matchesEstado && matchesUniv && matchesLoc && matchesMod;
    });
  }, [evaluatedStudents, searchQuery, filters]);

  const kpis = useMemo(() => {
    const elegibles = evaluatedStudents.filter(s => s.status === 'Elegible').length;
    const pendientes = evaluatedStudents.filter(s => s.status === 'Pendiente').length;
    const noElegibles = evaluatedStudents.filter(s => s.status === 'No elegible').length;
    return { elegibles, pendientes, assigned: assignedCount, noElegibles };
  }, [evaluatedStudents, assignedCount]);

  const uniqueCareers = useMemo(() => ['Todas', ...new Set(evaluatedStudents.map(s => s.carrera))], [evaluatedStudents]);
  const uniqueLocalities = useMemo(() => ['Todas', ...new Set(evaluatedStudents.map(s => s.localidad))], [evaluatedStudents]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans flex transition-colors duration-200">
      
      {/* SIDEBAR */}
      <aside className={`fixed inset-y-0 left-0 z-40 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 flex flex-col ${sidebarCollapsed ? 'w-20' : 'w-64'}`}>
        <div className="p-5 flex items-center justify-between border-b border-slate-100 dark:border-slate-800">
          {!sidebarCollapsed ? (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-indigo-200 dark:shadow-none">
                UN
              </div>
              <div>
                <h1 className="font-bold text-sm tracking-tight leading-tight">UNERMB Pasantías</h1>
                <p className="text-xs text-slate-400 dark:text-slate-500">Coordinación Académica</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 mx-auto rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
              UN
            </div>
          )}
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {[
            { id: 'resumen', label: 'Resumen general', icon: 'dashboard' },
            { id: 'estudiantes', label: 'Estudiantes', icon: 'users' },
            { id: 'requisitos', label: 'Verificación Requisitos', icon: 'award' },
            { id: 'solicitudes', label: 'Solicitudes', icon: 'fileText' },
            { id: 'empresas', label: 'Empresas / Centros', icon: 'building' },
            { id: 'asignaciones', label: 'Asignaciones', icon: 'briefcase' },
            { id: 'documentos', label: 'Documentos', icon: 'folder' },
            { id: 'reportes', label: 'Reportes', icon: 'barChart' },
            { id: 'configuracion', label: 'Configuración', icon: 'settings' },
          ].map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-3 rounded-xl text-sm font-medium transition-all group relative ${
                  isActive 
                    ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 font-semibold shadow-sm' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                }`}
              >
                <Icon name={item.icon} className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-400 dark:text-slate-500 group-hover:text-slate-600'}`} />
                {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                {sidebarCollapsed && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-slate-900 text-white text-xs rounded shadow-md opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        <div className="p-3 border-t border-slate-100 dark:border-slate-800">
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition"
          >
            <Icon name={sidebarCollapsed ? 'chevronRight' : 'chevronLeft'} className="w-4 h-4" />
            {!sidebarCollapsed && <span>Colapsar menú</span>}
          </button>
        </div>
      </aside>

      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'}`}>
        
        <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1 max-w-xl">
            <div className="relative w-full">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                <Icon name="search" className="w-4 h-4" />
              </span>
              <input 
                type="text"
                placeholder="Buscar por nombre, cédula, carrera o código..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-100 dark:bg-slate-800/60 border border-transparent focus:border-indigo-500 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
              />
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition"
              title="Cambiar modo"
            >
              <Icon name={darkMode ? 'sun' : 'moon'} className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setIsAssignModalOpen(true)}
              className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold shadow-sm transition active:scale-95"
            >
              <Icon name="plus" className="w-4 h-4" />
              <span className="hidden sm:inline">Asignar práctica</span>
            </button>

            <div className="flex items-center space-x-3 pl-2 border-l border-slate-200 dark:border-slate-800">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-500 text-white flex items-center justify-center font-bold text-sm shadow">
                CO
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-semibold leading-none">Coordinación</p>
                <p className="text-[11px] text-slate-400 mt-0.5">Pasantías 2026-I</p>
              </div>
            </div>
          </div>
        </header>

        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-xl shadow-xl flex items-center space-x-3 border border-slate-800 animate-bounce">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
              <Icon name="check" className="w-4 h-4" />
            </div>
            <span className="text-sm font-medium">{toastMessage}</span>
          </div>
        )}

        <main className="flex-1 p-6 space-y-6 max-w-7xl mx-auto w-full">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
                {activeTab === 'resumen' && 'Resumen General y Estadísticas'}
                {activeTab === 'estudiantes' && 'Gestión de Estudiantes'}
                {activeTab === 'requisitos' && 'Verificación de Requisitos Académicos'}
                {activeTab === 'solicitudes' && 'Bandeja de Solicitudes'}
                {activeTab === 'empresas' && 'Centros de Práctica y Empresas'}
                {activeTab === 'asignaciones' && 'Asignaciones Activas'}
                {activeTab === 'documentos' && 'Repositorio de Documentos'}
                {activeTab === 'reportes' && 'Reportes y Analítica'}
                {activeTab === 'configuracion' && 'Configuración del Sistema'}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                Universidad Nacional Experimental "Rafael María Baralt" (UNERMB) — Módulo de Pasantías
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center space-x-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-xs font-medium shadow-sm">
                <Icon name="filter" className="w-3.5 h-3.5 text-slate-400" />
                <span>Carrera:</span>
                <select 
                  value={filters.carrera} 
                  onChange={(e) => setFilters({...filters, carrera: e.target.value})}
                  className="bg-transparent font-semibold text-indigo-600 dark:text-indigo-400 focus:outline-none cursor-pointer"
                >
                  {uniqueCareers.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="flex items-center space-x-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-xs font-medium shadow-sm">
                <span>Estado:</span>
                <select 
                  value={filters.estado} 
                  onChange={(e) => setFilters({...filters, estado: e.target.value})}
                  className="bg-transparent font-semibold text-indigo-600 dark:text-indigo-400 focus:outline-none cursor-pointer"
                >
                  <option value="Todos">Todos</option>
                  <option value="Elegible">Elegibles</option>
                  <option value="Pendiente">Pendientes</option>
                  <option value="No elegible">No elegibles</option>
                </select>
              </div>

              <div className="flex items-center space-x-1.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-2 rounded-xl text-xs font-medium shadow-sm">
                <span>Localidad:</span>
                <select 
                  value={filters.localidad} 
                  onChange={(e) => setFilters({...filters, localidad: e.target.value})}
                  className="bg-transparent font-semibold text-indigo-600 dark:text-indigo-400 focus:outline-none cursor-pointer"
                >
                  {uniqueLocalities.map(l => <option key={l} value={l}>{l}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm relative overflow-hidden group hover:border-emerald-500/50 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Estudiantes Elegibles</span>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <Icon name="checkCircle" className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <div className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {kpis.elegibles}
                </div>
                <div className="flex items-center space-x-1 text-xs font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                  <Icon name="trendingUp" className="w-3 h-3" />
                  <span>+14% vs previa</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Cumplen 100% requisitos</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm relative overflow-hidden group hover:border-amber-500/50 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Solicitudes Pendientes</span>
                <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Icon name="clock" className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <div className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {kpis.pendientes}
                </div>
                <div className="flex items-center space-x-1 text-xs font-medium text-amber-600 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full">
                  <span>En revisión</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Requieren validación</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm relative overflow-hidden group hover:border-indigo-500/50 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Prácticas Asignadas</span>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <Icon name="briefcase" className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <div className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {kpis.assigned}
                </div>
                <div className="flex items-center space-x-1 text-xs font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-950/40 px-2 py-0.5 rounded-full">
                  <Icon name="trendingUp" className="w-3 h-3" />
                  <span>Activas 2026-I</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Con tutor asignado</p>
            </div>

            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm relative overflow-hidden group hover:border-rose-500/50 transition">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Estudiantes No Elegibles</span>
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <Icon name="xCircle" className="w-5 h-5" />
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <div className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                  {kpis.noElegibles}
                </div>
                <div className="flex items-center space-x-1 text-xs font-medium text-rose-600 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full">
                  <span>Con observaciones</span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Faltan requisitos críticos</p>
            </div>

          </div>

          {activeTab === 'resumen' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm lg:col-span-2 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">Estudiantes Elegibles por Carrera</h3>
                    <span className="text-xs font-medium text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 px-2.5 py-1 rounded-lg">Periodo 2026-I</span>
                  </div>
                  <p className="text-xs text-slate-500 mb-6">Comparativa de candidatos listos para pasantía profesional según su programa de estudios.</p>
                </div>
                
                <div className="space-y-4 my-2">
                  {[
                    { carrera: 'Ingeniería en Computación', count: 6, color: 'bg-indigo-600' },
                    { carrera: 'Ingeniería de Petróleo', count: 4, color: 'bg-indigo-500' },
                    { carrera: 'Administración', count: 2, color: 'bg-indigo-400' },
                    { carrera: 'Ingeniería Industrial', count: 2, color: 'bg-violet-500' },
                    { carrera: 'Psicología', count: 1, color: 'bg-violet-400' },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium">
                        <span className="text-slate-700 dark:text-slate-300">{item.carrera}</span>
                        <span className="font-bold text-slate-900 dark:text-white">{item.count} elegibles</span>
                      </div>
                      <div className="w-full h-3 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${item.color} rounded-full transition-all duration-500`}
                          style={{ width: `${(item.count / 6) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">Universidad de Origen</h3>
                  <p className="text-xs text-slate-500 mb-4">Proporción de estudiantes locales vs transferidos.</p>
                </div>

                <div className="space-y-4 my-auto">
                  {[
                    { label: 'Universidad Local (UNERMB)', pct: 75, count: 15, color: 'bg-indigo-600' },
                    { label: 'LUZ', pct: 15, count: 3, color: 'bg-emerald-500' },
                    { label: 'URBE / Otras', pct: 10, count: 2, color: 'bg-amber-500' },
                  ].map((u, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${u.color}`} />
                        <span className="text-xs font-medium text-slate-700 dark:text-slate-300">{u.label}</span>
                      </div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">{u.count} ({u.pct}%)</span>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
                  <span className="text-xs text-slate-400">Total evaluados: 20 estudiantes</span>
                </div>
              </div>

            </div>
          )}

          {activeTab === 'estudiantes' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Directorio y Expedientes de Estudiantes</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Gestión de contactos, universidad de origen y datos académicos</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => {
                      const csvContent = "data:text/csv;charset=utf-8," + 
                        ["Cedula,Nombre,Carrera,Correo,Telefono,Modalidad"].join(",") + "\n" +
                        filteredStudents.map(s => `${s.cedula},"${s.nombre}","${s.carrera}","${s.correo}","${s.telefono}","${s.modalidad}"`).join("\n");
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", "directorio_estudiantes.csv");
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      showToast("Exportando listado completo de estudiantes...");
                    }}
                    className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition"
                  >
                    <Icon name="download" className="w-3.5 h-3.5" />
                    <span>Exportar Matrícula</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
                      <th className="py-3 px-4">Estudiante</th>
                      <th className="py-3 px-4">Contacto</th>
                      <th className="py-3 px-4">Carrera / Semestre</th>
                      <th className="py-3 px-4">Universidad Origen</th>
                      <th className="py-3 px-4">Localidad</th>
                      <th className="py-3 px-4">Modalidad</th>
                      <th className="py-3 px-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredStudents.map((s) => (
                      <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                        <td className="py-3.5 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                              {s.avatar}
                            </div>
                            <div>
                              <p className="font-bold text-slate-900 dark:text-white">{s.nombre}</p>
                              <p className="text-[11px] text-slate-400">{s.cedula}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="text-slate-800 dark:text-slate-200">{s.correo}</p>
                          <p className="text-[11px] text-slate-400">{s.telefono}</p>
                        </td>
                        <td className="py-3.5 px-4">
                          <p className="font-medium text-slate-800 dark:text-slate-200">{s.carrera}</p>
                          <p className="text-[11px] text-slate-400">Semestre {s.semestre}</p>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-slate-700 dark:text-slate-300">
                          {s.universidadOrigen}
                        </td>
                        <td className="py-3.5 px-4">{s.localidad}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${s.modalidad === 'Presencial' ? 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300' : 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'}`}>
                            {s.modalidad}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button 
                            onClick={() => setActiveDrawerStudent(s)}
                            className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-400 rounded-lg font-semibold transition"
                          >
                            Ver Expediente
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'requisitos' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Motor de Verificación Automática de Elegibilidad</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Evaluación estricta de las 7 condiciones reglamentarias universitarias</p>
                </div>

                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => {
                      const csvContent = "data:text/csv;charset=utf-8," + 
                        ["Cedula,Nombre,Carrera,Promedio,Estado"].join(",") + "\n" +
                        filteredStudents.map(s => `${s.cedula},"${s.nombre}","${s.carrera}",${s.promedio},${s.status}`).join("\n");
                      const encodedUri = encodeURI(csvContent);
                      const link = document.createElement("a");
                      link.setAttribute("href", encodedUri);
                      link.setAttribute("download", "elegibilidad_pasantias.csv");
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      showToast("Resultado de elegibilidad exportado en CSV");
                    }}
                    className="flex items-center space-x-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-semibold transition"
                  >
                    <Icon name="download" className="w-3.5 h-3.5" />
                    <span>Exportar Auditoría</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
                      <th className="py-3 px-4 w-10">
                        <input 
                          type="checkbox" 
                          onChange={(e) => {
                            if(e.target.checked) setSelectedStudentIds(filteredStudents.map(s => s.id));
                            else setSelectedStudentIds([]);
                          }}
                          checked={selectedStudentIds.length === filteredStudents.length && filteredStudents.length > 0}
                          className="rounded text-indigo-600 focus:ring-indigo-500"
                        />
                      </th>
                      <th className="py-3 px-4">Estudiante</th>
                      <th className="py-3 px-4">Carrera</th>
                      <th className="py-3 px-4">Promedio (≥12)</th>
                      <th className="py-3 px-4">% Materias (≥50%)</th>
                      <th className="py-3 px-4">Serv. Com. I y II</th>
                      <th className="py-3 px-4">Exoneración / Loc.</th>
                      <th className="py-3 px-4">Estado Elegibilidad</th>
                      <th className="py-3 px-4 text-right">Acciones</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredStudents.map((s) => {
                      const isSelected = selectedStudentIds.includes(s.id);
                      return (
                        <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                          <td className="py-3 px-4">
                            <input 
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {
                                if(isSelected) setSelectedStudentIds(selectedStudentIds.filter(id => id !== s.id));
                                else setSelectedStudentIds([...selectedStudentIds, s.id]);
                              }}
                              className="rounded text-indigo-600 focus:ring-indigo-500"
                            />
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                                {s.avatar}
                              </div>
                              <div>
                                <p className="font-bold text-slate-900 dark:text-white">{s.nombre}</p>
                                <p className="text-[11px] text-slate-400">{s.cedula}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-slate-800 dark:text-slate-200">{s.carrera}</p>
                          </td>
                          <td className="py-3 px-4">
                            <span className={`font-bold ${s.promedio >= 12 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                              {s.promedio} pts
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <span className="font-semibold">{s.porcentajeMaterias}%</span>
                              <div className="w-12 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                <div className={`h-full ${s.porcentajeMaterias >= 50 ? 'bg-emerald-500' : 'bg-rose-500'}`} style={{ width: `${s.porcentajeMaterias}%` }} />
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-1">
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${s.servicioComunitario1 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400' : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'}`}>
                                Fase I
                              </span>
                              <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${s.servicioComunitario2 ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400' : 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400'}`}>
                                Fase II
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <p className="font-medium text-[11px]">{s.universidadOrigen === 'Universidad Local' ? 'Interno' : (s.exoneracionAprobada ? 'Exonerado' : 'Sin Exoneración')}</p>
                            <p className="text-[10px] text-slate-400">{s.localidad}</p>
                          </td>
                          <td className="py-3 px-4">
                            {s.status === 'Elegible' && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5" />
                                Elegible
                              </span>
                            )}
                            {s.status === 'Pendiente' && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-1.5" />
                                Pendiente
                              </span>
                            )}
                            {s.status === 'No elegible' && (
                              <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mr-1.5" />
                                No elegible
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end space-x-2">
                              <button 
                                onClick={() => setActiveDrawerStudent(s)}
                                className="p-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-600 dark:text-slate-300 transition"
                                title="Ver auditoría completa"
                              >
                                <Icon name="eye" className="w-4 h-4" />
                              </button>
                              {s.status === 'Elegible' && (
                                <button 
                                  onClick={() => {
                                    setSelectedStudentIds([s.id]);
                                    setIsAssignModalOpen(true);
                                  }}
                                  className="px-2.5 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition shadow-sm"
                                >
                                  Asignar
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </div>
          )}

          {activeTab === 'solicitudes' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Bandeja de Solicitudes Recibidas</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Gestión de postulaciones y solicitudes directas de estudiantes</p>
                </div>
                <span className="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {INITIAL_APPLICATIONS.length} Solicitudes
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
                      <th className="py-3 px-4">Código</th>
                      <th className="py-3 px-4">Estudiante</th>
                      <th className="py-3 px-4">Carrera</th>
                      <th className="py-3 px-4">Empresa Solicitada</th>
                      <th className="py-3 px-4">Fecha Solicitud</th>
                      <th className="py-3 px-4">Estado</th>
                      <th className="py-3 px-4">Observaciones</th>
                      <th className="py-3 px-4 text-right">Acción</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {INITIAL_APPLICATIONS.map((sol) => (
                      <tr key={sol.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">{sol.id}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{sol.estudiante}</td>
                        <td className="py-3.5 px-4">{sol.carrera}</td>
                        <td className="py-3.5 px-4 font-medium">{sol.empresaDeseada}</td>
                        <td className="py-3.5 px-4 text-slate-400">{sol.fecha}</td>
                        <td className="py-3.5 px-4">
                          <span className={`px-2.5 py-1 rounded-full font-semibold ${
                            sol.estado === 'Aprobada' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400' :
                            sol.estado === 'Rechazada' ? 'bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-400' :
                            'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-400'
                          }`}>
                            {sol.estado}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-slate-500 max-w-xs truncate">{sol.observaciones}</td>
                        <td className="py-3.5 px-4 text-right">
                          <button 
                            onClick={() => showToast(`Solicitud ${sol.id} procesada.`)}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-slate-700 dark:text-slate-300 font-semibold transition"
                          >
                            Revisar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'empresas' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {COMPANIES.map((emp) => (
                  <div key={emp.id} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:border-indigo-500/50 transition flex flex-col justify-between">
                    <div>
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                          <Icon name="building" className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-tight">{emp.name}</h4>
                          <span className="text-[11px] text-indigo-600 dark:text-indigo-400 font-semibold">{emp.sector}</span>
                        </div>
                      </div>
                      <div className="space-y-1.5 text-xs text-slate-500 dark:text-slate-400">
                        <div className="flex items-center space-x-2">
                          <Icon name="mapPin" className="w-3.5 h-3.5 text-slate-400" />
                          <span>Ubicación: {emp.location}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Icon name="checkCircle" className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Convenio institucional vigente</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-medium">Cupos disponibles: 5</span>
                      <button 
                        onClick={() => showToast(`Convenio con ${emp.name} verificado`)}
                        className="px-3 py-1.5 bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 text-indigo-600 dark:text-indigo-400 rounded-lg text-xs font-semibold transition"
                      >
                        Ver Centro
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'asignaciones' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">Prácticas Profesionales Asignadas</h3>
                  <p className="text-xs text-slate-400 mt-0.5">Seguimiento de tutores y períodos lectivos activos</p>
                </div>
                <span className="bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full">
                  {INITIAL_ASSIGNMENTS.length} Asignaciones Activas
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50/75 dark:bg-slate-800/50 text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-800">
                      <th className="py-3 px-4">Código</th>
                      <th className="py-3 px-4">Pasante</th>
                      <th className="py-3 px-4">Carrera</th>
                      <th className="py-3 px-4">Empresa / Centro</th>
                      <th className="py-3 px-4">Tutor Académico</th>
                      <th className="py-3 px-4">Período</th>
                      <th className="py-3 px-4">Estado</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {INITIAL_ASSIGNMENTS.map((asig) => (
                      <tr key={asig.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition">
                        <td className="py-3.5 px-4 font-mono font-bold text-slate-700 dark:text-slate-300">{asig.id}</td>
                        <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white">{asig.estudiante}</td>
                        <td className="py-3.5 px-4">{asig.carrera}</td>
                        <td className="py-3.5 px-4 font-semibold text-indigo-600 dark:text-indigo-400">{asig.empresa}</td>
                        <td className="py-3.5 px-4">{asig.tutorAcademico}</td>
                        <td className="py-3.5 px-4 text-slate-500">{asig.fechaInicio} - {asig.fechaFin}</td>
                        <td className="py-3.5 px-4">
                          <span className="px-2.5 py-1 rounded-full font-semibold bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                            {asig.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'documentos' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {INITIAL_DOCUMENTS.map((doc) => (
                <div key={doc.id} className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm hover:border-indigo-500/50 transition flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-[11px] font-bold text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded">{doc.codigo}</span>
                      <span className="text-[11px] text-slate-400">{doc.peso}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-1">{doc.titulo}</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{doc.tipo}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-slate-400">{doc.descargas} descargas</span>
                    <button 
                      onClick={() => showToast(`Descargando ${doc.titulo}...`)}
                      className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-xs font-semibold text-slate-700 dark:text-slate-300 transition"
                    >
                      <Icon name="download" className="w-3.5 h-3.5" />
                      <span>Descargar</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reportes' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tasa de Elegibilidad</span>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">75.0%</p>
                  <p className="text-xs text-emerald-600 font-semibold mt-1">15 de 20 candidatos cumplen todos los requisitos</p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Promedio General Ponderado</span>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">14.1 pts</p>
                  <p className="text-xs text-indigo-600 font-semibold mt-1">Nivel académico óptimo en facultades</p>
                </div>
                <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-5 rounded-2xl shadow-sm">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Cumplimiento Serv. Comunitario</span>
                  <p className="text-3xl font-extrabold text-slate-900 dark:text-white mt-2">80.0%</p>
                  <p className="text-xs text-emerald-600 font-semibold mt-1">16 estudiantes culminaron Fase I y II</p>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Generador de Reportes Académicos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => showToast("Reporte oficial en PDF generado.")}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition text-left"
                  >
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">Reporte de Asignaciones Periodo 2026-I</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Incluye tutores empresariales y académicos asignados</p>
                    </div>
                    <Icon name="download" className="w-5 h-5 text-indigo-600" />
                  </button>
                  <button 
                    onClick={() => showToast("Consolidado de elegibilidad exportado.")}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition text-left"
                  >
                    <div>
                      <h4 className="font-bold text-xs text-slate-900 dark:text-white">Consolidado de Elegibilidad por Carrera</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">Desglose de los 7 criterios automáticos de validación</p>
                    </div>
                    <Icon name="download" className="w-5 h-5 text-indigo-600" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'configuracion' && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-6 rounded-2xl shadow-sm space-y-6">
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Parámetros del Motor de Elegibilidad</h3>
                <p className="text-xs text-slate-400 mt-0.5">Configuración de criterios automáticos de aprobación de prácticas</p>
              </div>

              <div className="space-y-4 max-w-xl">
                <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                  <div>
                    <p className="font-semibold text-xs text-slate-900 dark:text-white">Porcentaje mínimo de materias aprobadas</p>
                    <p className="text-[11px] text-slate-400">Requisito obligatorio para postulaciones</p>
                  </div>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">50%</span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                  <div>
                    <p className="font-semibold text-xs text-slate-900 dark:text-white">Promedio mínimo ponderado</p>
                    <p className="text-[11px] text-slate-400">Escala de calificación de 0 a 20 puntos</p>
                  </div>
                  <span className="font-bold text-indigo-600 dark:text-indigo-400 text-sm">12.0 pts</span>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                  <div>
                    <p className="font-semibold text-xs text-slate-900 dark:text-white">Exigir Servicio Comunitario Fase I y II</p>
                    <p className="text-[11px] text-slate-400">Validación obligatoria por ley universitaria</p>
                  </div>
                  <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 rounded-lg text-xs font-bold">Activo</span>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button 
                    onClick={() => showToast("Configuración guardada correctamente.")}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-semibold hover:bg-indigo-700 transition"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          )}

        </main>
      </div>

      {activeDrawerStudent && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-200">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold text-base shadow">
                    {activeDrawerStudent.avatar}
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-white">{activeDrawerStudent.nombre}</h3>
                    <p className="text-xs text-slate-400">{activeDrawerStudent.cedula}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setActiveDrawerStudent(null)}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white"
                >
                  <Icon name="x" className="w-5 h-5" />
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Información Académica</h4>
                  <div className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl space-y-2 text-xs">
                    <div className="flex justify-between"><span className="text-slate-500">Carrera:</span><span className="font-semibold text-slate-900 dark:text-white">{activeDrawerStudent.carrera}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Semestre:</span><span className="font-semibold text-slate-900 dark:text-white">{activeDrawerStudent.semestre}</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Promedio Ponderado:</span><span className="font-semibold text-slate-900 dark:text-white">{activeDrawerStudent.promedio} / 20</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Materias Aprobadas:</span><span className="font-semibold text-slate-900 dark:text-white">{activeDrawerStudent.porcentajeMaterias}%</span></div>
                    <div className="flex justify-between"><span className="text-slate-500">Universidad Origen:</span><span className="font-semibold text-slate-900 dark:text-white">{activeDrawerStudent.universidadOrigen}</span></div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Verificación de 7 Reglas Automáticas</h4>
                  <div className="space-y-2 text-xs">
                    {[
                      { label: '≥ 50% de materias aprobadas', passed: activeDrawerStudent.porcentajeMaterias >= 50 },
                      { label: 'Promedio académico ≥ 12.0', passed: activeDrawerStudent.promedio >= 12 },
                      { label: 'Servicio Comunitario Fase I', passed: activeDrawerStudent.servicioComunitario1 },
                      { label: 'Servicio Comunitario Fase II', passed: activeDrawerStudent.servicioComunitario2 },
                      { label: 'Exoneración registrada (si aplica)', passed: activeDrawerStudent.universidadOrigen === 'Universidad Local' || activeDrawerStudent.exoneracionAprobada },
                      { label: 'Residencia en localidad universitaria', passed: ['Cabimas', 'Ciudad Ojeda', 'Lagunillas', 'Tía Juana', 'Maracaibo'].includes(activeDrawerStudent.localidad) },
                      { label: 'Modalidad presencial confirmada', passed: activeDrawerStudent.modalidad === 'Presencial' },
                    ].map((rule, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl">
                        <span className="text-slate-700 dark:text-slate-300">{rule.label}</span>
                        {rule.passed ? (
                          <span className="flex items-center text-emerald-600 font-semibold space-x-1"><Icon name="check" className="w-3.5 h-3.5"/><span>Cumple</span></span>
                        ) : (
                          <span className="flex items-center text-rose-600 font-semibold space-x-1"><Icon name="x" className="w-3.5 h-3.5"/><span>Falta</span></span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {activeDrawerStudent.missing && activeDrawerStudent.missing.length > 0 && (
                  <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl">
                    <h5 className="text-xs font-bold text-rose-800 dark:text-rose-300 mb-1">Recomendaciones del sistema:</h5>
                    <ul className="list-disc list-inside text-xs text-rose-700 dark:text-rose-400 space-y-1">
                      {activeDrawerStudent.missing.map((m, i) => <li key={i}>{m}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex space-x-3">
              <button 
                onClick={() => setActiveDrawerStudent(null)}
                className="w-full py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl text-xs transition"
              >
                Cerrar expediente
              </button>
            </div>
          </div>
        </div>
      )}

      {isAssignModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Asignación de Práctica Profesional</h3>
              <button onClick={() => setIsAssignModalOpen(false)} className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white">
                <Icon name="x" className="w-5 h-5" />
              </button>
            </div>

            <div className="py-6 space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Estudiante(s) Seleccionado(s)</label>
                <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                  {selectedStudentIds.length > 0 
                    ? `${selectedStudentIds.length} estudiante(s) elegible(s) seleccionado(s) para asignación`
                    : 'Ningún estudiante seleccionado (Se asignará al primer candidato elegible disponible)'}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Empresa / Centro de Práctica</label>
                <select className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500">
                  {COMPANIES.map(c => <option key={c.id} value={c.name}>{c.name} — {c.location} ({c.sector})</option>)}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Tutor Académico</label>
                  <select className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm">
                    {TUTORS.map(t => <option key={t.id} value={t.name}>{t.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Período Académico</label>
                  <input type="text" disabled value="2026-I (Marzo - Julio)" className="w-full p-3 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-500 cursor-not-allowed" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Horario y Modalidad</label>
                <input type="text" defaultValue="Lunes a Viernes 8:00 AM - 3:00 PM (Presencial)" className="w-full p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm" />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end space-x-3">
              <button 
                onClick={() => setIsAssignModalOpen(false)}
                className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl text-xs font-semibold transition"
              >
                Cancelar
              </button>
              <button 
                onClick={() => {
                  setAssignedCount(prev => prev + (selectedStudentIds.length > 0 ? selectedStudentIds.length : 1));
                  setIsAssignModalOpen(false);
                  showToast("¡Práctica asignada con éxito! KPIs actualizados.");
                  setSelectedStudentIds([]);
                }}
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold transition shadow-md"
              >
                Confirmar Asignación
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}