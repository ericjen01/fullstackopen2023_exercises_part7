import {React, createContext, useContext, useReducer } from "react";

export const initialState = {
  message: null,
  type: null
}

export const notifRed = (state, action) => {
  const {type, payload} = action

  switch(type){
    case 'showNotif': 
      return {
        message: payload.message,
        type: payload.type
      }
      //return action.payload

    case 'hidNotif': return ''
      /*return null
      return {
        message: null,
        type: null
      }*/
    
    default: 
      throw new Error(`No case for type ${type} found in userRed.`);
  }
}


export const NotifCtx = createContext(initialState)

export const NotifCtxProvider = ({children}) => {
  const [myState, myDispatch] = useReducer(notifRed, initialState)

  return(
    <NotifCtx.Provider value={[myState, myDispatch]}>
      {children}
    </NotifCtx.Provider>
  )
}

export const peekNotifCtxState = () => useContext(NotifCtx)[0]
