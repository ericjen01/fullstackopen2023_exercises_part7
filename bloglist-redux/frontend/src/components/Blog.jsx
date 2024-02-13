import { Button} from '@mui/material'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { btnStyle } from './Styling'
import { updateLikesAC, removeBlogAC } from '../reducers/blogReducer'
import { blogStyle } from './Styling'
import { useDispatch } from 'react-redux'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [showDetail, setShowDetail] = useState(false)
  const userInLocalStorage = JSON.parse(window.localStorage.getItem('loggedBloglistUser'))

  const addLike = () => {
    dispatch(updateLikesAC(blog))
  }
  
  const deleteBlog = () => {
    dispatch(removeBlogAC(blog.id , blog))
  }

  const UrltoBlog = `/blogs/${blog.id}`
  const UrltoUser = `/users/${blog.user.userId}`
  const UrltoExternal = blog.url.includes('//')
    ? blog.url
    : `//${blog.url}`

  return (
    <div className="blog" style={blogStyle}>

      {!showDetail && <span>{blog.title}</span>}

      <Button {...btnStyle} id="viewBtn" onClick={() => setShowDetail(!showDetail)}>
        {showDetail ? 'Hide detail' : 'View detail'}
      </Button>

      {showDetail && (
        <div>
          <p>Title: <Link to={UrltoBlog}>{blog.title}</Link></p>
          <span>Author: {blog.author}</span>

          <div id='likes'>
            Likes {blog.likes}{' '}
            <Button {...btnStyle} id='likesBtn' onClick={addLike}>
              Like
            </Button>
          </div>
          
          <p/>
          External Source Url: <Link to={UrltoExternal}>{blog.url}</Link><br/>
          Created by: <Link to={UrltoUser}>{blog.user.username}</Link> on {blog.date}

          <p/>
          {blog.user.username === userInLocalStorage.username &&
            <Button {...btnStyle} onClick={() => deleteBlog(blog)}>
              Remove Blog
            </Button>
          }
        </div>
      )}

    </div>
  )
}

export default Blog