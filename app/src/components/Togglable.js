import { useState } from 'react'

export const Togglable = ({ children, title }) => {
	const [visible, setVisible] = useState(false)

	const hide = { display: visible ? 'none' : '' }
	const show = { display: visible ? '' : 'none' }

	return (
		<div>
			<div style={hide}>
				<button onClick={() => setVisible(true)}>{title}</button>
			</div>

			<div style={show}>
				{children}
				<button onClick={() => setVisible(false)}>Cancel</button>
			</div>
		</div>
	)
}
