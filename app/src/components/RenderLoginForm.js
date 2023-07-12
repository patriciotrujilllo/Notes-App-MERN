import { useState } from 'react'
import {Form, Button} from 'react-bootstrap'

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
				
					<Form data-test-id='form-login-username' onSubmit={handleLoginSubmit}>
						<Form.Group controlId="formBasicEmail">
							<Form.Control
							type='text'
							name='username'
							placeholder='username'
							value={username}
							onChange={handleUsernameChange}
						/><br />
						</Form.Group>

						<Form.Group controlId="formBasicPassword">
						<Form.Control
							type='password'
							name='password'
							placeholder='password'
							value={password}
							onChange={handlePasswordChange}
						/><br />
						</Form.Group>
						
						<Button type='submit'>Login</Button>
					</Form>
				
			</div>

		</div>
    

	)
}
