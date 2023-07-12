/* eslint-disable react/prop-types */
import { Note } from './Note'
import Table from 'react-bootstrap/Table'

export const MapNotes = ({ notes }) => {
	return (
		<Table striped>
			<tbody>
			{notes.map((note) => (// return implicito
				<tr key={note.id}>
					<td><Note note={note} /></td>
				</tr>
			))}
			</tbody>
		</Table>
	)
}
