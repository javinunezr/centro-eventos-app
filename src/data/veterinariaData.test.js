import { clientes, mascotas, historialMedico, veterinarios, citasPorDia, obtenerCitaCompleta } from './veterinariaData';

describe('veterinariaData', () => {
  describe('clientes', () => {
    test('contains at least 8 clients', () => {
      expect(clientes.length).toBeGreaterThanOrEqual(8);
    });

    test('all clients have required fields', () => {
      clientes.forEach(cliente => {
        expect(cliente).toHaveProperty('id');
        expect(cliente).toHaveProperty('nombre');
        expect(cliente).toHaveProperty('telefono');
        expect(cliente).toHaveProperty('direccion');
        expect(typeof cliente.id).toBe('number');
        expect(typeof cliente.nombre).toBe('string');
        expect(typeof cliente.telefono).toBe('string');
        expect(typeof cliente.direccion).toBe('string');
      });
    });

    test('client IDs are unique', () => {
      const ids = clientes.map(c => c.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(clientes.length);
    });
  });

  describe('mascotas', () => {
    test('contains at least 10 pets', () => {
      expect(mascotas.length).toBeGreaterThanOrEqual(10);
    });

    test('all pets have required fields', () => {
      mascotas.forEach(mascota => {
        expect(mascota).toHaveProperty('id');
        expect(mascota).toHaveProperty('nombre');
        expect(mascota).toHaveProperty('especie');
        expect(mascota).toHaveProperty('raza');
        expect(mascota).toHaveProperty('edad');
        expect(mascota).toHaveProperty('duenoId');
        expect(typeof mascota.especie).toBe('string');
      });
    });

    test('pet species are either Perro or Gato', () => {
      mascotas.forEach(mascota => {
        expect(['Perro', 'Gato']).toContain(mascota.especie);
      });
    });

    test('all pets belong to existing clients', () => {
      const clienteIds = clientes.map(c => c.id);
      mascotas.forEach(mascota => {
        expect(clienteIds).toContain(mascota.duenoId);
      });
    });
  });

  describe('historialMedico', () => {
    test('contains medical history for all pets', () => {
      expect(Object.keys(historialMedico).length).toBeGreaterThanOrEqual(10);
    });

    test('medical history has required fields', () => {
      Object.values(historialMedico).forEach(historial => {
        expect(historial).toHaveProperty('mascotaId');
        expect(historial).toHaveProperty('vacunas');
        expect(historial).toHaveProperty('alergias');
        expect(historial).toHaveProperty('cirugias');
        expect(historial).toHaveProperty('medicamentos');
        expect(historial).toHaveProperty('ultimaVisita');
        expect(historial).toHaveProperty('peso');
        expect(historial).toHaveProperty('observaciones');
      });
    });

    test('ultimaVisita is a valid date string', () => {
      Object.values(historialMedico).forEach(historial => {
        const date = new Date(historial.ultimaVisita);
        expect(date.toString()).not.toBe('Invalid Date');
      });
    });
  });

  describe('veterinarios', () => {
    test('contains at least 4 veterinarians', () => {
      expect(veterinarios.length).toBeGreaterThanOrEqual(4);
    });

    test('all veterinarians have required fields', () => {
      veterinarios.forEach(vet => {
        expect(vet).toHaveProperty('id');
        expect(vet).toHaveProperty('nombre');
        expect(vet).toHaveProperty('especialidad');
      });
    });
  });

  describe('citasPorDia', () => {
    test('contains appointments for multiple days', () => {
      const dias = Object.keys(citasPorDia);
      expect(dias.length).toBeGreaterThanOrEqual(4);
    });

    test('no day has more than 8 appointments', () => {
      Object.values(citasPorDia).forEach(citas => {
        expect(citas.length).toBeLessThanOrEqual(8);
      });
    });

    test('all appointments have required fields', () => {
      Object.values(citasPorDia).forEach(citasDelDia => {
        citasDelDia.forEach(cita => {
          expect(cita).toHaveProperty('id');
          expect(cita).toHaveProperty('veterinarioId');
          expect(cita).toHaveProperty('mascotaId');
          expect(cita).toHaveProperty('hora');
          expect(cita).toHaveProperty('motivo');
        });
      });
    });

    test('all appointments reference existing veterinarians', () => {
      const vetIds = veterinarios.map(v => v.id);
      Object.values(citasPorDia).forEach(citasDelDia => {
        citasDelDia.forEach(cita => {
          expect(vetIds).toContain(cita.veterinarioId);
        });
      });
    });

    test('all appointments reference existing pets', () => {
      const mascotaIds = mascotas.map(m => m.id);
      Object.values(citasPorDia).forEach(citasDelDia => {
        citasDelDia.forEach(cita => {
          expect(mascotaIds).toContain(cita.mascotaId);
        });
      });
    });
  });

  describe('obtenerCitaCompleta', () => {
    test('returns complete appointment with related data', () => {
      const citaOriginal = citasPorDia['2025-12-18'][0];
      const citaCompleta = obtenerCitaCompleta(citaOriginal);
      
      expect(citaCompleta).toHaveProperty('veterinario');
      expect(citaCompleta).toHaveProperty('mascota');
      expect(citaCompleta).toHaveProperty('dueno');
      expect(citaCompleta.veterinario).toBeDefined();
      expect(citaCompleta.mascota).toBeDefined();
      expect(citaCompleta.dueno).toBeDefined();
    });

    test('veterinario data is correct', () => {
      const citaOriginal = citasPorDia['2025-12-18'][0];
      const citaCompleta = obtenerCitaCompleta(citaOriginal);
      
      expect(citaCompleta.veterinario.id).toBe(citaOriginal.veterinarioId);
      expect(citaCompleta.veterinario).toHaveProperty('nombre');
      expect(citaCompleta.veterinario).toHaveProperty('especialidad');
    });

    test('mascota and dueno relationship is correct', () => {
      const citaOriginal = citasPorDia['2025-12-18'][0];
      const citaCompleta = obtenerCitaCompleta(citaOriginal);
      
      expect(citaCompleta.mascota.duenoId).toBe(citaCompleta.dueno.id);
    });
  });
});
