import mongoose from 'mongoose'
import {server} from '../index.js'
import { afterAll, beforeEach, describe, expect, test } from 'vitest'
import {Note} from '../models/Node.js'
import { initialNote, userMap,api,getAllnotesIds } from './helper.js'


beforeEach(async()=>{
	await Note.deleteMany({})

	for(const note of initialNote){
		const newNote = new Note(note)
		await newNote.save()
	}

})

describe('Get testeo',()=>{

	test('Probando que devuelva un archivo JSON', async ()=>{
		const res = await api.get('/api/notes')
		expect(res.status).toBe(200)
		expect(res.headers['content-type']).toMatch(/application\/json/)
	})
	
	test('Existen la misma cantidad de initialNote', async () =>{
		const res = await api.get('/api/notes')
		expect(res.body).toHaveLength(initialNote.length)
	})
	
	test('contenido de el primer usuario', async () =>{
		const res = await api.get('/api/notes')
		expect(res.body[0].content).toBe('primera nota para test')
	})
	
	test('content de algun usuario', async () =>{
		const content = await userMap()
		expect(content).toContain('Segunda nota para test')
	})
})

describe('Post Testeo',()=>{

	test('validar que se agrego una nueva nota', async () =>{

		const newNote = {
			content: 'Test con Post 4',
			important: true,
			userId: '649a2b44eff7f8cf9ca681d1'
		}
	
		const res= await api.post('/api/notes').send(newNote)
		expect(res.status).toBe(200)
		expect(res.headers['content-type']).toMatch(/application\/json/)
	
		//ahora se prueba que la nota esta en la base de datos
		const content = await userMap()
		
		expect(content).toContain(newNote.content)
		expect(content).toHaveLength(initialNote.length + 1)
	
	})

	test('validar que se pasa cuando agrego una nota sin content', async () =>{
	
		const newNote = {
			important: true
		}
	
		const res= await api.post('/api/notes').send(newNote)
		expect(res.status).toBe(400)
	
		//ahora se prueba que la longitud sea la misma
		const resGet = await api.get('/api/notes')
	
		expect(resGet.body).toHaveLength(initialNote.length)
	
	})
})

	describe('Delete Testeo',()=>{

		test('se elimino nota',async ()=>{

			const id=await getAllnotesIds()
			
			await api.delete(`/api/notes/${id[0]}`)
			.expect(204)
		
			const content = await userMap()
		
			expect(content).toHaveLength(initialNote.length-1)
		})
		
		test('Eliminar una nota con id que no existe', async () => {
			const objectId1 =new mongoose.Types.ObjectId(12)
		
			const res = await api.delete(`/api/notes/${objectId1}`)
			expect(res.status).toBe(404)
		
			// const res= await userMap()
			// expect(res).toHaveLength(initialNote.length)
		})

	})
	
	

describe('Put Testeo',()=>{

	test('probar que se puede modificar una nota',async () =>{

		const newNote = {
			content: 'Test con Put',
			important: true
		}
	
		const id= await getAllnotesIds()
		const res = await api.put(`/api/notes/${id[0]}`).send(newNote)
		expect(res.status).toBe(200)
		expect(res.headers['content-type']).toMatch(/application\/json/)
		expect(res.body.content).not.toBe(initialNote[0].content)
	})

})

afterAll(async()=>{
	await server.close()
	await mongoose.connection.close()
})