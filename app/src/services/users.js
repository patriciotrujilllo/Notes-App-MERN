import axios from 'axios'

const url= '/api/users'

export const registerUser = (credenciales) =>{
	return axios.post(url,credenciales)
		.then(res=>res.data)
		.catch(error=>console.error(error))
}