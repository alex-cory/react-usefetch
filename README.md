[![use-http logo][3]][5]

<br/>

<p align="center">
    <h1 align="center">useFetch</h1>
</p>

<br />

<p align="center">
  <a href="https://github.com/ava/use-http/blob/master/.github/contributing.md">
    <img src="https://camo.githubusercontent.com/d4e0f63e9613ee474a7dfdc23c240b9795712c96/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d627269676874677265656e2e737667" />
  </a>
  <a href="https://circleci.com/gh/ava/use-http">
    <img src="https://img.shields.io/circleci/project/github/ava/use-http/master.svg" />
  </a>
  <a href="https://www.npmjs.com/package/use-http">
    <img src="https://img.shields.io/npm/dt/use-http.svg" />
  </a>
  <a href="https://lgtm.com/projects/g/ava/use-http/context:javascript">
    <img alt="undefined" src="https://img.shields.io/lgtm/grade/javascript/g/ava/use-http.svg?logo=lgtm&logoWidth=18"/>
  </a>
  <a href="http://packagequality.com/#?package=use-http">
    <img src="https://npm.packagequality.com/shield/use-http.svg" />
  </a>
  <a href="https://standardjs.com">
    <img src="https://img.shields.io/badge/code_style-standard-brightgreen.svg" />
  </a>
  <a href="https://www.youtube.com/playlist?list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW">
    <img src="https://img.shields.io/badge/youtube-subscribe-RED.svg" />
  </a>

