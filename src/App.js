import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { clientes, mascotas, citasPorDia, historialMedico, obtenerCitaCompleta } from './data/veterinariaData';
import './App.css';

function App() {
  console.log('App component is rendering...');
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <header className="App-header">
          <h1>🐾 Veterinaria Cuidado Animal</h1>
          <p className="subtitle">Sistema de Gestión de Citas y Pacientes</p>
        </header>

        <div className="content">
          {/* Menú lateral */}
          <nav className="side-menu">
            <h2>Menú Principal</h2>
            <ul>
              <li><Link to="/citas">📅 Citas</Link></li>
              <li><Link to="/clientes">👥 Ver Clientes</Link></li>
              <li><Link to="/mascotas">🐶🐱 Ver Mascotas</Link></li>
            </ul>
          </nav>

          {/* Área principal que muestra el contenido */}
          <main className="book-list">
            <Routes>
              <Route path="/citas" element={<CitasMenu />} />
              <Route path="/citas/:fecha" element={<CitasList />} />
              <Route path="/mascota/:id" element={<MascotaDetalle />} />
              <Route path="/clientes" element={<ClientesList />} />
              <Route path="/mascotas" element={<MascotasList />} />
              <Route path="/" element={
                <div className="welcome">
                  <h2>Bienvenido a Veterinaria Cuidado Animal</h2>
                  <p>Selecciona una opción del menú para comenzar.</p>
                  <div className="info-cards">
                    <Link to="/citas" className="info-card-link">
                      <div className="info-card">
                        <h3>📅 Citas</h3>
                        <p>Consulta las citas programadas por día (máximo 8 citas/día)</p>
                      </div>
                    </Link>
                    <Link to="/clientes" className="info-card-link">
                      <div className="info-card">
                        <h3>👥 Clientes</h3>
                        <p>Visualiza la información de nuestros clientes</p>
                      </div>
                    </Link>
                    <Link to="/mascotas" className="info-card-link">
                      <div className="info-card">
                        <h3>🐾 Mascotas</h3>
                        <p>Accede al historial médico completo de las mascotas</p>
                      </div>
                    </Link>
                  </div>
                </div>
              } />
            </Routes>
          </main>
        </div>

        <footer>
          <p>© 2025 Veterinaria Cuidado Animal. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

// Componente para mostrar el menú de selección de fechas
function CitasMenu() {
  const fechasDisponibles = [
    { fecha: '2025-12-18', label: 'Miércoles 18 de Diciembre' },
    { fecha: '2025-12-19', label: 'Jueves 19 de Diciembre' },
    { fecha: '2025-12-20', label: 'Viernes 20 de Diciembre' },
    { fecha: '2025-12-21', label: 'Sábado 21 de Diciembre' }
  ];

  return (
    <div className="citas-menu">
      <h2>📅 Selecciona el día para ver las citas</h2>
      <p className="subtitle">Consulta las citas programadas (máximo 8 citas por día)</p>
      <div className="fechas-grid">
        {fechasDisponibles.map(({ fecha, label }) => (
          <Link key={fecha} to={`/citas/${fecha}`} className="fecha-card-link">
            <div className="fecha-card">
              <div className="fecha-icon">📅</div>
              <h3>{label}</h3>
              <p>Ver citas del día</p>
            </div>
          </Link>
        ))}
      </div>
      <Link to="/">
        <button className="btn-volver">Volver al Inicio</button>
      </Link>
    </div>
  );
}

// Componente para listar citas del día (usando API REST)
function CitasList() {
  const { fecha } = useParams();
  const [citas, setCitas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    console.log('🔍 Iniciando petición a /api/citas?fecha=' + fecha);

    fetch(`/api/citas?fecha=${encodeURIComponent(fecha)}`)
      .then((response) => {
        console.log('📡 Respuesta de citas:', response);
        if (!response.ok) {
          throw new Error(response.status + ' en la respuesta de la API: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('✅ Datos recibidos de MSW:', data);
        setCitas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('❌ Error al cargar citas:', error.message);
        // Usar datos de fallback cuando MSW no esté disponible
        const citasDelDia = citasPorDia[fecha] || [];
        const citasCompletas = citasDelDia.map(obtenerCitaCompleta);
        setCitas(citasCompletas);
        setError(null); // No mostrar error, usar fallback silenciosamente
        setLoading(false);
      });
  }, [fecha]);

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">🐾 Cargando citas...</p>
    </div>
  );
  if (error) return <p>Error: {error}</p>;

  // Formatear la fecha para mostrar
  const fechaFormateada = new Date(fecha + 'T00:00:00').toLocaleDateString('es-CL', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div>
      <h2>Citas del {fechaFormateada}</h2>
      <p className="citas-info">📋 Mostrando {citas.length} de máximo 8 citas por día</p>
      {citas.length > 0 ? (
        <div className="citas-container">
          {citas.map((cita) => (
            <div key={cita.id} className="cita-card">
              <div className="cita-header">
                <span className="cita-hora">🕐 {cita.hora}</span>
                <span className="cita-motivo">{cita.motivo}</span>
              </div>
              <div className="cita-body">
                <p><strong>👨‍⚕️ Veterinario:</strong> {cita.veterinario?.nombre} - {cita.veterinario?.especialidad}</p>
                <p><strong>🐾 Mascota:</strong> {cita.mascota?.nombre} ({cita.mascota?.especie} - {cita.mascota?.raza})</p>
                <p><strong>👤 Dueño:</strong> {cita.dueno?.nombre}</p>
                <p><strong>📞 Teléfono:</strong> {cita.dueno?.telefono}</p>
              </div>
              <Link to={`/mascota/${cita.mascota?.id}`}>
                <button className="btn-ver-detalle">Ver Historial Médico</button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="no-data">No hay citas programadas para este día.</p>
      )}
    </div>
  );
}

// Componente para mostrar detalles de una mascota (usando API GraphQL)
function MascotaDetalle() {
  const { id } = useParams();
  const [mascotaDetalle, setMascotaDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Consulta GraphQL
    const query = `
      query {
        historialMedico(mascotaId: ${id}) {
          mascotaId
          vacunas
          alergias
          cirugias
          medicamentos
          ultimaVisita
          peso
          observaciones
          mascota {
            id
            nombre
            especie
            raza
            edad
          }
          dueno {
            id
            nombre
            telefono
            direccion
          }
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
        setMascotaDetalle(data.data.historialMedico);
        setLoading(false);
      })
      .catch((error) => {
        console.log('GraphQL no disponible, usando datos de fallback:', error.message);
        // Usar datos de fallback cuando GraphQL no esté disponible
        const historial = historialMedico[parseInt(id)];
        const mascota = mascotas.find(m => m.id === parseInt(id));
        const dueno = clientes.find(c => c.id === mascota?.duenoId);
        
        if (historial && mascota) {
          setMascotaDetalle({
            ...historial,
            mascota,
            dueno
          });
        } else {
          setMascotaDetalle(null);
        }
        setError(null); // No mostrar error, usar fallback silenciosamente
        setLoading(false);
      });
  }, [id]);

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">🩺 Cargando historial médico...</p>
    </div>
  );
  if (error) return <p>Error: {error}</p>;
  if (!mascotaDetalle) return <p>Historial médico no encontrado.</p>;

  return (
    <div>
      <h2>Historial Médico Completo</h2>
      <div className="mascota-detalle">
        <div className="detalle-section">
          <h3>🐾 Información de la Mascota</h3>
          <p><strong>Nombre:</strong> {mascotaDetalle.mascota?.nombre}</p>
          <p><strong>Especie:</strong> {mascotaDetalle.mascota?.especie}</p>
          <p><strong>Raza:</strong> {mascotaDetalle.mascota?.raza}</p>
          <p><strong>Edad:</strong> {mascotaDetalle.mascota?.edad} años</p>
          <p><strong>Peso:</strong> {mascotaDetalle.peso}</p>
        </div>

        <div className="detalle-section">
          <h3>👤 Información del Dueño</h3>
          <p><strong>Nombre:</strong> {mascotaDetalle.dueno?.nombre}</p>
          <p><strong>Teléfono:</strong> {mascotaDetalle.dueno?.telefono}</p>
          <p><strong>Dirección:</strong> {mascotaDetalle.dueno?.direccion}</p>
        </div>

        <div className="detalle-section">
          <h3>💉 Historial Médico</h3>
          <p><strong>Vacunas:</strong> {mascotaDetalle.vacunas}</p>
          <p><strong>Alergias:</strong> {mascotaDetalle.alergias}</p>
          <p><strong>Cirugías:</strong> {mascotaDetalle.cirugias}</p>
          <p><strong>Medicamentos:</strong> {mascotaDetalle.medicamentos}</p>
          <p><strong>Última Visita:</strong> {new Date(mascotaDetalle.ultimaVisita).toLocaleDateString('es-CL')}</p>
          <p><strong>Observaciones:</strong> {mascotaDetalle.observaciones}</p>
        </div>

        <Link to="/">
          <button className="btn-volver">Volver al Inicio</button>
        </Link>
      </div>
    </div>
  );
}

// Componente para listar todos los clientes
function ClientesList() {
  const [clientesData, setClientesData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/clientes')
      .then(res => res.json())
      .then(data => {
        setClientesData(data);
        setLoading(false);
      })
      .catch(() => {
        setClientesData(clientes);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">👥 Cargando clientes...</p>
    </div>
  );

  return (
    <div>
      <h2>👥 Lista de Clientes</h2>
      <div className="clientes-grid">
        {clientesData.map((cliente) => (
          <div key={cliente.id} className="cliente-card">
            <h3>{cliente.nombre}</h3>
            <p><strong>📞</strong> {cliente.telefono}</p>
            <p><strong>📍</strong> {cliente.direccion}</p>
          </div>
        ))}
      </div>
      <Link to="/">
        <button className="btn-volver">Volver al Inicio</button>
      </Link>
    </div>
  );
}

// Componente para listar todas las mascotas
function MascotasList() {
  const [mascotasData, setMascotasData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/mascotas')
      .then(res => res.json())
      .then(data => {
        setMascotasData(data);
        setLoading(false);
      })
      .catch(() => {
        setMascotasData(mascotas);
        setLoading(false);
      });
  }, []);

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">🐶🐱 Cargando mascotas...</p>
    </div>
  );

  return (
    <div>
      <h2>🐾 Lista de Mascotas</h2>
      <div className="mascotas-grid">
        {mascotasData.map((mascota) => {
          const dueno = clientes.find(c => c.id === mascota.duenoId);
          return (
            <div key={mascota.id} className="mascota-card">
              <h3>{mascota.nombre}</h3>
              <p><strong>Especie:</strong> {mascota.especie}</p>
              <p><strong>Raza:</strong> {mascota.raza}</p>
              <p><strong>Edad:</strong> {mascota.edad} años</p>
              <p><strong>Dueño:</strong> {dueno?.nombre}</p>
              <Link to={`/mascota/${mascota.id}`}>
                <button>Ver Historial</button>
              </Link>
            </div>
          );
        })}
      </div>
      <Link to="/">
        <button className="btn-volver">Volver al Inicio</button>
      </Link>
    </div>
  );
}

export default App;
