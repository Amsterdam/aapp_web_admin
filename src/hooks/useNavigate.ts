// eslint-disable-next-line no-restricted-imports
import {useNavigate as useNavigateReactRouter} from 'react-router-dom'
import getUrl, {ExtractParams} from 'utils/getUrl'

const useNavigate = () => {
  const navigate = useNavigateReactRouter()

  return <T extends string>(url: T, params?: ExtractParams<T>) =>
    navigate(getUrl(url, params))
}

export default useNavigate
