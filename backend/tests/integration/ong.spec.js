const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be albe to create a new ONG', async () => {
        const resposnse = await request(app)
            .post('/ongs')
            .send({
                name: "APAD",
                email: "contato@gmail.com",
                whatsapp: "9999999999",
                city: "MS",
                uf: "am"
            });
        
        expect(resposnse.body).toHaveProperty('id');
        expect(resposnse.body.id).toHaveLength(8);
    });
});