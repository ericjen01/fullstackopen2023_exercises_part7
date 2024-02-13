import { useState } from 'react'
import { useDispatch } from 'react-redux'
import Togglable from './Togglable'
import { TextField, Button, Grid } from '@mui/material'
import { createBlogAC } from '../reducers/blogReducer'
import { btnStyle } from './Styling'

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
            <Button {...btnStyle} type='submit'>Add</Button>
          </Grid>

        </Grid>
      </form>
    </Togglable>
  )
}

export default BlogForm

/*
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')

  const addBlog = async (e) => {
    e.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }
  return (
    <>
      <h2>Create a New Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Author:</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={e => setAuthor(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="url">URL:</label>
          <input
            type="text"
            id="url"
            name="url"
            placeholder="url"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button id="createBtn" type="submit">
                    Create
        </button>
      </form>
    </>
  )*/