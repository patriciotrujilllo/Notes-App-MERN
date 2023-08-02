import { useState,useEffect } from 'react'
import { getAllNotes } from '../services/notes.js'

export const useNotes = () =>{
	const [notes, setNotes] = useState([])

	useEffect(() => {
		getAllNotes()
			.then(nota => {
				setNotes(nota)
			}).catch((error) => {
				console.error('database error: ', error)
			})
	}, [])
	return {
		notes,
		setNotes
	}

}