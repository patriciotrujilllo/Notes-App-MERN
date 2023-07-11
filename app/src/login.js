
import React, { useState, useEffect } from 'react'
import { setToken } from './services/notes'
import { loginUser } from './services/login'
import { RenderLoginForm } from './components/RenderLoginForm'
import { Navigate } from 'react-router-dom'

const Login = () => {
	const [user, setUser] = useState(null)
	//const nav = useNavigate()



	useEffect(() => {
		const loggedUserJson = window.localStorage.getItem('loggedNoteAppUser')
		if (loggedUserJson) {
			const user = JSON.parse(loggedUserJson)
			setUser(user)
			setToken(user.Token)
		}
	}, [])


	const addUser = async (login) => {
		try {
			const user = await loginUser(login)

			if (user) {
				window.localStorage.setItem(
					'loggedNoteAppUser', JSON.stringify(user)
				)
				setToken(user.Token)

				setUser(user)
			}

		} catch (error) {
			console.error(error)
		}
	}

	// const handleLogoutSubmit = () => {
	// 	setUser(null)
	// 	setToken(user.Token)
	// 	window.localStorage.removeItem('loggedNoteAppUser')
	// }
	return (
		<div>
			<h2>Login</h2>
			{user
				? 
					<Navigate to="/notes"/>

				: <RenderLoginForm
					addUser={addUser}
				/>}
		</div>
	)
}
export default Login
