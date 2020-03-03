import React, { ReactElement, ReactNode } from 'react'
import { useFetch, Provider } from '..'
import { cleanup } from '@testing-library/react'
import { FetchMock } from 'jest-fetch-mock'
import { Res, Options, CachePolicies } from '../types'
import { toCamel } from 'convert-keys'

const fetch = global.fetch as FetchMock

import { renderHook, act } from '@testing-library/react-hooks'

const { NO_CACHE } = CachePolicies

// Provider Tests =================================================
/**
 * Test Cases
 * Provider:
 * 1. URL only
 * 2. Options only
 * 3. graphql only
 * 4. URL and Options only
 * 5. URL and graphql only
 * 6. Options and graphql only
 * 7. URL and graphql and Options
 * useFetch:
 * A. const [data, loading, error, request] = useFetch()
 * B. const {data, loading, error, request} = useFetch()
 * C. const [data, loading, error, request] = useFetch('http://url.com')
 * D. const [data, loading, error, request] = useFetch('http://url.com', { onMount: true })
 * E. const [data, loading, error, request] = useFetch({ onMount: true })
 * F. const [data, loading, error, request] = useFetch({ url: 'http://url.com' })
 * G. const [data, loading, error, request] = useFetch(oldOptions => ({ ...newOptions }))
 * H. const [data, loading, error, request] = useFetch('http://url.com', oldOptions => ({ ...newOptions }))
 * Errors:
 * SSR Tests:
 */

/**
 * Tests to add:
 * - FormData
 * - React Native
 * - more `interceptor` tests. Specifically for the `data` that is not in the `response` object
 */

describe('useFetch - BROWSER - basic functionality', (): void => {
  const expected = {
    name: 'Alex Cory',
    age: 29,
  }

  const wrapper = ({ children }: { children?: ReactNode }): ReactElement => <Provider url="https://example.com" options={{ cachePolicy: NO_CACHE }}>{children}</Provider>

  afterEach((): void => {
    cleanup()
    fetch.resetMocks()
  })

  beforeEach((): void => {
    fetch.mockResponseOnce(
      JSON.stringify(expected),
    )
  })

  it('should execute GET command with object destructuring', async (): Promise<
    void
  > => {
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch('https://example.com', []), // onMount === true
      { wrapper: wrapper as React.ComponentType }
    )

    expect(result.current.data).toBe(undefined)
    expect(result.current.loading).toBe(true)
    expect(result.current.error).toBe(undefined)
    expect(result.current.request.data).toBe(undefined)
    expect(result.current.response.data).toEqual(undefined)
    expect(result.current.request.loading).toBe(true)

    await waitForNextUpdate()

    expect(result.current.request.data).toEqual(expected)
    expect(result.current.data).toEqual(expected)
    expect(result.current.response.data).toEqual(expected)
    expect(result.current.request.loading).toBe(false)
    expect(result.current.loading).toBe(false)

    expect(typeof result.current.get).toBe('function')
    expect(typeof result.current.post).toBe('function')
    expect(typeof result.current.patch).toBe('function')
    expect(typeof result.current.put).toBe('function')
    expect(typeof result.current.delete).toBe('function')
    expect(typeof result.current.del).toBe('function')
    expect(typeof result.current.abort).toBe('function')
    expect(typeof result.current.query).toBe('function')
    expect(typeof result.current.mutate).toBe('function') 
  })

  it('should execute GET command with arrray destructuring', async (): Promise<
    void
  > => {
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch('https://example.com', []), // onMount === true
      { wrapper: wrapper as React.ComponentType }
    )

    var [request, response, loading, error] = result.current
    expect(request.loading).toBe(true)
    expect(loading).toBe(true)
    expect(error).toBe(undefined)
    await waitForNextUpdate()
    var [request, response, loading, error] = result.current
    expect(response.data).toEqual(expected)
    expect(request.loading).toBe(false)
    expect(loading).toBe(false)
  })
})

