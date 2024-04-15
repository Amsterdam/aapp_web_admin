import Column from 'components/ui/layout/Column'
import Phrase from 'components/ui/text/Phrase'

type Props = {
  message: string
}

const Error = ({message}: Props) => (
  <Column>
    <Phrase emphasis="strong">Fout</Phrase>
    <Phrase>{message}</Phrase>
  </Column>
)

export default Error
