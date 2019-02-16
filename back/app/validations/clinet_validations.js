'use strict';
const clientManager = require('../managers/client-manager');

function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

async function clientValidations(req){
    let id = (req.params && req.params.id)?req.params.id:null;
    let currentClient = false;
    if(id){
        currentClient = await clientManager.getById(id);
    }
    let email = req.body.email;
    let name = req.body.name;
    let errors = [];
    if(!validateEmail(email)){
        errors.push({'field':'email','msg':'invalid email format'});
    }
    let client = await clientManager.findByEmail(email);
    if(client && ((currentClient && client.id !== currentClient.id) || !currentClient)){
        errors.push({'field':'email','msg':'this email already used by another user'});
    }
    if(name.length<3 ){
        errors.push({'field':'name','msg':'Name must contain at least 3 characters'});
    }
    return errors;
}

module.exports = clientValidations;