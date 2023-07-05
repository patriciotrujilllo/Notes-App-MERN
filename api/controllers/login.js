import { Router } from "express";
import { User } from "../models/User.js";
import bcrypt from 'bcrypt'
import jsonwebtoken from 'jsonwebtoken'


const loginRouter = Router()

loginRouter.post('/',async(request,response)=>{

    const {body} = request
    const {username,password} = body//nota hacer username required

    const user= await User.findOne({username})

    const passwordIsCorrect= user === null ? false : await bcrypt.compare(password, user.passwordHash)

    if(!passwordIsCorrect || !user){
        return response.status(401).json({error: 'Invalid user o password'})
    }

    const userFotToken= {
        username: user.username,
        id: user._id
    }

    const Token= jsonwebtoken.sign(userFotToken, process.env.SECRET)

    response.send({
        name: user.name,
        username: user.username,
        Token
    })

})

export default loginRouter