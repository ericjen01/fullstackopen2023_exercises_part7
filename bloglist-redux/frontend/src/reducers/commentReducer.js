import { createSlice } from "@reduxjs/toolkit";
import blogService from '../services/blogs'

const commentSlice = createSlice({
  name: 'comment',
  initialState: [{id: 1, content: 'good'}, {id: 2, content: 'cool'}],
  reducers: {
    setComment(state, action) {
      return action.payload
    },
    addComment(state, action) {
      state.push(action.payload)
    }
  }
})

export const {setComment, addComment} = commentSlice.actions

export const initCommentsAC = id => {
  return async dispatchCommand => {
    const comments = await blogService.getComments(id)
    dispatchCommand(setComment(comments))
  }
}

export const addCommentAC = (blogId, content) => {
  return async dispatchCommand => {
    const comment = await blogService.createComment(blogId, content)
    dispatchCommand(addComment(comment))
  }
}

export default commentSlice.reducer