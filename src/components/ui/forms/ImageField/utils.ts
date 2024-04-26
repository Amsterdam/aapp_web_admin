import {Area} from 'react-easy-crop'

export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.src = url
  })

/**
 * Get the cropped image by creating a canvas element containing the cropped iamge and the exporting the canvase to a blob
 * Source: https://codesandbox.io/p/sandbox/react-easy-crop-demo-with-cropped-output-q8q1mnr01w
 */
export const getCroppedImage = async (
  src: string,
  {height, width, x, y}: Area,
  outputWidth: number,
  aspectRatio: number,
) => {
  const image = await createImage(src)
  const canvas = document.createElement('canvas')
  const canvasContext = canvas.getContext('2d')

  if (!canvasContext) {
    throw new Error('No ctx')
  }

  canvas.width = image.width
  canvas.height = image.height

  canvasContext.drawImage(image, 0, 0)

  const croppedCanvas = document.createElement('canvas')

  const croppedCtx = croppedCanvas.getContext('2d')

  if (!croppedCtx) {
    throw new Error('No croppedCtx')
  }

  const w = outputWidth
  const h = outputWidth / aspectRatio
  croppedCanvas.width = w
  croppedCanvas.height = h

  croppedCtx.drawImage(canvas, x, y, width, height, 0, 0, w, h)

  return new Promise<string>(resolve => {
    croppedCanvas.toBlob(file => {
      if (!file) {
        throw new Error('No file')
      }
      resolve(URL.createObjectURL(file))
    }, 'image/jpeg')
  })
}
