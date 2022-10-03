/// <reference types="Cypress" />
import auth from '../fixtures/usuarios.json'
Cypress.Commands.add("login", (usuario, password) => { 
    cy.visit('minha-conta')   
    cy.get('#username').type(usuario)
    cy.get('#password').type(password,{ log:false})
    cy.get('.woocommerce-form > .button').click()
})

Cypress.Commands.add("addProduto",(produto, tamanho, cor, quantidade) =>{
    cy.visit('produtos/page/2/')
    cy.get('[class="product-block grid"]').contains(produto).click();
    cy.get('.button-variable-item-' + tamanho).click();
    cy.get('.button-variable-item-' + cor).click();
    cy.get('.input-text').clear().type(quantidade);
    cy.get('.single_add_to_cart_button').click();
})

Cypress.Commands.add("conecta", (metodo, code, amount, discount_type, description ) => {
    cy.request({
        method: metodo,
        url: 'http://lojaebac.ebaconline.art.br/wp-json/wc/v3/coupons',
        failOnStatusCode: false,
        headers: {
            Username: auth[3].usuario,
            Password: auth[3].senha,
            Authorization: auth[3].authorization
        },
        body: {
            "code": code,
            "amount": amount,
            "discount_type": discount_type,
            "description": description
        }
    })
})

