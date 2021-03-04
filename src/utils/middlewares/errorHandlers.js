const boom = require('@hapi/boom');
const { config } = require('../../config/index');

/**
 * 
 * This error handleling use 3 phases where error are logged, check the we are on development mode, check if its a boom error
 * and then just throw the error to the client
 * 
 * 
 */

const errorStack = (err, stack) => {
    if (config.dev) {
        return {...err, stack}
    }
    return err
}

const logErrors = (err, req, res, next) => {
    if (config.dev) {
        console.log(err);
    } else {
        console.log(err.message);
    }
    next(err);
}

const wrapErrors = (err, req, res, next) => {
    if(!err.isBoom){
        next(boom.badImplementation(err));
    }

    next(err);
}

const errorHandler = (err, req, res, next) => { // eslint-disable-line
    const { output: { statusCode, payload } } = err;


    res.status(statusCode);
    res.json(errorStack(payload, err.stack));
}

module.exports = {
    logErrors,
    errorHandler,
    wrapErrors
}