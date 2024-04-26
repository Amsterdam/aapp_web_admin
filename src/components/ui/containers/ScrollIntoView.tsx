import {useRef, useEffect, ReactNode} from 'react'

type Props = {
  children: ReactNode
  block?: 'start' | 'center' | 'end' | 'nearest'
  inline?: 'start' | 'center' | 'end' | 'nearest'
}

const ScrollIntoView = ({children, ...props}: Props) => {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({behavior: 'smooth', ...props})
    }
  }, [props])

  return <div ref={ref}>{children}</div>
}

export default ScrollIntoView
