let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;
const server = require('../src/index');
const {
    _id,
    name,
    description,
    symbol,
    market_value
} = require('./mock');

const fullObj = {
    _id,
    name,
    description,
    symbol,
    market_value
}
chai.use(chaiHttp);

describe('Companies Endpoints', () => {
    it('Should create a company', (done) => {
        chai.request(server)
            .post('/api/comp')
            .send(fullObj)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.company).to.deep.include(fullObj);
                done();
            })
    })
    it('Should get every company', (done) => {
        chai.request(server)
            .get('/api/comp')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.Companies).to.be.an('array');
                done();
            })
    })
    it('Should get one company', (done) => {
        chai.request(server)
            .get(`/api/comp/${_id}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.company).to.deep.include(fullObj);
                done();
            })
    })
    it('Should refuse get for a bad id', (done) => {    // Id dont match with the given pattern
        chai.request(server)
            .get(`/api/comp/asdsad23ed3-a3d3d3-3dada3da`)
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.error).to.be.equal('Bad Request');
                expect(res.body.message).to.be.equal("Invalid ID")
                done();
            })
    })
    it('Should update a company', (done) => {   //  Updating 1 field
        chai.request(server)
            .put(`/api/comp/${_id}`)
            .send({
                name: "new name",
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.updated.name).to.be.equal('new name');
                done();
            })
    })
    it('Should update a company', (done) => {   //  Updating every field
        chai.request(server)
            .put(`/api/comp/${_id}`)
            .send({
                name,
                description,
                symbol,
                market_value
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.updated).to.deep.include(fullObj);
                done();
            })
    })
    it('Should delete the created company', (done) => {
        chai.request(server)
            .delete(`/api/comp/${_id}`)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.deleted).to.deep.include(fullObj);
                done();
            })
    })
    it('Should refuse creation for an adition field', (done) => {
        chai.request(server)
            .post('/api/comp')
            .send({
                _id,
                name,
                description,
                symbol,
                market_value,
                test: 'test'
            })
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body.error).to.be.equal('Bad Request');
                expect(res.body.message).to.be.equal("\"test\" is not allowed")
                done();
            })
    })
})