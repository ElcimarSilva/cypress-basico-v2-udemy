/// <reference types="Cypress" />

describe('Central de atendimento ao cliente tat', function() {
    //Antes de cada
    this.beforeEach(function() {
        cy.visit('src/index.html')
    })

    it('verifica o titulo da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('Preenche os campos obrigatorios e envia o formulario', function(){
        const longText = 'Temos aqui um texto bem longoooooooooooooooooooooooooooo, asdas'
        
        cy.get('#firstName').type("Elcimar")
        cy.get('#lastName').type("Silva")
        cy.get('#email').type("elcimar@gmail.com")
        //delay para escrever algo mais rapido
        cy.get('#open-text-area').type(longText, {delay: 0})
        //Pega um botão com a propridade submit
        cy.get('button[type="submit"]').click()

        cy.get('.success').should('be.visible')
    })
})