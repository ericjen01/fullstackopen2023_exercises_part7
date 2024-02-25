import { React, createContext, useContext, useReducer } from "react"

/*
let token = null  

const config = {
  header: {Authorization: token}
}

export const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}
*/

export const initialState = {
 credential: [],
 token: null,
 config: null
}


export const loginRed = (state, action) => {
  const {type, payload} = action

  switch(type){
    case 'setCredential':
      console.log('credential entered. ', payload)
      return {
        ...state,
        credential: payload
      }
    
    case 'setToken':
      console.log('token: set', payload)
      return{
        ...state,
        token: `Bearer ${payload}`,
        config: { header:{Authorization: `Bearer ${payload}`} }
      }
    
    case 'logOut':
      console.log('logging out')
      return{
        credential: null,
        token: null,
        config: null
      }
      
    default: throw new Error(`No case for type ${type} found in LoginRed.`);
  }
}

export const LoginCtx = createContext(initialState)

export const LoginCtxProvider = ({children}) => {
  const [myState, myDispatch] = useReducer(loginRed, initialState)

  return(
    <LoginCtx.Provider value={[myState, myDispatch]}>
      {children}
    </LoginCtx.Provider>
  )
}
  
export const peekLoginState = () => useContext(LoginCtx)[0]
export const callLoginDisp = () => useContext(LoginCtx)[1]
