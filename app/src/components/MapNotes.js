/* eslint-disable react/prop-types */
import { Note } from './Note'

export const MapNotes = ({ notes }) => {
	return (
		<ol>
			{notes.map((note, index) => (// return implicito
				<Note key={index} note={note} />
			))}
		</ol>
	)
}
