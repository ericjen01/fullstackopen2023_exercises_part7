import { useSelector } from 'react-redux'
import CommentForm from './CommentForm'

const CommentListing = ({ blogId }) => {
  const comments = useSelector(state => state.comments)
  return (
    <div>
      <h3>Comments</h3>
      <CommentForm blogId={blogId} />
      {comments.map((c) => (
        blogId===c.blogId && <li key={c.id}>{c.content}</li>
      ))}
    </div>
  )
}

export default CommentListing