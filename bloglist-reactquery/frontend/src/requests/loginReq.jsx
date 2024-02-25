import axios from "axios"
import { useContext } from "react"
import { UserCtx } from "../reducers/UserCtx"
import baseUrl from '../components/constants'
import { LoginCtx, callLoginDisp } from "../reducers/LoginCtx"
//import LoginCtx from "../reducers/LoginCtx"



const logStoredUser = async () => {
  //const [userState, userDisp] = useContext(UserCtx)

  const storedUser = JSON.parse(window.localStorage.getItem('storedUser'))
  console.log('storedUser: ', storedUser)

//callUserDisp({type:'setUser', payload: localStoredUser})

  //loginDisp({type: 'setToken', payload: localStoredUser.token})
 // userDisp({type:'setUser', payload: storedUser})
}

const login = async (username, password) => {
 // const [loginState, loginDisp] = useContext(LoginCtx)

  try{
    const res = await axios.post(baseUrl.login, {username, password})
    const user = res.data
    console.log("login user: ", user)
    window.localStorage.setItem('storedUser', JSON.stringify(user))

  //  loginDisp({type:'setUser', payload: user})
  //    disp()

  }
  catch(exp){
    console.log(exp)
  }
}

const logout = () => {
    window.localStorage.clear()
   // callLoginCtxDisp({type:'logOUt'})
}

export default { logStoredUser, login, logout }