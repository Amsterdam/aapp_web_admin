import RcSlider, {SliderProps, SliderRef} from 'rc-slider'
import {forwardRef} from 'react'
import 'rc-slider/assets/index.css'

import './Slider.css'

// eslint-disable-next-line react/display-name
const Slider = forwardRef<SliderRef, SliderProps<number | number[]>>(
  (props, ref) => (
    <div className="Slider">
      <RcSlider
        {...props}
        ref={ref}
      />
    </div>
  ),
)

export default Slider
