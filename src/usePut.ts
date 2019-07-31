import useFetch from '.'
import {
  HTTPMethod,
  NoUrlOptions,
  UseFetchBaseResult,
  OptionsMaybeURL,
  FetchData,
} from './types'
import useCustomOptions from './useCustomOptions'
import useRequestInit from './useRequestInit'

type ArrayDestructure<TData = any> = [
  TData | undefined,
  boolean,
  Error,
  FetchData,
]
interface ObjectDestructure<TData = any> extends UseFetchBaseResult<TData> {
  put: FetchData
}
type UsePut<TData = any> = ArrayDestructure<TData> & ObjectDestructure<TData>

export const usePut = <TData = any>(
  urlOrOptions?: string | OptionsMaybeURL,
  optionsNoURLs?: NoUrlOptions,
): UsePut<TData> => {
  const customOptions = useCustomOptions(urlOrOptions, optionsNoURLs)
  const requestInit = useRequestInit(urlOrOptions, optionsNoURLs)

  const { data, loading, error, put } = useFetch<TData>({
    ...customOptions,
    ...requestInit,
    method: HTTPMethod.PUT,
  })
  return Object.assign<ArrayDestructure<TData>, ObjectDestructure<TData>>(
    [data, loading, error, put],
    { data, loading, error, put },
  )
}
