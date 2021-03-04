const { v4: uuidv4 } = require('uuid'); // Using uuid library to create the id for the documents
const store = require('./store');
const boom = require("@hapi/boom"); // Boom is my error throwing/handler


const create = (company) => {
    const id = uuidv4();

    if(!company._id) {  // If the id not exist, i add it on the company
        company._id = id
    }
    return store.create(company);
}

const getCompanies = async() => {
    const companies = await store.getEvery();
    if(companies.length === 0) {
        throw boom.notFound('There is not companies.');
    }
    return companies
}

const compById = async (id) => {
    const company = await store.getById(id);
    if(!company) {
        throw boom.notFound('Company not found.')
    }
    return company;
}

const compUpdate = async (id, data) => {
    const updated = await store.update(id, data);
    if(!updated) {
        throw boom.notFound('That company do not exists.')
    }
    return updated;
}

const compDelete = async (id) => {
    const deleted = await store.deleteComp(id);
    if(!deleted) {
        throw boom.notFound('That company do not exists.')
    }
    return deleted;
}

module.exports = {
    create,
    getCompanies,
    compById,
    compUpdate,
    compDelete
}