describe('useFetch - BROWSER - with <Provider />', (): void => {
  const expected = {
    name: 'Alex Cory',
    age: 29,
  }

  const wrapper = ({ children }: { children?: ReactNode }): ReactElement => (
    <Provider url='https://example.com' options={{ cachePolicy: NO_CACHE }}>{children}</Provider>
  )

  afterEach((): void => {
    cleanup()
    fetch.resetMocks()
  })

  beforeEach((): void => {
    fetch.mockResponseOnce(
      JSON.stringify(expected),
    )
  })

  it('should work correctly: useFetch({ onMount: true, data: [] })', async (): Promise<
    void
  > => {
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch({ data: {} }, []), // onMount === true
      { wrapper }
    )

    expect(result.current.data).toEqual({})
    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toMatchObject(expected)
  })

  it('should execute GET using Provider url', async (): Promise<
    void
  > => {
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch({ data: {} }, []), // onMount === true
      { wrapper }
    )

    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toMatchObject(expected)
  })

  it('should execute GET using Provider url: request = useFetch(), request.get()', async (): Promise<
    void
  > => {
    const { result } = renderHook(() => useFetch(), { wrapper })
    expect(result.current.loading).toBe(false)
    await result.current.get()
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toMatchObject(expected)
  })

  it('should execute GET using Provider url: request = useFetch(), request.get("/people")', async (): Promise<
    void
  > => {
    const { result } = renderHook(() => useFetch(), { wrapper })
    expect(result.current.loading).toBe(false)
    await result.current.get('/people')
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toMatchObject(expected)
  })

  it('should merge the data onNewData for pagination', async (): Promise<
    void
  > => {
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch({
        path: '/people',
        data: { no: 'way' },
        onNewData: (currData, newData) => ({ ...currData, ...newData }),
      }, []), // onMount === true
      { wrapper }
    )
    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toEqual({
      ...expected,
      no: 'way'
    })
  })

  it('should not make another request when there is no more data `perPage` pagination', async (done): Promise<
    void
  > => {
    fetch.resetMocks()
    const expected1 = [1, 2, 3]
    fetch.mockResponse(
      JSON.stringify(expected1),
    )
    let page = 1
    const { result, rerender, waitForNextUpdate } = renderHook(
      () => useFetch(`https://example.com?page=${page}`, {
        data: [],
        perPage: 3,
        onNewData: (currData, newData) => {
          // to imitate getting a response with less items
          if (page === 2) return [...currData, 4]
          return [...currData, ...newData]
        },
      }, [page]), // onMount === true
    )
    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toEqual(expected1)
    page = 2
    rerender()
    await waitForNextUpdate()
    expect(result.current.data).toEqual([...expected1, 4])
    expect(fetch.mock.calls.length).toBe(2)
    page = 3
    rerender()
    expect(result.current.data).toEqual([...expected1, 4])
    expect(fetch.mock.calls.length).toBe(2)
    done()
  })

  it('should execute GET using Provider url: useFetch({ path: "/people" }, [])', async (): Promise<
    void
  > => {
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch({ path: '/people' }, []), // onMount === true
      { wrapper }
    )
    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toMatchObject(expected)
    // TODO: test if you do a post('/alex'), if the url is /people/alex
  })
})

