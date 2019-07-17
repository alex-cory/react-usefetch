<img src="https://github.com/alex-cory/use-http/raw/master/public/dog.png" />

<p align="center">
    <h1 align="center">useFetch</h1>
</p>
<p align="center">🐶 React hook for making isomorphic http requests</p>
<p align="center">
    <a href="https://github.com/alex-cory/use-http/pulls">
      <img src="https://camo.githubusercontent.com/d4e0f63e9613ee474a7dfdc23c240b9795712c96/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f5052732d77656c636f6d652d627269676874677265656e2e737667" />
    </a>
    <a href="https://circleci.com/gh/alex-cory/use-http">
      <img src="https://img.shields.io/circleci/project/github/alex-cory/use-http/master.svg" />
    </a>
    <a href="https://www.npmtrends.com/use-http">
      <img src="https://img.shields.io/npm/dm/use-http.svg" />
    </a>
    <a href="https://lgtm.com/projects/g/alex-cory/use-http/context:javascript">
      <img alt="undefined" src="https://img.shields.io/lgtm/grade/javascript/g/alex-cory/use-http.svg?logo=lgtm&logoWidth=18"/>
    </a>
    <a href="https://bundlephobia.com/result?p=use-http">
      <img alt="undefined" src="https://img.shields.io/bundlephobia/minzip/use-http.svg">
    </a>
    <a href="https://snyk.io/test/github/alex-cory/use-http?targetFile=package.json">
      <img src="https://snyk.io/test/github/alex-cory/use-http/badge.svg?targetFile=package.json" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/alex-cory/use-http?targetFile=package.json" style="max-width:100%;">
    </a>
    <a href="https://www.npmjs.com/package/use-http">
      <img src="https://img.shields.io/npm/v/use-http.svg" alt="Known Vulnerabilities" data-canonical-src="https://snyk.io/test/github/alex-cory/use-http?targetFile=package.json" style="max-width:100%;">
    </a>
    <a href="https://github.com/alex-cory/use-http/blob/master/license.md">
      <img alt="undefined" src="https://img.shields.io/github/license/alex-cory/use-http.svg">
    </a>
    <a href="https://greenkeeper.io/">
      <img alt="undefined" src="https://badges.greenkeeper.io/alex-cory/use-http.svg">
    </a>
</p>

<img align="right" src="https://media.giphy.com/media/fAFg3xESCJyw/giphy.gif" />
<p>
Need to fetch some data? Try this one out. It's an isomorphic fetch hook. That means it works with SSR (server side rendering).
</p>
<br />
<p>
A note on the documentation below. Many of these examples could have performance improvements using <code>useMemo</code> and <code>useCallback</code>, but for the sake of the beginner/ease of reading, they are left out.
</p>

Features
=========

- SSR (server side rendering) support
- TypeScript support
- 1 dependency ([use-ssr](https://github.com/alex-cory/use-ssr))
- GraphQL support (queries + mutations)
- Provider to set default `url` and `options`

Examples
=========
- <a target="_blank" rel="noopener noreferrer" href='https://codesandbox.io/s/usefetch-in-nextjs-nn9fm'>useFetch + Next.js</a>
- <a target="_blank" rel="noopener noreferrer" href='https://codesandbox.io/embed/km04k9k9x5'>useFetch + create-react-app</a>
- <a target="_blank" rel="noopener noreferrer" href='https://codesandbox.io/s/useget-with-provider-c78w2'>useGet + < Provider /></a>

Installation
=============

```shell
yarn add use-http    or    npm i -S use-http
```

Usage
=============

Basic Usage
-------------------
```js
import useFetch from 'use-http'

function Todos() {
  const options = { // accepts all `fetch` options
    onMount: true // will fire on componentDidMount
  }

  const todos = useFetch('https://example.com/todos', options)

  function addTodo() {
    todos.post({
      title: 'no way',
    })
  }

  return (
    <>
      <button onClick={addTodo}>Add Todo</button>
      {request.error && 'Error!'}
      {request.loading && 'Loading...'}
      {(todos.data || []).length > 0 && todos.data.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      )}
    </>
  )
}
```

Managed State Usage ⚠️
-------------------

```js
import useFetch from 'use-http'

function Todos() {
  const [todos, setTodos] = useState([])

  const request = useFetch('https://example.com')
  
  useEffect(() => {
    initializeTodos()
  }, [])
  
  async function initializeTodos() {
    const initialTodos = await request.get('/todos')
    setTodos(initialTodos)
  }

  async function addTodo() {
    const newTodo = await request.post('/todos', {
      title: 'no way',
    })
    setTodos(oldTodos => [...oldTodos, newTodo])
  }

  return (
    <>
      <button onClick={addTodo}>Add Todo</button>
      {request.error && 'Error!'}
      {request.loading && 'Loading...'}
      {todos.length > 0 && todos.map(todo => (
        <div key={todo.id}>{todo.title}</div>
      )}
    </>
  )
}
```

Destructured
-------------
```js
var [data, loading, error, request] = useFetch('https://example.com')

// want to use object destructuring? You can do that too
var { data, loading, error, request } = useFetch('https://example.com')
```

Relative routes
---------------
⚠️ `baseUrl` is no longer supported, it is now only `url`
```js
var request = useFetch({ url: 'https://example.com' })
// OR
var request = useFetch('https://example.com')

request.post('/todos', {
  no: 'way'
})
```
Helper hooks (**usePost, usePut, useGet, etc.**)
--------------------------------------------------

```js
import { useGet, usePost, usePatch, usePut, useDelete } from 'use-http'

const [data, loading, error, patch] = usePatch({
  url: 'https://example.com',
  headers: {
    'Accept': 'application/json; charset=UTF-8'
  }
})

patch({
  yes: 'way',
})
```

Abort
-----

<img src="https://raw.githubusercontent.com/alex-cory/use-http/master/public/abort-example-1.gif" height="250" />


```js
const githubRepos = useFetch({
  url: `https://api.github.com/search/repositories?q=`
})

