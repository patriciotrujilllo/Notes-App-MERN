import axios from 'axios'
const url = '/api/login'

export const loginUser = credenciales => {
	return(
		axios.post(url, credenciales)
			.then(res => res.data)
			.catch((error) => console.error(error))
	) 
}