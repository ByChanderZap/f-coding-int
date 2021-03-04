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

router.get('/:id', validationHandler({ id: companyIdSchema }, 'params'), async (req, res, next) => {
    const { id } = req.params;
    try {
        const company = await controller.compById(id);

        res.status(200).json({
            Message: "Here are every company.",
            company
        });
    } catch (error) {
        next(error);
    }
})

router.put('/:id', validationHandler({ id: companyIdSchema }, 'params'), validationHandler(updateCompanySchema), async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const updated = await controller.compUpdate(id, req.body);

        res.status(200).json({
            Message: "Company updated.",
            updated
        });
    } catch (error) {
        next(error);
    }
})

router.post('/', validationHandler(createCompanySchema), async (req, res, next) => {
    
    try {
        const created = await controller.create(req.body)
        res.status(200).json({
            Message: "Company Created.",
            company: created
        })
    } catch (error) {
        next(error);
    }
})

router.delete('/:id', validationHandler({ id: companyIdSchema }, 'params'), async (req, res, next) => {
    const { id } = req.params;
    
    try {
        const deleted = await controller.compDelete(id);

        res.status(200).json({
            Message: "Company updated.",
            deleted
        });
    } catch (error) {
        next(error);
    }
})


module.exports = router;