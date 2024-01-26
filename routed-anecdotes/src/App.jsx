import { useState } from 'react'
import { useField } from './hooks'
import Menu from './components/menu'
import About from './components/About'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'
import {
  Routes, Route, useMatch, useNavigate
} from 'react-router-dom'

const CreateNew = (props) => {

  const navigate = useNavigate()
  const {erase:eraseContent, ...content} = useField('content')
  const {erase:eraseAuthor, ...author} = useField('author')
  const {erase:eraseInfo, ...info} = useField('info')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content:content.value,
      author:author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input 
            {...content}
          />
        </div>
        <div>
          author
          <input 
            {...author}
          />
        </div>
        <div>
          url for more info
          <input 
            {...info}
          />
        </div>
        <button>create</button>
      </form>
      <button onClick={()=>{
          eraseContent()
          eraseAuthor()
          eraseInfo()
        }}>reset
      </button>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState([])

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)

    setAnecdotes(anecdotes.concat(anecdote))
    
    setNotification( ['following anecdote created: ', `" ${anecdote.content} "`])
    
    setTimeout(()=>{
      setNotification([])
    }, 3000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useMatch('/anecdotes/:id')

  const anecdote = match 
    ?anecdotes.find(a => a.id === Number(match.params.id))
    :null

  return(
    <>
      <h1>Software anecdotes</h1>
      <Notification notification={notification}/>
      <Menu/>
        <Routes>
          <Route path='/anecdotes/:id' element={<Anecdote anecdote={anecdote}/>} />
          <Route path='/' element={<AnecdoteList  anecdotes ={anecdotes} />} />
          <Route path='/create' element={<CreateNew  addNew ={addNew} />} />
          <Route path='/about' element={<About/>} />
        </Routes>
      <Footer/>
    </>
  )
}

export default App
