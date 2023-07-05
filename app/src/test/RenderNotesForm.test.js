/* eslint-disable no-undef */
import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { RenderNotesForm } from '../components/RenderNotesForm'

let component
let addNotes
beforeEach(()=>{
	addNotes  = jest.fn()
	const handleLogoutSubmit = jest.fn()

	component = render(<RenderNotesForm addNotes={addNotes} handleLogoutSubmit={handleLogoutSubmit}/>)
})

test('Se detecta el cambio del input',()=>{
	const inputElement =  component.container.querySelector('input')
	expect(inputElement).toBeInTheDocument()
    
	fireEvent.change(inputElement, {target:{value: 'Nueva Nota'}})
	expect(inputElement.value).toBe('Nueva Nota')


})
test('Se agrega una nota',()=>{
	const inputElement =  component.container.querySelector('input')
	const button = component.getByText('Agregar nota')
    
	fireEvent.change(inputElement, {target:{value: 'Nueva Nota'}})
	fireEvent.click(button)

	expect(addNotes.mock.calls).toHaveLength(1)




})