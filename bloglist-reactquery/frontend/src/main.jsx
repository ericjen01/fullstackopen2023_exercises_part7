import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Provider } from 'react-redux'
import store from './store'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { UserCtxProvider } from './reducers/UserCtx'
import { BlogCtxProvider } from './reducers/BlogCtx'
import { LoginCtxProvider } from './reducers/LoginCtx'
import { NotifCtxProvider } from './reducers/NotifCtx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <Provider store={store}>
      <QueryClientProvider client ={queryClient}>
        <UserCtxProvider>
        <BlogCtxProvider>
        <LoginCtxProvider>
        <NotifCtxProvider>
        <App/>
        </NotifCtxProvider>
        </LoginCtxProvider>
        </BlogCtxProvider>
        </UserCtxProvider>
      </QueryClientProvider>
    </Provider>
  </Router>

)
