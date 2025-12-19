// Datos de clientes y mascotas para la veterinaria "Cuidado Animal"

export const clientes = [
  { id: 1, nombre: 'María González', telefono: '+56912345678', direccion: 'Av. Principal 123, Santiago' },
  { id: 2, nombre: 'Carlos Rodríguez', telefono: '+56987654321', direccion: 'Calle Los Robles 456, Providencia' },
  { id: 3, nombre: 'Ana Martínez', telefono: '+56911223344', direccion: 'Pasaje Las Flores 789, Ñuñoa' },
  { id: 4, nombre: 'Pedro Sánchez', telefono: '+56922334455', direccion: 'Av. Libertador 321, Las Condes' },
  { id: 5, nombre: 'Laura Fernández', telefono: '+56933445566', direccion: 'Calle San Martín 654, Maipú' },
  { id: 6, nombre: 'Diego Torres', telefono: '+56944556677', direccion: 'Av. Grecia 987, Peñalolén' },
  { id: 7, nombre: 'Carmen Silva', telefono: '+56955667788', direccion: 'Calle Arturo Prat 147, La Florida' },
  { id: 8, nombre: 'Roberto Muñoz', telefono: '+56966778899', direccion: 'Pasaje Los Cerezos 258, Vitacura' },
];

export const mascotas = [
  { id: 1, nombre: 'Max', especie: 'Perro', raza: 'Golden Retriever', edad: 3, duenoId: 1 },
  { id: 2, nombre: 'Luna', especie: 'Gato', raza: 'Siamés', edad: 2, duenoId: 1 },
  { id: 3, nombre: 'Rocky', especie: 'Perro', raza: 'Bulldog', edad: 5, duenoId: 2 },
  { id: 4, nombre: 'Michi', especie: 'Gato', raza: 'Persa', edad: 1, duenoId: 3 },
  { id: 5, nombre: 'Toby', especie: 'Perro', raza: 'Beagle', edad: 4, duenoId: 4 },
  { id: 6, nombre: 'Pelusa', especie: 'Gato', raza: 'Angora', edad: 3, duenoId: 5 },
  { id: 7, nombre: 'Bruno', especie: 'Perro', raza: 'Pastor Alemán', edad: 6, duenoId: 6 },
  { id: 8, nombre: 'Whiskers', especie: 'Gato', raza: 'Maine Coon', edad: 2, duenoId: 7 },
  { id: 9, nombre: 'Lola', especie: 'Perro', raza: 'Chihuahua', edad: 2, duenoId: 8 },
  { id: 10, nombre: 'Simba', especie: 'Gato', raza: 'Común Europeo', edad: 4, duenoId: 8 },
];

// Historial médico detallado de las mascotas
export const historialMedico = {
  1: { 
    mascotaId: 1, 
    vacunas: 'Rabia, Parvovirus, Moquillo',
    alergias: 'Ninguna conocida',
    cirugias: 'Ninguna',
    medicamentos: 'Antiparasitario mensual',
    ultimaVisita: '2025-11-15',
    peso: '30 kg',
    observaciones: 'Mascota saludable, muy activa'
  },
  2: { 
    mascotaId: 2, 
    vacunas: 'Triple felina, Rabia',
    alergias: 'Polen',
    cirugias: 'Esterilización (2024)',
    medicamentos: 'Ninguno',
    ultimaVisita: '2025-10-20',
    peso: '4 kg',
    observaciones: 'Requiere control de peso'
  },
  3: { 
    mascotaId: 3, 
    vacunas: 'Rabia, Parvovirus, Moquillo, Leptospirosis',
    alergias: 'Pollo',
    cirugias: 'Ninguna',
    medicamentos: 'Dieta hipoalergénica',
    ultimaVisita: '2025-12-01',
    peso: '25 kg',
    observaciones: 'Problemas respiratorios leves debido a la raza'
  },
  4: { 
    mascotaId: 4, 
    vacunas: 'Triple felina, Rabia, Leucemia felina',
    alergias: 'Ninguna conocida',
    cirugias: 'Ninguna',
    medicamentos: 'Ninguno',
    ultimaVisita: '2025-11-28',
    peso: '3.5 kg',
    observaciones: 'Gatita joven, muy saludable'
  },
  5: { 
    mascotaId: 5, 
    vacunas: 'Rabia, Parvovirus, Moquillo',
    alergias: 'Ninguna conocida',
    cirugias: 'Extracción dental (2023)',
    medicamentos: 'Antiparasitario',
    ultimaVisita: '2025-11-10',
    peso: '12 kg',
    observaciones: 'Requiere limpieza dental anual'
  },
  6: { 
    mascotaId: 6, 
    vacunas: 'Triple felina, Rabia',
    alergias: 'Ninguna conocida',
    cirugias: 'Esterilización (2023)',
    medicamentos: 'Ninguno',
    ultimaVisita: '2025-12-05',
    peso: '5 kg',
    observaciones: 'Pelo largo, requiere cepillado frecuente'
  },
  7: { 
    mascotaId: 7, 
    vacunas: 'Rabia, Parvovirus, Moquillo, Leptospirosis',
    alergias: 'Ninguna conocida',
    cirugias: 'Ninguna',
    medicamentos: 'Suplemento articular',
    ultimaVisita: '2025-11-25',
    peso: '35 kg',
    observaciones: 'Displasia leve de cadera, control semestral'
  },
  8: { 
    mascotaId: 8, 
    vacunas: 'Triple felina, Rabia, Leucemia felina',
    alergias: 'Ninguna conocida',
    cirugias: 'Ninguna',
    medicamentos: 'Ninguno',
    ultimaVisita: '2025-12-10',
    peso: '7 kg',
    observaciones: 'Raza grande, monitoreo de crecimiento'
  },
  9: { 
    mascotaId: 9, 
    vacunas: 'Rabia, Parvovirus, Moquillo',
    alergias: 'Ninguna conocida',
    cirugias: 'Castración (2024)',
    medicamentos: 'Ninguno',
    ultimaVisita: '2025-11-30',
    peso: '2.5 kg',
    observaciones: 'Raza toy, cuidado especial con temperatura'
  },
  10: { 
    mascotaId: 10, 
    vacunas: 'Triple felina, Rabia',
    alergias: 'Ninguna conocida',
    cirugias: 'Ninguna',
    medicamentos: 'Ninguno',
    ultimaVisita: '2025-12-08',
    peso: '5.5 kg',
    observaciones: 'Gato adulto sano'
  },
};

