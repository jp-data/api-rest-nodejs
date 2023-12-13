import { expect, test, beforeAll, afterAll, describe } from 'vitest'
import request from 'supertest'
import { app } from '../src/app'


describe('Transactions routes', () => {
    // função executada antes de todos os testes, 1 única vez
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    test('User can create a new transaction', async () => {
        const response = await request(app.server)
            .post('/transactions')
            .send({
                title: 'New transaction',
                amount: 5000,
                type: 'credit'
            })

        expect(response.statusCode).toEqual(201)
    })
})

