import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blog',
  initialState: JSON.parse(window.localStorage.getItem('storedBlogs')),
  reducers:{
    setBlog(state, action){
      return action.payload
    },

    voteBlog(state, action){
      const id = action.payload.id
      const blogToUpdate = action.payload
      return state.map(b => b.id === id? blogToUpdate : b)
    },

    addBlog(state, action){
      state.push(action.payload)
    },

    removeBlog(state, action){
      console.log('action.payload: ', action)
      state.filter(b => b.id !== action.payload.id)
      console.log('state: ', state)
    }
  }
})

export const {setBlog, voteBlog, addBlog, removeBlog} = blogSlice.actions

//'AC' stands for Action Creator
export const initBlogAC = () => {
  return async dispatchCommand => {
    const blogs = await blogService.get()
    window.localStorage.setItem('storedBlogs', JSON.stringify(blogs)),
    dispatchCommand(setBlog(blogs))
  }
}

export const createBlogAC = (content) => {
  return async dispatchCommand => {
    const blogToAdd = await blogService.create(content)
    dispatchCommand(addBlog(blogToAdd))
  }
}

export const removeBlogAC = (id, blog) => {
  return async dispatchCommand => {
    //const blogToRemove = await blogService.remove(id)
    await blogService.remove(id)
    console.log('blog: ', blog)
    dispatchCommand (removeBlog(blog))
  }
}

export const updateLikesAC = blog => {
  return async dispatchCommand =>{
    const blogToUpdate = await blogService.update(blog.id, {...blog, likes:blog.likes + 1})
    dispatchCommand(voteBlog(blogToUpdate))
  }
}

export default blogSlice.reducer