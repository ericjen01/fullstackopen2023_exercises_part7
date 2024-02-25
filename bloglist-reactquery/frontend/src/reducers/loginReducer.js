import { createSlice } from "@reduxjs/toolkit";
import loginService from '../services/login'
import blogService from '../services/blogs'

const authenticationSlice = createSlice({
  name: 'authn',
  initialState: window.localStorage.getItem('loggedBloglistUser'),
  //initialState: [],
  reducers:{
    initUser(state, action){
      return action.payload
    },

    loginUser(state, action){
      return action.payload
    },

    logoutUser(state, action){
      return []
    },
  }
})

export const {initUser, loginUser, logoutUser} = authenticationSlice.actions

// AC as Action Creator
export const storedUserAC = () => {
  return dispatchCommand => {
    const userInLocalStorage = JSON.parse(window.localStorage.getItem('loggedBloglistUser'))

    if(userInLocalStorage){
      dispatchCommand(initUser(userInLocalStorage))
      blogService.setToken(userInLocalStorage.token)
    }
  }
}

export const loginAC = (username, password) => { 
  return async dispatchCommand => {
    try{
      const user = await loginService.login({username, password})

      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)
  
      dispatchCommand(loginUser(user))
      console.log("loginReducers: add notification reducer AC here")
    }
    catch(exp){
      console.log("loginReducers: add notification reducer AC here")
    }
  }
}

export const logoutAC = () => {
  return async dispatchCommand => {
    window.localStorage.clear()
    dispatchCommand(logoutUser())
  }
}

export default authenticationSlice.reducer