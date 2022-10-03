/// <reference types="cypress" />
import auth from '../../fixtures/usuarios.json'
import cuponsObj from '../../fixtures/cuponsObj.json'
const faker = require('faker-br')

describe('[US-0003] – API de cupons', () => {

    it('[POST] Criar um Cupom', () => {
        let metodo = "POST"
        let code = faker.hacker.verb() + faker.random.number(100)
        let amount = faker.commerce.price(10, 50).toString()
        let discount_type = "fixed_product"
        let description = "Cupom de desconto"

        cy.conecta(metodo, code, amount, discount_type, description).then((response) => {
            expect(response.status).to.eq(201)
        })
    });

    it('[POST] Nome do cupom não pode ser repetido', () => {
        let metodo = "POST"
        let code = "Win22"
        let amount = "22"
        let discount_type = "fixed_product"
        let description = "Cupom de desconto de 22"
        
        cy.conecta(metodo, code, amount, discount_type, description).then((response) => {
            expect(response.status).to.eq(400)
            cy.log(response.body.message)
        })
    });

    it('[GET] Deve Listar os Cupons cadastrados', () => {
        let metodo = "GET"
        cy.conecta(metodo).then((response) => {
            expect(response.status).to.eq(200)
        })
    });

    it('[GET] Deve listar buscando por ID do cupom', () => {
        let idCupom = cuponsObj[0].id
        cy.request({
            method: "GET",
            url: `wp-json/wc/v3/coupons/${idCupom}`,
            headers: {
                Username: auth[3].usuario,
                Password: auth[3].senha,
                Authorization: auth[3].authorization
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    });
});

