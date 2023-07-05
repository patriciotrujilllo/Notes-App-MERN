/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { act, fireEvent, render , waitFor} from '@testing-library/react'
import { RenderLoginForm } from '../components/RenderLoginForm'

let component 
let addUser
beforeEach(()=>{

	addUser = jest.fn()
	component = render(<RenderLoginForm addUser={addUser}/>)

})

test('existe el elemeto input text en el archivo',()=>{
	const inputElement = component.container.querySelector('input[type="text"]')
	expect(inputElement).toBeInTheDocument()
})
test('se detecta el cambio hecho en el input username',()=>{
	const inputElement = component.container.querySelector('input[type="text"]')
    
	fireEvent.change(inputElement,{target:{value:'usuario1'}})
	expect(inputElement.value).toBe('usuario1')
})

test('se detecta el cambio hecho en el input password',()=>{
	const inputElement = component.container.querySelector('input[type="password"]')

	fireEvent.change(inputElement,{target:{value:'password123'}})
	expect(inputElement.value).toBe('password123')
})

test('se reliza el login',async ()=>{
	const inputUsername = component.container.querySelector('input[type="text"]')
	const inputPassword = component.container.querySelector('input[type="password"]')
	const button = component.getByText('Login')

	act(()=>{
		fireEvent.change(inputUsername,{target:{value:'usuario1'}})
		fireEvent.change(inputPassword,{target:{value:'password123'}})
		fireEvent.click(button)
    
	})

    
	await waitFor(() => {
		expect(addUser.mock.calls).toHaveLength(1)
		expect(addUser.mock.calls[0][0].username).toBe('usuario1')
		expect(addUser.mock.calls[0][0].password).toBe('password123')
	})


    
})