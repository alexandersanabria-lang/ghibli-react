import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, Heart, X } from 'lucide-react'
import { useGhibliFilms, useFavorites } from '../hooks/useGhibliFilms'
import FilmCard from '../components/FilmCard'
import Loader from '../components/Loader'
import './Entities.css'

export default function Entities() {
  const { films, loading, error } = useGhibliFilms()
  const { favorites } = useFavorites()
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState('release_date')
  const [showFavsOnly, setShowFavsOnly] = useState(false)

  const filtered = useMemo(() => {
    let list = films.filter(f =>
      f.title.toLowerCase().includes(search.toLowerCase()) ||
      f.director.toLowerCase().includes(search.toLowerCase())
    )
    if (showFavsOnly) list = list.filter(f => favorites.includes(f.id))
    list = [...list].sort((a, b) => {
      if (sortBy === 'release_date') return Number(a.release_date) - Number(b.release_date)
      if (sortBy === 'release_date_desc') return Number(b.release_date) - Number(a.release_date)
      if (sortBy === 'rt_score') return Number(b.rt_score) - Number(a.rt_score)
      if (sortBy === 'title') return a.title.localeCompare(b.title)
      return 0
    })
    return list
  }, [films, search, sortBy, showFavsOnly, favorites])

  return (
    <main className="entities">
      <div className="entities-header">
        <div>
          <h1 className="entities-title">Catálogo de Películas</h1>
          <p className="entities-subtitle">
            {loading ? 'Cargando...' : `${filtered.length} película${filtered.length !== 1 ? 's' : ''} encontrada${filtered.length !== 1 ? 's' : ''}`}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="search-wrapper">
          <Search size={16} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar por título o director..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="search-input"
          />
          {search && (
            <button className="search-clear" onClick={() => setSearch('')}>
              <X size={14} />
            </button>
          )}
        </div>

        <div className="filter-controls">
          <div className="select-wrapper">
            <SlidersHorizontal size={14} className="select-icon" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="release_date">Año (asc)</option>
              <option value="release_date_desc">Año (desc)</option>
              <option value="rt_score">Mejor puntuación</option>
              <option value="title">Título A–Z</option>
            </select>
          </div>

          <button
            className={`fav-filter-btn ${showFavsOnly ? 'active' : ''}`}
            onClick={() => setShowFavsOnly(v => !v)}
          >
            <Heart size={14} fill={showFavsOnly ? 'currentColor' : 'none'} />
            Favoritos {showFavsOnly && `(${favorites.length})`}
          </button>
        </div>
      </div>

      {/* Content */}
      {loading && <Loader />}

      {error && (
        <div className="error-state">
          <p>⚠️ {error}</p>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <div className="empty-state">
          <p className="empty-emoji">🌾</p>
          <p className="empty-text">No se encontraron películas</p>
          <p className="empty-sub">Prueba con otro término de búsqueda</p>
        </div>
      )}

      {!loading && !error && filtered.length > 0 && (
        <div className="films-grid-entities">
          {filtered.map((film, i) => (
            <FilmCard key={film.id} film={film} index={i} />
          ))}
        </div>
      )}
    </main>
  )
}
