// ** React Imports
import { useEffect, useState } from 'react'

export default function useDebounce<T>(value: T, delay?: number): T {
  // ** States
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  // ** Side Effects
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500)

    return () => {
      clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue
}
