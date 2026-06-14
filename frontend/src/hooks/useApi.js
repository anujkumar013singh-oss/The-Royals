import { useState, useEffect, useCallback } from 'react'
import api from '../utils/api'

export function useApi(url, options = {}) {
  const { immediate = true, params = {} } = options
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(immediate)
  const [error, setError] = useState(null)

  const fetchData = useCallback(async (overrideParams) => {
    try {
      setLoading(true)
      setError(null)
      const { data: response } = await api.get(url, {
        params: overrideParams || params,
      })
      setData(response.data !== undefined ? response.data : response)
      return response
    } catch (err) {
      const message = err.response?.data?.message || err.message || 'An error occurred'
      setError(message)
      return null
    } finally {
      setLoading(false)
    }
  }, [url])

  useEffect(() => {
    if (immediate) {
      fetchData()
    }
  }, [immediate, fetchData])

  return { data, loading, error, refetch: fetchData }
}
