import { Link } from 'react-router-dom'
import { Wind, ChevronRight, Star, Film } from 'lucide-react'
import { useGhibliFilms } from '../hooks/useGhibliFilms'
import FilmCard from '../components/FilmCard'
import Loader from '../components/Loader'
import './Home.css'

export default function Home() {
  const { films, loading, error } = useGhibliFilms()

  const featured = films.slice(0, 6)

  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-orb hero-orb-3" />
        </div>
        <div className="hero-content">
          <div className="hero-badge animate-fade-in">
            <Wind size={14} />
            <span>Studio Ghibli Collection</span>
          </div>
          <h1 className="hero-title animate-fade-up" style={{ animationDelay: '0.1s' }}>
            El mundo mágico<br />
            <em>de Studio Ghibli</em>
          </h1>
          <p className="hero-subtitle animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Explora la colección completa de películas del estudio más entrañable del cine de animación.
            Desde Totoro hasta Spirited Away, descubre cada historia.
          </p>
          <div className="hero-actions animate-fade-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/entities" className="btn-primary">
              <Film size={16} />
              Ver todas las películas
            </Link>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-value">{films.length || '—'}</span>
                <span className="stat-label">Películas</span>
              </div>
              <div className="stat-divider" />
              <div className="stat">
                <span className="stat-value">
                  {films.length ? Math.round(films.reduce((a, f) => a + Number(f.rt_score), 0) / films.length) + '%' : '—'}
                </span>
                <span className="stat-label">Score promedio</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Films section */}
      <section className="home-films">
        <div className="section-header">
          <div>
            <h2 className="section-title">
              <Star size={20} />
              Películas destacadas
            </h2>
            <p className="section-subtitle">Datos obtenidos desde la API pública de Studio Ghibli</p>
          </div>
          <Link to="/entities" className="btn-link">
            Ver todas <ChevronRight size={16} />
          </Link>
        </div>

        {loading && <Loader />}

        {error && (
          <div className="error-state">
            <p>⚠️ Error al cargar: {error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="films-grid">
            {featured.map((film, i) => (
              <FilmCard key={film.id} film={film} index={i} />
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
