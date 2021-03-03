const express = require('express');
const router = express.Router();
const { companyIdSchema, createCompanySchema, updateCompanySchema } = require('../../../utils/validations/schemas/companies'); // eslint-disable-line
// eslint-disable-next-line no-unused-vars
const validationHandler = require('../../../utils/middlewares/validationHandler');

router.get('/', (req, res, next) => {
    try {
        res.status(200).json({
            Message: "Hello!"
        });
    } catch (error) {
        next(error)
    }
})

//  Example of req.body validation
router.post('/', (req, res, next) => {
    console.log(req.body)
    try {
        res.status(200).json({
            Message: "Ok"
        })
    } catch (error) {
        next(error);
    }
})

module.exports = router;