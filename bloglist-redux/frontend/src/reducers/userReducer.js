import { createSlice } from "@reduxjs/toolkit";
import userService from '../services/users'

const userSlice = createSlice({
  name: 'user',
  initialState: JSON.parse(window.localStorage.getItem('allStoredUsers')),
  reducers:{
    setUser(state, action){
      return (action.payload)
    }
  }
})

export const {setUser} = userSlice.actions

//'AC' stands for Action Creator
export const initAllUsersAC = () => {
  return async dispatchCommand => {
    const users = await userService.get()
    window.localStorage.setItem('allStoredUsers', JSON.stringify(users))

    dispatchCommand(setUser(users))
  }
}

export default userSlice.reducer