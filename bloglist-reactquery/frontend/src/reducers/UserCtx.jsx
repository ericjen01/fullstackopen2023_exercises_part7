import {React, createContext, useContext, useReducer } from "react";

export const initialState = {
  user: null,
  allUsers: []
};

export const userRed = (state, action) => {
  const {type, payload} = action

  switch(type){
    case 'setUser': 
      console.log('main user stored: ', payload)
      return {
        ...state,
        user: payload
      }

    case 'setAllUsers': 
      console.log('setAllUsers, ', payload)  
      return {
        ...state,
        allUsers: payload
      } 

    case 'clearUser': return null 

    default: 
      throw new Error(`No case for type ${type} found in userRed.`);
  }
}


export const UserCtx = createContext(initialState)

export const UserCtxProvider = (props) => {
  const [myState, myDispatch] = useReducer(userRed, initialState)
    //UserCtxProvider must be enabled in main.jsx
    //[returned state, dispatch command] = useReducer(user-made reducer, initial state)
  
  return (
    <UserCtx.Provider value={[myState, myDispatch]}>
      {props.children}
    </UserCtx.Provider> 
  )
}

export const peekUserCtxState = () => useContext(UserCtx)[0]

export const callUserDisp = () => useContext(UserCtx)[1]