describe('timeouts', (): void => {
  const wrapper = ({ children }: { children?: ReactNode }): ReactElement => (
    <Provider url='https://example.com' options={{ cachePolicy: NO_CACHE }}>{children}</Provider>
  )
  const timeout = 10

  afterEach((): void => {
    fetch.resetMocks()
    cleanup()
    jest.useRealTimers()
  })

  beforeEach((): void => {
    fetch.resetMocks()
    fetch.mockReject((): any => {
      jest.advanceTimersByTime(timeout)
      return Promise.reject({ name: 'AbortError', message: 'The user aborted a request.' })
    })
    jest.useFakeTimers()
  })

  it(`should execute GET and timeout after ${timeout}ms, and fire 'onTimeout' and 'onAbort'`, async (): Promise<
    void
  > => {
    const onAbort = jest.fn()
    const onTimeout = jest.fn()
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch({
        timeout,
        onAbort,
        onTimeout,
      }, []), // onMount === true
      { wrapper }
    )
    expect(fetch).toHaveBeenCalledTimes(0)
    expect(onAbort).not.toBeCalled()
    expect(onTimeout).not.toBeCalled()
    expect(onAbort).toHaveBeenCalledTimes(0)
    expect(onTimeout).toHaveBeenCalledTimes(0)
    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
    expect(result.current.loading).toBe(false)
    expect(result.current.error.name).toBe('AbortError')
    expect(result.current.error.message).toBe('Timeout Error')
    expect(onAbort).toBeCalled()
    expect(onTimeout).toBeCalled()
    expect(onAbort).toHaveBeenCalledTimes(1)
    expect(onTimeout).toHaveBeenCalledTimes(1)
  })

  it(`should execute GET, fail after ${timeout}ms, then retry 1 additional time`, async (): Promise<
    void
  > => {
    const onAbort = jest.fn()
    const onTimeout = jest.fn()
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch({
        retries: 1,
        timeout,
        path: '/todos',
        onAbort,
        onTimeout,
      }, []), // onMount === true
      { wrapper }
    )
    expect(onAbort).not.toBeCalled()
    expect(onTimeout).not.toBeCalled()
    expect(onAbort).toHaveBeenCalledTimes(0)
    expect(onTimeout).toHaveBeenCalledTimes(0)
    expect(result.current.loading).toBe(true)

    await waitForNextUpdate()
    expect(fetch.mock.calls[0][0]).toBe('https://example.com/todos')
    expect(fetch).toHaveBeenCalledTimes(2)
    expect(result.current.loading).toBe(false)
    expect(result.current.error.name).toBe('AbortError')
    expect(result.current.error.message).toBe('Timeout Error')
    expect(onAbort).toBeCalled()
    expect(onTimeout).toBeCalled()
    expect(onAbort).toHaveBeenCalledTimes(2)
    expect(onTimeout).toHaveBeenCalledTimes(2)
  })
})

describe('caching - useFetch - BROWSER', (): void => {
  const expected = { title: 'Alex Cory' }

  afterEach((): void => {
    fetch.resetMocks()
    cleanup()
  })

  beforeEach((): void => {
    jest.useRealTimers()
    fetch.mockResponse(JSON.stringify(expected))
  })

  it('should not make a second request to the same url + route for `cache-first` cachePolicy', async (done): Promise<void> => {
    // run the request on mount
    const { result, waitForNextUpdate } = renderHook(() => useFetch('https://example.com/todos', []))
    try {
      expect(result.current.loading).toBe(true)
      await waitForNextUpdate()
      expect(result.current.loading).toBe(false)
      expect(result.current.data).toEqual(expected)
      // make a 2nd request
      const responseData = await result.current.get()
      expect(responseData).toEqual(expected)
      expect(result.current.data).toEqual(expected)
      expect(fetch.mock.calls.length).toBe(1)
      expect(result.current.loading).toBe(false)
      done()
    } catch (err) {
      done(err)
    }
  })

  it('should make a second request if cacheLife has exprired. `cache-first` cachePolicy', async (done): Promise<void> => {
    // TODO: this test is extra brittle. I've tried many things.
    // if it fails, try restarting your tests entirely.
    fetch.resetMocks()
    fetch.mockResponse(JSON.stringify(expected))
    // run the request on mount
    const { result, waitForNextUpdate } = renderHook(() => useFetch('https://example.com', {
      cacheLife: .01
    }, []))
    try {
      expect(result.current.loading).toBe(true)
      await waitForNextUpdate({ timeout: 10 })
      expect(result.current.loading).toBe(false)
      expect(result.current.data).toEqual(expected)
      expect(fetch.mock.calls.length).toEqual(1)
      // make a 2nd request
      await act(async () => {
        await result.current.get()
      })
      expect(result.current.data).toEqual(expected)
      // since the request most likely took longer than 1ms, we have 2 http requests
      expect(fetch.mock.calls.length).toBe(2)
      expect(result.current.loading).toBe(false)
      done()
    } catch (err) {
      done(err)
    }
  })
})

