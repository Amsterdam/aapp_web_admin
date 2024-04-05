import {toPng} from 'html-to-image'
import {useCallback, useRef} from 'react'
import QRCode from 'react-qr-code'
import Button from 'components/ui/button/Button'
import Column from 'components/ui/layout/Column'
import Row from 'components/ui/layout/Row'

type Props = {
  value: string
}

const svgToDataURL = (svgData: string) => {
  const encodedSvg = encodeURIComponent(svgData)
    .replace(/'/g, '%27')
    .replace(/"/g, '%22')

  return `data:image/svg+xml,${encodedSvg}`
}

const QRCodeWithDownload = ({value}: Props) => {
  const qrCodeRef = useRef<SVGSVGElement & QRCode & HTMLElement>(null)
  const onPngPress = useCallback(() => {
    if (qrCodeRef.current) {
      toPng(qrCodeRef.current)
        .then(dataUrl => {
          const link = document.createElement('a')
          link.href = dataUrl
          link.download = `qr-code.png`
          link.click()
        })
        .catch(error => {
          // eslint-disable-next-line no-console
          console.error('Error generating QR code:', error)
        })
    }
  }, [])
  const onSvgPress = useCallback(() => {
    if (qrCodeRef.current) {
      const link = document.createElement('a')
      link.href = svgToDataURL(qrCodeRef.current.outerHTML)
      link.download = `qr-code.svg`
      link.click()
    }
  }, [])
  return (
    <Column gutter="md">
      <QRCode value={value} ref={qrCodeRef} />
      <Row gutter="md">
        <Button label="Download PNG" onClick={onPngPress} />
        <Button label="Download SVG" onClick={onSvgPress} />
      </Row>
    </Column>
  )
}

export default QRCodeWithDownload
