import { useEffect, useState, useCallback, useRef, useContext, useMemo } from 'react'
import FetchContext from './FetchContext'
import { HTTPMethod, /* Options, */ UseFetch, FetchCommands, DestructuringCommands, UseFetchResult } from "./types"
import { invariant, isObject, isString, pullOutRequestInit } from './utils'

type UseFetchBaseOptions = {
  onMount?: boolean,
  timeout?: number
}

type OptionsNoURLs = UseFetchBaseOptions & RequestInit

// No Provider
type URLRequiredOptions = { url: string } & UseFetchBaseOptions & RequestInit

type BaseURLRequiredOptions = { baseURL: string } & UseFetchBaseOptions & RequestInit

type OptionsAsFirstParam = URLRequiredOptions | BaseURLRequiredOptions

// With Provider
type MaybeURLOptions = { url?: string } & UseFetchBaseOptions & RequestInit

type MaybeBaseURLOptions = { baseURL?: string } & UseFetchBaseOptions & RequestInit

type MaybeOptions = MaybeURLOptions | MaybeBaseURLOptions

// TODO: this is still yet to be implemented
type OptionsOverwriteWithContext = (options: MaybeOptions) => MaybeOptions

type OptionsAsFirstParamWithContext = MaybeOptions | OptionsOverwriteWithContext

// Putting it all together
type URLOrOptions = string | OptionsAsFirstParam | OptionsAsFirstParamWithContext

type UseFetchOptions = OptionsAsFirstParam | MaybeOptions
// type Options = OptionsAsFirstParam | OptionsAsFirstParamWithContext | OptionsNoURLs

// No <Provider url='example.com' />
export function useFetch<TData = any>(url: string, options?: OptionsNoURLs): UseFetch<TData>
export function useFetch<TData = any>(options: OptionsAsFirstParam): UseFetch<TData>
// With <Provider url='example.com' />
// options should be extended. In future maybe have options callback to completely overwrite options
// i.e. useFetch('ex.com', oldOptions => ({ ...newOptions })) to overwrite
export function useFetch<TData = any>(url?: string, options?: OptionsNoURLs): UseFetch<TData>
export function useFetch<TData = any>(options?: OptionsAsFirstParamWithContext): UseFetch<TData>

