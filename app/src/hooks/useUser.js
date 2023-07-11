import { useState,useEffect } from "react"
import { setToken } from "../services/notes"
import {Navigate} from 'react-router-dom'

export const useUser = () =>{
	const [user, setUser] = useState(null)

	useEffect(() => {
		const loggedUserJson = window.localStorage.getItem('loggedNoteAppUser')
		if (loggedUserJson) {
			const user = JSON.parse(loggedUserJson)
			setUser(user)
            setToken(user.Token)
		}
	}, [])

	const handleLogoutSubmit = () => {
		setUser(null)
		setToken(user.Token)
		window.localStorage.removeItem('loggedNoteAppUser')
		return <Navigate to="/" />
	}

	return {
		user,
		setUser,
		handleLogoutSubmit
	}
}