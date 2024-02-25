import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { TextField, Button, Grid } from '@mui/material'
import { createBlogAC } from '../reducers/blogReducer'
import { btnSty } from './Styling'

const BlogForm = () => {
  const dispatch = useDispatch()

  const handleNewBlog = async (e) => {
    e.preventDefault()

    const newBlog = { 
      title: e.target.title.value,
      author: e.target.author.value,
      url: e.target.url.value
    }
    dispatch(createBlogAC(newBlog))
    dispatch(notifyAC(`blog "${newBlog.title}" successfully posted`,'success',3))
  }

  return(
    <Togglable buttonLabel = 'New Blog'>
      <h3>New Blog</h3>
      <form onSubmit={handleNewBlog}>
        <Grid container direction={"column"} spacing={.5} mt={1}>

          <Grid item>
            <TextField size="small" id="title" label='Title' variant='outlined'/>
          </Grid>

          <Grid item>
            <TextField size="small" id="author" label='Author' variant='outlined'/>
          </Grid>

          <Grid item>
            <TextField size="small" id="url" label='Blog URL' variant='outlined'/>
          </Grid>

          <Grid item>
            <Button {...btnSty} type='submit'>Add</Button>
          </Grid>

        </Grid>
      </form>
    </Togglable>
  )
}

export default BlogForm
