'use strict';
const ProviderModel = require('../models/provider');

class ProviderManager {
	/**
	 *
	 * @param name
	 * @returns {Promise<*>}
	 */
	async create(name) {
		let provider = new ProviderModel({
			name: name,
		});

		await provider.save();
		return provider;
	}

	/**
	 *
	 * @param name
	 * @returns {Promise<*>}
	 */
	async findByName(name) {
		return ProviderModel.findOne({ name: name });
	}

	/**
	 *
	 * @param id
	 * @returns {Promise<*>}
	 */
	async getById(id) {
		return ProviderModel.findById(id);
	}

	/**
	 *
	 * @param id
	 * @param updateData
	 * @returns {Promise<void>}
	 */
	async update(id, updateData) {
		return ProviderModel.update({ _id: id }, updateData);
	}


    /**
     *
     * @param paging
     * @returns {List<ProviderModel>}
     */
    async getProviders() {
        return ProviderModel.find({}).select('name _id');
    }
}

module.exports = new ProviderManager();