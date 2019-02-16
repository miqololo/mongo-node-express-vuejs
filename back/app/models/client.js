'use strict';
let mongoose = require('mongoose');
let validator = require('validator');
let mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

let clientSchema = new Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true,
        validate: (value) => {
            return validator.isEmail(value)
        }
    },
    phone: String,
    providers: [{ type: ObjectId, ref: 'Provider' }]
},
{
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
});
clientSchema.plugin(mongoosePaginate);
clientSchema.methods.entitize = function () {
    const client = {
        id: this._id,
        email: this.email,
        name: this.name,
        phone: this.phone,
        providers: this.providers,
        updated: this.updated_at,
        created: this.created_at
    };

    return client;
};

module.exports = mongoose.model('Client', clientSchema);