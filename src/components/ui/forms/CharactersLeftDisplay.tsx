import Phrase from '../text/Phrase'

type Props = {
  maxLength: number | undefined
  value: string | undefined
}

export const CharactersLeftDisplay = ({maxLength, value}: Props) => {
  if (!maxLength || typeof value !== 'string') {
    return null
  }

  return (
    <Phrase color={value.length > maxLength ? 'error' : 'default'}>
      {value.length}/{maxLength}
    </Phrase>
  )
}
