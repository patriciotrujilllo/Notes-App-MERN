import {React} from "react"
import {Link,BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import Notes from './Notes.js'
import Login from "./login.js"
import { SingleNote } from "./components/singleNote.js"
import { useUser } from "./hooks/useUser.js"
import { useNotes } from "./hooks/useNotes.js"

const Home = () => <h1>Home</h1>
const Users = () => <h1>Users</h1>

function App () {

	const {user} = useUser()
	const {notes} = useNotes()

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
					<em>{user.username}</em>
					:
					<Link to="/login" style={{ padding: "5px" }}>
					Login
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
