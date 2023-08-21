import { useState,useEffect } from 'react'
import { setToken } from '../services/notes'

export const useUser = () =>{
	const [user, setUser] = useState(null)

	const local = () =>{
		const loggedUserJson = window.localStorage.getItem('loggedNoteAppUser')
		if (loggedUserJson) {
			const user = JSON.parse(loggedUserJson)
			setUser(user)
			setToken(user.Token)
		}
	}

	useEffect(() => {
		local()
	}, [])

	return {
		user,
		setUser
	}
}