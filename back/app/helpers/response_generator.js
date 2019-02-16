const constants = require('../constants');
class ResponseGenerator {
    constructor() {
        this.messages = constants.success.message;
        this.json_response = { status: 200, message: this.messages };
        this.OK_STATUS_CODE = 1000000;
    }

    errorResponse(res,errorMsg,errorCode,details = null){
        //res.send(e);
        this.json_response = {status:errorCode, message:errorMsg,details:(details)?details:[]};
        res.send(this.json_response);
    }

    successResponse(res, result){
        this.json_response.result = result;
        this.json_response.status = constants.success.statucCode;
        this.json_response.message = constants.success.message;

        res.send(this.json_response);
    }
}


module.exports = new ResponseGenerator();
