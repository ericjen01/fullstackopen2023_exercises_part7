import { useParams } from 'react-router-dom'
import { useSelector, } from 'react-redux'
import Blog from "./Blog"


const SingleUserPage = () => {
  
  const blogs = useSelector(state => state.blogs)

  const id = useParams().id

  const blogsbyUser = blogs.filter(b => b.user.userId === id)
  const username = blogsbyUser[0].user.username

  const blogCount = blogsbyUser.length

  return(
    <>
      <span>Blogger: </span> <h1 style={{display:'inline'}}>{username}</h1>
      <p>{username} has {blogCount} blog {(blogCount < 2)? 'entry: ' : 'entries: '}</p>
      {blogsbyUser.map(b => (
          <Blog key={b.id} blog={b} />
        ))
      }
    </>
  )
}

export default SingleUserPage