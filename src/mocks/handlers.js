import { http, HttpResponse, delay } from 'msw';
import { clientes, mascotas, citasPorDia, historialMedico, obtenerCitaCompleta } from '../data/veterinariaData';

// API REST y GraphQL mock para la veterinaria
export const handlers = [
    // API REST - Lista de citas por día (máximo 8 citas)
    http.get('*/api/citas', async ({ request }) => {
        console.log('MSW interceptando citas:', request.url);
        
        const url = new URL(request.url);
        const fecha = url.searchParams.get("fecha");
        
        console.log('Fecha solicitada:', fecha);

        await delay(800);

        // Si no se especifica fecha, devolver citas de hoy
        if (!fecha) {
            const fechaHoy = '2025-12-18'; // Fecha por defecto para desarrollo
            const citas = citasPorDia[fechaHoy] || [];
            const citasCompletas = citas.map(obtenerCitaCompleta);
            console.log('Devolviendo citas de hoy:', citasCompletas.length);
            return HttpResponse.json(citasCompletas);
        }

        // Retorna las citas del día solicitado
        const citas = citasPorDia[fecha];
        if (!citas) {
            console.log('No hay citas para la fecha:', fecha);
            return HttpResponse.json([]);
        }

        const citasCompletas = citas.map(obtenerCitaCompleta);
        console.log('Devolviendo citas para', fecha + ':', citasCompletas.length);
        return HttpResponse.json(citasCompletas);
    }),

    // API REST - Lista de clientes
    http.get('*/api/clientes', async () => {
        console.log('MSW interceptando clientes');
        await delay(500);
        return HttpResponse.json(clientes);
    }),

    // API REST - Lista de mascotas
    http.get('*/api/mascotas', async ({ request }) => {
        console.log('MSW interceptando mascotas');
        const url = new URL(request.url);
        const clienteId = url.searchParams.get("clienteId");
        
        await delay(500);
        
        if (clienteId) {
            const mascotasCliente = mascotas.filter(m => m.duenoId === parseInt(clienteId));
            return HttpResponse.json(mascotasCliente);
        }
        
        return HttpResponse.json(mascotas);
    }),

    // API GraphQL mock para detalles de mascotas
    http.post('*/api/graphql', async (req) => {
        const body = await req.request.json();
        
        await delay(600);

        // Consulta para obtener historial médico de una mascota
        if (body.query && body.query.includes('historialMedico')) {
            const idMatch = body.query.match(/historialMedico\(mascotaId:\s*(\d+)\)/);
            if (idMatch) {
                const mascotaId = parseInt(idMatch[1]);
                const historial = historialMedico[mascotaId];
                const mascota = mascotas.find(m => m.id === mascotaId);
                const dueno = clientes.find(c => c.id === mascota?.duenoId);
                
                if (historial && mascota) {
                    return HttpResponse.json({
                        data: {
                            historialMedico: {
                                ...historial,
                                mascota,
                                dueno
                            }
                        }
                    });
                } else {
                    return HttpResponse.json({
                        errors: [{ message: `Historial médico para mascota con ID ${mascotaId} no encontrado` }]
                    });
                }
            }
        }

        // Consulta para obtener detalles completos de un cliente
        if (body.query && body.query.includes('clienteDetalle')) {
            const idMatch = body.query.match(/clienteDetalle\(id:\s*(\d+)\)/);
            if (idMatch) {
                const clienteId = parseInt(idMatch[1]);
                const cliente = clientes.find(c => c.id === clienteId);
                const mascotasCliente = mascotas.filter(m => m.duenoId === clienteId);
                
                if (cliente) {
                    return HttpResponse.json({
                        data: {
                            clienteDetalle: {
                                ...cliente,
                                mascotas: mascotasCliente
                            }
                        }
                    });
                } else {
                    return HttpResponse.json({
                        errors: [{ message: `Cliente con ID ${clienteId} no encontrado` }]
                    });
                }
            }
        }

        return HttpResponse.json({
            errors: [{ message: 'Consulta GraphQL no válida' }]
        });
    }),
];
