'use strict';
let mongoose = require('mongoose');
const Schema = mongoose.Schema;

let providerSchema = new Schema({
        name: String
    },
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    });
providerSchema.methods.entitize = function () {
    const provider = {
        id: this._id,
        name: this.name,
        updated: this.updated_at,
        created: this.created_at
    };

    return provider;
};

module.exports = mongoose.model('Provider', providerSchema);