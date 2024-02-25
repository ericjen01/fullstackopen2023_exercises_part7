/* eslint-disable react/no-unescaped-entities */
import { React, useEffect, useContext } from 'react'

import { useDispatch } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'

import { Container, Button, AppBar, Toolbar } from '@mui/material'

import BlogListing from './components/BlogListing'
import UserListing from './components/UserListing'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import Footer from './components/Footer'
import Notification from './components/Notification'
import { navBtnSty } from './components/Styling'
import { initCommentsAC } from './reducers/commentReducer'

import { UserCtx, callUserDisp } from './reducers/UserCtx'
import blogRequest from './requests/blogsReq'
import userRequest from './requests/blogsReq'
import loginRequest from './requests/loginReq'
import localStorage from './requests/localStorageServ'
import { callLoginDisp } from './reducers/LoginCtx'
import { callBlogDisp } from './reducers/BlogCtx'


const App = () => {

  const dispatch = useDispatch()
  const [userState, userDisp] = useContext(UserCtx)
  const loginDisp = callLoginDisp()
  const userDisp99 = callUserDisp()
  const blogDisp = callBlogDisp()
 // const [blogState, blogDisp] = useContext(BlogCtx)


  useEffect(() => {
    const mainLocalUser = localStorage.get('loggedBloglistUser')
    const allLocalUsers = localStorage.get('allStoredUsers')
    const localBlogs = localStorage.get('storedBlogs')

    if(mainLocalUser){
      userDisp99({type: 'setUser', payload: mainLocalUser})
      loginDisp({type: 'setCredential', payload: mainLocalUser})
      loginDisp({type: 'setToken', payload: mainLocalUser.token})
    } 

    userRequest.get()
    userDisp({type: 'setAllUsers', payload: allLocalUsers}) 

    blogRequest.get()
    blogDisp({type: 'setAllBlogs', payload: localBlogs})

    dispatch(initCommentsAC())
  }, [])


  const storedUser = userState.user
  console.log('storedUser: ', storedUser)
  console.log('users: ', userState)
  //const allUsers = [useSelector(state => state.users)]

  const Home = () => {
    return(
      <>
        <h2>Blogs</h2>
        <BlogForm/>
        <BlogListing/>
      </>
    )
  }

  const handleLogout = async (e) => {
    e.preventDefault()
    loginRequest.logout()
  }

  return(
    <Container>
      <AppBar sx={{borderRadius:1}} position='static'>
        <Toolbar>
          <Button color='inherit' component={Link}to='/'>Home</Button>
          <Button color='inherit' component={Link}to='/blogs'>Blogs</Button>
          <Button color='inherit' component={Link}to='/users'>Users</Button>
          {storedUser 
            ? <div style={{marginLeft: 'auto', fontFamily:'arial', fontSize:'.75rem'}}>
                <div style={{display:'flex', flexDirection:'row'}}>
                  <span>Logged in as: <br/> "{storedUser.username}"</span>
                  <Button {...navBtnSty} onClick={handleLogout}>Logout</Button>
                </div>
              </div>

            : <div style={{marginLeft:'auto', marginRight:'.5rem'}}>
                <Button {...navBtnSty} component={Link} to="/login"> Login </Button>
              </div>
          }
        </Toolbar>
      </AppBar>
      <Notification/>
      <Routes>
        <Route path='/blogs' element={<BlogListing/>} />
        <Route path='/' element={storedUser? <Home/> : <LoginForm/>} />
        <Route path='/login' element={storedUser? <Home/> : <LoginForm/>} />
        <Route path='/users' element={storedUser? <UserListing/> : <LoginForm/>} />
       {/*  <Route path="/users/:id" element={mainLocalUser? <SingleUserPage/>: <LoginForm/>} />
        <Route path='/blogs/:id' element={mainLocalUser? <SingleBlogPage/> : <LoginForm/>}/>
*/}
      </Routes>
      <Footer/>
    </Container>
  )  
}

export default App
