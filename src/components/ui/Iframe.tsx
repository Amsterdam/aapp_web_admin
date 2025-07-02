import {useEffect, useId} from 'react'

type Props = {
  src: string
  title: string
}

const Iframe = ({src, title}: Props) => {
  const iframeId = useId()
  useEffect(() => {
    function resizeIframe() {
      const iframe = document.getElementById(iframeId)
      if (!iframe) {
        // eslint-disable-next-line no-console
        console.error('Iframe not found')

        return
      }
      const rect = iframe.getBoundingClientRect()
      const height = window.innerHeight - rect.top - 85
      iframe.style.height = `${height.toString()}px`
    }

    window.addEventListener('load', resizeIframe)
    window.addEventListener('resize', resizeIframe)
    resizeIframe()

    return () => {
      window.removeEventListener('load', resizeIframe)
      window.removeEventListener('resize', resizeIframe)
    }
  }, [iframeId])

  return (
    <iframe
      id={iframeId}
      src={src}
      width="100%"
      title={title}
      style={{border: 'none'}}
    />
  )
}

export default Iframe