// Veterinarios disponibles
export const veterinarios = [
  { id: 1, nombre: 'Dra. Patricia López', especialidad: 'Medicina General' },
  { id: 2, nombre: 'Dr. Andrés Morales', especialidad: 'Cirugía' },
  { id: 3, nombre: 'Dra. Isabel Vargas', especialidad: 'Dermatología' },
  { id: 4, nombre: 'Dr. Fernando Castro', especialidad: 'Medicina General' },
];

// Citas agendadas por día (máximo 8 por día)
export const citasPorDia = {
  '2025-12-18': [
    { id: 1, veterinarioId: 1, mascotaId: 1, hora: '09:00', motivo: 'Control rutinario' },
    { id: 2, veterinarioId: 2, mascotaId: 3, hora: '10:00', motivo: 'Revisión respiratoria' },
    { id: 3, veterinarioId: 1, mascotaId: 5, hora: '11:00', motivo: 'Vacunación' },
    { id: 4, veterinarioId: 3, mascotaId: 6, hora: '12:00', motivo: 'Consulta dermatológica' },
    { id: 5, veterinarioId: 4, mascotaId: 8, hora: '14:00', motivo: 'Control de crecimiento' },
    { id: 6, veterinarioId: 1, mascotaId: 9, hora: '15:00', motivo: 'Chequeo general' },
  ],
  '2025-12-19': [
    { id: 7, veterinarioId: 2, mascotaId: 2, hora: '09:00', motivo: 'Control post-esterilización' },
    { id: 8, veterinarioId: 1, mascotaId: 4, hora: '10:00', motivo: 'Vacunación' },
    { id: 9, veterinarioId: 3, mascotaId: 7, hora: '11:00', motivo: 'Revisión de cadera' },
    { id: 10, veterinarioId: 4, mascotaId: 10, hora: '12:00', motivo: 'Control rutinario' },
    { id: 11, veterinarioId: 1, mascotaId: 1, hora: '14:00', motivo: 'Desparasitación' },
    { id: 12, veterinarioId: 2, mascotaId: 5, hora: '15:00', motivo: 'Limpieza dental' },
    { id: 13, veterinarioId: 3, mascotaId: 6, hora: '16:00', motivo: 'Corte de pelo' },
    { id: 14, veterinarioId: 4, mascotaId: 9, hora: '17:00', motivo: 'Consulta general' },
  ],
  '2025-12-20': [
    { id: 15, veterinarioId: 1, mascotaId: 3, hora: '09:00', motivo: 'Seguimiento alergia' },
    { id: 16, veterinarioId: 2, mascotaId: 7, hora: '10:00', motivo: 'Control articular' },
    { id: 17, veterinarioId: 3, mascotaId: 2, hora: '11:00', motivo: 'Consulta de piel' },
    { id: 18, veterinarioId: 4, mascotaId: 8, hora: '12:00', motivo: 'Vacunación' },
    { id: 19, veterinarioId: 1, mascotaId: 4, hora: '14:00', motivo: 'Control de peso' },
  ],
  '2025-12-21': [
    { id: 20, veterinarioId: 2, mascotaId: 1, hora: '09:00', motivo: 'Chequeo anual' },
    { id: 21, veterinarioId: 1, mascotaId: 10, hora: '10:00', motivo: 'Vacunación' },
    { id: 22, veterinarioId: 3, mascotaId: 5, hora: '11:00', motivo: 'Revisión dental' },
    { id: 23, veterinarioId: 4, mascotaId: 6, hora: '12:00', motivo: 'Control rutinario' },
    { id: 24, veterinarioId: 1, mascotaId: 9, hora: '14:00', motivo: 'Consulta general' },
    { id: 25, veterinarioId: 2, mascotaId: 3, hora: '15:00', motivo: 'Seguimiento' },
  ],
};

// Función helper para obtener datos completos de una cita
export const obtenerCitaCompleta = (cita) => {
  const veterinario = veterinarios.find(v => v.id === cita.veterinarioId);
  const mascota = mascotas.find(m => m.id === cita.mascotaId);
  const dueno = clientes.find(c => c.id === mascota?.duenoId);
  
  return {
    ...cita,
    veterinario,
    mascota,
    dueno
  };
};
