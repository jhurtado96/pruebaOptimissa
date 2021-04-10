const app = require('../server')
const request = require('supertest')

describe("GET /clients",()=>{
    it('Lista de clientes',done => {
        request(app)
        .get('/clients')
        .set('Accept', 'application/json')
        .expect(200,done)
    })
    })
    
    describe("GET /policies",()=>{
        it('Lista de politicas',done => {
            request(app)
            .get('/clients')
            .set('Accept', 'application/json')
            .expect(200,done)
        })
        })