const Companies = require('../../../db/models/companies');

const create = (comp) => {
    const created = new Companies(comp);
    return created.save();
}

const getEvery = () => {
    return Companies.find({});
}

const getById = (id) => {
    return Companies.findById(id)
}



module.exports = {
    create,
    getEvery,
    getById
}