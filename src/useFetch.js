import 'idempotent-babel-polyfill' // so async await works ;)
import { useEffect, useState, useCallback, useRef } from 'react'

const isObject = obj => Object.prototype.toString.call(obj) === '[object Object]'

export function useFetch(arg1, arg2) {
  let url = null
  let options = {}
  let onMount = false
  let baseUrl = ''
  let method = 'GET'

  const handleOptions = opts => {
    if (true) {
      // take out all the things that are not normal `fetch` options
      // need to take this out of scope so can set the variables below correctly
      let { url, onMount, timeout, baseUrl, ...rest } = opts
      options = rest
    }
    if (opts.url) url = opts.url
    if (opts.onMount) onMount = opts.onMount
    if (opts.method) method = opts.method
    if (opts.baseUrl) baseUrl = opts.baseUrl
  }

  if (typeof arg1 === 'string') {
    url = arg1
    if (isObject(arg2)) handleOptions(arg2)
  } else if (isObject(arg1)) {
    handleOptions(arg1)
  }

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(onMount)
  const [error, setError] = useState(null)
  const controller = useRef(null)
  const abortedCount = useRef(0)

  const fetchData = useCallback(method => async (fArg1, fArg2) => {
      if (controller.current !== null) {
        controller.current.abort()
        abortedCount.current++
      }

      if ('AbortController' in window) {
        controller.current = new AbortController()
        options.signal = controller.current.signal
      }

      let query = ''
      if (isObject(fArg1) && method.toLowerCase() !== 'get') {
        options.body = JSON.stringify(fArg1)
      } else if (baseUrl && typeof fArg1 === 'string') {
        url = baseUrl + fArg1
        if (isObject(fArg2)) options.body = JSON.stringify(fArg2)
      }
      if (typeof fArg1 === 'string' && typeof fArg2 === 'string') query = fArg2

      try {
        setLoading(true)
        const response = await fetch(url + query, {
          method,
          ...options
        })
        let data = null
        try {
          data = await response.json()
        } catch (err) {
          data = await response.text()
        }
        setData(data)
        controller.current = null
      } catch (err) {
        if (err.name !== 'AbortError') setError(err)
      } finally {
        setLoading(false)
      }
    },
    [url]
  )

  const get = useCallback(fetchData('GET'))
  const post = useCallback(fetchData('POST'))
  const patch = useCallback(fetchData('PATCH'))
  const put = useCallback(fetchData('PUT'))
  const del = useCallback(fetchData('DELETE'))

  const abort = () => {
    controller.current && controller.current.abort()
  }

  const request = { get, post, patch, put, del, delete: del, abort, abortedCount: abortedCount.current }

  useEffect(() => {
    if (onMount) request[method.toLowerCase()]()
    // can probably have the user do this with request.abort() if they want it
    // return () => {
    //   if (controller.current !== null) {
    //     controller.current.abort()
    //   }
    // }
  }, [])

  return Object.assign([data, loading, error, request], { data, loading, error, request, abort, ...request })
}

export default useFetch
