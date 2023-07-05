import { Togglable } from './Togglable'
import { useState } from 'react'

export const RenderLoginForm = ({ addUser }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [credenciales,setCredenciales]=useState(false)

	const handleUsernameChange = (event) => {
		setUsername(event.target.value)
	}
	const handlePasswordChange = (event) => {
		setPassword(event.target.value)
	}
	const handleLoginSubmit = async(event) => {
		event.preventDefault()

		const login = {
			username,
			password
		}
    
		try{
			const {message} = await addUser(login)
			console.log(message)
		}catch(error){
			setCredenciales(true)
		}
    

		setUsername('')
		setPassword('')
	}

	return (
		<div>

			{credenciales && <p style={{ color: 'red' }}>Credenciales incorrectas</p>}
			<div>
				<Togglable title='Show login'>

					<form data-test-id='form-login-username' onSubmit={handleLoginSubmit}>
						<input
							type='text'
							name='username'
							placeholder='username'
							value={username}
							onChange={handleUsernameChange}
						/><br />
						<input
							type='password'
							name='password'
							placeholder='password'
							value={password}
							onChange={handlePasswordChange}
						/><br />
						<button>Login</button>
					</form>

				</Togglable>
			</div>

		</div>
    

	)
}
