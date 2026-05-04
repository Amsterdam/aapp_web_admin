import {ReactNode} from 'react'
import Icon from '@/components/ui/media/Icon'

import './Loader.css'

type Props = {
  children?: ReactNode
  loading?: boolean
}

const Loader = ({children, loading = false}: Props) => {
  if (loading) {
    return (
      <div className="Loader">
        <div className="LoaderContent">{children}</div>
        <div className="LoaderIconOuter">
          <div className="LoaderIconInner">
            <Icon name="spinner" />
          </div>
        </div>
      </div>
    )
  }

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{children}</>
}

export default Loader
