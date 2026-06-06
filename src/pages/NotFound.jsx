import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="notfound">
      <p className="notfound-emoji animate-float">🍃</p>
      <h1 className="notfound-title">404</h1>
      <p className="notfound-text">Esta página se la llevó el viento...</p>
      <Link to="/" className="notfound-btn">Volver al inicio</Link>
    </div>
  )
}
