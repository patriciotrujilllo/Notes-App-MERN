Cypress.Commands.add('login',({username,password})=>{
	cy.request('post','http://localhost:3001/api/login',{
		username,
		password
	}).then(res=>{
		localStorage.setItem('loggedNoteAppUser',JSON.stringify(res.body))
		cy.visit('http://localhost:3000')
	})
})