const companiesRoutes = require('../components/companies/network');

const routes = (app) => {
    app.use('/api/comp', companiesRoutes);
}

module.exports = routes;