// the line below is not isomorphic, but for simplicity we're using the browsers `encodeURI`
const searchGithubRepos = e => githubRepos.get(encodeURI(e.target.value))

<>
  <input onChange={searchGithubRepos} />
  <button onClick={githubRepos.abort}>Abort</button>
  {githubRepos.loading ? 'Loading...' : githubRepos.data.items.map(repo => (
    <div key={repo.id}>{repo.name}</div>
  ))}
</>
```

GraphQL Query
---------------
```js

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

GraphQL Mutation
-----------------
```js

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

`Provider` + `useMutation` and `useQuery`
=========================================

The `Provider` allows us to set a default `url`, `options` (such as headers) and so on.

useQuery (query for todos)
-------------------
```js
import { Provider, useQuery, useMutation } from 'use-http'

function QueryComponent() {
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

useMutation (add a new todo)
-------------------
```js
function MutationComponent() {
  const [todoTitle, setTodoTitle] = useState('')
  
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


Adding the Provider
-------------------
These props are defaults used in every request inside the `<Provider />`. They can be overwritten individually
```js
function App() {

  const options = {
    headers: {
      Authorization: 'Bearer jwt-asdfasdfasdf'
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

Hooks
=======
| Option                | Description                                                                              |
| --------------------- | ---------------------------------------------------------------------------------------- |
| `useFetch` | The base hook |
| `useGet` | Defaults to a GET request |
| `usePost` | Defaults to a POST request |
| `usePut` | Defaults to a PUT request |
| `usePatch` | Defaults to a PATCH request |
| `useDelete` | Defaults to a DELETE request |
| `useQuery` | For making a GraphQL query |
| `useMutation` | For making a GraphQL mutation |

Options
========

This is exactly what you would pass to the normal js `fetch`, with a little extra.

| Option                | Description                                                               |  Default     |
| --------------------- | --------------------------------------------------------------------------|------------- |
| `onMount` | Once the component mounts, the http request will run immediately | false |
| `url` | Allows you to set a base url so relative paths can be used for each request. You can also just set this as the 1st argument like `useFetch('url')`      | empty string |

```js
const {
  data,
  loading,
  error,
  request,
  get,
  post,
  patch,
  put,
  delete  // don't destructure `delete` though, it's a keyword
  del,    // <- that's why we have this (del). or use `request.delete`
  abort,
  query,  // GraphQL
  mutate, // GraphQL
} = useFetch({
  url: 'https://example.com', // replaced baseUrl
  onMount: true
})
```
or
```js
const [data, loading, error, request] = useFetch({
  url: 'https://example.com', // replaced baseUrl
  onMount: true
})

const {
  get,
  post,
  patch,
  put,
  delete  // don't destructure `delete` though, it's a keyword
  del,    // <- that's why we have this (del). or use `request.delete`
  abort,
  query,  // GraphQL
  mutate, // GraphQL
} = request
```

Feature Requests/Ideas
======================
If you have feature requests, let's talk about them in [this issue](https://github.com/alex-cory/use-http/issues/13)!


The Goal With Suspense <sup><strong>(not implemented yet)</strong></sup>
==================
```js
import React, { Suspense, unstable_ConcurrentMode as ConcurrentMode, useEffect } from 'react'

function WithSuspense() {
  const suspense = useFetch('https://example.com')

  useEffect(() => {
    suspense.read()
  }, [])

  if (!suspense.data) return null

  return <pre>{suspense.data}</pre>
}

function App() (
  <ConcurrentMode>
    <Suspense fallback="Loading...">
      <WithSuspense />
    </Suspense>
  </ConcurrentMode>
)
```

Mutations with Suspense <sup>(Not Implemented Yet)</sup>
==================
```js
const App = () => {
  const [todoTitle, setTodoTitle] = useState('')
  // if there's no <Provider /> used, useMutation works this way
  const mutation = useMutation('http://example.com', `
    mutation CreateTodo($todoTitle string) {
      todo(title: $todoTitle) {
        id
        title
      }
    }
  `)

  // ideally, I think it should be mutation.write({ todoTitle }) since mutation ~= POST
  const createTodo = () => mutation.read({ todoTitle })
  
  if (!request.data) return null

  return (
    <>
      <input onChange={e => setTodoTitle(e.target.value)} />
      <button onClick={createTodo}>Create Todo</button>
      <pre>{mutation.data}</pre>
    </>
  )
}
```
