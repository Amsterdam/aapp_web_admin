import Phrase from '../text/Phrase'

type Props = {
  maxLength: number | undefined
  value: string | undefined
}

export const CharactersLeftDisplay = ({maxLength, value}: Props) => {
  return maxLength !== undefined &&
    maxLength > 0 &&
    typeof value === 'string' ? (
    <Phrase color={value.length > maxLength ? 'error' : 'default'}>
      {value.length}/{maxLength}
    </Phrase>
  ) : null
}
