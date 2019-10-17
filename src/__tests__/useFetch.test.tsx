import React, { ReactElement, ReactNode } from 'react'
import { useFetch, Provider } from '..'
import { cleanup } from '@testing-library/react'
import { FetchMock } from 'jest-fetch-mock'
import { Res } from '../types'
import { toCamel } from 'convert-keys'

const fetch = global.fetch as FetchMock

import { renderHook } from '@testing-library/react-hooks'

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

  const wrapper = ({ children }: { children: ReactElement }) => <Provider url="https://example.com">{children}</Provider>

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
      () => useFetch({ onMount: true }),
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
      () => useFetch({ onMount: true }),
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
    <Provider url='https://example.com'>{children as ReactElement}</Provider>
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
      () => useFetch({ onMount: true, data: {} }),
      { wrapper: wrapper as React.ComponentType }
    )

    expect(result.current.data).toEqual({})
    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toMatchObject(expected)
  })

  it('should execute GET using Provider url: useFetch({ onMount: true })', async (): Promise<
    void
  > => {
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch({ onMount: true }),
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
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch(),
      { wrapper }
    )
    expect(result.current.loading).toBe(false)
    result.current.get()
    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toMatchObject(expected)
  })

  it('should execute GET using Provider url: request = useFetch(), request.get("/people")', async (): Promise<
    void
  > => {
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch(),
      { wrapper }
    )
    expect(result.current.loading).toBe(false)
    result.current.get('/people')
    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
    expect(result.current.loading).toBe(false)
    expect(result.current.data).toMatchObject(expected)
  })

  it('should execute GET using Provider url: useFetch({ path: "/people", onMount: true })', async (): Promise<
    void
  > => {
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch({ path: '/people', onMount: true }),
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
    <Provider url='https://example.com'>{children as ReactElement}</Provider>
  )

  afterEach((): void => {
    fetch.resetMocks()
    cleanup()
  })

  beforeEach((): void => {
    fetch.mockResponse(
      () => new Promise((resolve, reject) => setTimeout(() => reject({ name: 'AbortError', message: 'The user aborted a request.' }), 100))
    )
  })

  it('should execute GET and timeout after 1000ms, and fire `onTimeout` and `onAbort`', async (done): Promise<
    void
  > => {
    const onAbort = { called: false, timesCalled: 0 }
    const onTimeout = { called: false, timesCalled: 0 }
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch({
        onMount: true,
        timeout: 10,
        onAbort() {
          onAbort.called = true
          onAbort.timesCalled += 1
        },
        onTimeout() {
          onTimeout.called = true
          onTimeout.timesCalled += 1
        }
      }),
      { wrapper }
    )
    expect(onAbort.called).toBe(false)
    expect(onTimeout.called).toBe(false)
    expect(onAbort.timesCalled).toBe(0)
    expect(onTimeout.timesCalled).toBe(0)
    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
    done()
    expect(fetch).toHaveBeenCalledTimes(1)
    expect(result.current.loading).toBe(false)
    expect(result.current.error.name).toBe('AbortError')
    expect(result.current.error.message).toBe('Timeout Error')
    expect(onAbort.called).toBe(true)
    expect(onTimeout.called).toBe(true)
    expect(onAbort.timesCalled).toBe(1)
    expect(onTimeout.timesCalled).toBe(1)
  })

  it('should execute GET, fail, then retry 1 additional time', async (done): Promise<
    void
  > => {
    const onAbort = { called: false, timesCalled: 0 }
    const onTimeout = { called: false, timesCalled: 0 }
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch({
        onMount: true,
        retries: 1,
        timeout: 10,
        path: '/todos',
        onAbort() {
          onAbort.called = true
          onAbort.timesCalled += 1
        },
        onTimeout() {
          onTimeout.called = true
          onTimeout.timesCalled += 1
        }
      }),
      { wrapper }
    )
    expect(onAbort.called).toBe(false)
    expect(onTimeout.called).toBe(false)
    expect(onAbort.timesCalled).toBe(0)
    expect(onTimeout.timesCalled).toBe(0)
    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
    expect(result.current.loading).toBe(false)
    await waitForNextUpdate()
    expect(fetch.mock.calls[0][0]).toBe('https://example.com/todos')
    expect(fetch).toHaveBeenCalledTimes(2)
    expect(result.current.loading).toBe(false)
    expect(result.current.error.name).toBe('AbortError')
    expect(result.current.error.message).toBe('Timeout Error')
    expect(onAbort.called).toBe(true)
    expect(onTimeout.called).toBe(true)
    expect(onAbort.timesCalled).toBe(2)
    expect(onTimeout.timesCalled).toBe(2)
    done()
  })
})

