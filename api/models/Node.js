import mongoose, { Schema } from 'mongoose'

const noteShema = new mongoose.Schema({
	content: String,
	date: Date,
	important: Boolean,
	user:{
		type: Schema.Types.ObjectId,
		ref:'User'
	}
})

noteShema.set('toJSON', {
	transform: (document, returnedObject) => {
		returnedObject.id = returnedObject._id
		delete returnedObject._id
		delete returnedObject.__v
	}
})

export const Note = mongoose.model('Note', noteShema)

// Note.find({}).then(result => {
//   console.log(result)
//   mongoose.connection.close()
// })

// const note = new Note({
//   content: 'Esta funcionando',
//   date: new Date(),
//   important: true
// })

// note.save()
//   .then(result => {
//     console.log(result)
//     mongoose.connection.close()
//   }).catch(err => {
//     console.error(err)
//   })
