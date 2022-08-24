var faker = require('faker')
var cpf = require('gerador-validador-cpf')

export default {

    deliver : function() {

        var firstName = faker.name.firstName()
        var lastName = faker.name.lastName()

        var data = {
            name:     `${firstName} ${lastName}`,
            cpf:      cpf.generate(),
            email:    faker.internet.email(firstName),
            whatsapp: '42999999999',
            address: {
                postalcode: '84031388',
                street: 'Rua Leony Delourdes Alves da Costa',
                number: '245',
                details: 'Casa',
                district: 'Uvaranas',
                city_state: 'Ponta Grossa/PR'
            },
            delivery_method: 'Moto',
            cnh: 'images/cnh-digital.jpg'
    }

    return data

    }

}