import PropTypes from 'prop-types'
import { useState, forwardRef, useImperativeHandle } from 'react'
import { Button } from '@mui/material'
import { btnStyle } from './Styling'

const Togglable = forwardRef((props, ref) => {
  const [toggled, setToggled] = useState(false)
  const showWhenToggled = { display: toggled ? '' : 'none' }
  const hidewhenToggled = { display: toggled ? 'none' : '' }
  const toggleVisibility = () => setToggled(!toggled)

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <>
      <div style={hidewhenToggled}>
        <Button {...btnStyle} onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenToggled}>
        {props.children}
        <Button {...btnStyle} onClick={toggleVisibility}>Cancel</Button>
      </div>
    </>
  )

})

Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
