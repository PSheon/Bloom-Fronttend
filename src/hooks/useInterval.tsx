// ** React Imports
import { useEffect, useRef } from 'react'

// ** Hook Imports
import { useIsomorphicLayoutEffect } from 'src/hooks/useIsomorphicLayoutEffect'

export function useInterval(callback: () => void, delay: number | null) {
  // ** Refs
  const savedCallback = useRef(callback)

  // Remember the latest callback if it changes.
  useIsomorphicLayoutEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // ** Side Effects
  useEffect(() => {
    // Don't schedule if no delay is specified.
    // Note: 0 is a valid value for delay.
    if (!delay && delay !== 0) {
      return
    }

    const id = setInterval(() => savedCallback.current(), delay)

    return () => clearInterval(id)
  }, [delay])
}
