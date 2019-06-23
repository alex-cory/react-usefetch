import { useEffect, useState, useCallback, useRef, useContext, useMemo } from 'react'
import URLContext from './URLContext'
import { HTTPMethod } from "./types";
import { any } from "prop-types";

const isObject = (obj: any) => Object.prototype.toString.call(obj) === '[object Object]'

export interface Options {
  url?: string
  onMount?: boolean
  method?: string
  timeout?: number
  baseUrl?: string
}

export type FetchData = (fArg1?: string | object | undefined, fArg2?: string | object | undefined) => Promise<void>

export type UseFetch<TData> = {
  data?: TData,
  loading: boolean,
  error?: any,
  get: FetchData,
  post: FetchData,
  patch: FetchData,
  put: FetchData,
  del: FetchData,
  delete: FetchData,
  query: (query?: string | undefined, variables?: object | undefined) => Promise<void>,
  mutate: (mutation?: string | undefined, variables?: object | undefined) => Promise<void>,
  abort: () => void,
  request: {
    get: FetchData,
    post: FetchData,
    patch: FetchData,
    put: FetchData,
    del: FetchData,
    delete: FetchData,
    query: (query?: string | undefined, variables?: object | undefined) => Promise<void>,
    mutate: (mutation?: string | undefined, variables?: object | undefined) => Promise<void>,
    abort: () => void,
  },
}

type useFetchArg1 = string | Options & RequestInit

export function useFetch<TData = any>(arg1: useFetchArg1, arg2?: Options | RequestInit): UseFetch<TData> {
  const context = useContext(URLContext)
  let url: string | null = context.url || null
  let options = {} as { signal?: AbortSignal | null } & RequestInit
  let onMount = false
  let baseUrl = ''
  let method: string = HTTPMethod.GET

  const handleOptions = (opts: Options & RequestInit) => {
    if (true) {
      // take out all the things that are not normal `fetch` options
      // need to take this out of scope so can set the variables below correctly
      let { url, onMount, timeout, baseUrl, ...rest } = opts
      options = { signal: undefined, ...rest }
    }
    if (context.url) url = context.url
    if (opts.url) url = opts.url || context.url || ''
    if (opts.onMount) onMount = opts.onMount
    if (opts.method) method = opts.method
    if (opts.baseUrl) baseUrl = opts.baseUrl
  }

  if (typeof arg1 === 'string') {
    // if we have a default url from context, and
    // arg1 is a string, we treat it as a relative route
    url = context.url ? context.url + arg1 : arg1

    if (arg2 && isObject(arg2)) handleOptions(arg2)
  } else if (isObject(arg1)) {
    handleOptions(arg1)
  }

  const [data, setData] = useState<TData>()
  const [loading, setLoading] = useState(onMount)
  const [error, setError] = useState<any>()
  const controller = useRef<AbortController | null>()

  const fetchData = useCallback(
    (method: string) => async (fArg1?: object | string, fArg2?: object | string) => {
      if ('AbortController' in window) {
        controller.current = new AbortController()
        options.signal = controller.current.signal
      }

      let query = ''
      // post | patch | put | etc.
      if (isObject(fArg1) && method.toLowerCase() !== 'get') {
        options.body = JSON.stringify(fArg1)
        // relative routes
      } else if (baseUrl && typeof fArg1 === 'string') {
        url = baseUrl + fArg1
        if (isObject(fArg2)) options.body = JSON.stringify(fArg2)
      }
      if (typeof fArg1 === 'string' && typeof fArg2 === 'string') query = fArg2

      try {
        setLoading(true)
        const response = await fetch(url + query, {
          method,
          ...context.options,
          ...options,
          headers: {
            'Accept': 'application/json', // default content type http://bit.ly/2N2ovOZ
            ...(context.options || {}).headers,
            ...options.headers
          }
        })
        let data = null
        try {
          data = await response.json()
        } catch (err) {
          data = await response.text()
        }
        setData(data)
      } catch (err) {
        if (err.name !== 'AbortError') setError(err)
      } finally {
        controller.current = null
        //setLoading(false)
      }
    },
    [url]
  )

  const get = useCallback(fetchData(HTTPMethod.GET), [])
  const post = useCallback(fetchData(HTTPMethod.POST), [])
  const patch = useCallback(fetchData(HTTPMethod.PATCH), [])
  const put = useCallback(fetchData(HTTPMethod.PUT), [])
  const del = useCallback(fetchData(HTTPMethod.DELETE), [])
  const query = useCallback((query?: string, variables?: object) => post({ query, variables }), [])
  const mutate = useCallback((mutation?: string, variables?: object) => post({ mutation, variables }), [])

  const abort = useCallback(() => {
    controller.current && controller.current.abort()
  }, [])

  const request = useMemo(() => ({ get, post, patch, put, del, delete: del, abort, query, mutate }), [])

  useEffect(() => {
    const methodName = method.toLowerCase() as keyof typeof request
    if (onMount) request[methodName]()
  }, [])

  return Object.assign([data, loading, error, request], { data, loading, error, request, ...request })
}

export default useFetch
