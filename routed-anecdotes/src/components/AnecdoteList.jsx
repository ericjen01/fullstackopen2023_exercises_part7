/* eslint-disable react/prop-types */
const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul> 
      {anecdotes.map(a => 
        <li key={a.id} >
          <a href={`/anecdotes/${a.id}`}>{a.content}</a>
        </li>
      )}
    </ul>
  </div>
)

export default AnecdoteList