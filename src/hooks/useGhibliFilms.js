import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'

const API_URL = 'https://ghibliapi.vercel.app/films'
const FAVORITES_KEY = 'ghibli_favorites'

export function useGhibliFilms() {
  const [films, setFilms] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    const fetchFilms = async () => {
      try {
        setLoading(true)
        setError(null)
        const { data } = await axios.get(API_URL, {
          signal: controller.signal,
          timeout: 10000,
        })
        setFilms(data)
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err.message || 'Error al cargar las películas')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchFilms()
    return () => controller.abort()
  }, [])

  return { films, loading, error }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || []
    } catch {
      return []
    }
  })

  const toggleFavorite = useCallback((filmId) => {
    setFavorites(prev => {
      const next = prev.includes(filmId)
        ? prev.filter(id => id !== filmId)
        : [...prev, filmId]
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  const isFavorite = useCallback((filmId) => favorites.includes(filmId), [favorites])

  return { favorites, toggleFavorite, isFavorite }
}
