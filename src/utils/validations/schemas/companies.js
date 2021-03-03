// eslint-disable-next-line no-unused-vars
const joi = require('joi');

//  This regex is for a uuid
const companyIdSchema = joi.string().regex(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i).message('Invalid ID'); 
const nameSchema = joi.string().min(5).max(50); //  Requirements for name
const descriptionSchema = joi.string().min(50).max(100);    //  Requirements for description
const symbolSchema = joi.string().max(10).regex(/^[A-Z0-9]+\*?$/).message('Symbol must be like the companies that accept the NY stock market, max length is 10 characters');
const marketSchema = joi.array().min(50).max(50).items(joi.string()); // Im not sure about this... not sure if the array must contain always a length of 50


const createCompanySchema = {
    _id: companyIdSchema,
    name: nameSchema.required(),
    description: descriptionSchema.required(),
    symbol: symbolSchema.required(),
    market_value: marketSchema.required()
};

const updateCompanySchema = {
    name: nameSchema,
    description: descriptionSchema,
    symbol: symbolSchema,
    market_value: marketSchema
}

module.exports = {
    companyIdSchema, 
    createCompanySchema,
    updateCompanySchema,
};