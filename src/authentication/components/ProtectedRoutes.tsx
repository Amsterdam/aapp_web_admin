import {Outlet} from 'react-router-dom'
import {LoginBoundary} from './LoginBoundary'

export const ProtectedRoutes = () => (
  <LoginBoundary>
    <Outlet />
  </LoginBoundary>
)
