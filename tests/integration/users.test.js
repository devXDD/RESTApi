const request  =  require('supertest');
const server = require('../../index');

// tests for users route
describe('user-Post requests', () => 
{
    it('checks for correct POST request', async () =>
    {
        const res = await request(server).post('/api/users').send({Username: 'deedxx', email: 'dev@gmail.com', Password: '123Aa445', DoB: '2001-06-06', CreditCard: '4111111111111111'});
        expect(res.statusCode).toEqual(200);
    });

    
    it('checks for Password containing no Captial letters', async () =>
    {
        const res = await request(server).post('/api/users').send({Username: 'deeegv', email: 'dev@gmail.com', Password: '1234567a', DoB: '2001-06-06'});
        expect(res.statusCode).toEqual(400);
    });

    it('checks if user is underage', async () =>
    {
        const res = await request(server).post('/api/users').send({Username: 'deexcgv', email: 'dev@gmail.com', Password: '1234567Aa', DoB: '2012-06-06'});
        expect(res.statusCode).toEqual(403);
    });

    it('checks if username has been taken', async () =>
    {
        const res = await request(server).post('/api/users').send({Username: 'dev', email: 'dev@gmail.com', Password: '1234567Aa', DoB: '2001-06-06'});
        expect(res.statusCode).toEqual(409);
    });

    // checks for correct password validation
    it('checks for correct Password sequence', async () =>
    {
        const res = await request(server).post('/api/users').send({Username: 'deeegv', email: 'dev@gmail.com', Password: '123456Abcd', DoB: '2001-06-06'});
        expect(res.statusCode).toEqual(200);
    });

    it('checks for correct Username sequence', async () =>
    {
        const res = await request(server).post('/api/users').send({Username: 'deeev', email: 'dev@gmail.com', Password: '123456Abcd', DoB: '2001-06-06'});
        expect(res.statusCode).toEqual(200);
    });

});

describe('user-Get requests', () =>
{
    it('returns status code 200 if users can be retrieved', async () =>
    {
        const res = await request(server).get('/api/users');
        expect(res.statusCode).toEqual(201);
    });

    it('returns status code 200 if users WITH Credit cards can be retrieved', async () =>
    {
        const res = await request(server).get('/api/users/CreditCard=Yes');
        expect(res.statusCode).toEqual(200);
    });

    it('returns status code 200 if users WITHOUT Credit cards can be retrieved', async () =>
    {
        const res = await request(server).get('/api/users/CreditCard=No');
        expect(res.statusCode).toEqual(200);
    });
});

//tests for payments route
describe('user-Post requests', () => 
{
    it('checks for successful payment', async () =>
    {
        const res = await request(server).post('/api/payments').send({CreditCard: '4111111111111111', Amount: '123'});
        expect(res.statusCode).toEqual(201);
    });

    it('checks if any user exist with corresponding credit card number', async () =>
    {
        const res = await request(server).post('/api/payments').send({CreditCard: '4111111111111111', Amount: '123'});
        expect(res.statusCode).toEqual(201);
    });

    it('checks if the user Does NOT exist with corresponding credit card number', async () =>
    {
        const res = await request(server).post('/api/payments').send({CreditCard: '4111121111111111', Amount: '123'});
        expect(res.statusCode).toEqual(404);
    });

    it('checks if Credit card validation fails', async () =>
    {
        const res = await request(server).post('/api/payments').send({CreditCard: '411111111111111', Amount: '123'});
        expect(res.statusCode).toEqual(400);
    });

    it('checks if amount validation fails', async () =>
    {
        const res = await request(server).post('/api/payments').send({CreditCard: '411111111111111', Amount: '1243'});
        expect(res.statusCode).toEqual(400);
    });
});