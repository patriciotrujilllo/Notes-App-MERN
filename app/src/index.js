import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { RenderNotesForm } from './components/RenderNotesForm'
import { getAllNotes, createNote, setToken } from './services/notes'
import { MapNotes } from './components/MapNotes'
import { loginUser } from './services/login'
import { RenderLoginForm } from './components/RenderLoginForm'

const App = () => {
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

	const addUser = async (login) => {
		try {
			const user = await loginUser(login)

			if (user) {
				window.localStorage.setItem(
					'loggedNoteAppUser', JSON.stringify(user)
				)
				setToken(user.Token)

				setUser(user)
			}

		} catch (error) {
			console.error(error)
		}
	}

	const handleLogoutSubmit = () => {
		setUser(null)
		setToken(user.Token)
		window.localStorage.removeItem('loggedNoteAppUser')
	}

	return (
		<div>
			<h2>Notes</h2>
			{user
				? <RenderNotesForm
					addNotes={addNotes}
					handleLogoutSubmit={handleLogoutSubmit}
				/>
				: <RenderLoginForm
					addUser={addUser}
				/>}

			{loading ? 'Cargando' : ''}
			<MapNotes notes={notes} />
		</div>
	)
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<App />
)
