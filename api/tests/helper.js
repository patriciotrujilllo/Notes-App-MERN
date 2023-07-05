import supertest from 'supertest'
import {app} from '../index.js'
const api = supertest(app)

const initialNote = [
	{
		content:'primera nota para test',
		important: true,
		date: new Date()
	},
	{
		content:'Segunda nota para test',
		important: true,
		date: new Date()
	},
	{
		content:'Tercera nota para test',
		important: true,
		date: new Date()
	}
]

const userMap = async ()=>{//arreglar el nombre de este metodo
	const res = await api.get(`/api/notes`)

	const mapeo= res.body.map(note=> note.content)
	return mapeo
}

const getAllnotesIds = async ()=>{
	const res = await api.get(`/api/notes`)

	const ids= res.body.map(note=> note.id)
	return ids
}

const allUserTest = async ()=>{

	const res = await api.get(`/api/users`)

	const allUsers= res.body.map(users=> users.username)
	return  {res,allUsers}
}

export {initialNote,userMap,api,getAllnotesIds,allUserTest}