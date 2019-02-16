'use strict';
const ClientModel = require('../models/client');
const ProviderModel = require('../models/provider');

class ClientManager {
	/**
	 *
	 * @param email
	 * @param phone
	 * @param name
	 * @param providers
	 * @returns {Promise<*>}
	 */
	async create(email, name, phone,providers) {
	    if(name===''){
	        throw Error('invalid name');
        }
        if(phone===''){
            throw Error('invalid phone');
        }
		let client = new ClientModel({
			email: email,
			name: name,
			phone: phone,
			providers: providers
		});

		await client.save();
		return client;
	}

	/**
	 *
	 * @param email
	 * @returns {Promise<*>}
	 */
	async findByEmail(email) {
		return await ClientModel.findOne({ email: email });
	}

    /**
     *
     * @param email
     * @returns {Promise<*>}
     */
    async findByPhone(phone) {
        return ClientModel.findOne({ phone: phone });
    }

	/**
	 *
	 * @param id
	 * @returns {Promise<*>}
	 */
	async getById(id) {
		return await ClientModel.findById(id);
	}

	/**
	 *
	 * @param id
	 * @param updateData
	 * @returns {Promise<void>}
	 */
	async update(id, updateData) {
		return await ClientModel.update({ _id: id }, updateData);
	}

    /**
     *
     * @param paging
     * @returns {List<ClientModel>}
     */
    async getClients(paging,searchBy,searchValue) {

        paging.select = 'email name phone';
        paging.populate = {
            path: 'providers',
            select: 'name'
        };
        let query = {};
        if(searchValue.length>0){
            query[searchBy] = { $regex: '.*' + searchValue + '.*' };
        }
        return await ClientModel.paginate(query,paging);
    }

}

module.exports = new ClientManager();