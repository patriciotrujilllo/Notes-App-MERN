const handleError = (error,request,response,next)=>{
	console.error(error)
	if (error.name === 'CastError'){
		response.status(400).send({error: 'id used is malformed'})
	}
	else if(error.name === 'ValidationError'){
		response.status(409).send({
			error: error.message
		})
	}
	else if(error.name === 'JsonWebTokenError'){
		response.status(401).json({error: 'token missing o invalid'})
	}
	else{
	console.error(error.name)
	response.status(500).send({
		error: 'internal error'
	})
	}
	//JsonWebTokenError
}

export default handleError