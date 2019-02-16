'use strict';
const providerManager = require('../managers/provider-manager');
const responseHelper = require('../helpers/response_generator');
const utils = require('../helpers/utils');
const constants = require('../constants');
const express = require('express')
const router = express.Router()

router.get('/', async (req, res) => {
        try {
            let providers = await providerManager.getProviders();
            responseHelper.successResponse(res,providers);
        }catch (e){
            responseHelper.errorResponse(res,constants.internalError.message,constants.internalError.statusCode);
        }
    });

router.post('/', async (req, res) => {
        try {
            let name = req.body.name;
            let provider = await providerManager.findByName(name);
            if(!name || name === '' || name.length<4 || provider) {
                return responseHelper.errorResponse(res, constants.invalidParametersGiven.message, constants.invalidParametersGiven.statucCode);
            }
            provider = await providerManager.create(name);
            responseHelper.successResponse(res,provider);
        }catch (e){
            responseHelper.errorResponse(res,constants.internalError.statusCode,constants.internalError.message);
        }
    });


router.get('/:id', async (req, res) => {
        try {
            let provider = await providerManager.getById(req.params.id);
            responseHelper.successResponse(res,provider);
        }catch (e){
            responseHelper.errorResponse(res,constants.internalError.message,constants.internalError.statusCode);
        }
    });

router.put('/:id', async (req, res) => {
        try {
            let id = req.params.id;
            let provider = await providerManager.getById(id);
            if(!provider){
                return responseHelper.errorResponse(res, constants.invalidParametersGiven.message, constants.invalidParametersGiven.statucCode);
            }
            await providerManager.update(id,req.body);
            provider = await providerManager.getById(req.params.id);
            responseHelper.successResponse(res,provider);
        }catch (e){
            responseHelper.errorResponse(res,constants.internalError.statusCode,constants.internalError.message);
        }
    });

router.delete('/:id', async (req, res) => {
        try {
            let provider = await providerManager.getById(req.params.id);
            if(!provider){
                return responseHelper.errorResponse(res,constants.invalidParametersGiven.message,constants.invalidParametersGiven.statucCode);
            }
            await provider.remove();
            responseHelper.successResponse(res,null,'successfully deleted');
        }catch (e){
            responseHelper.errorResponse(res,constants.internalError.statusCode,constants.internalError.message);
        }
    });
module.exports = router;