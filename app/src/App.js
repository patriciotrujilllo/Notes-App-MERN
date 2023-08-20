import {React,Suspense} from 'react'
import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import Notes from './Notes.js'
import Auth from './Auth.js'
import { SingleNote } from './components/singleNote.js'
import { useUser } from './hooks/useUser.js'
import { useNotes } from './hooks/useNotes.js'
import {NavHeader} from './components/NavHeader.js'
import './Styles.css'

const Home = () => {
	return(
		<div>
			<title>Home | Notes app</title>
			<h1>Home page</h1>
		</div>
	)
}

function App () {

	const {user} = useUser()
	const {notes} = useNotes()

	return (
		<Suspense fallback={<div>Loading...</div>}>
			<div className="container">
				<BrowserRouter>
					<NavHeader/>
					<Routes>
						<Route path="/notes/:id" element={<SingleNote notes={notes}/>}/>
						<Route path="/notes" element={<Notes/>}/>
						<Route path="/login" 
							element={user? 
								<Navigate to='/notes'/>
								:<Auth/>} 
						/>
						<Route path="/" element={<Home/>}/>
					</Routes>
				
				</BrowserRouter>
			</div>
		</Suspense>
	)
}
export default App
