import { Wind } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Wind size={16} />
          <span>Ghibli Films</span>
        </div>
        <p className="footer-text">
          Datos provistos por{' '}
          <a href="https://ghibliapi.vercel.app" target="_blank" rel="noopener noreferrer">
            Ghibli API
          </a>
          {' '}· Proyecto académico Tecsup — Equipo 3
        </p>
      </div>
    </footer>
  )
}
