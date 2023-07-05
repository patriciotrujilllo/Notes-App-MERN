import React from 'react'
import { Togglable } from './Togglable'
import { useState } from 'react'
export const RenderNotesForm = ({ addNotes, handleLogoutSubmit }) => {
	const [newNote, setNewNote] = useState('')

	const handleChange = (event) => {
		setNewNote(event.target.value)
	}

	const handleSubmit = (event) => {
		event.preventDefault()

		const NewObject = {
			content: newNote,
			important: true
		}
		addNotes(NewObject)
		setNewNote('')
	}

	return (
		<>
			<Togglable title='Show notes'>

				<form data-test-id='form-nota' onSubmit={handleSubmit}>
					<div>
            Notas:
						<input type='text' onChange={handleChange} value={newNote} />
					</div>
					<button>Agregar nota</button>
				</form>

			</Togglable>

			<div>
				<button onClick={handleLogoutSubmit}>Logout</button>
			</div>
		</>
	)
}
