
import React from 'react'
import { setToken } from './services/notes'
import { loginUser } from './services/login'
import { RenderLoginForm } from './components/RenderAuthForm'
import { Navigate } from 'react-router-dom'
import {useUser} from './hooks/useUser'
import {registerUser} from './services/users'

const Auth = () => {
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
	const addNewUser = async (register) => {
		try {
			const user = await registerUser(register)

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
		<div className='container-auth'>
			{user
				? 
				<Navigate to="/notes"/>

				: <RenderLoginForm
					addUser={addUser}
					addNewUser={addNewUser}
				/>}
		</div>
	)
}
export default Auth
