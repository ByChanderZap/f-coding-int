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

const update = (id, data) => {
    return Companies.findByIdAndUpdate(id, data, {new: true});
}


module.exports = {
    create,
    getEvery,
    getById,
    update
}