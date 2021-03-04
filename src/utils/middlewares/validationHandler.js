const boom = require('@hapi/boom');
const joi = require('joi');

const validate = (data, schema) => {
    const { error } = joi.object(schema).validate(data);    // Joi compares the schema with the obtained data

    return error;
}

// Validation by default is body, but can also check on params or even query
const validationHandler = (schema, check = "body") => {
    return function (req, res, next) {
        const error = validate(req[check], schema);

        error ? next(boom.badRequest(error)) : next()
    }
}

module.exports = validationHandler;