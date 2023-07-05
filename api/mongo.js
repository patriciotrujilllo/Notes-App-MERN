import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

const {MONGO_DB_URI,MONGO_DB_URI_TEST,NODE_ENV} = process.env
const connection = NODE_ENV==='test' ? MONGO_DB_URI_TEST : MONGO_DB_URI
// conexion mongoDB
export const conectionDB = () => {
	mongoose.connect(connection)
		.then(() => {
			console.log('Database connected')
		}).catch(err => {
			console.error(err)
		})
}
