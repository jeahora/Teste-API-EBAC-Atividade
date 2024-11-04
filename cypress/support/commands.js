Cypress.Commands.add('token', (email, senha) => {
    cy.request({
        method: 'POST',
        url: 'login',
        body: {
            "email": email,
            "password": senha 
        }
    }).then((response) => {
        expect(response.status).to.equal(200)
        return response.body.authorization
    })
 })

 Cypress.Commands.add('cadastrarProduto' , (token, produto, preco, descricao, quantidade) =>{
    cy.request({
        method: 'POST', 
        url: 'produtos',
        headers: {authorization: token}, 
        body: {
            "nome": produto,
            "preco": preco,
            "descricao": descricao,
            "quantidade": quantidade
          }, 
          failOnStatusCode: false
    })
 })
 Cypress.Commands.add('editarUsuario', (usuarioId, nome, email, senha, administrador) => {
    cy.request({
        method: 'PUT',
        url: `usuarios/${usuarioId}`,
        body: {
            nome: nome,
            email: email,
            password: senha,
            administrador: administrador
        }
    }).then((response) => {
        expect(response.status).to.equal(200);
        return response.body;
    });
 })

 Cypress.Commands.add('editarUsuario', (usuarioId, nome, email, senha, administrador) => {
    cy.request({
        method: 'PUT',
        url: `usuarios/${usuarioId}`,
        body: {
            nome: nome,
            email: email,
            password: senha,
            administrador: administrador
        }
    }).then((response) => {
        expect(response.status).to.equal(200);
        return response.body;
    });
 })
 Cypress.Commands.add('deletarUsuario', (usuarioId, token) => {
    cy.request({
        method: 'DELETE',
        url: `usuarios/${usuarioId}`,
        headers: { authorization: token },
        failOnStatusCode: false
    });
    
}); 

 

 



   