import { Link } from 'react-router-dom'
import {AiFillEdit,AiTwotoneDelete} from 'react-icons/ai'
import { useUser } from '../hooks/useUser'
import { deleteNote,updateNote } from '../services/notes'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useState } from 'react'

export const Note = ({ note,setNotes,notes }) => {
	const {user} = useUser()
	const [show, setShow] = useState(false)
	const [noteContent,setNoteContent] = useState(note.content)
	const [initialstate,setInitialstate] = useState(note.content)

	const handleClose = () => {
		setNoteContent(initialstate)
		setShow(false)
	}
	const handleShow = () => {
		setShow(true)
		
	}
	const handleSaveChanges =(notes,note)=>{
		setInitialstate(noteContent)
		setShow(false)

		const indiceNote = notes.findIndex(n=>n.id===note.id)

		const newNote = structuredClone(notes)
		newNote[indiceNote].content = noteContent

		setNotes(newNote)
		
		updateNote(note.id,{...note,content: noteContent})
			.then().catch(error=> console.error(error))
	}
	
	return (
		<>
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Update note</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<Form>
						<Form.Control size="lg" type="text" value={noteContent} onChange={e => setNoteContent(e.target.value)}/>
					</Form>
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={handleClose}>
            Close
					</Button>
					<Button variant="primary" onClick={()=>handleSaveChanges(notes,note)}>
            Save Changes
					</Button>
				</Modal.Footer>
			</Modal>

			<div className='note'>
				<Link className='note-link' to={`/notes/${note.id}`}><p>{note.content}</p></Link>
				<div className='icons-note'>
					{user ? (
						<>
							<AiFillEdit size='1.5rem' onClick={()=>handleShow()}/>
							<AiTwotoneDelete onClick={()=>deleteNote(note.id)
								.then(()=> {
									setNotes(notes.filter(not=>not.id!==note.id))
								})
							} size='1.5rem'/>
						</>
					)
						: ''}
				</div>
			
			</div>
		</>
	)
}
