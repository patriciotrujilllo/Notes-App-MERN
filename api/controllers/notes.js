import { Router } from 'express'
import { Note } from '../models/Node.js'
import { User } from '../models/User.js'
import userExtractor from '../utils/middleware/userExtractor.js'

const noteRouter = Router()

noteRouter.post('/',userExtractor, async (request, response) => {
	const {content,important} = request.body

	if (!request.body || !content) {
		return response.status(400).json({
			error: 'note.content is missing'
		})
	}
	//
	const userId= request.userId
	if (!userId) {
		return response.status(404).json({ error: 'userId null' });
	}
	//
	const user = await User.findById(userId)

	if (!user) {
		return response.status(404).json({ error: 'User not found' });
	}

	const newNote = new Note({
		content,
		date: new Date(),
		important: typeof important !== 'undefined' ? important : false,
		user: user._id
	})
	try{
		const savedNote = await newNote.save()
		user.notes = user.notes.concat(savedNote)
		await user.save()
		response.json(savedNote)
	}catch(error){
		response.status(422).end()
	}
	
})

noteRouter.get('/', (request, response) => {
	Note.find({}).populate('user',{
		username: 1,
		name : 1
	})
		.then(notes => {
			response.json(notes)
		})
})

noteRouter.get('/:id', (request, response, next) => {
	const { id } = request.params

	Note.findById(id)
		.then(note => {
			note ? response.json(note) : response.status(404).end()
		}).catch(err => {
			next(err)
		})
})

noteRouter.delete('/:id',userExtractor, (request, response, next) => {
	const { id } = request.params

	Note.findByIdAndRemove(id)
		.then(res => {
			res ? response.status(204).json({message: 'Se elimino nota'}) : response.status(404).end()
		}).catch(err => {
			next(err)
		})
})
noteRouter.put('/:id',userExtractor, (request, response, next) => {
	const { id } = request.params
	const note = request.body

	const newNoteInfo = {
		content: note.content,
		date: new Date(),
		important: typeof note.important !== 'undefined' ? note.important : false
	}

	Note.findByIdAndUpdate(id, newNoteInfo, { new: true })
		.then(result => {
			response.json(result)
		}).catch(err => {
			next(err)
		})
})

export {noteRouter}