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
 */
export const getCroppedImg = async (
  src: string,
  {height, width, x, y}: Area,
) => {
  const image = await createImage(src)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No ctx')
  }

  // set canvas size to match the bounding box
  canvas.width = image.width
  canvas.height = image.height

  // draw image
  ctx.drawImage(image, 0, 0)

  const croppedCanvas = document.createElement('canvas')

  const croppedCtx = croppedCanvas.getContext('2d')

  if (!croppedCtx) {
    throw new Error('No croppedCtx')
  }

  // Set the size of the cropped canvas
  croppedCanvas.width = 940
  croppedCanvas.height = 415

  // Draw the cropped image onto the new canvas
  croppedCtx.drawImage(canvas, x, y, width, height, 0, 0, 940, 415)

  // As Base64 string
  // return croppedCanvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise<string>(resolve => {
    croppedCanvas.toBlob(file => {
      if (!file) {
        throw new Error('No file')
      }
      resolve(URL.createObjectURL(file))
    }, 'image/jpeg')
  })
}
