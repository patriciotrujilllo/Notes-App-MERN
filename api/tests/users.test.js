import mongoose from 'mongoose'
import {server} from '../index.js'
import { afterAll, beforeEach, describe, expect, test } from 'vitest'
import {User} from '../models/User.js'
import { api,allUserTest } from './helper.js'
import bcript from 'bcrypt'



beforeEach(async()=>{
    await User.deleteMany({})

    const passwordHash = await bcript.hash('testeo',10)

    const initialUser = [{
        username: 'usuario inicial testeo',
        passwordHash
    }]

    for(const user of initialUser){
		const newUser = new User(user)
		await newUser.save()
	}
})

describe('Get testeo usuarios',()=>{

    test('cantidad de usuarios iniciales',async()=>{
        const users= await allUserTest()
        expect(users.res.status).toBe(200)
        expect(users.res.body).toHaveLength(1)
    })

})

describe('Post testeo usuarios',()=>{

    test('Probando ingresar un usuario',async ()=>{

        const newUserPost = {
            username: 'Test user api Post',
            password: 'admin123'
        }
    
    
        const res = await api.post('/api/users').send(newUserPost)
        
        expect(res.status).toBe(200)
        expect(res.headers['content-type']).toMatch(/application\/json/)
    
    })
    
    test('la cantidad de usuarios es coincidente antes y despues de hacer un Post',async ()=>{
    
        const allUserBefore = await allUserTest()
    
        const newUserPost = {
            username: 'Test user api Post para coincidencia',
            password: 'admin1234'
        }
    
        const res = await api.post('/api/users').send(newUserPost)
    
        const allUserAfter = await allUserTest()
    
        expect(allUserAfter.res.body).toHaveLength(allUserBefore.res.body.length+1)
    
    })
    test('no se pueden agregar dos usuarios con el mismo username',async()=>{

        const newUserPostDuplicate = {
            username: 'Test user api Post2',
            password: 'admin123'
        }

        const newUserPostDuplicate2 = {
            username: 'Test user api Post2',
            password: 'admin123'
        }
    
    
        const res = await api.post('/api/users').send(newUserPostDuplicate)
        expect(res.status).toBe(200)

        const res2 = await api.post('/api/users').send(newUserPostDuplicate2)
        expect(res2.status).toBe(422)

    })

})

describe('Delete testeo usuarios',()=>{

    test('se elimina un usuario',async ()=>{

            const {res}=await allUserTest()
			
			await api.delete(`/api/users/${res.body[0].id}`)
			.expect(204)
		
			const {res:userdeleted} = await allUserTest()
		
			expect(userdeleted.body).toHaveLength(res.body.length-1)
		})

    test('Eliminar un usuario con id que no existe', async () => {
        const objectId1 =new mongoose.Types.ObjectId(12)
		
			await api.delete(`/api/users/${objectId1}`)
				.expect(404)
		
		})
        
    })

    describe('Put Testeo',()=>{

        test('probar que se puede modificar un usuario',async () =>{
    
            const newUser = {
                username: 'Test con Put en usuarios'
            }
        
            const {res:id}= await allUserTest()


            const res = await api.put(`/api/users/${id.body[0].id}`).send(newUser)
            expect(res.status).toBe(200)
            expect(res.headers['content-type']).toMatch(/application\/json/)
            expect(res.body.username).not.toBe(id.body.username)
        })
    
    })


afterAll(async()=>{
	await server.close()
	await mongoose.connection.close()
})

