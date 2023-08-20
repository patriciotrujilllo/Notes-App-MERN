import { useState } from 'react'
import {Form, Button} from 'react-bootstrap'

export const RenderLoginForm = ({ addUser,addNewUser }) => {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword,setConfirmPassword] = useState('')
	const [credenciales,setCredenciales]=useState(false)
	const [login,setLogin] = useState(true)

	const handleUsernameChange = (event) => {
		setUsername(event.target.value)
	}
	const handlePasswordChange = (event) => {
		setPassword(event.target.value)
	}
	const handlePasswordConfirm = (event) =>{
		setConfirmPassword(event.target.value)
	}
	const handleLoginSubmit = async(event) => {
		event.preventDefault()

		if(login){
			const user = {
				username,
				password
			}
			try{
				const {message} = await addUser(user)
				console.log(message)
			}catch(error){
				setCredenciales(true)
			}
		}else{
			const user = {
				username,
				password,
				confirmPassword
			}
			try {
				const response = await addNewUser(user)
				console.log(response)
			} catch (error) {
				console.error(error)
			}
		}
    
		
    

		setUsername('')
		setPassword('')
	}

	return (
		<div className='container-form'>
			<h2>{login? 'Login': 'Register'}</h2>
			{credenciales && <p style={{ color: 'red' }}>Credenciales incorrectas</p>}
			<div>
				
				<Form data-test-id='form-login-username' className='container-form-box' onSubmit={handleLoginSubmit}>
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
					{ !login &&
						<Form.Group controlId="confirmPassword">
							<Form.Control
								type='confirm-password'
								name='confirm-password'
								placeholder='confirm password'
								value={confirmPassword}
								onChange={handlePasswordConfirm}
							/><br />
						</Form.Group>
					}
					

					<div className='button-type-action'>
						{login?
							<p onClick={()=>setLogin(false)}>Registrarte</p>:
							<p onClick={()=>setLogin(true)}>Iniciar Sesión</p>
						}
						
					</div>
					<Button type='submit'>Login</Button>
				</Form>
				
			</div>

		</div>
    

	)
}
