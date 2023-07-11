import {Link} from 'react-router-dom'

export const Note = ({ note }) => {
	return (
		<li>
			<Link to={`/notes/${note.id}`}><p>{note.content}</p></Link>
		</li>
	)
}
