import { useMemo, useEffect } from 'react'
import useSSR from 'use-ssr'
import { RequestInitJSON, OptionsMaybeURL } from './types'

/**
 * Used for error checking. If the condition is false, throw an error
 */
export function invariant(
  condition: boolean,
  format: string,
  a: string = '',
  b: string = '',
  c: string = '',
  d: string = '',
  e: string = '',
  f: string = '',
): void {
  if (process.env.NODE_ENV !== 'production') {
    if (format === undefined) {
      throw new Error('invariant requires an error message argument')
    }
  }

  if (!condition) {
    var error
    if (format === undefined) {
      error = new Error(
        'Minified exception occurred; use the non-minified dev environment ' +
        'for the full error message and additional helpful warnings.'
      )
    } else {
      var args = [a, b, c, d, e, f]
      var argIndex = 0
      error = new Error(
        format.replace(/%s/g, (): string => args[argIndex++])
      )
      error.name = 'Invariant Violation'
    }

    throw error
  }
}

export const useExampleURL = (): string => {
  const { isBrowser } = useSSR()
  return useMemo((): string => isBrowser ? window.location.origin as string : 'https://example.com', [isBrowser])
}

export function useURLRequiredInvariant(condition: boolean, method: string, optionalMessage?: string): void {
  const exampleURL = useExampleURL()
  useEffect((): void => {
    invariant(
      condition,
      `${method} requires a URL to be set as the 1st argument,\n
      unless you wrap your app like:\n
      <Provider url="${exampleURL}"><App /></Provider>\n
      ${optionalMessage}`
    )
  }, [condition, exampleURL, method, optionalMessage])
}

export const isString = (x: any): boolean => typeof x === 'string' // eslint-disable-line

/**
 * Makes an object that will match the standards of a normal fetch's options
 * aka: pulls out all useFetch's special options like "onMount"
 */
export const pullOutRequestInit = (options?: OptionsMaybeURL): RequestInitJSON => {
  if (!options) return {}
  const requestInitFields = [
    'body',
    'cache',
    'credentials',
    'headers',
    'integrity',
    'keepalive',
    'method',
    'mode',
    'redirect',
    'referrer',
    'referrerPolicy',
    'signal',
    'window',
  ] as (keyof RequestInitJSON)[]
  return requestInitFields.reduce((acc: RequestInitJSON, key: keyof RequestInitJSON): RequestInitJSON => {
    if (key in options) acc[key] = options[key]
    return acc
  }, {})
}

/**
 * Determines if the given param is an object. {}
 * @param obj
 */
export const isObject = (obj: any): boolean => Object.prototype.toString.call(obj) === '[object Object]' // eslint-disable-line
