type ApiImageSource = {
  height: number
  uri: string
  width: number
}

export type ApiImage = {
  alternativeText: string | null
  aspectRatio: number
  id: string
  sources: ApiImageSource[]
}
