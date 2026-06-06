export default function Loader({ message = 'Cargando películas...' }) {
  return (
    <div className="loader-container">
      <div className="loader-spinner" />
      <p className="loader-text">{message}</p>
    </div>
  )
}
