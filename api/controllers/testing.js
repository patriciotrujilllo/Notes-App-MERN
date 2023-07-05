import { Router } from "express";
import { Note } from "../models/Node.js";
import { User } from "../models/User.js";

const testRouter = Router()

testRouter.post('/deleteAll',async(request,response) =>{
    await Note.deleteMany({})
    await User.deleteMany({})

    response.status(204).end()
})

export {testRouter}