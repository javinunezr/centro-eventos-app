import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import { recetasPorCategoria, recetasDetalladas } from './data/recetasData';
import './App.css';

function App() {
  console.log('App component is rendering...');
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <header className="App-header">
          <h1>🍳 Recetas Deliciosas</h1>
        </header>

        <div className="content">
          {/* Menú lateral */}
          <nav className="side-menu">
            <h2>Categorías de Recetas</h2>
            <ul>
              <li><Link to="/categoria/postres">🍰 Postres</Link></li>
              <li><Link to="/categoria/platos-principales">🍝 Platos Principales</Link></li>
              <li><Link to="/categoria/ensaladas">🥗 Ensaladas</Link></li>
              <li><Link to="/categoria/bebidas">🍹 Bebidas</Link></li>
            </ul>
          </nav>

          {/* Área principal que muestra recetas */}
          <main className="book-list">
            <Routes>
              <Route path="/categoria/:categoria" element={<RecetasList />} />
              <Route path="/receta/:id" element={<RecetaDetalle />} />
              <Route path="/" element={<p>Por favor selecciona una categoría para explorar las recetas disponibles.</p>} />
            </Routes>
          </main>
        </div>

        <footer>
          <p>© 2025 Recetas Deliciosas. Todos los derechos reservados.</p>
        </footer>
      </div>
    </Router>
  );
}

// Componente para listar recetas (usando API REST)
function RecetasList() {
  const { categoria } = useParams();
  const [recetas, setRecetas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    console.log('🔍 Iniciando petición a /api/recetas?categoria=' + categoria);

    fetch(`/api/recetas?categoria=${encodeURIComponent(categoria)}`)
      .then((response) => {
        console.log('📡 Respuesta de recetas:', response);
        if (!response.ok) {
          throw new Error(response.status + ' en la respuesta de la API: ' + response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log('✅ Datos recibidos de MSW:', data);
        setRecetas(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('❌ Error al cargar recetas:', error.message);
        // Usar datos de fallback cuando MSW no esté disponible
        const recetasDelCategoria = recetasPorCategoria[categoria] || [];
        setRecetas(recetasDelCategoria);
        setError(null); // No mostrar error, usar fallback silenciosamente
        setLoading(false);
      });
  }, [categoria]);

  if (loading) return <p>Cargando recetas...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Recetas de {categoria}</h2>
      {recetas.length > 0 ? (
        <div>
          {recetas.map((receta) => (
            <div key={receta.id} className="book">
              <h3>{receta.titulo}</h3>
              <p><strong>Dificultad:</strong> {receta.dificultad}</p>
              <p><strong>Categoría:</strong> {receta.categoria}</p>
              <Link to={`/receta/${receta.id}`}>
                <button>Ver Detalles</button>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay recetas disponibles para esta categoría.</p>
      )}
    </div>
  );
}

// Componente para mostrar detalles de una receta (usando API GraphQL)
function RecetaDetalle() {
  const { id } = useParams();
  const [recetaDetalle, setRecetaDetalle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Consulta GraphQL
    const query = `
      query {
        recetaDetalle(id: ${id}) {
          id
          ingredientes
          metodoPreparacion
          tiempoCoccion
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
        setRecetaDetalle(data.data.recetaDetalle);
        setLoading(false);
      })
      .catch((error) => {
        console.log('GraphQL no disponible, usando datos de fallback:', error.message);
        // Usar datos de fallback cuando GraphQL no esté disponible
        const detalleDeLaReceta = recetasDetalladas[parseInt(id)];
        setRecetaDetalle(detalleDeLaReceta || null);
        setError(null); // No mostrar error, usar fallback silenciosamente
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Cargando detalles de la receta...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!recetaDetalle) return <p>Receta no encontrada.</p>;

  return (
    <div>
      <h2>Detalles de la Receta</h2>
      <div className="book">
        <h3>Información Detallada</h3>
        <p><strong>Ingredientes:</strong> {recetaDetalle.ingredientes}</p>
        <p><strong>Método de Preparación:</strong> {recetaDetalle.metodoPreparacion}</p>
        <p><strong>Tiempo de Cocción:</strong> {recetaDetalle.tiempoCoccion}</p>
        <Link to="/">
          <button>Volver al Inicio</button>
        </Link>
      </div>
    </div>
  );
}

export default App;
