import { Container, Nav, Navbar } from "react-bootstrap"
import {Link} from 'react-router-dom'
import { useUser } from "../hooks/useUser"


export const NavHeader = () =>{
	const {user} = useUser()
    return(
        <Navbar expand="lg" className="bg-body-tertiary">
					<Container>
					<Navbar.Brand href='/'>App-Notes</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-nav'/>
					<Navbar.Collapse id="id-collapse-navbar">
						<Nav className="me-auto">

							<Nav.Item>
								<Link className="link" to="/notes" style={{ padding: "5px" }}>
									Notes
								</Link>
							</Nav.Item>


							<Nav.Item>
							{user ? 
								<em>{user.username}</em>
								:
								<Link className="link" to="/login" style={{ padding: "5px" }}>
								Login
								</Link>
							}
							</Nav.Item>
							
							
							
						</Nav>
						
					</Navbar.Collapse>
					
					</Container>
					
					
		</Navbar>
    )
}
