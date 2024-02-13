import axios from "axios"
import baseUrl from '../components/constants'

const get = async () => {
  const res = await axios.get(baseUrl.users)
  return res.data
}

export default {get}