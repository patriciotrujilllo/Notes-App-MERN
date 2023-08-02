import jsonwebtoken from 'jsonwebtoken'

const userExtractor = (request,response, next)=>{
    const autorization = request.get('authorization')
	let token= null

	if(autorization && autorization.toLowerCase().startsWith('bearer')) {
		token = autorization.split(' ')[1]
	}
	
	let decodedToken={}

	try {
		decodedToken = jsonwebtoken.verify(token, process.env.SECRET)
        request.userId = decodedToken.id

        next()

	} catch (error) {
		return response.status(401).json({error: 'token missing o invalid'})
	}
	
	
	if(!token || !decodedToken.id){
		return response.status(401).json({error: 'token missing o invalid'})
	}


}

export default userExtractor

