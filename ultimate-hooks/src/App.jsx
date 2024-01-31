import { useEffect, useState } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')
  const onChange = (e) => {
    setValue(e.target.value)
  }
  return{
    type,
    value,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
 
  useEffect(()=>{
    axios.get(baseUrl)
    .then(res=>setResources(res.data))
   })

  const create = async(resource) => {
    const res = await axios.post(baseUrl, resource)
    return setResources(resources.concat(res.data))
  }

  const service = {
    create
  }

  return [
    resources,
    service
  ]
}

function App() {
  const content = useField('text')
  const phone = useField('text')
  const name = useField('text')

  const [notes, notesService] = useResource('http://localhost:3001/notes')
  const [contacts, contactService] = useResource('http://localhost:3001/contacts')

  const submitNote = (e) => {
    e.preventDefault(),
    notesService.create({content:content.value})
  }

  const submitContact = (e) => {
    e.preventDefault(),
    contactService.create({
      phone: phone.value,
      name: name.value
    })
  }

  return (
    <>
      <div>
        <h2>Notes</h2>
        <form onSubmit={submitNote}>
          <input {...content}/>
          <button>Add Note</button>
        </form>
        {notes.map(n => <p key={n.id}>{n.content}</p>)}  
      </div>

      <div>
        <h2>Contacts</h2>
        <form onSubmit={submitContact}>
          <input {...name}/>
          <input {...phone}/>
          <button>Add Contact</button>
        </form>
        {contacts.map(c => <p key={c.id}>{c.name } {c.number}</p>)}
      </div>
    
    </>

  )
}

export default App
