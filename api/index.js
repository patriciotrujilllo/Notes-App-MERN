import { config } from 'dotenv'
import express from 'express'
import cors from 'cors'
import { conectionDB } from './mongo.js'
import { userRouter } from './controllers/users.js'
import { noteRouter } from './controllers/notes.js'
import handleError from './utils/middleware/Errors.js'
import notFound from './utils/middleware/notFound.js'
import loginRouter from './controllers/login.js'
import { testRouter } from './controllers/testing.js'
config()

conectionDB()

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('../app/build'))

app.use('/api/notes', noteRouter)
app.use('/api/users', userRouter)
app.use('/api/login', loginRouter)

if(process.env.NODE_ENV==='test'){
	app.use('/api/testing', testRouter)
}


app.use(notFound)
app.use(handleError)


const PORT = process.env.NODE_ENV ==='test' ? 
	process.env.PORTTEST : process.env.PORTDEVELOPMENT
const server = app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})


export {app,server}
