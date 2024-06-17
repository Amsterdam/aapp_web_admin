import {ReactNode} from 'react'
import {SpacingToken} from 'components/ui/layout/types'
import './inset.css'
import './Box.css'

type Props = {
  children: ReactNode
  /**
   * Whether the box should be a flex item.
   */
  flex?: boolean
  /**
   * Whether the box should be a flex container.
   */
  flexContainer?: boolean
  /**
   * The amount of inner whitespace.
   */
  inset?: keyof typeof SpacingToken
  /**
   * The amount of horizontal inner whitespace.
   */
  insetHorizontal?: keyof typeof SpacingToken
  /**
   * The amount of vertical inner whitespace.
   */
  insetVertical?: keyof typeof SpacingToken
  /**
   * The amount of horizontal negative whitespace.
   */
  negativeInsetHorizontal?: keyof typeof SpacingToken
}

const Box = ({
  children,
  flex,
  flexContainer,
  inset = 'md',
  insetHorizontal,
  insetVertical,
  negativeInsetHorizontal,
}: Props) => (
  <div
    className="Box"
    data-flex={flex}
    data-flex-container={flexContainer}
    data-inset={inset}
    data-inset-horizontal={insetHorizontal}
    data-inset-vertical={insetVertical}
    data-negative-inset-horizontal={negativeInsetHorizontal}>
    {children}
  </div>
)

export default Box
