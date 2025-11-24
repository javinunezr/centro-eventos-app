import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { eventosPorCategoria, eventosDetallados } from './data/eventosData';
import './App.css';

function App() {
  console.log('App component is rendering...');
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Centro de Eventos</h1>
        </header>

        <div className="content">
          {/* Menú lateral */}
          <nav className="side-menu">
            <h2>Categorías de Eventos</h2>
            <ul>
              <li><Link to="/categoria/conciertos">Conciertos</Link></li>
              <li><Link to="/categoria/conferencias">Conferencias</Link></li>
              <li><Link to="/categoria/deportes">Deportes</Link></li>
              <li><Link to="/categoria/teatros">Teatros</Link></li>
            </ul>
          </nav>

          {/* Área principal que muestra eventos */}
          <main className="book-list">
            <Routes>
              <Route path="/categoria/:categoria" element={<EventosList />} />
              <Route path="/evento/:id" element={<EventoDetalle />} />
              <Route path="/" element={<p>Por favor selecciona una categoría para explorar los eventos disponibles.</p>} />
            </Routes>
          </main>
        </div>

        <footer>
          <p>© 2025 Centro de Eventos. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

// Componente para listar eventos (usando API REST)
function EventosList() {
  const { categoria } = useParams();
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`/api/eventos?categoria=${encodeURIComponent(categoria)}`)
      .then((response) => {
        console.log('Respuesta de eventos:', response);
        if (!response.ok) {
          throw new Error(response.status + ' en la respuesta de la API: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('Datos recibidos de MSW:', data);
        setEventos(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log('MSW no disponible, usando datos de fallback:', error.message);
        // Usar datos de fallback cuando MSW no esté disponible
        const eventosDelCategoria = eventosPorCategoria[categoria] || [];
        setEventos(eventosDelCategoria);
        setError(null); // No mostrar error, usar fallback silenciosamente
        setLoading(false);
      });
  }, [categoria]);

  if (loading) return <p>Cargando eventos...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Eventos de {categoria}</h2>
      {eventos.length > 0 ? (
        <div>
          {eventos.map((evento) => (
            <div key={evento.id} className="book">
              <h3>{evento.nombre}</h3>
              <p><strong>Fecha:</strong> {evento.fecha}</p>
              <p><strong>Lugar:</strong> {evento.lugar}</p>
              <p><strong>Categoría:</strong> {evento.categoria}</p>
              <Link to={`/evento/${evento.id}`}>
                <button>Ver Detalles</button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay eventos disponibles para esta categoría.</p>
      )}
    </div>
  );
}

// Componente para mostrar detalles de un evento (usando API GraphQL)
function EventoDetalle() {
  const { id } = useParams();
  const [eventoDetalle, setEventoDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Consulta GraphQL
    const query = `
      query {
        eventoDetalle(id: ${id}) {
          id
          organizador
          asistentesConfirmados
          descripcion
        }
      }
    `;

    fetch('/api/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query })
    })
      .then((response) => {
        console.log('Respuesta GraphQL:', response);
        if (!response.ok) {
          throw new Error(response.status + ' en la respuesta GraphQL: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.errors) {
          throw new Error(data.errors[0].message);
        }
        console.log('Datos recibidos de GraphQL:', data);
        setEventoDetalle(data.data.eventoDetalle);
        setLoading(false);
      })
      .catch((error) => {
        console.log('GraphQL no disponible, usando datos de fallback:', error.message);
        // Usar datos de fallback cuando GraphQL no esté disponible
        const detalleDelEvento = eventosDetallados[parseInt(id)];
        setEventoDetalle(detalleDelEvento || null);
        setError(null); // No mostrar error, usar fallback silenciosamente
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando detalles del evento...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!eventoDetalle) return <p>Evento no encontrado.</p>;

  return (
    <div>
      <h2>Detalles del Evento</h2>
      <div className="book">
        <h3>Información Detallada</h3>
        <p><strong>Organizador:</strong> {eventoDetalle.organizador}</p>
        <p><strong>Asistentes Confirmados:</strong> {eventoDetalle.asistentesConfirmados}</p>
        <p><strong>Descripción:</strong> {eventoDetalle.descripcion}</p>
        <Link to="/">
          <button>Volver al Inicio</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
