import { http, HttpResponse, delay } from 'msw';

// API REST mock para listar eventos
export const handlers = [
    // API REST - Lista de eventos por categoría
    http.get('/api/eventos', async ({ request }) => {
        console.log('MSW interceptando:', request.url);
        
        const url = new URL(request.url);
        const categoria = url.searchParams.get("categoria");
        
        console.log('Categoría solicitada:', categoria);

        const eventosPorCategoria = {
            'conciertos': [
                { id: 1, nombre: 'Los Bunkers', fecha: '15-11-2025', lugar: 'Parque Metropolitano', categoria: 'Conciertos' },
                { id: 2, nombre: 'Jazz Night', fecha: '20-11-2025', lugar: 'Teatro Municipal', categoria: 'Conciertos' },
                { id: 3, nombre: 'Festival de música electrónica', fecha: '05-12-2025', lugar: 'Estadio Nacional', categoria: 'Conciertos' },
            ],
            'conferencias': [
                { id: 4, nombre: 'Tech Summit 2025', fecha: '25-11-2025', lugar: 'Costanera Center', categoria: 'Conferencias' },
                { id: 5, nombre: 'Innovación Digital', fecha: '10-12-2025', lugar: 'Hotel Diego de Almagro', categoria: 'Conferencias' },
                { id: 6, nombre: 'Futuro de la IA', fecha: '15-12-2025', lugar: 'Universidad de Chile', categoria: 'Conferencias' },
            ],
            'deportes': [
                { id: 7, nombre: 'Santiago Open (Tenis)', fecha: '30-11-2025', lugar: 'Centro Deportivo Claro Arena', categoria: 'Deportes' },
                { id: 8, nombre: 'Viña Maratón', fecha: '20-12-2025', lugar: 'Viña del Mar', categoria: 'Deportes' },
                { id: 9, nombre: 'Final Copa América', fecha: '01-12-2025', lugar: 'Estadio Nacional', categoria: 'Deportes' },
            ],
            'teatros': [
                { id: 10, nombre: 'Romeo y Julieta', fecha: '18-11-2025', lugar: 'Teatro Nacional', categoria: 'Teatros' },
                { id: 11, nombre: 'La Cenicienta', fecha: '08-12-2025', lugar: 'Teatro Bellas Artes', categoria: 'Teatros' },
                { id: 12, nombre: 'El Fantasma de la Ópera', fecha: '22-12-2025', lugar: 'Gran Teatro', categoria: 'Teatros' },
            ],
        };

        await delay(800);

        // Si no se especifica categoría, devolver todos los eventos
        if (!categoria) {
            const todosLosEventos = Object.values(eventosPorCategoria).flat();
            console.log('Devolviendo todos los eventos:', todosLosEventos.length);
            return HttpResponse.json(todosLosEventos);
        }

        // Retorna los eventos de la categoría solicitada
        const eventos = eventosPorCategoria[categoria];
        if (!eventos) {
            console.log('Categoría no encontrada:', categoria);
            return HttpResponse.json({}, { status: 404, statusText: `No se encontraron eventos para la categoría "${categoria}"` });
        }

        console.log('Devolviendo eventos para', categoria + ':', eventos.length);
        return HttpResponse.json(eventos);
    }),

    // API GraphQL mock para detalles de eventos
    http.post('/api/graphql', async (req) => {
        const body = await req.request.json();
        
        // Datos detallados de eventos para GraphQL
        const eventosDetallados = {
            1: { id: 1, organizador: 'Producciones Musicales SA', asistentesConfirmados: 1500, descripcion: 'Un evento de rock al aire libre con la mejor banda nacional.' },
            2: { id: 2, organizador: 'Jazz Club Internacional', asistentesConfirmados: 300, descripcion: 'Una noche íntima de jazz con músicos reconocidos mundialmente.' },
            3: { id: 3, organizador: 'Electronic Events Ltd', asistentesConfirmados: 5000, descripcion: 'Festival de música electrónica con los mejores DJs del momento.' },
            4: { id: 4, organizador: 'TechCorp Conferences', asistentesConfirmados: 800, descripcion: 'Conferencia sobre las últimas tendencias en tecnología y desarrollo de software.' },
            5: { id: 5, organizador: 'Innovation Hub', asistentesConfirmados: 600, descripcion: 'Evento enfocado en la transformación digital y nuevas tecnologías empresariales.' },
            6: { id: 6, organizador: 'AI Research Institute', asistentesConfirmados: 450, descripcion: 'Conferencia sobre inteligencia artificial y su impacto en el futuro.' },
            7: { id: 7, organizador: 'Federación de Tenis', asistentesConfirmados: 200, descripcion: 'Torneo profesional de tenis con premios en efectivo.' },
            8: { id: 8, organizador: 'Atletismo Municipal', asistentesConfirmados: 1200, descripcion: 'Maratón anual que recorre los principales sitios históricos de la ciudad.' },
            9: { id: 9, organizador: 'ANFP', asistentesConfirmados: 2000, descripcion: 'Copa de fútbol profesional con selecciones de equipos de fútbol de Sudamérica.' },
            10: { id: 10, organizador: 'Compañía Nacional de Teatro', asistentesConfirmados: 400, descripcion: 'Adaptación clásica de la obra de Shakespeare con un elenco excepcional.' },
            11: { id: 11, organizador: 'Teatro Experimental', asistentesConfirmados: 250, descripcion: 'Live action de un clásico, para toda la familia.' },
            12: { id: 12, organizador: 'Broadway Productions', asistentesConfirmados: 800, descripcion: 'Musical clásico con producción de nivel internacional.' },
        };

        await delay(600);

        // Parsear la consulta GraphQL para obtener el ID del evento
        if (body.query && body.query.includes('eventoDetalle')) {
            const idMatch = body.query.match(/eventoDetalle\(id:\s*(\d+)\)/);
            if (idMatch) {
                const eventId = parseInt(idMatch[1]);
                const eventoDetalle = eventosDetallados[eventId];
                
                if (eventoDetalle) {
                    return HttpResponse.json({
                        data: {
                            eventoDetalle: eventoDetalle
                        }
                    });
                } else {
                    return HttpResponse.json({
                        errors: [{ message: `Evento con ID ${eventId} no encontrado` }]
                    });
                }
            }
        }

        return HttpResponse.json({
            errors: [{ message: 'Consulta GraphQL no válida' }]
        });
    }),
];