describe('useFetch - BROWSER - with <Provider /> - Managed State', (): void => {
  const expected = { title: 'Alex Cory' }
  const second = { title: 'Max Quinn' }

  const wrapper = ({ children }: { children?: ReactNode }): ReactElement => (
    <Provider url='https://example.com'>{children}</Provider>
  )

  afterEach((): void => {
    fetch.resetMocks()
    cleanup()
  })

  beforeEach((): void => {
    fetch.once(JSON.stringify(expected)).once(JSON.stringify(second))
  })

  it('should return response data when awaiting. i.e. const todos = await get("/todos")', async (): Promise<void> => {
    const { result } = renderHook(
      () => useFetch(),
      { wrapper: wrapper as React.ComponentType }
    )
    expect(result.current.loading).toBe(false)
    const responseData = await result.current.post('/people', expected)
    expect(responseData).toEqual(expected)
    expect(result.current.data).toEqual(expected)
    expect(result.current.loading).toBe(false)
  })

  it('should re-run the request when onUpdate dependencies are updated', async (): Promise<void> => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      ({ initialValue }) => useFetch({
        path: `/${initialValue}`,
        data: {},
      }, [initialValue]), // (onMount && onUpdate) === true
      {
        wrapper,
        initialProps: { initialValue: 0 },
      },
    )
    // Default data
    expect(result.current.data).toEqual({})

    // Expected First Payload
    await waitForNextUpdate()
    expect(result.current.data).toEqual(expected)

    // Expected Second Payload
    rerender({ initialValue: 1 })
    await waitForNextUpdate()
    expect(result.current.data).toEqual(second)
  })

  it('should fetch cached data when cached path is requested', async (): Promise<void> => {
    const { result, waitForNextUpdate, rerender } = renderHook(
      ({ initialValue }) => useFetch({
        path: `/${initialValue}`,
        data: {},
      }, [initialValue]), // (onMount && onUpdate) === true
      {
        wrapper,
        initialProps: {
          initialValue: 0,
        },
      },
    )
    // Default data
    expect(result.current.data).toEqual({})

    // Expected First payload
    await waitForNextUpdate()
    expect(result.current.data).toEqual(expected)

    // Expected second payload
    rerender({ initialValue: 1 })
    await waitForNextUpdate()
    expect(result.current.data).toEqual(second)

    //Expected first payload again
    rerender({ initialValue: 0 })
    await waitForNextUpdate()
    expect(result.current.data).toEqual(expected)
  })
})

