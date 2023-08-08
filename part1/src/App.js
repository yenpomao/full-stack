import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'

const App = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNotes] = useState('')
  const [showAll, setShowAll] = useState(true)

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/notes')
      .then(response => {
        console.log('promise fulfilled')
        setNotes(response.data)
      })
  }, [])
  console.log('render', notes.length, 'notes')

  const addNote = (event) => {
        event.preventDefault()
        const noteObject = {
          content: newNote,
          important: Math.random() < 0.5,
          id: notes.length + 1,
        }
      
        setNotes(notes.concat(noteObject))
        setNewNotes('')
      }
      const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewNotes(event.target.value)
      }
      const notesToShow = showAll
        ? notes
        : notes.filter(note => note.important)
    
      return (
        <div>
          <h1>Notes</h1>
          <div>
            <button onClick={() => setShowAll(!showAll)}>
              show {showAll ? 'important' : 'all' }
            </button>
          </div>
          <ul>
            {notesToShow.map(note => 
              <Note key={note.id} note={note}></Note>
            )}
          </ul>
          <form onSubmit={addNote}>
            <input value={newNote} onChange={handleNoteChange}></input>
            <button type='submit'>save</button>
          </form>
        </div>
      )
}



//   const addNote = (event) => {
//     event.preventDefault()
//     const noteObject = {
//       content: newNote,
//       important: Math.random() < 0.5,
//       id: notes.length + 1,
//     }
  
//     setNotes(notes.concat(noteObject))
//     setNewNotes('')
//   }
//   const handleNoteChange = (event) => {
//     console.log(event.target.value)
//     setNewNotes(event.target.value)
//   }
//   const notesToShow = showAll
//     ? notes
//     : notes.filter(note => note.important)

//   return (
//     <div>
//       <h1>Notes</h1>
//       <div>
//         <button onClick={() => setShowAll(!showAll)}>
//           show {showAll ? 'important' : 'all' }
//         </button>
//       </div>
//       <ul>
//         {notesToShow.map(note => 
//           <Note key={note.id} note={note}></Note>
//         )}
//       </ul>
//       <form onSubmit={addNote}>
//         <input value={newNote} onChange={handleNoteChange}></input>
//         <button type='submit'>save</button>
//       </form>
//     </div>
//   )



export default App;
