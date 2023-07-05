import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import { Note } from '../components/Note'

test('render content', () => {
	const note = {
		content: 'this is a test'
	}

	const component = render(<Note note={note} />)

	component.getByText('this is a test')
})
