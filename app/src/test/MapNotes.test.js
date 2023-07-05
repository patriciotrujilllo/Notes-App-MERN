import '@testing-library/jest-dom/extend-expect'
import {  render } from '@testing-library/react'
import { MapNotes } from '../components/MapNotes'

test('Se imprime las notas',()=>{
    
	const notes=[{
		content: 'primera nota'
	},
	{
		content: 'segunda nota'
	}
	]
	const component = render(<MapNotes notes={notes} />)

	const olElement = component.container.querySelector('ol')
	expect(olElement).toBeInTheDocument()
	expect(olElement.childElementCount).toBe(2)

    
})

