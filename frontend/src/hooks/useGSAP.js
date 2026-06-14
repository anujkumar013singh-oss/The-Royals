import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export function useGSAP(callback, deps = []) {
  const scopeRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      callback(gsap, scopeRef.current)
    }, scopeRef.current || undefined)

    return () => ctx.revert()
  }, deps)

  return scopeRef
}
