const express = require('express');
const app = express();
require('./db');
const cors = require('cors');
const helmet = require('helmet');
const router = require('./api/routes/routes');

/*
    Im using a handler error with 3 steps, first check if error is boom, if not convert it to boom error.
    Then looks if we are in "develop mode" to know if should response with the stack error or not,
    Finaly... response with some error

*/
const {
    logErrors,
    errorHandler,
    wrapErrors
} = require('./utils/middlewares/errorHandlers');
const notFoundHandler = require('./utils/middlewares/notFound');


//  Server configs
const { config } = require('./config/index');
app.use(express.json());    //  Accept JSON
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(cors());    //  I know use cors like this is a really bad implementation, but is only for development purposes.
app.use(helmet());  //  Using Helmet for an extra protection setting a serie of http headers.

// This is just because i like to see the morgan logs.
if (config.dev) {
    const morgan = require('morgan');
    app.use(morgan('dev'));
}

// Routes
router(app);

// Error 404
app.use(notFoundHandler);

// Errors middlewares
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);



app.listen(config.port, () => {
    console.log(`Listening on: http://localhost:${config.port}`);
})

module.exports = app;