import mongoose from 'mongoose'
import {server} from '../index.js'
import { afterAll, expect, test } from 'vitest'
import { api } from './helper.js'

test('Se realiza de manera correcta el login',async()=>{

    const user = {
        username: 'usuario1',
        password: 'password'
    }

    const res = await api.post('/api/login').send(user)

    expect(res.body.username).toBe('usuario1')

})

test('Se realiza de manera incorrecta el login',async()=>{

    const user = {
        username: 'usuario2',
        password: 'pasword'
    }

    const res = await api.post('/api/login').send(user)

    expect(res.status).toBe(401)

})

afterAll(async()=>{
	await server.close()
	await mongoose.connection.close()
})