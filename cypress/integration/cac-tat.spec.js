/// <reference types="Cypress" />

describe('Central de atendimento ao cliente tat', function() {
    //Antes de cada
    this.beforeEach(function() {
        cy.visit('src/index.html')
    })

    it('Verifica o titulo da aplicação', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it('Preenche os campos obrigatorios e envia o formulario', function(){
        const longText = 'Temos aqui um texto bem longoooooooooooooooooooooooooooo, asdas'
        
        cy.get('#firstName').type("Elcimar")
        cy.get('#lastName').type("Silva")
        cy.get('#email').type("elcimar@gmail.com")
        //delay para escrever algo mais rapido
        cy.get('#open-text-area').type(longText, {delay: 0})
        //Pega um botão com a propridade submit
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
    })

    it('Exibe mensagem de erro ao submeter o formulario com um email com formatação invalida', function(){
        cy.get('#firstName').type('Elcimar')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('elcimar@gmail,com')
        cy.get('#open-text-area').type('longText', {delay: 0})
        cy.get('button[type="submit"]').click()
        //Procura a classe error
        cy.get('.error').should('be.visible')
    })

    it('Campo telefone continua vazio quando preenchido com valor não-numerico', function(){
        cy.get('#phone')
            .type('acdefghi')
            //Verificar se permacece com uma string vazia
            .should('have.value', '')
    })

    it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function(){
        cy.get('#firstName').type('Elcimar')
        cy.get('#lastName').type('Silva')
        cy.get('#email').type('elcimar@gmail,com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('longText', {delay: 0})
        cy.get('button[type="submit"]').click()
        //Procura a classe error
        cy.get('.error').should('be.visible')
    })

    it('Preenche e limpa os campos nome, sobrenome, email e telefone', function(){
        cy.get('#firstName')
            .type('Elcimar')
            .should('have.value', 'Elcimar')
            .clear()
            .should('have.value', '')
        cy.get('#lastName')
            .type('Silva')
            .should('have.value', 'Silva')
            .clear()
            .should('have.value', '')
        cy.get('#email')
            .type('elcimar@gmail,com')
            .should('have.value', 'elcimar@gmail,com')
            .clear()
            .should('have.value', '')
        cy.get('#phone')
            .type('1234567890')
            .should('have.value', '1234567890')
            .clear()
            .should('have.value', (''))
        
    })

    it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function(){
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('Envia o formulário com sucesso usando um comando customizado', function(){
        cy.fillMandatoryFieldsAndSubmit()

        cy.get(".success").should('not.be.visible')
    })

    it('Seleciona um produto (YouTube) por seu texto', function(){
        cy.get('#product')
        .select('YouTube')
        .should('have.value', 'youtube')
    })

    it('Seleciona um produto (Mentoria) por seu valor (value)', function(){
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('Seleciona um produto (Blog) por seu índice', function(){
        cy.get('#product')
            .select(1)
            .should('have.value', 'blog')
    })

    it('Marca o tipo de atendimento "Feedback"', function(){
        cy.get('input[type="radio"][value="feedback"]')
            .check()
            .should('have.value', 'feedback')
    })

    it('Marca cada tipo de atendimento', function(){
        cy.get('input[type="radio"]')
        .should('have.length', 3)
        .each(function($radio) {
            cy.wrap($radio).check()
            cy.wrap($radio).should('be.checked')
        })
    })

    it('Marcar e validar checkbox, contato preferencial', function(){
        cy.get('#email-checkbox').check()
        cy.get('#email-checkbox').uncheck()
    })

    it('Marca ambos checkboxes, depois desmarca o último', function(){
        cy.get('input[type="checkbox"]')
            .check()
            .should('be.checked')
            .last()
            .uncheck()
            .should('not.be.checked')
    })

    it('Seleciona um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        //Verifica se o arquivo do upload aparece conforme esperado 
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]')
        .should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop' })
        //Verifica se o arquivo do upload aparece conforme esperado 
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
            .selectFile('@sampleFile')
            .should(function($input){
                expect($input[0].files[0].name).to.equal('example.json')
                })
    })

})