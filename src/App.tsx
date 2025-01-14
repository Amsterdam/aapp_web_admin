import {PublicClientApplication} from '@azure/msal-browser'
import {MsalProvider} from '@azure/msal-react'
import {Suspense} from 'react'
import {Provider as StoreProvider} from 'react-redux'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import ProtectedRoutes from 'authentication/components/ProtectedRoutes'
import {BASE_ROUTE} from 'constants/routes'
import {routes} from 'routes'
import {store} from 'store/store'

import '@amsterdam/design-system-assets/font/index.css'
import '@amsterdam/design-system-css/dist/index.css'
import '@amsterdam/design-system-tokens/dist/index.css'

const router = createBrowserRouter(
  [{element: <ProtectedRoutes />, children: routes}],
  {basename: BASE_ROUTE},
)

type Props = {
  pca: PublicClientApplication
}

const App = ({pca}: Props) => (
  <Suspense fallback={<p>Laden...</p>}>
    <MsalProvider instance={pca}>
      <StoreProvider store={store}>
        <RouterProvider router={router} />
      </StoreProvider>
    </MsalProvider>
  </Suspense>
)

export default App
