import axios from 'axios'

const url = '/api/notes/'

let Token = null
export const setToken = newToken => {
	Token = `Bearer ${newToken}`
}

export const getAllNotes = () => {
	return axios.get(url)
		.then(res => res.data)
}

export const createNote = (content) => {
	const config = {
		headers: {
			authorization: Token
		}
	}
	return axios.post(url, content, config)
		.then(res => res.data)
}

export const updateNote = (id, dataupdate) => {
	const config = {
		headers: {
			authorization: Token
		}
	}
	return axios.put(`${url}/${id}`, dataupdate,config)
		.then(res => res.data)
		.catch(()=>console.error('Fallo en el servicio'))
}

export const deleteNote = (id) => {
	const config = {
		headers: {
			authorization: Token
		}
	}
	return axios.delete(`${url}/${id}`,config)
		.then(res => res.data)
}

// solicitud detallada pasada como un objeto, solo un ejemplo no se utilizara
export const getAllNotesAxiosComplex = () => {
	return axios({
		method: 'Get',
		url,
		responseType: 'json'
	}).then(res => {
		return res.data
	})
}
