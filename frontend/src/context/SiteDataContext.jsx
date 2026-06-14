import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import api from '../utils/api'

const SiteDataContext = createContext(null)

export function SiteDataProvider({ children }) {
  const [settings, setSettings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchSettings = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const { data } = await api.get('/settings')
      setSettings(data.data || data)
    } catch (err) {
      setError(err.message || 'Failed to load site settings')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchSettings()
  }, [fetchSettings])

  return (
    <SiteDataContext.Provider value={{ settings, loading, error, refetch: fetchSettings }}>
      {children}
    </SiteDataContext.Provider>
  )
}

export function useSiteData() {
  const context = useContext(SiteDataContext)
  if (!context) {
    throw new Error('useSiteData must be used within a SiteDataProvider')
  }
  return context
}
