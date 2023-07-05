import { Router } from 'express'
import { User } from '../models/User.js'
import bcrypt from 'bcrypt'

const userRouter = Router()

userRouter.post('/',async (request, response)=>{
	const {body}= request
	const {username,name,password} = body
    
	const passwordHash= await bcrypt.hash(password, 10)
		
	const newUser = new User({
		username,
		name,
		passwordHash
		
	})
	try{
		const savedUser = await newUser.save()
		response.json(savedUser)
	}catch(error){
		response.status(422).end()
	}
})

userRouter.get('/', (request,response,next)=>{
	User.find({}).populate('notes',{
		content: 1,
		date: 1,
		important: 1
	})
		.then(users=>{
			response.json(users)
		}).catch(error=>{
			next(error)
		})
})

userRouter.delete('/:id', (request, response, next) => {
	const { id } = request.params

	User.findByIdAndRemove(id)
		.then(res => {
			res ? response.status(204).end(): response.status(404).end()
		}).catch(err => {
			next(err)
		})
})

userRouter.put('/:id', (request, response, next) => {
	const { id } = request.params
	const user = request.body

	const newUserInfo = {
		username: user.username
	}

	User.findByIdAndUpdate(id, newUserInfo, { new: true })
		.then(result => {
			response.json(result)
		}).catch(err => {
			next(err)
		})
})

export {userRouter}