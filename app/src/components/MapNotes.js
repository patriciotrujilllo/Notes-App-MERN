/* eslint-disable react/prop-types */
import { Note } from './Note'
import './styles/mapNotes.css'


export const MapNotes = ({ notes }) => {
	return (
		<div className='notes-container'>
		
			{notes.map((note) => (// return implicito
						<Note key={note.id} note={note} />	
				
			))}
			
		</div>
	)
}
