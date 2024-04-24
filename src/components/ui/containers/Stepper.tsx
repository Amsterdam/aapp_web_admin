import {Children, ReactElement, ReactNode} from 'react'

// eslint-disable-next-line react/no-unused-prop-types
type StepProps = {children: ReactNode; id: string | number}

// eslint-disable-next-line react/jsx-no-useless-fragment
export const Step = ({children}: StepProps) => <>{children}</>

type StepperProps = {
  children: ReactNode
  currentId: string | number
}

export const Stepper = ({children, currentId}: StepperProps) => {
  if (!children) {
    return null
  }

  return (
    <>
      {Children.toArray(children).find(
        child => (child as ReactElement<StepProps>).props.id === currentId,
      )}
    </>
  )
}
