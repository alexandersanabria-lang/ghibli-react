import { NavLink } from 'react-router-dom'
import { Wind, Film, Home } from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <Wind size={22} strokeWidth={1.5} />
          <span>Ghibli Films</span>
        </NavLink>
        <nav className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <Home size={15} />
            Home
          </NavLink>
          <NavLink to="/entities" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            <Film size={15} />
            Películas
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