<!-- [![Join the community on Spectrum](https://withspectrum.github.io/badge/badge.svg)](https://spectrum.chat/next-js) -->
<!--     <a href="https://bundlephobia.com/result?p=use-http">
      <img alt="undefined" src="https://img.shields.io/bundlephobia/minzip/use-http.svg">
    </a> -->
<!--     <a href="https://snyk.io/test/github/ava/use-http?targetFile=package.json">
      <img src="https://snyk.io/test/github/ava/use-http/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/ava/use-http?targetFile=package.json" style="max-width:100%;">
    </a> -->
<!--     <a href="https://www.npmjs.com/package/use-http">
      <img src="https://img.shields.io/npm/v/use-http.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/ava/use-http?targetFile=package.json" style="max-width:100%;">
    </a> -->
<!--     <a href="https://github.com/ava/use-http/blob/master/license.md">
      <img alt="undefined" src="https://img.shields.io/github/license/ava/use-http.svg">
    </a> -->
<!--     <a href="https://greenkeeper.io/">
      <img alt="undefined" src="https://badges.greenkeeper.io/ava/use-http.svg">
    </a> -->
</p>

<div align="center">
  <sup>
    🐶 React hook for making isomorphic http requests
    <br/>
      <a href="https://use-http.com"><b>Main Documentation</b></a>
  </sup>
</div>

<br/>
<br/>
    
<div align="center">
  <pre>npm i <a href="https://use-http.com">use-http</a></pre>
</div>

<br/>
<br/>

Features
---------

- SSR (server side rendering) support
- TypeScript support
- 2 dependencies ([use-ssr](https://github.com/alex-cory/use-ssr), [urs](https://github.com/alex-cory/urs))
- GraphQL support (queries + mutations)
- Provider to set default `url` and `options`
- Request/response interceptors <!--https://github.com/ava/use-http#user-content-interceptors-->
- React Native support
- Aborts/Cancels pending http requests when a component unmounts
- Built in caching
- Persistent caching support
- Suspense<sup>(experimental)</sup> support
- Retry functionality

Usage
-----

### Examples + Videos

- useFetch - managed state, request, response, etc. [![](https://img.shields.io/badge/example-blue.svg)](https://codesandbox.io/s/usefetch-request-response-managed-state-ruyi3?file=/src/index.js) [![](https://img.shields.io/badge/video-red.svg)](https://www.youtube.com/watch?v=_-GujYZFCKI&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=6)
- useFetch - request/response interceptors [![](https://img.shields.io/badge/example-blue.svg)](https://codesandbox.io/s/usefetch-provider-requestresponse-interceptors-s1lex) [![](https://img.shields.io/badge/video-red.svg)](https://www.youtube.com/watch?v=3HauoWh0Jts&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=8)
- useFetch - retries, retryOn, retryDelay [![](https://img.shields.io/badge/example-blue.svg)](https://codesandbox.io/s/usefetch-retryon-retrydelay-s74q9) [![](https://img.shields.io/badge/video-red.svg)](https://www.youtube.com/watch?v=grE3AX-Q9ss&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=9)
- useFetch - abort, timeout, onAbort, onTimeout [![](https://img.shields.io/badge/video-red.svg)](https://www.youtube.com/watch?v=7SuD3ZOfu7E&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=4)
- useFetch - persist, cache [![](https://img.shields.io/badge/video-red.svg)](https://www.youtube.com/watch?v=pJ22Rq9c8mw&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=7)
- useFetch - cacheLife, cachePolicy [![](https://img.shields.io/badge/video-red.svg)](https://www.youtube.com/watch?v=AsZ9hnWHCeg&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=3&t=0s)
- useFetch - suspense <sup>(experimental)</sup> [![](https://img.shields.io/badge/example-blue.svg)](https://codesandbox.io/s/usefetch-suspense-i22wv) [![](https://img.shields.io/badge/video-red.svg)](https://www.youtube.com/watch?v=7qWLJUpnxHI&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=2&t=0s)
- useFetch - pagination [![](https://img.shields.io/badge/example-blue.svg)](https://codesandbox.io/s/usefetch-provider-pagination-exttg) [![](https://img.shields.io/badge/video-red.svg)](https://www.youtube.com/watch?v=YmcMjRpIYqU&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=5)
- useQuery - GraphQL [![](https://img.shields.io/badge/example-blue.svg)](https://codesandbox.io/s/graphql-usequery-provider-uhdmj)
- useFetch - Next.js [![](https://img.shields.io/badge/example-blue.svg)](https://codesandbox.io/s/usefetch-in-nextjs-nn9fm)
- useFetch - create-react-app [![](https://img.shields.io/badge/example-blue.svg)](https://codesandbox.io/embed/km04k9k9x5)

<details open><summary><b>Basic Usage Managed State <code>useFetch</code></b></summary>

If the last argument of `useFetch` is not a dependency array `[]`, then it will not fire until you call one of the http methods like `get`, `post`, etc.

```js
import useFetch from 'use-http'

function Todos() {
  const [todos, setTodos] = useState([])
  const { get, post, response, loading, error } = useFetch('https://example.com')

  useEffect(() => { initializeTodos() }, []) // componentDidMount
  
  async function initializeTodos() {
    const initialTodos = await get('/todos')
    if (response.ok) setTodos(initialTodos)
  }

  async function addTodo() {
    const newTodo = await post('/todos', { title: 'my new todo' })
    if (response.ok) setTodos([...todos, newTodo])
  }

  return (
    <>
      <button onClick={addTodo}>Add Todo</button>
      {error && 'Error!'}
      {loading && 'Loading...'}
      {todos.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </>
  )
}
```

<a target="_blank" rel="noopener noreferrer" href='https://codesandbox.io/s/usefetch-request-response-managed-state-ruyi3?file=/src/index.js'><img  width='150px' height='30px' src='https://codesandbox.io/static/img/play-codesandbox.svg' /></a>  <a target="_blank" rel="noopener noreferrer" href='https://www.youtube.com/watch?v=_-GujYZFCKI&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=6'><img  width='150px' height='30px' src='https://github.com/ava/use-http/raw/master/public/watch-youtube-video.png' /></a>

</details>

<details open><summary><b>Basic Usage Auto-Managed State <code>useFetch</code></b></summary>

This fetch is run `onMount/componentDidMount`. The last argument `[]` means it will run `onMount`. If you pass it a variable like `[someVariable]`, it will run `onMount` and again whenever `someVariable` changes values (aka `onUpdate`). If no method is specified, GET is the default.

```js
import useFetch from 'use-http'

function Todos() {
  const options = {} // these options accept all native `fetch` options
  // the last argument below [] means it will fire onMount (GET by default)
  const { loading, error, data = [] } = useFetch('https://example.com/todos', options, [])
  return (
    <>
      {error && 'Error!'}
      {loading && 'Loading...'}
      {data.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      ))}
    </>
  )
}
```

<!-- TODO: codesandbox + youtube -->
<!-- <a target="_blank" rel="noopener noreferrer" href='XXXXXX'><img  width='150px' height='30px' src='https://github.com/ava/use-http/raw/master/public/watch-youtube-video.png' /></a> -->

</details>

<details open><summary><b>Suspense Mode<sup>(experimental)</sup> Auto-Managed State</b></summary>

Can put `suspense` in 2 places. Either `useFetch` (A) or `Provider` (B).

```js
import useFetch, { Provider } from 'use-http'

function Todos() {
  const { data: todos = [] } = useFetch('/todos', {
    suspense: true // A. can put `suspense: true` here
  }, []) // onMount

  return todos.map(todo => <div key={todo.id}>{todo.title}</div>)
}

function App() {
  const options = {
    suspense: true // B. can put `suspense: true` here too
  }
  return (
    <Provider url='https://example.com' options={options}>
      <Suspense fallback='Loading...'>
        <Todos />
      </Suspense>
    </Provider>
  )
}
```

<a target="_blank" rel="noopener noreferrer" href='https://codesandbox.io/s/usefetch-suspense-i22wv'><img  width='150px' height='30px' src='https://codesandbox.io/static/img/play-codesandbox.svg' /></a>  <a target="_blank" rel="noopener noreferrer" href='https://www.youtube.com/watch?v=7qWLJUpnxHI&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=2&t=0s'><img  width='150px' height='30px' src='https://github.com/ava/use-http/raw/master/public/watch-youtube-video.png' /></a>

</details>

<details><summary><b>Suspense Mode<sup>(experimental)</sup> Managed State</b></summary>

Can put `suspense` in 2 places. Either `useFetch` (A) or `Provider` (B). Suspense mode via managed state is very experimental.

```js
import useFetch, { Provider } from 'use-http'

function Todos() {
  const [todos, setTodos] = useState([])
  // A. can put `suspense: true` here
  const { get, response } = useFetch({ suspense: true })

  const loadInitialTodos = async () => {
    const todos = await get('/todos')
    if (response.ok) setTodos(todos)
  }

  // componentDidMount
  useEffect(() => {
    loadInitialTodos()
  }, [])

  return todos.map(todo => <div key={todo.id}>{todo.title}</div>)
}

function App() {
  const options = {
    suspense: true // B. can put `suspense: true` here too
  }
  return (
    <Provider url='https://example.com' options={options}>
      <Suspense fallback='Loading...'>
        <Todos />
      </Suspense>
    </Provider>
  )
}
```

</details>

<div align="center">
  <br>
  <br>
  <hr>
  <p>
    <sup>
      <a href="https://github.com/sponsors/alex-cory">Consider sponsoring</a>
    </sup>
    <br>
    <br>
    <a href="https://ava.inc">
      <img src="public/ava-logo.png" width="130" alt="Ava">
    </a>
    <br>
    <sub><b>Ava, Rapid Application Development</b></sub>
    <br>
    <sub>
    Need a freelance software engineer with more than 5 years production experience at companies like Facebook, Discord, Best Buy, and Citrix?</br>
    <a href="https://ava.inc">website</a> | <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=alex@ava.inc">email</a> | <a href="https://twitter.com/@alexcory_">twitter</a>
    </sub>
  </p>
  <hr>
  <br>
  <br>
  <br>
</div>

<details><summary><b>Pagination + <code>Provider</code></b></summary>

The `onNewData` will take the current data, and the newly fetched data, and allow you to merge the two however you choose. In the example below, we are appending the new todos to the end of the current todos.

```jsx
import useFetch, { Provider } from 'use-http'

const Todos = () => {
  const [page, setPage] = useState(1)

  const { data = [], loading } = useFetch(`/todos?page=${page}&amountPerPage=15`, {
    onNewData: (currTodos, newTodos) => [...currTodos, ...newTodos], // appends newly fetched todos
    perPage: 15, // stops making more requests if last todos fetched < 15
  }, [page]) // runs onMount AND whenever the `page` updates (onUpdate)

  return (
    <ul>
      {data.map(todo => <li key={todo.id}>{todo.title}</li>}
      {loading && 'Loading...'}
      {!loading && (
        <button onClick={() => setPage(page + 1)}>Load More Todos</button>
      )}
    </ul>
  )
}

const App = () => (
  <Provider url='https://example.com'>
    <Todos />
  </Provider>
)
```

<a target="_blank" rel="noopener noreferrer" href='https://codesandbox.io/s/usefetch-provider-pagination-exttg?file=/src/index.js'><img  width='150px' height='30px' src='https://codesandbox.io/static/img/play-codesandbox.svg' /></a>  <a target="_blank" rel="noopener noreferrer" href='https://www.youtube.com/watch?v=YmcMjRpIYqU&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=5'><img  width='150px' height='30px' src='https://github.com/ava/use-http/raw/master/public/watch-youtube-video.png' /></a>


</details>

<details open><summary><b>Destructured <code>useFetch</code></b></summary>

⚠️ Do not destructure the `response` object! Details in [this video](https://youtu.be/_-GujYZFCKI?list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&t=127). Technically you can do it, but if you need to access the `response.ok` from, for example, within a component's onClick handler, it will be a stale value for `ok` where it will be correct for `response.ok`.  ️️⚠️

```js
var [request, response, loading, error] = useFetch('https://example.com')

// want to use object destructuring? You can do that too
var {
  request,
  response, // 🚨 Do not destructure the `response` object!
  loading,
  error,
  data,
  cache,    // methods: get, set, has, delete, clear (like `new Map()`)
  get,
  post,
  put,
  patch,
  delete    // don't destructure `delete` though, it's a keyword
  del,      // <- that's why we have this (del). or use `request.delete`
  head,
  options,
  connect,
  trace,
  mutate,   // GraphQL
  query,    // GraphQL
  abort
} = useFetch('https://example.com')

// 🚨 Do not destructure the `response` object!
// 🚨 This just shows what fields are available in it.
var {
  ok,
  status,
  headers,
  data,
  type,
  statusText,
  url,
  body,
  bodyUsed,
  redirected,
  // methods
  json,
  text,
  formData,
  blob,
  arrayBuffer,
  clone
} = response

var {
  loading,
  error,
  data,
  cache,  // methods: get, set, has, delete, clear (like `new Map()`)
  get,
  post,
  put,
  patch,
  delete  // don't destructure `delete` though, it's a keyword
  del,    // <- that's why we have this (del). or use `request.delete`
  mutate, // GraphQL
  query,  // GraphQL
  abort
} = request
```

<a target="_blank" rel="noopener noreferrer" href='https://www.youtube.com/watch?v=_-GujYZFCKI&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=6'><img  width='150px' height='30px' src='https://github.com/ava/use-http/raw/master/public/watch-youtube-video.png' /></a>

</details>


<details><summary><b>Relative routes <code>useFetch</code></b></summary>

```jsx
var request = useFetch('https://example.com')

request.post('/todos', {
  no: 'way'
})
```

<a target="_blank" rel="noopener noreferrer" href='https://www.youtube.com/watch?v=JWDL_AVOYT0&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=10'><img  width='150px' height='30px' src='https://github.com/ava/use-http/raw/master/public/watch-youtube-video.png' /></a>

</details>

<details><summary><b>Abort <code>useFetch</code></b></summary>

<img src="public/abort-example-1.gif" height="250" />


```jsx
const { get, abort, loading, data: repos } = useFetch('https://api.github.com/search/repositories?q=')

// the line below is not isomorphic, but for simplicity we're using the browsers `encodeURI`
const searchGithubRepos = e => get(encodeURI(e.target.value))

<>
  <input onChange={searchGithubRepos} />
  <button onClick={abort}>Abort</button>
  {loading ? 'Loading...' : repos.data.items.map(repo => (
    <div key={repo.id}>{repo.name}</div>
  ))}
</>
```

<a target="_blank" rel="noopener noreferrer" href='https://www.youtube.com/watch?v=7SuD3ZOfu7E&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=4'><img  width='150px' height='30px' src='https://github.com/ava/use-http/raw/master/public/watch-youtube-video.png' /></a>

</details>


<details><summary><b>GraphQL Query <code>useFetch</code></b></summary>

```jsx

const QUERY = `
  query Todos($userID string!) {
    todos(userID: $userID) {
      id
      title
    }
  }
`

function App() {
  const request = useFetch('http://example.com')

  const getTodosForUser = id => request.query(QUERY, { userID: id })

  return (
    <>
      <button onClick={() => getTodosForUser('theUsersID')}>Get User's Todos</button>
      {request.loading ? 'Loading...' : <pre>{request.data}</pre>}
    </>
  )
}
```
</details>


<details><summary><b>GraphQL Mutation <code>useFetch</code></b></summary>

The `Provider` allows us to set a default `url`, `options` (such as headers) and so on.

```jsx

const MUTATION = `
  mutation CreateTodo($todoTitle string) {
    todo(title: $todoTitle) {
      id
      title
    }
  }
`

function App() {
  const [todoTitle, setTodoTitle] = useState('')
  const request = useFetch('http://example.com')

  const createtodo = () => request.mutate(MUTATION, { todoTitle })

  return (
    <>
      <input onChange={e => setTodoTitle(e.target.value)} />
      <button onClick={createTodo}>Create Todo</button>
      {request.loading ? 'Loading...' : <pre>{request.data}</pre>}
    </>
  )
}
```
</details>


<details><summary><b><code>Provider</code> using the GraphQL <code>useMutation</code> and <code>useQuery</code></b></summary>

##### Query for todos
```jsx
import { useQuery } from 'use-http'

export default function QueryComponent() {
  
  // can also do it this way:
  // const [data, loading, error, query] = useQuery`
  // or this way:
  // const { data, loading, error, query } = useQuery`
  const request = useQuery`
    query Todos($userID string!) {
      todos(userID: $userID) {
        id
        title
      }
    }
  `

  const getTodosForUser = id => request.query({ userID: id })
  
  return (
    <>
      <button onClick={() => getTodosForUser('theUsersID')}>Get User's Todos</button>
      {request.loading ? 'Loading...' : <pre>{request.data}</pre>}
    </>
  )
}
```

<a target="_blank" rel="noopener noreferrer" href='https://codesandbox.io/s/graphql-usequery-provider-uhdmj'><img  width='150px' height='30px' src='https://codesandbox.io/static/img/play-codesandbox.svg' /></a> 


##### Add a new todo
```jsx
import { useMutation } from 'use-http'

export default function MutationComponent() {
  const [todoTitle, setTodoTitle] = useState('')
  
  // can also do it this way:
  // const request = useMutation`
  // or this way:
  // const { data, loading, error, mutate } = useMutation`
  const [data, loading, error, mutate] = useMutation`
    mutation CreateTodo($todoTitle string) {
      todo(title: $todoTitle) {
        id
        title
      }
    }
  `
  
  const createTodo = () => mutate({ todoTitle })

  return (
    <>
      <input onChange={e => setTodoTitle(e.target.value)} />
      <button onClick={createTodo}>Create Todo</button>
      {loading ? 'Loading...' : <pre>{data}</pre>}
    </>
  )
}
```


##### Adding the Provider
These props are defaults used in every request inside the `<Provider />`. They can be overwritten individually
```jsx
import { Provider } from 'use-http'
import QueryComponent from './QueryComponent'
import MutationComponent from './MutationComponent'

function App() {

  const options = {
    headers: {
      Authorization: 'Bearer YOUR_TOKEN_HERE'
    }
  }
  
  return (
    <Provider url='http://example.com' options={options}>
      <QueryComponent />
      <MutationComponent />
    <Provider/>
  )
}

```
</details>


<details id='interceptors'><summary><b>Request/Response Interceptors</b></summary>
    
This example shows how we can do authentication in the `request` interceptor and how we can camelCase the results in the `response` interceptor
    
```jsx
import { Provider } from 'use-http'
import { toCamel } from 'convert-keys'

function App() {
  let [token, setToken] = useLocalStorage('token')
  
  const options = {
    interceptors: {
      // every time we make an http request, this will run 1st before the request is made
      // url, path and route are supplied to the interceptor
      // request options can be modified and must be returned
      request: async ({ options, url, path, route }) => {
        if (isExpired(token)) {
          token = await getNewToken()
          setToken(token)
        }
        options.headers.Authorization = `Bearer ${token}`
        return options
      },
      // every time we make an http request, before getting the response back, this will run
      response: async ({ response }) => {
        // unfortunately, because this is a JS Response object, we have to modify it directly.
        // It shouldn't have any negative affect since this is getting reset on each request.
        const res = response
        if (res.data) res.data = toCamel(res.data)
        return res
      }
    }
  }
  
  return (
    <Provider url='http://example.com' options={options}>
      <SomeComponent />
    <Provider/>
  )
}

```

<a target="_blank" rel="noopener noreferrer" href='https://codesandbox.io/s/usefetch-provider-requestresponse-interceptors-s1lex'><img  width='150px' height='30px' src='https://codesandbox.io/static/img/play-codesandbox.svg' /></a>  <a target="_blank" rel="noopener noreferrer" href='https://www.youtube.com/watch?v=3HauoWh0Jts&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=8'><img  width='150px' height='30px' src='https://github.com/ava/use-http/raw/master/public/watch-youtube-video.png' /></a>

</details>

<details id='form-data'><summary><b>File Uploads (FormData)</b></summary>
    
This example shows how we can upload a file using `useFetch`.
    
```jsx
import useFetch from 'use-http'

const FileUploader = () => {
  const [file, setFile] = useState()
  
  const { post } = useFetch('https://example.com/upload')

  const uploadFile = async () => {
    const data = new FormData()
    data.append('file', file)
    if (file instanceof FormData) await post(data)
  }

  return (
    <div>
      {/* Drop a file onto the input below */}
      <input onChange={e => setFile(e.target.files[0])} />
      <button onClick={uploadFile}>Upload</button>
    </div>
  )
}
```
</details>

<details><summary><b>Handling Different Response Types</b></summary>
    
This example shows how we can get `.json()`, `.text()`, `.formData()`, `.blob()`, `.arrayBuffer()`, and all the other [http response methods](https://developer.mozilla.org/en-US/docs/Web/API/Response#Methods). By default, `useFetch` 1st tries to call `response.json()` under the hood, if that fails it's backup is `response.text()`. If that fails, then you need a different response type which is where this comes in.

```js
import useFetch from 'use-http'

const App = () => {
  const [name, setName] = useState('')
  
  const { get, loading, error, response } = useFetch('http://example.com')

  const handleClick = async () => {
    await get('/users/1?name=true') // will return just the user's name
    const text = await response.text()
    setName(text)
  }
  
  return (
    <>
      <button onClick={handleClick}>Load Data</button>
      {error && error.messge}
      {loading && "Loading..."}
      {name && <div>{name}</div>}
    </>
  )
}
```

<a target="_blank" rel="noopener noreferrer" href='https://codesandbox.io/s/usefetch-different-response-types-c6csw'><img  width='150px' height='30px' src='https://codesandbox.io/static/img/play-codesandbox.svg' /></a> 
<!-- <a target="_blank" rel="noopener noreferrer" href='XXXXXX'><img  width='150px' height='30px' src='https://github.com/ava/use-http/raw/master/public/watch-youtube-video.png' /></a> -->

</details>

<details><summary><b>Overwrite/Remove Options/Headers Set in Provider</b></summary>
    
This example shows how to remove a header all together. Let's say you have `<Provider url='url.com' options={{ headers: { Authentication: 'Bearer MY_TOKEN' } }}><App /></Provider>`, but for one api call, you don't want that header in your `useFetch` at all for one instance in your app. This would allow you to remove that.

```js
import useFetch from 'use-http'

const Todos = () => {
  // let's say for this request, you don't want the `Accept` header at all
  const { loading, error, data: todos = [] } = useFetch('/todos', globalOptions => {
    delete globalOptions.headers.Accept
    return globalOptions
  }, []) // onMount
  return (
    <>
      {error && error.messge}
      {loading && "Loading..."}
      {todos && <ul>{todos.map(todo => <li key={todo.id}>{todo.title}</li>)}</ul>}
    </>
  )
}

const App = () => {
  const options = {
    headers: {
      Accept: 'application/json'
    }
  }
  return (
    <Provider url='https://url.com' options={options}><Todos /></Provider>
}
```

</details>

<details><summary><b>Retries retryOn & retryDelay</b></summary>

In this example you can see how `retryOn` will retry on a status code of `305`, or if we choose the `retryOn()` function, it returns a boolean to decide if we will retry. With `retryDelay` we can either have a fixed delay, or a dynamic one by using `retryDelay()`. Make sure `retries` is set to at minimum `1` otherwise it won't retry the request. If `retries > 0` without `retryOn` then by default we always retry if there's an error or if `!response.ok`. If `retryOn: [400]` and `retries > 0` then we only retry on a response status of `400`.

```js
import useFetch from 'use-http'

const TestRetry = () => {
  const { response, get } = useFetch('https://httpbin.org/status/305', {
    // make sure `retries` is set otherwise it won't retry
    retries: 1,
    retryOn: [305],
    // OR
    retryOn: async ({ attempt, error, response }) => {
      // returns true or false to determine whether to retry
      return error || response && response.status >= 300
    },

    retryDelay: 3000,
    // OR
    retryDelay: ({ attempt, error, response }) => {
      // exponential backoff
      return Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)
      // linear backoff
      return attempt * 1000
    }
  })

  return (
    <>
      <button onClick={() => get()}>CLICK</button>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </>
  )
}
```

<a target="_blank" rel="noopener noreferrer" href='https://codesandbox.io/s/usefetch-retryon-retrydelay-s74q9'><img  width='150px' height='30px' src='https://codesandbox.io/static/img/play-codesandbox.svg' /></a>  <a target="_blank" rel="noopener noreferrer" href='https://www.youtube.com/watch?v=grE3AX-Q9ss&list=PLZIwrWkE9rCdUybd8t3tY-mUMvXkCdenW&index=9'><img  width='150px' height='30px' src='https://github.com/ava/use-http/raw/master/public/watch-youtube-video.png' /></a>

</details>

Overview
--------

### Hooks

| Hook                | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `useFetch` | The base hook |
| `useQuery` | For making a GraphQL query |
| `useMutation` | For making a GraphQL mutation |
    
</details>


### Options
    
This is exactly what you would pass to the normal js `fetch`, with a little extra. All these options can be passed to the `<Provider options={/* every option below */} />`, or directly to `useFetch`. If you have both in the `<Provider />` and in `useFetch`, the `useFetch` options will overwrite the ones from the `<Provider />`

| Option                | Description                                                               |  Default     |
| --------------------- | --------------------------------------------------------------------------|------------- |
| `cacheLife` | After a successful cache update, that cache data will become stale after this duration       | `0` |
| `cachePolicy` | These will be the same ones as Apollo's [fetch policies](https://www.apollographql.com/docs/react/api/react/hoc/#optionsfetchpolicy). Possible values are `cache-and-network`, `network-only`, `cache-only`, `no-cache`, `cache-first`. Currently only supports **`cache-first`**  or **`no-cache`**      | `cache-first` |
| `data` | Allows you to set a default value for `data`       | `undefined` |
| `interceptors.request` | Allows you to do something before an http request is sent out. Useful for authentication if you need to refresh tokens a lot.  | `undefined` |
| `interceptors.response` | Allows you to do something after an http response is recieved. Useful for something like camelCasing the keys of the response.  | `undefined` |
| `loading` | Allows you to set default value for `loading`       | `false` unless the last argument of `useFetch` is `[]` |
| `onAbort` | Runs when the request is aborted. | empty function |
| `onError` | Runs when the request get's an error. If retrying, it is only called on the last retry attempt. | empty function |
| `onNewData` | Merges the current data with the incoming data. Great for pagination.  | `(curr, new) => new` |
| `onTimeout` | Called when the request times out. | empty function |
| `persist` | Persists data for the duration of `cacheLife`. If `cacheLife` is not set it defaults to 24h. Currently only available in Browser. | `false` |
| `perPage` | Stops making more requests if there is no more data to fetch. (i.e. if we have 25 todos, and the perPage is 10, after fetching 2 times, we will have 20 todos. The last 5 tells us we don't have any more to fetch because it's less than 10) For pagination. | `0` |
| `responseType` | This will determine how the `data` field is set. If you put `json` then it will try to parse it as JSON. If you set it as an array, it will attempt to parse the `response` in the order of the types you put in the array. Read about why we don't put `formData` in the defaults [in the yellow Note part here](https://developer.mozilla.org/en-US/docs/Web/API/Body/formData).  | `['json', 'text', 'blob', 'readableStream']` |
| `retries` | When a request fails or times out, retry the request this many times. By default it will not retry.    | `0` |
| `retryDelay` | You can retry with certain intervals i.e. 30 seconds `30000` or with custom logic (i.e. to increase retry intervals). | `1000` |
| `retryOn` | You can retry on certain http status codes or have custom logic to decide whether to retry or not via a function. Make sure `retries > 0` otherwise it won't retry. | `[]` |
| `suspense` | Enables Experimental React Suspense mode. [example](https://codesandbox.io/s/usefetch-suspense-i22wv) | `false` |
| `timeout` | The request will be aborted/cancelled after this amount of time. This is also the interval at which `retries` will be made at. **in milliseconds**. If set to `0`, it will not timeout except for browser defaults.       | `0` |

```jsx
const options = {
  // accepts all `fetch` options such as headers, method, etc.

  // The time in milliseconds that cache data remains fresh.
  cacheLife: 0,

  // Cache responses to improve speed and reduce amount of requests
  // Only one request to the same endpoint will be initiated unless cacheLife expires for 'cache-first'.
  cachePolicy: 'cache-first', // 'no-cache'
  
  // set's the default for the `data` field
  data: [],

  // typically, `interceptors` would be added as an option to the `<Provider />`
  interceptors: {
    request: async ({ options, url, path, route }) => { // `async` is not required
      return options // returning the `options` is important
    },
    response: async ({ response }) => {
      // note: `response.data` is equivalent to `await response.json()`
      return response // returning the `response` is important
    }
  },

  // set's the default for `loading` field
  loading: false,
  
  // called when aborting the request
  onAbort: () => {},
  
  // runs when an error happens.
  onError: ({ error }) => {},

  // this will allow you to merge the `data` for pagination.
  onNewData: (currData, newData) => {
    return [...currData, ...newData] 
  },
  
  // called when the request times out
  onTimeout: () => {},
  
  // this will tell useFetch not to run the request if the list doesn't haveMore. (pagination)
  // i.e. if the last page fetched was < 15, don't run the request again
  perPage: 15,

  // Allows caching to persist after page refresh. Only supported in the Browser currently.
  persist: false,

  // this would basically call `await response.json()`
  // and set the `data` and `response.data` field to the output
  responseType: 'json',
  // OR can be an array. It's an array by default.
  // We will try to get the `data` by attempting to extract
  // it via these body interface methods, one by one in
  // this order. We skip `formData` because it's mostly used
  // for service workers.
  responseType: ['json', 'text', 'blob', 'arrayBuffer'],

  // amount of times it should retry before erroring out
  retries: 3,

  // The time between retries
  retryDelay: 10000,
  // OR
  // Can be a function which is used if we want change the time in between each retry
  retryDelay({ attempt, error, response }) {
    // exponential backoff
    return Math.min(attempt > 1 ? 2 ** attempt * 1000 : 1000, 30 * 1000)
    // linear backoff
    return attempt * 1000
  },

  // make sure `retries` is set otherwise it won't retry
  // can retry on certain http status codes
  retryOn: [503],
  // OR
  async retryOn({ attempt, error, response }) {
    // retry on any network error, or 4xx or 5xx status codes
    if (error !== null || response.status >= 400) {
      console.log(`retrying, attempt number ${attempt + 1}`);
      return true;
    }
  },

  // enables experimental React Suspense mode
  suspense: true, // defaults to `false`
  
  // amount of time before the request get's canceled/aborted
  timeout: 10000,
}

useFetch(options)
// OR
<Provider options={options}><ResOfYourApp /></Provider>
```

Who's using use-http?
----------------------

Does your company use use-http? Consider sponsoring the project to fund new features, bug fixes, and more.

<p align="center">
  <img height="140px" src="https://user-images.githubusercontent.com/5455859/98412764-5c5abe00-202d-11eb-9a2d-73377cfbfd86.png" />
  <a href="https://ava.inc" style="margin-right: 2rem;" target="_blank">
    <img width="110px" src="https://ava.inc/ava-logo-green.png" />
  </a>
  <a href="https://github.com/microsoft/DLWorkspace">
    <img height="110px" src="https://github.com/ava/use-http/raw/master/public/microsoft-logo.png" />
  </a>
  <a href="https://github.com/mozilla/Spoke">
    <img height="110px" src="https://github.com/ava/use-http/raw/master/public/mozilla.png" />
  </a>
  <a href="https://beapte.com">
    <img height="140px" src="https://github.com/ava/use-http/raw/master/public/apte-logo.png" />
  </a>

<!--   <a href="#">
    <img height="140px" src="https://user-images.githubusercontent.com/5455859/98412608-1aca1300-202d-11eb-9d20-295ce85bda9c.png" />
  </a> -->
</p>

Browser Support
---------------

If you need support for IE, you will need to add additional polyfills.  The React docs suggest [these polyfills][4], but from [this issue][2] we have found it to work fine with the [`react-app-polyfill`]. If you have any updates to this browser list, please submit a PR!

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />]()<br/>Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />]()<br/>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />]()<br/>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />]()<br/>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />]()<br/>Opera |
| --------- | --------- | --------- | --------- | --------- |
| 12+ | last 2 versions| last 2 versions| last 2 versions| last 2 versions |

Feature Requests/Ideas
----------------------

If you have feature requests, [submit an issue][1] to let us know what you would like to see!

Todos
------
- [ ] [OSS analytics](https://www.npmjs.com/package/@scarf/scarf)
- [ ] [contributors](https://github.com/all-contributors/all-contributors)
- [ ] prefetching
- [ ] global cache state management
- [ ] optimistic updates
- [ ] `persist` support for React Native
- [ ] better loading state management. When using only 1 useFetch in a component and we use
      `Promise.all([get('/todos/1'), get('/todos/2')])` then don't have a loading true,
      loading false on each request. Just have loading true on 1st request, and loading false
      on last request.
- [ ] is making a [gitpod](https://www.gitpod.io/docs/configuration/) useful here? 🤔
- [ ] suspense
  - [ ] triggering it from outside the `<Suspense />` component.
    - add `.read()` to `request`
    - or make it work with just the `suspense: true` option
    - both of these options need to be thought out a lot more^
  - [ ] tests for this^ (triggering outside)
  - [ ] cleanup tests in general. Snapshot tests are unpredictably not working for some reason.
    - snapshot test resources: [swr](https://github.com/zeit/swr/blob/master/test/use-swr.test.tsx#L1083), [react-apollo-hooks](https://github.com/trojanowski/react-apollo-hooks/blob/master/src/__tests__/useQuery-test.tsx#L218)
    - basic test resources: [fetch-suspense](https://github.com/CharlesStover/fetch-suspense/blob/master/tests/create-use-fetch.test.ts), [@testing-library/react-hooks suspense PR](https://github.com/testing-library/react-hooks-testing-library/pull/35/files)
- [ ] maybe add translations [like this one](https://github.com/jamiebuilds/unstated-next)
- [ ] maybe add contributors [all-contributors](https://github.com/all-contributors/all-contributors)
- [ ] add sponsors [similar to this](https://github.com/carbon-app/carbon)
- [ ] Error handling
  - [ ] if calling `response.json()` and there is no response yet
- [ ] tests
  - [ ] tests for SSR
  - [ ] tests for react native [see here](https://stackoverflow.com/questions/45842088/react-native-mocking-formdata-in-unit-tests)
  - [ ] tests for GraphQL hooks `useMutation` + `useQuery`
  - [ ] tests for stale `response` see this [PR](https://github.com/ava/use-http/pull/119/files)
  - [ ] tests to make sure `response.formData()` and some of the other http `response methods` work properly
  - [ ] the `onMount` works properly with all variants of passing `useEffect(fn, [request.get])` and not causing an infinite loop
  - [ ] `async` tests for `interceptors.response`
  - [ ] aborts fetch on unmount
  - [ ] does not abort fetch on every rerender
  - [ ] `retryDelay` and `timeout` are both set. It works, but is annoying to deal with timers in tests. [resource](https://github.com/fac-13/HP-game/issues/9)
  - [ ] `timeout` with `retries > 0`. (also do `retires > 1`) Need to figure out how to advance timers properly to write this and the test above
- [ ] take a look at how [react-apollo-hooks](https://github.com/trojanowski/react-apollo-hooks) work. Maybe ad `useSubscription` and `const request = useFetch(); request.subscribe()` or something along those lines
- [ ] make this a github package
  - [see ava packages](https://github.com/orgs/ava/packages)
- [ ] Documentation:
  - [ ] show comparison with Apollo
  - [ ] figure out a good way to show side-by-side comparisons
  - [ ] show comparison with Axios
- [ ] potential option ideas

  ```jsx
  const request = useFetch({
    graphql: {
      // all options can also be put in here
      // to overwrite those of `useFetch` for
      // `useMutation` and `useQuery`
    },
    // by default this is true, but if set to false
    // then we default to the responseType array of trying 'json' first, then 'text', etc.
    // hopefully I get some answers on here: https://bit.ly/3afPlJS
    responseTypeGuessing: true,

    // Allows you to pass in your own cache to useFetch
    // This is controversial though because `cache` is an option in the requestInit
    // and it's value is a string. See: https://developer.mozilla.org/en-US/docs/Web/API/Request/cache
    // One possible solution is to move the default `fetch`'s `cache` to `cachePolicy`.
    // I don't really like this solution though.
    // Another solution is to only allow the `cache` option with the `<Provider cache={new Map()} />`
    cache: new Map(),
    // these will be the exact same ones as Apollo's
    cachePolicy: 'cache-and-network', 'network-only', 'cache-only', 'no-cache' // 'cache-first'
    // potential idea to fetch on server instead of just having `loading` state. Not sure if this is a good idea though
    onServer: true,
    onSuccess: (/* idk what to put here */) => {},
    // if you would prefer to pass the query in the config
    query: `some graphql query`
    // if you would prefer to pass the mutation in the config
    mutation: `some graphql mutation`
    refreshWhenHidden: false,
  })


  // potential for causing a rerender after clearing cache if needed
  request.cache.clear(true)
  ```

- [ ] potential option ideas for `GraphQL`

  ```jsx
  const request = useQuery({ onMount: true })`your graphql query`

  const request = useFetch(...)
  const userID = 'some-user-uuid'
  const res = await request.query({ userID })`
    query Todos($userID string!) {
      todos(userID: $userID) {
        id
        title
      }
    }
  `
  ```

- [ ] make code editor plugin/package/extension that adds GraphQL syntax highlighting for `useQuery` and `useMutation` 😊

- [ ] add React Native test suite

[1]: https://github.com/ava/use-http/issues/new?title=[Feature%20Request]%20YOUR_FEATURE_NAME
[2]: https://github.com/ava/use-http/issues/93#issuecomment-600896722
[3]: https://github.com/ava/use-http/raw/master/public/dog.png
[4]: https://reactjs.org/docs/javascript-environment-requirements.html
[5]: https://use-http.com
[`react-app-polyfill`]: https://www.npmjs.com/package/react-app-polyfill
