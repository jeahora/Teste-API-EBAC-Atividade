/// <reference types="cypress" />

describe('Testes da Funcionalidade Usuários', () => {
 
  
  it('Deve validar contrato de usuários ', () => {
    cy.request('usuario').then(response => {
      return contrato.validateAsync(response.body)
  })

    
  });

  it('Deve listar usuários cadastrados', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).should((response) => {
      expect(response.status).equal(200)
      expect(response.body).to.have.property('usuarios')

    }) 

  });  
    
  it('Deve cadastrar um usuário com sucesso', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": "maria pereira",
        "email": "mariapereira@qa.com.br",
        "password": "teste",
        "administrador": "true"
      }
    }).should((response) => {
      expect(response.status).to.equal(201);
      expect(response.body.message).to.equal('Cadastro realizado com sucesso');
    });
  });


  it('Deve validar um usuário com email inválido-POST', () => {
    cy.request({
      method: 'POST',
      url: 'usuarios',
      body: {
        "nome": "Fulano da Silva",
        "email": "beltrano@qa.com.br",
        "password": "teste",
        "administrador": "true"
      },
      failOnStatusCode: false  
      }).should((response) =>{
        expect(response.status).equal(400)
        expect(response.body.message).equal('Este email já está sendo usado')

    })
   
      
  });

  it('Deve editar um usuário previamente cadastrado', () => {
    cy.request({
      method: 'GET',
      url: 'usuarios'
    }).then((response) => {
      const usuarioId = response.body.usuarios[0]._id;
      cy.request({
        method: 'PUT',
        url: `usuarios/${usuarioId}`, 
        body: {
          "nome": "maria pereira editado",
          "email": "mariapereira@qa.com.br",
          "password": "teste",
          "administrador": "false"
        }
      }).should((response) => {
        expect(response.status).to.equal(200);
        expect(response.body.message).to.equal('Registro alterado com sucesso');
      });
    });


  });  
    
  

  it.only('Deve deletar um usuário previamente cadastrado', () => {
    const usuarioId = 'qf9wx7T7zVdsNQGw'
    cy.request({
      method: 'DELETE',
      url: `usuarios/${usuarioId}`,
      failOnStatusCode: false 
    }).then(response => {
      expect(response.status).to.equal(200); 
      expect(response.body.message).to.equal('Registro excluído com sucesso'); 
    });
  });




});   



    



 




