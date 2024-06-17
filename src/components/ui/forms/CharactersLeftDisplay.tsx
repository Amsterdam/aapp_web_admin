import Phrase from 'components/ui/text/Phrase'

type Props = {
  maxLength: number | undefined
  value: string | undefined
}

const CharactersLeftDisplay = ({maxLength, value}: Props) => {
  if (!maxLength || typeof value !== 'string') {
    return null
  }

  return (
    <Phrase color={value.length > maxLength ? 'error' : 'default'}>
      {value.length}/{maxLength}
    </Phrase>
  )
}

export default CharactersLeftDisplay
