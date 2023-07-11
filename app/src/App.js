import {React, useEffect,useState} from "react"
import {Link,BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import Notes from './Notes.js'
import Login from "./login.js"
import { getAllNotes } from './services/notes'
import { SingleNote } from "./components/singleNote.js"

const Home = () => <h1>Home</h1>
const Users = () => <h1>Users</h1>

function App () {
	const [user, setUser] = useState(null)
	const [notes, setNotes] = useState(null)

	useEffect(() => {
		const loggedUserJson = window.localStorage.getItem('loggedNoteAppUser')
		if (loggedUserJson) {
			const user = JSON.parse(loggedUserJson)
			setUser(user)
		}
	}, [])

	useEffect(() => {
		getAllNotes()
			.then(nota => {
				setNotes(nota)
			}).catch((error) => {
				console.error('database error: ', error)
			})
	}, [])
	
	return (
		<BrowserRouter>
			<header>
				<Link to="/" style={{ padding: "5px" }}>
					Home
				</Link>
				<Link to="/notes" style={{ padding: "5px" }}>
					Notes
				</Link>
				<Link to="/users" style={{ padding: "5px" }}>
					Users
				</Link>
				{user ? 
					<em>Logeado {user.username}</em>
					:
					<Link to="/login" style={{ padding: "5px" }}>
					login
					</Link>
				}
				
			</header>
			<Routes>
				<Route path="/notes/:id" element={<SingleNote notes={notes}/>}/>
				<Route path="/notes" element={<Notes/>}/>
				<Route path="/users" element={<Users/>}/>
				<Route path="/login" 
				element={user? <Navigate to='/notes'/>:<Login/>} 
				/>
				<Route path="/notes" element={<Login/>}/>
				<Route path="/" element={<Home/>}/>
			</Routes>
			
		</BrowserRouter>
	)
	}
export default App
