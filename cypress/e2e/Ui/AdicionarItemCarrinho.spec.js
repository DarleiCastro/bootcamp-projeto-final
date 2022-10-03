/// <reference types="cypress" />
import produtos from '../../fixtures/produtos.json'

describe('[US-0001] Adicionar item ao carrinho ', () => {
    let desc10 = "viaboot10"
    let desc15 = "viaboot15"

    beforeEach(() => {
        cy.fixture('usuarios').then((usr) => {
            cy.login(usr[0].usuario, usr[0].senha)
        })
        
    });
    
    it('Deve permitir inserir 9 itens de um mesmo produto ao carrinho com sucesso ', () => {
        const index = 1
        cy.addProduto(produtos[index].title, produtos[index].size, produtos[index].color, produtos[index].quantity - 1)
        cy.get('[class="woocommerce-message"]').should('contain', '9 × “Bruno Compete Hoodie” foram adicionados no seu carrinho')
        cy.get('.woocommerce-message > .button').click()
        cy.get(':nth-child(1) > .product-remove > .remove > .fa').click()
    });

    it('Não é permitido inserir mais de 10 itens de um mesmo produto ao carrinho;', () => {
        const index = 0
        cy.addProduto(produtos[index].title, produtos[index].size, produtos[index].color, produtos[index].quantity)
        cy.get('.woocommerce-message > .button').click()
        cy.get(':nth-child(1) > .product-remove > .remove > .fa').click()
    });
    
    it('Desconto de 10% para valores entre R$ 200 e R$ 600  ', () => {
        const index = 1
        cy.addProduto(produtos[index].title, produtos[index].size, produtos[index].color, produtos[index].quantity - 6)
        cy.get('.woocommerce-message > .button').click()
        cy.get('#coupon_code').type(desc10.toString())
        cy.get('.coupon > .btn').click()
        cy.get('.woocommerce-message').should('contain', 'Código de cupom aplicado com sucesso.')
        cy.get(`[data-title="Cupom: ${desc10}"]`).should('be.visible')
        cy.get(':nth-child(1) > .product-remove > .remove > .fa').click()
    });

    it('Desconto de 15% para valores acima de R$ 600 ', () => {
        const index1 = 1
        cy.addProduto(produtos[index1].title, produtos[index1].size, produtos[index1].color, produtos[index1].quantity)
        cy.get('.woocommerce-message > .button').click()
        cy.get('#coupon_code').type(`${desc15}`)
        cy.get('.coupon > .btn').click()
        cy.get(`[data-title="Cupom: ${desc15}"]`).should('be.visible')
        cy.get('.woocommerce-remove-coupon', { timeout: 10000 }).should('be.visible').click()
        cy.get(':nth-child(1) > .product-remove > .remove > .fa', { timeout: 10000 }).click()
    });
});