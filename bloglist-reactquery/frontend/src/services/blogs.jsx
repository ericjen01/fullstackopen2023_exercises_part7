import axios from 'axios'
import baseUrl from '../components/constants'

const storedUser = JSON.parse(window.localStorage.getItem('loggedBloglistUser'))

let token;
const config = () => ({
    headers: {
        Authorization: token,
    },
});

const setToken = (newToken) => {
    token = `Bearer ${newToken}`
}

const getId = () => (100000 * Math.random()).toFixed(0)

const get = async() => {
    const res = await axios.get(baseUrl.blogs)
    return res.data
}

const create = async (newObj) => {
    const res = await axios.post(baseUrl.blogs, newObj, config())
    return res.data
}

const update = async (id, newObj) => {
    const res = await axios.put(`${baseUrl.blogs}/${id}`, newObj, config())
    return res.data
}

const remove = async (id) => {
    const res = await axios.delete(`${baseUrl.blogs}/${id}`, config());
    return res.data
};

const getComments = async(id) => {
  const res = await axios.get(`${baseUrl.blogs}/${id}/comments`)
  return res.data
}

const createComment = async(blogId, content) => {
  /*const commentSchema = new mongoose.Schema({
  content: {
    type:String,
    minlength: 1,
    required: true,
  },
  date: String,
  id: String,
  user:{
    userId: String, 
    username: String
  }
})*/
  const commentToAdd = { 
    content: content, 
    commentId:getId(),
    blogId: blogId,
    user: {
      userId: storedUser? storedUser.id : 'guestId',
      username: storedUser? storedUser.username : 'guest'
    }
  }
  const res = await axios.post(`${baseUrl.blogs}/${blogId}/comments`, commentToAdd, config())
  return res.data
}

export default { setToken, get, create, update, remove, getComments, createComment }