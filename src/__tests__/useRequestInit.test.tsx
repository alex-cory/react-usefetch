/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook } from '@testing-library/react-hooks'
import useRequestInit from '../useRequestInit'
import { ReactElement, ReactNode } from 'react'
import { Provider } from '..'
import React from 'react'

describe('useRequestInit: general usages', (): void => {
  it('should create custom options with `onMount: false` by default', (): void => {
    const options = { headers: { 'Content-Type': 'application/text' } }
    var { result } = renderHook((): any => useRequestInit(options))
    expect(result.current).toEqual(options)
  })

  it('should create custom options handling Provider/Context properly', (): void => {
    const options = { headers: { 'Content-Type': 'application/text' } }
    const wrapper = ({ children }: { children?: ReactNode }): ReactElement => (
      <Provider options={options}>{children as ReactElement}</Provider>
    )
    const { result } = renderHook((): any => useRequestInit(), { wrapper })
    expect(result.current).toStrictEqual(options)
  })

  it('should overwrite `Content-Type` that is set in Provider', (): void => {
    const options = {
      headers: {
        'Content-Type': 'application/text'
      }
    }
    const wrapper = ({ children }: { children?: ReactNode }): ReactElement => (
      <Provider options={options}>{children as ReactElement}</Provider>
    )
    const overwriteProviderOptions = {
      headers: {
        'Content-Type': 'multipart/form-data; boundary=something'
      }
    }
    const { result } = renderHook((): any => useRequestInit(overwriteProviderOptions), { wrapper })
    expect(result.current).toStrictEqual(overwriteProviderOptions)
  })
})
