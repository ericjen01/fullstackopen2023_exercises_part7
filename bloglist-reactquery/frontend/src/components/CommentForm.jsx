import { useDispatch } from 'react-redux'
import { notifyAC } from '../reducers/notifReducer'
import { TextField, Button } from '@mui/material'
import { btnStyle } from './Styling'
import { addCommentAC } from '../reducers/commentReducer'

const CommentForm = ({ blogId }) => {
  const dispatch = useDispatch()

  const addComment = async(e) => {
    event.preventDefault()

    const commentToAdd = e.target.input.value

    event.target.input.value = ''

    dispatch(addCommentAC(blogId, commentToAdd))
    dispatch(notifyAC(`a new comment has been posted`, 3))
  }
  return (
    <div>
      <form onSubmit={addComment}>
        <div>
          <TextField id='input' label='...comment' variant='outlined' margin='dense'/>
        </div>
        <Button {...btnStyle} variant='outlined' type='submit'>Add Comment</Button>
        <p> </p>
      </form>
    </div>
  )
}

export default CommentForm