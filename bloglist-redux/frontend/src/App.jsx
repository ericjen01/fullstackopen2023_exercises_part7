import { useState, useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Routes, Route, Link } from 'react-router-dom'

import { Grid, Container, Button, AppBar, Toolbar } from '@mui/material'

import BlogListing from './components/BlogListing'
import UserListing from './components/UserListing'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

import Footer from './components/Footer'
import SingleUserPage from './components/SingleUserPage'
import SingleBlogPage from './components/SingleBlogPage'
import Togglable from './components/Togglable'
import Notification from './components/Notification'
import { initUser, logoutAC } from './reducers/loginReducer'
import { storedUserAC } from './reducers/loginReducer'
import { initBlogAC } from './reducers/blogReducer'
import { btnStyle } from './components/Styling'
import { initAllUsersAC } from './reducers/userReducer'
import { initCommentsAC } from './reducers/commentReducer'

function App() {
  const dispatch = useDispatch()
  //const storedUser = useSelector(state => state.storedUser)
  const userInLocalStorage = JSON.parse(window.localStorage.getItem('loggedBloglistUser'))

  useEffect(() => {
    dispatch(storedUserAC())

    if(userInLocalStorage){
      dispatch(initUser(userInLocalStorage)) 
    } 
    //dispatch(initUser())
    dispatch(initBlogAC())
    dispatch(initCommentsAC())
    dispatch(initAllUsersAC())
  }, [])

  //console.log('userInLocalStorage: ', userInLocalStorage.username)
  const storedUser = [useSelector(state => state.storedUser)]
  const allUsers = [useSelector(state => state.users)]

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
    dispatch(logoutAC())
  }

  return(
    <Container>
      <AppBar sx={{borderRadius:1}} position='static'>
        <Toolbar>
          <Button color='inherit' component={Link}to='/'>Home</Button>
          <Button color='inherit' component={Link}to='/blogs'>Blogs</Button>
          <Button color='inherit' component={Link}to='/users'>Users</Button>
          {userInLocalStorage 
            ? <div style={{marginLeft: 'auto', fontFamily:'arial', fontSize:'.75rem'}}>
                <div style={{display:'flex', flexDirection:'row'}}>
                  <span>Logged in as: <br/> '{userInLocalStorage.username}'</span>
                  <Button color='inherit' {...btnStyle} onClick={handleLogout}>Logout</Button>
                </div>
              </div>

            : <div style={{marginLeft:'auto', marginRight:'.5rem'}}>
                <Button color="inherit" {...btnStyle} component={Link} to="/login"> Login </Button>
              </div>
          }
        </Toolbar>
      </AppBar>
      <Notification/>
      <Routes>
        <Route path='/blogs' element={<BlogListing/>} />
        <Route path='/' element={userInLocalStorage? <Home/> : <LoginForm/>} />
        <Route path='/login' element={userInLocalStorage? <Home/> : <LoginForm/>} />
        <Route path='/users' element={userInLocalStorage? <UserListing/> : <LoginForm/>} />
        <Route path="/users/:id" element={userInLocalStorage? <SingleUserPage/>: <LoginForm/>} />
        <Route path='/blogs/:id' element={userInLocalStorage? <SingleBlogPage/> : <LoginForm/>}/>
      </Routes>
      <Footer/>
    </Container>
  )  
}

export default App
