const Anecdote = ({anecdote}) => {
  return (
    <div>
      <h2>{anecdote.content}</h2>
      <span>Author: {anecdote.author}</span><br/>
      <span>Votes: {anecdote.votes}</span><br/>
      <a href={`${anecdote.info}`}>click link for more info</a>
    </div>
  )
}

export default Anecdote
