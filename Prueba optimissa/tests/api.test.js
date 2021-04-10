const app = require('../server')
const request = require('supertest')

// Aquí realizo los tests, utilizo el modulo Supertest que provee un nivel alto de abstracción.
//Importo el modulo app al fichero y llamo los endpoint. El It llama al test, con describe agrupamos los test, seguidamente llamamos al end point correspondiente 
//en este caso; get /clients, /policies, /policies/client/ y post /login. Seguidamente indicamos que el formato aceptado será el tipo json y si el codigo final es 200 recibiremos
//el visto bueno del test.

describe("GET /", () => {
    it('Lista de clientes', done => {
        request(app)
            .get('/clients')
            .set('Accept', 'application/json')
            .expect(200, done)
    })

    it('Lista de politicas', done => {
        request(app)
            .get('/policies')
            .set('Accept', 'application/json')
            .expect(200, done)
    })

    it('Cliente de la politica', done => {
        request(app)
            .get('/policies/client/')
            .set('Accept', 'application/json')
            .expect(200, done)
    })
})
describe("POST /", () => {
    it('Login', done => {
        request(app)
            .post('/login')
            .set('Accept', 'application/json')
            .expect(200, done)
    })
})