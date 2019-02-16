'use strict';
const clientManager = require('../managers/client-manager');
const providerManager = require('../managers/provider-manager');
const responseHelper = require('../helpers/response_generator');
const utils = require('../helpers/utils');
const clientValidation = require('../validations/clinet_validations');
const constants = require('../constants');
const express = require('express')
const router = express.Router()

/**
 * @swagger
 * /users: msmmsms
 *    get: adasdasd
 *      description: This should return all users
 */
router.get('/',async (req, res) => {
    try {
        let {searchBy, searchField} = req.query;
        let query = req.query;
        let pagingAndSorting = utils.getPagingAndSorting(query);
        let client = await clientManager.getClients(pagingAndSorting,searchBy,searchField);
        responseHelper.successResponse(res,client);
    }catch (e){
        responseHelper.errorResponse(res,constants.internalError.message,constants.internalError.statusCode);
    }
});

/**
 * @swagger
 * /users: msmmsms
 *    get: adasdasd
 *      description: This should return all users
 */
router.post('/',async (req, res) => {
    try {
        let providers = [];
        let valid = await clientValidation(req);
        for (let key in req.body.providers) {
            let provider = await providerManager.getById(req.body.providers[key]._id);
            if (!provider) {
                valid.push({'field':'provider','msg':"some providers does not exist"});
                break;
            }
            providers.push(provider);
        }
        if(valid.length>0){
            return responseHelper.errorResponse(res,constants.internalError.statusCode, constants.internalError.message,valid);
        }
        let client = await clientManager.create(req.body.email, req.body.name, req.body.phone, providers);

        responseHelper.successResponse(res,client);
    }catch (e){
        responseHelper.errorResponse(res,constants.internalError.message,constants.internalError.statusCode);
    }
});

/**
 * @swagger
 * /users: msmmsms
 *    get: adasdasd
 *      description: This should return all users
 */
router.get('/:id', async (req, res) => {
    try {
        let client = await clientManager.getById(req.params.id);
        responseHelper.successResponse(res,client);
    }catch (e){
        responseHelper.errorResponse(res,constants.internalError.message,constants.internalError.statusCode);
    }
});

/**
 * @swagger
 * /users: msmmsms
 *    get: adasdasd
 *      description: This should return all users
 */
router.put('/:id', async (req, res) => {
    try {
        let providers = [];
        let valid = await clientValidation(req);
        for (let key in req.body.providers) {
            let provider = await providerManager.getById(req.body.providers[key]._id);
            if (!provider) {
                valid.push({'field':'provider','msg':"some providers does not exist"});
                break;
            }
            providers.push(provider);
        }
        req.body.providers = providers;
        if(valid.length>0){
            return responseHelper.errorResponse(res,constants.internalError.statusCode, constants.internalError.message,valid);
        }
        await clientManager.update(req.params.id, req.body);
        let client = await clientManager.getById(req.params.id);
        responseHelper.successResponse(res,client);
    }catch (e){
        responseHelper.errorResponse(res,constants.internalError.message,constants.internalError.statusCode);
    }
});

/**
 * @swagger
 * /users: msmmsms
 *    get: adasdasd
 *      description: This should return all users
 */
router.delete('/:id', async (req, res) => {
    try {
        let client = await clientManager.getById(req.params.id);
        if(!client){
            return responseHelper.errorResponse(res,constants.invalidParametersGiven.message,constants.invalidParametersGiven.statucCode);
        }
        await client.remove();
        responseHelper.successResponse(res,null,'successfully deleted');
    }catch (e){
        responseHelper.errorResponse(res,constants.internalError.message,constants.internalError.statusCode);
    }
});

module.exports = router;