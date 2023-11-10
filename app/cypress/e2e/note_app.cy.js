describe('Notes',()=>{
	beforeEach(()=>{
		cy.visit('http://localhost:3000')

		cy.request('post','http://localhost:3001/api/testing/deleteAll')

		const newUser = {
			username: 'usuario1',
			password: 'password'
		}
		cy.request('post','http://localhost:3001/api/users',newUser)
	})
	it('Se carga la pagina',()=>{
		cy.contains('Notes')
	})
	it('Se presiona el boton Show login',()=>{
		cy.contains('Show login').click()
	})
	it('Se inicia sesion',()=>{
		cy.contains('Show login').click()

		cy.get('[data-test-id="form-login-username"]').find('input[name="username"]').type('usuario1')
		cy.get('[data-test-id="form-login-username"]').find('input[name="password"]').type('password')
		cy.get('[data-test-id="form-login-username"]').find('button').click()
		cy.contains('Show notes')
	})
	it('credenciales incorrectas al inicia sesion',()=>{
		cy.contains('Show login').click()

		cy.get('[data-test-id="form-login-username"]').find('input[name="username"]').type('usuarioErroneo')
		cy.get('[data-test-id="form-login-username"]').find('input[name="password"]').type('password')
		cy.get('[data-test-id="form-login-username"]').find('button').click()
		cy.contains('Credenciales incorrectas')
	})
	describe('Despues del login',()=>{
		beforeEach(()=>{
			cy.login({username:'usuario1',password:'password'})
		})
		it('Se agrega nota',()=>{

			cy.contains('Show notes')
            
			cy.contains('Show notes').click()
			cy.get('[data-test-id="form-nota"]').find('input').type('Nota creada en test e2e')
			cy.contains('Agregar nota').click()
			cy.contains('Nota creada en test e2e')



            
		})
	})
    
})