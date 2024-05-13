const getBase64ImageData = (
  blobUrl: string,
): Promise<string | ArrayBuffer | null> => {
  return new Promise((resolve, reject) => {
    fetch(blobUrl)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader()
        reader.readAsDataURL(blob)
        reader.onloadend = () => {
          if (typeof reader.result !== 'string') {
            throw new Error('Failed to convert Blob URL to base64')
          }
          const base64data = reader.result.split(',')[1]
          resolve(base64data)
        }
      })
      .catch(error => {
        reject(error)
      })
  })
}

export default getBase64ImageData