describe('useFetch - BROWSER - interceptors', (): void => {
  const snake_case = { title: 'Alex Cory', first_name: 'Alex' }
  const expected = { title: 'Alex Cory', firstName: 'Alex' }

  const wrapper = ({ children }: { children?: ReactNode }): ReactElement => {
    const options: Options = {
      interceptors: {
        request: async (opts, url, path, route) => {
          if (path === '/path') {
            opts.data = 'path'
          }
          if (url === 'url') {
            opts.data = 'url'
          }
          if (route === '/route') {
            opts.data = 'route'
          }
          return opts
        },
        response(res) {
          if (res.data) res.data = toCamel(res.data)
          return res
        },
      },
      cachePolicy: NO_CACHE
    }
    return (
      <Provider url='https://example.com' options={options}>{children}</Provider>
    )
  }

  afterEach((): void => {
    fetch.resetMocks()
    cleanup()
  })

  beforeEach((): void => {
    fetch.mockResponseOnce(
      JSON.stringify(snake_case),
    )
  })

  it ('should pass the proper response object for `interceptors.response`', async (): Promise<void> => {
    const { result } = renderHook(
      () => useFetch(),
      { wrapper }
    )
    await result.current.get()
    expect(result.current.response.ok).toBe(true)
    expect(result.current.response.data).toEqual(expected)
  })

  it ('should have the `data` field correctly set when using a response interceptor', async (): Promise<void> => {
    const { result } = renderHook(
      () => useFetch(),
      { wrapper }
    )
    await result.current.get()
    expect(result.current.response.ok).toBe(true)
    expect(result.current.data).toEqual(expected)
  })

  it ('should pass the proper path string to `interceptors.request`', async (): Promise<void> => {
    const { result } = renderHook(
      () => useFetch({ path: '/path' }),
      { wrapper }
    )
    await result.current.get()
    expect((fetch.mock.calls[0][1] as any).data).toEqual('path')
  })

  it ('should pass the proper route string to `interceptors.request`', async (): Promise<void> => {
    const { result } = renderHook(
      () => useFetch(),
      { wrapper }
    )
    await result.current.get('/route')
    expect((fetch.mock.calls[0][1] as any).data).toEqual('route');
  })

  it ('should pass the proper url string to `interceptors.request`', async (): Promise<void> => {
    const { result } = renderHook(
      () => useFetch('url'),
      { wrapper }
    )
    await result.current.get()
    expect((fetch.mock.calls[0][1] as any).data).toEqual('url');
  })
})


describe('useFetch - BROWSER - Overwrite Global Options set in Provider', (): void => {
  const providerHeaders = {
    Authorization: 'Bearer TOKEN'
  }

  const wrapper = ({ children }: { children?: ReactNode }): ReactElement => {
    const options = { headers: providerHeaders, cachePolicy: NO_CACHE }
    return <Provider url='https://example.com' options={options}>{children}</Provider>
  }

  afterEach((): void => {
    fetch.resetMocks()
    cleanup()
  })

  beforeEach((): void => {
    fetch.mockResponseOnce(JSON.stringify({}))
  })

  it('should only add Content-Type: application/json for POST and PUT by default', async (): Promise<void> => {
    const expectedHeadersGET = providerHeaders
    const expectedHeadersPOSTandPUT = {
      ...providerHeaders,
      'Content-Type': 'application/json'
    }
    const { result } = renderHook(
      () => useFetch(),
      { wrapper }
    )
    await result.current.get()
    expect(fetch.mock.calls[0][0]).toBe('https://example.com')
    expect((fetch.mock.calls[0][1] as any).headers).toEqual(expectedHeadersGET)
    await result.current.post()
    expect((fetch.mock.calls[1][1] as any).headers).toEqual(expectedHeadersPOSTandPUT)
    await result.current.put()
    expect((fetch.mock.calls[2][1] as any).headers).toEqual(expectedHeadersPOSTandPUT)
    expect(fetch).toHaveBeenCalledTimes(3)
  })

  it('should have the correct headers set in the options set in the Provider', async (): Promise<void> => {
    const expectedHeaders = providerHeaders
    const { result } = renderHook(
      () => useFetch(),
      { wrapper }
    )
    await result.current.get()
    expect(fetch.mock.calls[0][0]).toBe('https://example.com')
    expect((fetch.mock.calls[0][1] as any).headers).toEqual(expectedHeaders)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should overwrite url and options set in the Provider', async (): Promise<void> => {
    const expectedHeaders = undefined
    const expectedURL = 'https://example2.com'
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch(expectedURL, globalOptions => {
        // TODO: fix the generics here so it knows when a header
        // such as Authorization is set
        delete (globalOptions.headers as any).Authorization
        return { ...globalOptions }
      }, []), // onMount === true
      { wrapper }
    )
    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
    expect(fetch.mock.calls[0][0]).toBe(expectedURL)
    expect((fetch.mock.calls[0][1] as any).headers).toEqual(expectedHeaders)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should overwrite options set in the Provider', async (): Promise<void> => {
    const expectedHeaders = undefined
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch(globalOptions => {
        // TODO: fix the generics here so it knows when a header
        // such as Authorization is set
        delete (globalOptions.headers as any).Authorization
        return { ...globalOptions }
      }, []), // onMount === true
      { wrapper }
    )
    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
    expect(fetch.mock.calls[0][0]).toBe('https://example.com')
    expect((fetch.mock.calls[0][1] as any).headers).toEqual(expectedHeaders)
    expect(fetch).toHaveBeenCalledTimes(1)
  })
})


