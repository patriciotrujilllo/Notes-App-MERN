import React from 'react'
import { useState } from 'react'
import {Form,Button} from 'react-bootstrap'

export const RenderNotesForm = ({ addNotes }) => {
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
			<Form data-test-id='form-nota' onSubmit={handleSubmit}>
				<div>
            Notas:
					<Form.Control type='text' onChange={handleChange} value={newNote} required/>
				</div>
				<Button type='submit'>Agregar nota</Button>
			</Form>

			<div>
			</div>
		</>
	)
}
