const Companies = require('../../../db/models/companies');

const create = (comp) => {
    const created = new Companies(comp);
    return created.save();
}

module.exports = {
    create
}