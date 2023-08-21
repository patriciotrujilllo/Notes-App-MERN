import { useEffect, useState } from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { Navigate } from 'react-router-dom'
import { setToken } from '../services/notes'


export const NavHeader = () =>{
	const [user,setUser] = useState(null)
	const [loading,setLoading] = useState(false)
	
	const local = () =>{
		setLoading(true)
		const loggedUserJson = window.localStorage.getItem('loggedNoteAppUser')
		if (loggedUserJson) {
			const userlocal = JSON.parse(loggedUserJson)
			setUser(userlocal)
		}
		setLoading(false)
	}
	useEffect(()=>{
		local()
	},[])

	const handleLogoutSubmit = () => {
		setUser(null)
		setToken(null)
		window.localStorage.removeItem('loggedNoteAppUser')
		return <Navigate to="/" />
	}
	
	return(
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href='/'>App-Notes</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav'/>
				<Navbar.Collapse id="id-collapse-navbar">
					<Nav className="me-auto">

						<Nav.Item>
							<Link className="link" to="/notes" style={{ padding: '5px' }}>
									Notes
							</Link>
						</Nav.Item>


						<Nav.Item>
							{!loading && user ? 
								<em>{user.username}</em>
								:
								<Link className="link" to="/login" style={{ padding: '5px' }}>
								Login
								</Link>
							}
						</Nav.Item>
						
						<Nav.Item>
							{
								user?
									<div className='link' onClick={handleLogoutSubmit}>Logout</div>:
									''
							
							}
						</Nav.Item>
							
							
					</Nav>
						
				</Navbar.Collapse>
					
			</Container>
					
					
		</Navbar>
	)
}
