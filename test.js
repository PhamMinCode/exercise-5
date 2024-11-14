const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server'); // Adjust the path as necessary
const { expect } = chai;

chai.use(chaiHttp);

describe('API Tests', () => {
    it('should create a new data entry', (done) => {
        chai.request(server)
            .post('/data')
            .set('Content-Type', 'application/json')
            .send({ name: 'Test Data' })
            .end((err, res) => {
                expect(res).to.have.status(201);
                expect(res.body).to.have.property('id');
                done();
            });
    });

    // Add more tests for GET, DELETE, and PUT operations
});