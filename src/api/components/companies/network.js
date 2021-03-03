const express = require('express');
const router = express.Router();
const { companyIdSchema, createCompanySchema, updateCompanySchema } = require('../../../utils/validations/schemas/companies'); // eslint-disable-line
// eslint-disable-next-line no-unused-vars
const validationHandler = require('../../../utils/middlewares/validationHandler');
const controller = require('./controller');

router.get('/', async (req, res, next) => {
    try {
        const companies = await controller.getCompanies();
        
        res.status(200).json({
            Message: "Here are every company",
            Companies: companies
        });
    } catch (error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => {
    const { id } = req.params;
    try {
        const companie = await controller.compById(id);
        
        res.status(200).json({
            Message: "Here are every company",
            companie
        });
    } catch (error) {
        next(error);
    }
})


//  Example of req.body validation
router.post('/', async (req, res, next) => {
    const { name, description, symbol, market_value } = req.body;
    try {
        const created = await controller.create(name, description, symbol, market_value)
        res.status(200).json({
            Message: "Company Created.",
            company: created
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;