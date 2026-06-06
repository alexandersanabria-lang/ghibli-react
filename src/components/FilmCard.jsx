import { Heart, Star, Calendar, User2, Clock } from 'lucide-react'
import { useFavorites } from '../hooks/useGhibliFilms'
import { useToast } from '../lib/toast'
import './FilmCard.css'

export default function FilmCard({ film, index = 0 }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const { addToast } = useToast()
  const fav = isFavorite(film.id)

  const handleFavorite = () => {
    toggleFavorite(film.id)
    addToast(
      fav ? `"${film.title}" eliminado de favoritos` : `"${film.title}" añadido a favoritos`,
      fav ? 'info' : 'success'
    )
  }

  const scoreColor = film.rt_score >= 90
    ? '#3d7a35'
    : film.rt_score >= 70
    ? '#c8952a'
    : '#c47a6e'

  return (
    <article
      className="film-card"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="film-card-header">
        <div className="film-score" style={{ color: scoreColor }}>
          <Star size={13} fill={scoreColor} />
          <span>{film.rt_score}%</span>
        </div>
        <button
          className={`fav-btn ${fav ? 'active' : ''}`}
          onClick={handleFavorite}
          aria-label={fav ? 'Quitar de favoritos' : 'Añadir a favoritos'}
        >
          <Heart size={16} fill={fav ? 'currentColor' : 'none'} />
        </button>
      </div>

      <h3 className="film-title">{film.title}</h3>
      {film.original_title && (
        <p className="film-original-title">{film.original_title}</p>
      )}

      <p className="film-description">{film.description}</p>

      <div className="film-meta">
        <div className="film-meta-item">
          <User2 size={13} />
          <span>{film.director}</span>
        </div>
        <div className="film-meta-item">
          <Calendar size={13} />
          <span>{film.release_date}</span>
        </div>
        <div className="film-meta-item">
          <Clock size={13} />
          <span>{film.running_time} min</span>
        </div>
      </div>
    </article>
  )
}
