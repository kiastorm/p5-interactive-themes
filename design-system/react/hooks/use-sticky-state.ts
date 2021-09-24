import { useCallback, useEffect, useState } from 'react'

export const useStickyState = <T extends any>(key: string, initialState: T) => {
  const [value, setValue] = useState<T>(() => {
    const stickyValue = window.localStorage.getItem(key)

    return stickyValue ? JSON.parse(stickyValue) : initialState
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}

type InitialState = boolean

/**
 * React hook to manage boolean (on - off) states
 *
 * @param initialState the initial boolean state value
 */
export const useStickyBoolean = (
  key: string,
  initialState: InitialState = false
) => {
  const [value, setValue] = useStickyState(key, initialState)

  const on = useCallback(() => {
    setValue(true)
  }, [])

  const off = useCallback(() => {
    setValue(false)
  }, [])

  const toggle = useCallback(() => {
    setValue((prev) => !prev)
  }, [])

  return [value, { on, off, toggle }] as const
}
