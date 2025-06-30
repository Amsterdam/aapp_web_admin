/** max safe size per cookie (a bit below 4 kB) */
export const CHUNK_SIZE = 3500

export const setChunkedCookie = (name: string, value: string, days = 1) => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = date.toUTCString()
  const secure =
    window.location.protocol === 'https:' ? ' Secure; SameSite=Strict;' : ''

  /* clear previous chunks */
  document.cookie
    .split('; ')
    .filter(c => c.startsWith(`${name}.`))
    .forEach(c => {
      const [k] = c.split('=')
      document.cookie = `${k}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/;`
    })

  /* write new chunks */
  for (let i = 0, idx = 0; i < value.length; i += CHUNK_SIZE, idx += 1) {
    const chunk = value.slice(i, i + CHUNK_SIZE) // keep raw, avoids length-inflation
    document.cookie = `${name}.${idx}=${chunk}; Expires=${expires}; Path=/;${secure}`
  }
}
