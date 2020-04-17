import { OptionsMaybeURL, NoUrlOptions, CachePolicies, Interceptors, OverwriteGlobalOptions, Options, RetryOn, RetryDelay, UseFetchArgsReturn, ResponseType, OnError } from './types'
import { isString, isObject, invariant, pullOutRequestInit, isFunction, isPositiveNumber } from './utils'
import { useContext, useMemo } from 'react'
import FetchContext from './FetchContext'
import defaults from './defaults'


const useField = <DV = any>(
  field: keyof OptionsMaybeURL | keyof NoUrlOptions,
  urlOrOptions?: string | OptionsMaybeURL,
  optionsNoURLs?: NoUrlOptions | any[]
) => {
  const context = useContext(FetchContext)
  const contextOptions = context.options || {}
  return useMemo((): DV => {
    if (isObject(urlOrOptions) && field in urlOrOptions) return urlOrOptions[field]
    if (isObject(optionsNoURLs) && field in optionsNoURLs) {
      return (optionsNoURLs as NoUrlOptions)[field as keyof NoUrlOptions]
    }
    if (field in contextOptions) return contextOptions[field]
    return defaults[field]
  }, [urlOrOptions, field, optionsNoURLs, contextOptions])
}

export default function useFetchArgs(
  urlOrOptionsOrOverwriteGlobal?: string | OptionsMaybeURL | OverwriteGlobalOptions,
  optionsNoURLsOrOverwriteGlobalOrDeps?: NoUrlOptions | OverwriteGlobalOptions | any[],
  deps?: any[]
): UseFetchArgsReturn {
  const context = useContext(FetchContext)
  context.options = useMemo(() => {
    const overwriteGlobalOptions = (isFunction(urlOrOptionsOrOverwriteGlobal) ? urlOrOptionsOrOverwriteGlobal : isFunction(optionsNoURLsOrOverwriteGlobalOrDeps) && optionsNoURLsOrOverwriteGlobalOrDeps) as OverwriteGlobalOptions
    if (!overwriteGlobalOptions) return context.options
    // make a copy so we make sure not to modify the original context
    return overwriteGlobalOptions({ ...context.options } as Options)
  }, [context.options, optionsNoURLsOrOverwriteGlobalOrDeps, urlOrOptionsOrOverwriteGlobal])

  const urlOrOptions = urlOrOptionsOrOverwriteGlobal as string | OptionsMaybeURL
  const optionsNoURLs = optionsNoURLsOrOverwriteGlobalOrDeps as NoUrlOptions

  invariant(
    !(isObject(urlOrOptions) && isObject(optionsNoURLs)),
    'You cannot have a 2nd parameter of useFetch when your first argument is an object config.'
  )

  const url = useMemo((): string => {
    if (isString(urlOrOptions) && urlOrOptions) return urlOrOptions as string
    if (isObject(urlOrOptions) && !!urlOrOptions.url) return urlOrOptions.url
    if (context.url) return context.url
    return defaults.url
  }, [context.url, urlOrOptions])

  invariant(
    !!url,
    'The first argument of useFetch is required unless you have a global url setup like: <Provider url="https://example.com"></Provider>'
  )

  const dependencies = useMemo((): any[] | undefined => {
    if (Array.isArray(optionsNoURLsOrOverwriteGlobalOrDeps)) return optionsNoURLsOrOverwriteGlobalOrDeps
    if (Array.isArray(deps)) return deps
    return defaults.dependencies
  }, [optionsNoURLsOrOverwriteGlobalOrDeps, deps])

  const data = useField('data', urlOrOptions, optionsNoURLs)
  const cacheLife = useField<number>('cacheLife', urlOrOptions, optionsNoURLs)
  invariant(Number.isInteger(cacheLife) && cacheLife >= 0, '`cacheLife` must be a number >= 0')
  const cachePolicy = useField<CachePolicies>('cachePolicy', urlOrOptions, optionsNoURLs)
  const onAbort = useField<() => void>('onAbort', urlOrOptions, optionsNoURLs)
  const onError = useField<OnError>('onError', urlOrOptions, optionsNoURLs)
  const onNewData = useField<() => void>('onNewData', urlOrOptions, optionsNoURLs)
  const onTimeout = useField<() => void>('onTimeout', urlOrOptions, optionsNoURLs)
  const path = useField<string>('path', urlOrOptions, optionsNoURLs)
  const perPage = useField<number>('perPage', urlOrOptions, optionsNoURLs)
  const persist = useField<boolean>('persist', urlOrOptions, optionsNoURLs)
  const responseType = useField<ResponseType>('responseType', urlOrOptions, optionsNoURLs)
  const retries = useField<number>('retries', urlOrOptions, optionsNoURLs)
  invariant(Number.isInteger(retries) && retries >= 0, '`retries` must be a number >= 0')
  const retryDelay = useField<RetryDelay>('retryDelay', urlOrOptions, optionsNoURLs)
  invariant(isFunction(retryDelay) || Number.isInteger(retryDelay as number) && retryDelay >= 0, '`retryDelay` must be a positive number or a function returning a positive number.')
  const retryOn = useField<RetryOn>('retryOn', urlOrOptions, optionsNoURLs)
  const isValidRetryOn = isFunction(retryOn) || (Array.isArray(retryOn) && retryOn.every(isPositiveNumber))
  invariant(isValidRetryOn, '`retryOn` must be an array of positive numbers or a function returning a boolean.')
  const suspense = useField<boolean>('suspense', urlOrOptions, optionsNoURLs)
  const timeout = useField<number>('timeout', urlOrOptions, optionsNoURLs)

  const loading = useMemo((): boolean => {
    if (isObject(urlOrOptions)) return !!urlOrOptions.loading || Array.isArray(dependencies)
    if (isObject(optionsNoURLs)) return !!optionsNoURLs.loading || Array.isArray(dependencies)
    return defaults.loading || Array.isArray(dependencies)
  }, [urlOrOptions, dependencies, optionsNoURLs])

  const interceptors = useMemo((): Interceptors => {
    const contextInterceptors = context.options && (context.options.interceptors || {})
    const final: Interceptors = { ...contextInterceptors }
    if (isObject(urlOrOptions) && isObject(urlOrOptions.interceptors)) {
      if (urlOrOptions.interceptors.request) final.request = urlOrOptions.interceptors.request
      if (urlOrOptions.interceptors.response) final.response = urlOrOptions.interceptors.response
    }
    if (isObject(optionsNoURLs) && isObject(optionsNoURLs.interceptors)) {
      if (optionsNoURLs.interceptors.request) final.request = optionsNoURLs.interceptors.request
      if (optionsNoURLs.interceptors.response) final.response = optionsNoURLs.interceptors.response
    }
    return final
  }, [context.options, urlOrOptions, optionsNoURLs])

  const requestInit = useMemo((): RequestInit => {
    const contextRequestInit = pullOutRequestInit(context.options as OptionsMaybeURL)

    const requestInitOptions = isObject(urlOrOptions)
      ? urlOrOptions
      : isObject(optionsNoURLs)
        ? optionsNoURLs
        : {}

    const requestInit = pullOutRequestInit(requestInitOptions)

    return {
      ...contextRequestInit,
      ...requestInit,
      headers: {
        ...defaults.headers,
        ...contextRequestInit.headers,
        ...requestInit.headers
      }
    }
  }, [context.options, urlOrOptions, optionsNoURLs])

  return {
    customOptions: {
      cacheLife,
      cachePolicy,
      interceptors,
      onAbort,
      onError,
      onNewData,
      onTimeout,
      path,
      persist,
      perPage,
      responseType,
      retries,
      retryDelay,
      retryOn,
      suspense,
      timeout,
      url,
    },
    requestInit,
    defaults: {
      data,
      loading
    },
    dependencies
  }
}