describe('useFetch - BROWSER - with <Provider /> - Managed State', (): void => {
  const expected = { title: 'Alex Cory' }

  const wrapper = ({ children }: { children?: ReactNode }): ReactElement => (
    <Provider url='https://example.com'>{children as ReactElement}</Provider>
  )

  afterEach((): void => {
    fetch.resetMocks()
    cleanup()
  })

  beforeEach((): void => {
    fetch.mockResponseOnce(
      JSON.stringify(expected),
    )
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
    let initialValue = 0
    const { result, rerender, waitForNextUpdate } = renderHook(
      () => useFetch({
        onUpdate: [initialValue],
        data: {}
      }),
      { wrapper }
    )
    expect(result.current.data).toEqual({})
    initialValue = 1
    rerender()
    await waitForNextUpdate()
    expect(result.current.data).toEqual(expected)
  })
})

describe('useFetch - BROWSER - interceptors', (): void => {
  const snake_case = { title: 'Alex Cory', first_name: 'Alex' }
  const expected = { title: 'Alex Cory', firstName: 'Alex' }

  const wrapper = ({ children }: { children?: ReactNode }): ReactElement => {
    const options = {
      interceptors: {
        response(res: Res<any>): Res<any> {
          if (res.data) res.data = toCamel(res.data)
          return res
        }
      }
    }
    return (
      <Provider url='https://example.com' options={options}>{children as ReactElement}</Provider>
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
})


describe('useFetch - BROWSER - Overwrite Global Options set in Provider', (): void => {
  const baseHeaders = {
    'Content-Type': 'application/json'
  }
  const providerHeaders = {
    Authorization: 'Bearer TOKEN'
  }

  const wrapper = ({ children }: { children?: ReactNode }): ReactElement => {
    const options = { headers: providerHeaders }
    return <Provider url='https://example.com' options={options}>{children as ReactElement}</Provider>
  }

  afterEach((): void => {
    fetch.resetMocks()
    cleanup()
  })

  beforeEach((): void => {
    fetch.mockResponseOnce(JSON.stringify({}))
  })

  it('should have the correct headers set in the options set in the Provider', async (): Promise<void> => {
    const expectedHeaders = { ...baseHeaders, ...providerHeaders }
    const { result } = renderHook(
      () => useFetch(),
      { wrapper }
    )
    await result.current.get()
    expect(fetch.mock.calls[0][0]).toBe('https://example.com')
    expect(fetch.mock.calls[0][1].headers).toEqual(expectedHeaders)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should overwrite url and options set in the Provider', async (): Promise<void> => {
    const expectedHeaders = { ...baseHeaders }
    const expectedURL = 'https://example2.com'
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch(expectedURL, globalOptions => {
        // TODO: fix the generics here so it knows when a header
        // such as Authorization is set
        delete (globalOptions.headers as any).Authorization
        return {
          onMount: true,
          ...globalOptions
        }
      }),
      { wrapper }
    )
    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
    expect(fetch.mock.calls[0][0]).toBe(expectedURL)
    expect(fetch.mock.calls[0][1].headers).toEqual(expectedHeaders)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('should overwrite options set in the Provider', async (): Promise<void> => {
    const expectedHeaders = { ...baseHeaders }
    const { result, waitForNextUpdate } = renderHook(
      () => useFetch(globalOptions => {
        // TODO: fix the generics here so it knows when a header
        // such as Authorization is set
        delete (globalOptions.headers as any).Authorization
        return {
          onMount: true,
          ...globalOptions
        }
      }),
      { wrapper }
    )
    expect(result.current.loading).toBe(true)
    await waitForNextUpdate()
    expect(fetch.mock.calls[0][0]).toBe('https://example.com')
    expect(fetch.mock.calls[0][1].headers).toEqual(expectedHeaders)
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

  it('should reset the error after each call', async (): Promise<void> => {
    const { result } = renderHook(
      () => useFetch('https://example.com'),
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
        data: []
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
      }
    }
    return (
      <Provider url='https://example.com' options={options}>{children as ReactElement}</Provider>
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
      () => useFetch({ onMount: true }),
      { wrapper: wrapperCustomError }
    )
    await waitForNextUpdate()
    expect(result.current.response.ok).toBe(undefined)
    expect(result.current.error).toEqual(expectedError)
  })
})