import {Outlet} from 'react-router-dom'
import LoginBoundary from './LoginBoundary'

const ProtectedRoutes = () => (
  <LoginBoundary>
    <Outlet />
  </LoginBoundary>
)

export default ProtectedRoutes