describe('useFetch - BROWSER - errors', (): void => {
  const expectedError = { name: 'error', message: 'error' }
  const expectedSuccess = { name: 'Alex Cory' }

  afterEach((): void => {
    fetch.resetMocks()
    cleanup()
  })

  beforeEach((): void => {
    fetch.mockRejectOnce(expectedError)
    fetch.mockResponseOnce(JSON.stringify(expectedSuccess))
  })

  it('should set the `error` object when response.ok is false', async (): Promise<void> => {
    fetch.resetMocks()
    fetch.mockResponseOnce('fail', {
      status: 401,
    })
    const { result } = renderHook(
      () => useFetch({
        url: 'https://example.com',
        data: [],
        cachePolicy: NO_CACHE
      }),
    )
    expect(result.current.data).toEqual([])
    expect(result.current.loading).toBe(false)
    await result.current.get()
    expect(result.current.error).toEqual({
      name: 401,
      message: 'Unauthorized'
    })
    expect(result.current.data).toEqual([])
  })

  it('should reset the error after each call', async (): Promise<void> => {
    const { result } = renderHook(
      () => useFetch('https://example.com', { cachePolicy: NO_CACHE }),
    )
    expect(result.current.loading).toBe(false)
    await result.current.get()
    expect(result.current.error).toEqual(expectedError)
    await result.current.get()
    expect(result.current.error).toBe(undefined)
    expect(result.current.data).toEqual(expectedSuccess)
  })

  it('should leave the default `data` as array if response is undefined or error', async (): Promise<void> => {
    const { result } = renderHook(
      () => useFetch({
        url: 'https://example.com',
        data: [],
        cachePolicy: NO_CACHE
      }),
    )
    expect(result.current.data).toEqual([])
    expect(result.current.loading).toBe(false)
    await result.current.get()
    expect(result.current.error).toEqual(expectedError)
    expect(result.current.data).toEqual([])
  })

  const wrapperCustomError = ({ children }: { children?: ReactNode }): ReactElement => {
    const options = {
      interceptors: {
        response(res: Res<any>): Res<any> {
          if (!res.ok) throw expectedError
          return res
        }
      },
      cachePolicy: NO_CACHE
    }
    return (
      <Provider url='https://example.com' options={options}>{children}</Provider>
    )
  }

  it ('should set the `error` properly for `interceptors.response`', async (): Promise<void> => {
    const { result } = renderHook(
      () => useFetch(),
      { wrapper: wrapperCustomError }
    )
    await result.current.get()
    expect(result.current.response.ok).toBe(undefined)
    expect(result.current.response).toEqual({})
    expect(result.current.error).toEqual(expectedError)
  })

  it ('should set the `error` properly for `interceptors.response` onMount', async (): Promise<void> => {
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch('https://example.com', []), // onMount === true
      { wrapper: wrapperCustomError }
    )
    await waitForNextUpdate()
    expect(result.current.response.ok).toBe(undefined)
    expect(result.current.error).toEqual(expectedError)
  })
})
