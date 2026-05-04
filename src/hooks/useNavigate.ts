import {
  NavigateOptions,
  // eslint-disable-next-line no-restricted-imports
  useNavigate as useNavigateReactRouter,
} from 'react-router-dom'
import getUrl, {ExtractParams} from '@/utils/getUrl'

const useNavigate = () => {
  const navigate = useNavigateReactRouter()

  return <T extends string>(
    url: T,
    params?: ExtractParams<T>,
    options?: NavigateOptions,
  ) => navigate(getUrl(url, params), options)
}

export default useNavigate
