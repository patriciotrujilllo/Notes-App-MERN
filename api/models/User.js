import mongoose, { Schema } from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		unique:true
	},
	name: String,
	passwordHash: String,
	notes:[{
		type: Schema.Types.ObjectId,
		ref:'Note'
	}]

})

userSchema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v

		delete returnedObject.passwordHash
	}
})

userSchema.plugin(mongooseUniqueValidator);
export const User = mongoose.model('User', userSchema)