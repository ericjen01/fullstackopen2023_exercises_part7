import axios from 'axios'
import baseUrl from '../components/constants'
import localStorage from '../requests/localStorageServ'

let token = null  

const config = {
  header: {Authorization: token}
}

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}


const get = async () => {
  const res = await axios.get(baseUrl.blogs)
  localStorage.set('storedBlogs', res.data)
}

export const addBlogs = async (obj) => {
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

export default {setToken, get}