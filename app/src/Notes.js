import React from 'react'
import {createNote } from './services/notes'
import { MapNotes } from './components/MapNotes'
import { RenderNotesForm } from './components/RenderNotesForm'
import { useUser } from './hooks/useUser.js'
import { useNotes } from './hooks/useNotes.js'

const Notes = () => {
	const {notes, setNotes} = useNotes()

	const {user} = useUser()

	const addNotes = (NewObject) => {
		createNote(NewObject)
			.then(res => {
				setNotes((prevnotes) => prevnotes.concat(res))
			}).catch(err => {
				console.error(err)
			})
	}


	return (
		<div className='all-notes'>
			<h2>Notes</h2>
			{user? 
				<RenderNotesForm addNotes={addNotes}/>
				: 'no ha iniciado sesion'}

			<MapNotes notes={notes} setNotes={setNotes}/>
			
		</div>
	)
}
export default Notes
