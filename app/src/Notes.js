
import React, { useState, useEffect } from 'react'
import { getAllNotes,createNote, setToken } from './services/notes'
import { MapNotes } from './components/MapNotes'
import { RenderNotesForm } from './components/RenderNotesForm'

const Notes = () => {
	const [notes, setnotes] = useState([])
	const [loading, setLoading] = useState(false)

	const [user, setUser] = useState(null)

	useEffect(() => {
		setLoading(true)
		getAllNotes()
			.then(nota => {
				setnotes(nota)
				setLoading(false)
			}).catch((error) => {
				console.error('database error: ', error)
			})
	}, [])

	useEffect(() => {
		const loggedUserJson = window.localStorage.getItem('loggedNoteAppUser')
		if (loggedUserJson) {
			const user = JSON.parse(loggedUserJson)
			setUser(user)
			setToken(user.Token)
		}
	}, [])

	const addNotes = (NewObject) => {
		createNote(NewObject)
			.then(res => {
				setnotes((prevnotes) => prevnotes.concat(res))// Cualquiera de las siguinetes maneras es correcta,setnotes([...notes, newNote])
			}).catch(err => {
				console.error(err)
			})
	}


	return (
		<div>
			<h2>Notes</h2>
			{user
				? <RenderNotesForm
					addNotes={addNotes}
				/>
				: "no ha iniciado sesion"}
			{loading? 'Cargando':''}
			<MapNotes notes={notes} />
			
		</div>
	)
}
export default Notes
