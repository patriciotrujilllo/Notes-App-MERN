
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
			const userlogin = await loginUser(login)

			if (userlogin) {
				window.localStorage.setItem(
					'loggedNoteAppUser', JSON.stringify(userlogin)
				)
				setToken(userlogin.Token)

				setUser(userlogin)
			}

		} catch (error) {
			console.error(error)
		}
	}
	const addNewUser = async (register) => {
		try {
			const userRegister = await registerUser(register)

			if (userRegister) {
				window.localStorage.setItem(
					'loggedNoteAppUser', JSON.stringify(user)
				)
				setToken(userRegister.Token)

				setUser(userRegister)
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
