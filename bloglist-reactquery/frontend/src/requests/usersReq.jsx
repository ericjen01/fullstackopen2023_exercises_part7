import axios from 'axios'
import baseUrl from '../components/constants'
import { peekLoginCtxState } from '../reducers/LoginCtx'
 
const loginCtxSate = peekLoginCtxState()
const config = loginCtxSate.config

const get = async () => {
  const res = await axios.get(baseUrl.users)
  window.localStorage.setItem('allStoredUsers', JSON.stringify(res.data))
  return res.data
}

export const add = async (obj) => {
  const res = await axios.post(baseUrl.users, obj, config)
  return res.data
}

export const updateLikes = async (id) => {
  const res = await axios.put(`${baseUrl.users}/${id}` )
  return res.data
}

export const remove = async (id) => {
  const res = await axios.delete(`${baseUrl.users}/${id}`, config)
  return res.data
}

export const login = async (credential) => {
  const res = await axios.post('/api/login', credential)
  return res.data
}

export default {get}