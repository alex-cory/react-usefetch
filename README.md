<h1 align="center">useFetch</h1>
<p align="center">🐶 React hook for making isomorphic http requests</p>
<p align="center">
    <a href="https://github.com/alex-cory/react-usefetch/pulls">
      <img src="https://camo.githubusercontent.com/d4e0f63e9613ee474a7dfdc23c240b9795712c96/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d627269676874677265656e2e737667" />
    </a>
</p>

<img align="right" src="https://media.giphy.com/media/fAFg3xESCJyw/giphy.gif" />
Need to fetch some data? Try this one out. It's an isomorphic fetch hook. That means it works with SSR (server side rendering).

### Examples
- <a target="_blank" rel="noopener noreferrer" href='https://codesandbox.io/embed/km04k9k9x5'>Code Sandbox Example</a>


Installation
------------

```shell
yarn add use-http
```

Usage
-----

```jsx 
import useFetch from 'use-http'

function App() {
  // add whatever other options you would add to `fetch` such as headers
  const options = {
    method: 'POST',
    body: {}, // whatever data you want to send
  }
  
  var [data, loading, error] = useFetch('https://example.com', options)
  
  // want to use object destructuring? You can do that too like:
  var { data, loading, error } = useFetch('https://example.com', options)
  
  if (error) {
    return 'Error!'
  }
  
  if (loading) {
    return 'Loading!'
  }
  
  return (
    <code>
      <pre>{data}</pre>
    </code>
  )
}
```
Or you can use one of the nice helper hooks. All of them accept the second `options` parameter.

```jsx
import { useGet, usePost, usePatch, usePut, useDelete } from 'use-http'

function App() {
  const [data, loading, error] = useGet('https://example.com')
  
  if (error) {
    return 'Error!'
  }
  
  if (loading) {
    return 'Loading!'
  }
  
  return (
    <code>
      <pre>{data}</pre>
    </code>
  )
}
```

Hooks
----
| Option                | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `useFetch` | The base hook |
| `useGet` | Defaults to a GET request |
| `usePost` | Defaults to a POST request |
| `usePut` | Defaults to a PUT request |
| `usePatch` | Defaults to a PATCH request |
| `useDelete` | Defaults to a DELETE request |

Options
-----
| Option                | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `options` | This is exactly what you would pass to the normal js `fetch` |

Todos
------
 - [ ] Make abortable (add `abort` to abort the http request)
 - [ ] Make work with React Suspense
 - [ ] Allow option to fetch on server instead of just having `loading` state
 - [ ] Allow option for callback for response.json() vs response.text()
