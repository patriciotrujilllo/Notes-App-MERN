
import React from 'react'
import { setToken } from './services/notes'
import { loginUser } from './services/login'
import { RenderLoginForm } from './components/RenderLoginForm'
import { Navigate } from 'react-router-dom'
import {useUser} from './hooks/useUser'

const Login = () => {
	const {user,setUser} = useUser()

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
