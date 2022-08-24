import signup from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'
//import { it } from 'faker/lib/locales'


describe('Signup', function () {
    /*
        before(function(){
            cy.log('Tudo aqui é executado uma única vez ANTES para TODOS os casos de testes')
        }) 
    
        
        beforeEach(function(){
            cy.log('Tudo aqui é executado sempre ANTES de CADA caso de teste')
        }) 
    
        
        after(function(){
            cy.log('Tudo aqui é executado uma única vez DEPOIS para TODOS os casos de testes')
        }) 
        */

    /* comentando apos aulas de Factory e Faker
    beforeEach(function(){
        cy.fixture('deliver').then((d)=>{
            this.deliver = d

        })
    }) */

    it('User should be deliver', function () {

        var deliver = signupFactory.deliver()

        // padrao Page Objects        
        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signup.modalContentShouldBe(expectedMessage)

    })

    it('Incorret document "CPF"', function () {

        var deliver = signupFactory.deliver()
        deliver.cpf = '000000141AA'

        // padrao Page Objects   
        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        const expectedMessage = 'Oops! CPF inválido'
        signup.alertMessageShouldBe(expectedMessage)

    })

    it('Incorret email', function () {
        var deliver = signupFactory.deliver()
        deliver.email = 'teste.com.br'

        // padrao Page Objects   
        signup.go()
        signup.fillForm(deliver)
        signup.submit()
        const expectedMessage = 'Oops! Email com formato inválido.'
        signup.alertMessageShouldBe(expectedMessage)

    })

    context('Required fields', function () {
        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'deliver_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        before(function(){
            signup.go()
            signup.submit()
        })

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                signup.alertMessageShouldBe(msg.output)
            })
        })
        
    })

    /*
    Forma mais fácil de utilizar sem loop - código antes da aula
    New Its on The Block
    it('Required fields', function () {
        signup.go()
        signup.submit()
        signup.alertMessageShouldBe('É necessário informar o nome')
        signup.alertMessageShouldBe('É necessário informar o CPF')
        signup.alertMessageShouldBe('É necessário informar o e-mail')
        signup.alertMessageShouldBe('É necessário informar o CEP')
        signup.alertMessageShouldBe('É necessário informar o número do endereço')
        signup.alertMessageShouldBe('Selecione o método de entrega')
        signup.alertMessageShouldBe('Adicione uma foto da sua CNH')
    }) */

})