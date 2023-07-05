import '@testing-library/jest-dom/extend-expect'
import { fireEvent, render } from '@testing-library/react'
import { Togglable } from '../components/Togglable'

let component
beforeEach(() => {
	component = render(
		<Togglable title='save'>
			<h1>Hola</h1>
		</Togglable>
	)
})

test('renderiza children', () => {
	component.getByText('Hola')
})

test('display none', () => {
	const el = component.getByText('Hola')
	expect(el.parentNode).toHaveStyle('display: none')
})

test('when you click show then style change to block', () => {

	const button = component.getByText('save')
	fireEvent.click(button)

	const el = component.getByText('Hola')
	expect(el.parentNode).not.toHaveStyle('display: none')
})

test('when you click cancel then style change to none', () => {

	const button = component.getByText('Cancel')
	fireEvent.click(button)

	const el = component.getByText('Hola')
	expect(el.parentNode).toHaveStyle('display: none')
})