// TODO: handle context.graphql
export function useFetch<TData = any>(urlOrOptions?: URLOrOptions, optionsNoURLs?: OptionsNoURLs): UseFetch<TData> {
  const context = useContext(FetchContext)

  // TODO: this needs to be per initial setup below since we need to check urlOrOptions.url OR  urlOrOptions.baseUrl
  invariant(!!urlOrOptions && !!context.url, 'The first argument of useFetch is required unless you have a global url setup like: <Provider url="https://example.com"></Provider>')

  let url: string = context.url || ''
  let options: RequestInit = {}
  let onMount: boolean = false
  // let timeout: number = 10 // TODO: not implemented
  let baseURL: string = ''
  let method: HTTPMethod = HTTPMethod.GET

  const handleUseFetchOptions = useCallback((useFetchOptions?: UseFetchOptions): void => {
    const opts = useFetchOptions || {} as UseFetchOptions
    if ('onMount' in opts) onMount = opts.onMount as boolean
    // if (opts.timeout) timeout = opts.timeout
    if ('baseURL' in opts) baseURL = opts.baseURL as string
    if ('url' in opts) url = opts.url as string
  }, [])

  // arg1 = url AND arg2 = options
  if (isString(urlOrOptions) && isObject(optionsNoURLs)) {
    url = urlOrOptions as string
    options = pullOutRequestInit(optionsNoURLs)
    // currenlty this should only set onMount or timeout
    handleUseFetchOptions(optionsNoURLs)

  // arg1 = url AND arg2 = undefined
  } else if (isString(urlOrOptions) && optionsNoURLs === undefined) {
    url = urlOrOptions as string

  // arg1 = options with baseURL and no URL
  // arg1 = options with URL and no baseURL
  } else if (isObject(urlOrOptions)) {
    invariant(!optionsNoURLs, 'You cannot have a 2nd parameter of useFetch when your first argument is a object config.')
    // I think the types should handle if a `url` and a `baseURL` are both set, TODO: make test for this
    // I also think it should handle if a `url` and a `baseURL` are both not set. TODO: make test for this
    // note on these^ could check with an invariant for both cases in `handleUseFetchOptions`
    options = pullOutRequestInit(urlOrOptions)
    handleUseFetchOptions(urlOrOptions as OptionsAsFirstParam)
  
  // Provider: arg1 = undefined
  } else if (urlOrOptions === undefined) {
    invariant(!!context.url, 'The first argument of useFetch is required unless you have a global url setup like: <Provider url="https://example.com"></Provider>')
    url = context.url as string

  // Provider: arg1 = url (overwrites global url) AND arg2 = options (extend global options)
  } else if (isString(urlOrOptions) && isObject(optionsNoURLs)) {
    url = urlOrOptions as string
    options = pullOutRequestInit(optionsNoURLs)
    handleUseFetchOptions(optionsNoURLs)

  // Provider: arg1 = url (overwrites global url) AND arg2 = undefined
  } else if (isObject(urlOrOptions) && optionsNoURLs === undefined) {
    url = urlOrOptions as string

  // Provider: arg1 = options (updates global options) - overwrites URL and no baseURL
  // Provider: arg1 = options (updates global options) - overwrites baseURL and no URL
  // Provider: arg1 = options (updates global options) - overwrites any other field
  } else if (isObject(urlOrOptions)) {
    options = pullOutRequestInit(urlOrOptions)
    handleUseFetchOptions(optionsNoURLs)
  }
  // TODO - Provider: arg1 = oldGlobalOptions => ({ my: 'new local options'}) (overwrite all global options for this instance of useFetch)

  // const handleOptions = useCallback((opts: Options & RequestInit) => {
  //   if (true) {
  //     // take out all the things that are not normal `fetch` options
  //     // need to take this out of scope so can set the variables below correctly
  //     let { url, onMount, timeout, baseURL, ...rest } = opts
  //     options = { signal: undefined, ...rest }
  //   }
  //   if (context.url) url = context.url
  //   if (opts.url) url = opts.url || context.url || ''
  //   if (opts.onMount) onMount = opts.onMount
  //   if (opts.method) method = opts.method
  //   if (opts.baseURL) baseURL = opts.baseURL
  // }, [])

  // if (typeof arg1 === 'string') {
  //   // if we have a default url from context, and
  //   // arg1 is a string, and we're not using graphql
  //   // we treat arg1 as a relative route
  //   url = context.url && !context.graphql ? context.url + arg1 : arg1

  //   if (arg2 && isObject(arg2)) handleOptions(arg2)

  // } else if (isObject(arg1)) {
  //   handleOptions(arg1 || {})
  // }

  // TODO:
  // Mutation: arg1 = url AND arg2 = mutationString
  // Query
  const makeFetch = useCallback((method: HTTPMethod) => {
    if ('AbortController' in window) {
      controller.current = new AbortController()
      options.signal = controller.current.signal
    }
    // Get
    async function doFetch(route?: string): Promise<void>
    // Post, Patch, Put, Delete
    async function doFetch(route?: string, body?: object): Promise<void>
    async function doFetch(body?: object): Promise<void>
    async function doFetch(routeOrBody?: string | object, bodh?: object): Promise<void> {
      // Post, Patch, Put, Delete
      if (method !== HTTPMethod.GET) {
      
      } else if (isObject(routeOrBody)) {
      }
      // arg1 = route AND arg2 = body
      // arg1 = string AND arg2 = optinos

    }
    return doFetch
  }, [url])

  const [data, setData] = useState<TData>()
  const [loading, setLoading] = useState(onMount)
  const [error, setError] = useState<any>()
  const controller = useRef<AbortController | null>()

  const fetchData = useCallback(
    (method: string) => async (fetchArg1?: object | string, fetchArg2?: object | string) => {
      if ('AbortController' in window) {
        controller.current = new AbortController()
        options.signal = controller.current.signal
      }

      let query = ''
      // post | patch | put | etc.
      if (isObject(fetchArg1) && method.toLowerCase() !== 'get') {
        options.body = JSON.stringify(fetchArg1)

      // relative routes
      } else if (baseURL && typeof fetchArg1 === 'string') {
        url = baseURL + fetchArg1
        if (isObject(fetchArg2)) options.body = JSON.stringify(fetchArg2)
      }
      if (typeof fetchArg1 === 'string' && typeof fetchArg2 === 'string') query = fetchArg2

      try {
        setLoading(true)
        const response = await fetch(url + query, {
          method,
          ...context.options,
          ...options,
          headers: {
            // default content types http://bit.ly/2N2ovOZ
            Accept: 'application/json', 
            'Content-Type': 'application/json',
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
        setLoading(false)
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

  const request: FetchCommands = useMemo(() => ({ get, post, patch, put, del, delete: del, abort, query, mutate }), [])

  useEffect(() => {
    const methodName = method.toLowerCase() as keyof typeof request
    if (onMount) request[methodName]()
  }, [])

  return Object.assign<DestructuringCommands<TData>, UseFetchResult<TData>>(
    [data, loading, error, request],
    { data, loading, error, request, ...request }
  )
}

export default useFetch
