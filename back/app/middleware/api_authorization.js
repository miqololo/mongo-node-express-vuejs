'use strict';
const config = require('../../config');
const responseGenerator = require('../helpers/response_generator');
const constants = require('../constants');
function handleHeaders(req, res, next) {
    if ((!req.headers.authorization || req.headers.authorization!=='Auth <'+config.apiKey+'>') && req.originalUrl.indexOf('api-docs')===-1) {
        return responseGenerator.errorResponse(res,constants.accessDenied.message,constants.accessDenied.statucCode);
    }
    next();
}


module.exports = handleHeaders;
