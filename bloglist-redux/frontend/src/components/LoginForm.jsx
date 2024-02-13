import Notification from './Notification'
import { useDispatch } from 'react-redux'

import { btnStyle } from './Styling'
import { txtFldStyle } from './Styling'

import { loginAC } from '../reducers/loginReducer'
import { initBlogAC } from '../reducers/blogReducer'

import { TextField, Button, Grid } from '@mui/material'
import { notifyAC } from '../reducers/notifReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (e) => {
    e.preventDefault()

    const userName = e.target.username.value
    const password = e.target.password.value
    //console.log(userName, password)
 
    e.target.username.value = ''
    e.target.password.value = ''

    dispatch(loginAC(userName, password))
    dispatch(notifyAC(`"${userName}" successfully logged in`,'success',3))
    dispatch(initBlogAC())
  }

  return (
    <>
      <h3>Log In To Access Blog & User Functions</h3>
      <form style={{marginTop:-10}} onSubmit={handleLogin}>
        <Grid container direction={"column"} spacing={1} mt={2}>

          <Grid item>
            <TextField {...txtFldStyle} id="username" label='User Name' />
          </Grid>
          
          <Grid item>
            <TextField {...txtFldStyle} id="password" type='password' label='Password'/>
          </Grid>

          <Grid item>
            <Button {...btnStyle} type='submit' id='loginBtn'>Login</Button>
          </Grid>

        </Grid>
      </form>
    </>
  )
}

export default LoginForm