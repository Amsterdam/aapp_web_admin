import {Suspense} from 'react'
import {Provider as StoreProvider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import {Init} from 'components/authentication/Init'
import {routes} from 'routes'
import {store} from 'store/store'

const router = createBrowserRouter(routes)

const App = () => (
  <Suspense fallback={<p>Laden...</p>}>
    <Init>
      <StoreProvider store={store}>
        <RouterProvider router={router} />
      </StoreProvider>
    </Init>
  </Suspense>
)

export default App
