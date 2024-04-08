import uniqueId from 'lodash.uniqueid'
import {Controller, UseControllerProps} from 'react-hook-form'
import {TextAreaProps} from 'components/ui/forms/TextArea'

type Props = UseControllerProps & TextAreaProps

const TextArea = ({defaultValue, name, rules, ...rest}: Props) => {
  const id = uniqueId('TextArea-')

  return (
    <Controller
      defaultValue={defaultValue || ''}
      name={name}
      render={({field: {onChange, value}, fieldState: {error}}) => (
        <TextArea
          {...rest}
          name={name}
          id={id}
          error={error?.message}
          onChange={onChange}
          value={value}
        />
      )}
      rules={rules}
    />
  )
}

export default TextArea
