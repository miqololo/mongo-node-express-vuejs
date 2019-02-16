'use strict';
const clientRoutes = require('./client');
const providerRoutes = require('./provider');
const middleware = require('../middleware/api_authorization');
var swaggerUi = require('swagger-ui-express'),
    swaggerDocument = require('../../swagger.json');



module.exports = function(app) {

    //app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use(middleware);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    app.use('/client',clientRoutes);
    app.use('/provider',providerRoutes);

    //clientRoutes(app.router);
    //providerRoutes(app, provider_prefix);
    // Other route groups could go here, in the future
};