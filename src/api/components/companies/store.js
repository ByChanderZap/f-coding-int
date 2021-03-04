const Companies = require('../../../db/models/companies');

//  Im using the common mongoose functionalities to make it faster
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

const deleteComp = (id) => {
    return Companies.findByIdAndDelete(id);
}


module.exports = {
    create,
    getEvery,
    getById,
    update,
    deleteComp
}