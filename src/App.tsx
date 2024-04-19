import {Suspense} from 'react'
import {Provider as StoreProvider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {AuthProvider} from 'authentication/components/Auth.provider'
import {BASE_ROUTE} from 'constants/routes'
import {routes} from 'routes'
import {store} from 'store/store'

const router = createBrowserRouter(routes, {basename: BASE_ROUTE})

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
