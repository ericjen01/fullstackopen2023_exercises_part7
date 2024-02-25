import Blog from "./Blog"
import { peekBlogState } from "../reducers/BlogCtx"

const BlogListing = () => {
  const state = peekBlogState()
  
  return(
    <>
      {state.blogs.map(b =>(
        <Blog key={b.id} blog={b}/>
      ))}
    </>
  )
}

export default BlogListing