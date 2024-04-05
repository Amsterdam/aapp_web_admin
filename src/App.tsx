import {Suspense} from 'react'
import {Provider as StoreProvider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {AuthProvider} from 'components/authentication/Auth.provider'
import {routes} from 'routes'
import {store} from 'store/store'

const router = createBrowserRouter(routes, {basename: '/mbs'})

const App = () => (
  <Suspense fallback={<p>Laden...</p>}>
    <AuthProvider>
      <StoreProvider store={store}>
        <RouterProvider router={router} />
      </StoreProvider>
    </AuthProvider>
  </Suspense>
)

export default App
