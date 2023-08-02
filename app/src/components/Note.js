import {Link} from 'react-router-dom'
import {AiFillEdit,AiTwotoneDelete} from 'react-icons/ai'
import { useUser } from '../hooks/useUser'

export const Note = ({ note }) => {
	const {user} = useUser()
	return (
		<div className='note'>
			<Link className='note-link' to={`/notes/${note.id}`}><p>{note.content}</p></Link>
			<div className='icons-note'>
			{user ? (
				<>
				<AiFillEdit size='1.5rem'/>
				<AiTwotoneDelete size='1.5rem'/>
				</>
			)
			: ''}
			</div>
			
		</div>
	)
}
