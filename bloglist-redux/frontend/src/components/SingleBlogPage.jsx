import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom' 
import { updateLikesAC } from '../reducers/blogReducer'
import { notifyAC } from '../reducers/notifReducer'
import { Container, Button } from '@mui/material'
import { btnStyle } from './Styling'
import CommentListing from './CommentLIsting'

const SingleBlogPage = () => {
  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  const blogId = useParams().id

  const blog = blogs.find(n => n.id === blogId)

  const UrltoExternal = blog.url.includes('//')
  ? blog.url
  : `//${blog.url}`

  if(!blog) {
    return null
  }

  const handleLike = () => {
    dispatch(updateLikesAC(blog))
    dispatch(notifyAC(`blog by "${blog.author}" has been liked!`, 'success', 3))
  }

  return (
    <Container>
      <h2>{blog.title}</h2>
      <p>by: {blog.author}</p>
      <p> External Reference: <Link to={UrltoExternal}>{blog.url}</Link></p>
      <p>{blog.likes} <Button {...btnStyle} onClick={handleLike}>Like</Button></p>
      <p>this blog has been added by: {blog.user !== null && blog.user.username}</p>
      <CommentListing blogId={blogId}/>
    </Container>
  )
}

export default SingleBlogPage