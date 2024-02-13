import { useSelector } from "react-redux"
import Blog from "./Blog"

const BlogListing = () => {
  const blogs = useSelector(state => {
    return state.blogs
  })

  return(
    <>
      {blogs.map(b =>(
        <Blog key={b.id} blog={b}/>
      ))}
    </>
  )
}

export default BlogListing