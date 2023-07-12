import {React,Suspense} from "react"
import {Link,BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import Notes from './Notes.js'
import Login from "./login.js"
import { SingleNote } from "./components/singleNote.js"
import { useUser } from "./hooks/useUser.js"
import { useNotes } from "./hooks/useNotes.js"
import { Container, Nav, Navbar } from "react-bootstrap"

const Home = () => {
	return(
		<div>
			<title>Home | Notes app</title>
			<h1>Home page</h1>
		</div>
	)
}
const Users = () => <h1>Users</h1>

function App () {

	const {user} = useUser()
	const {notes} = useNotes()

	return (
		<Suspense fallback={<div>Loading...</div>}>
		<div className="container">
			<BrowserRouter>
				<Navbar expand="lg" className="bg-body-tertiary">
					<Container>
					<Navbar.Brand href='/'>App-Notes</Navbar.Brand>
					<Navbar.Toggle aria-controls='responsive-navbar-nav'/>
					<Navbar.Collapse id="id-collapse-navbar">
						<Nav className="me-auto">

							<Nav.Link>
								<Link to="/notes" style={{ padding: "5px" }}>
									Notes
								</Link>
							</Nav.Link>

							<Nav.Link>
								<Link to="/users" style={{ padding: "5px" }}>
									Users
								</Link>
							</Nav.Link>

							<Nav.Link>
							{user ? 
								<em>{user.username}</em>
								:
								<Link to="/login" style={{ padding: "5px" }}>
								Login
								</Link>
							}
							</Nav.Link>
							
							
							
						</Nav>
						
					</Navbar.Collapse>
					
					</Container>
					
					
				</Navbar>
				<Routes>
					<Route path="/notes/:id" element={<SingleNote notes={notes}/>}/>
					<Route path="/notes" element={<Notes/>}/>
					<Route path="/users" element={<Users/>}/>
					<Route path="/login" 
					element={user? 
					<Navigate to='/notes'/>
					:<Login/>} 
					/>
					<Route path="/" element={<Home/>}/>
				</Routes>
				
			</BrowserRouter>
		</div>
		</Suspense>
	)
	}
export default App
