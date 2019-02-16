'use strict';
const config = require('../../config');
const _ = require('lodash');
const AppUtils = {
    getPagingAndSorting(requestQuery) {
        let { page, limit, sortBy, sortType } = requestQuery;
        let pagingAndSorting = { sort: { "created_at": -1 }};

        if(page){
            pagingAndSorting.page = parseInt(page);
            pagingAndSorting.limit = limit ? parseInt(limit) : config.defaultPageLimit;;
        }

        if (sortBy) {
            sortType = sortType==='true' ? 1 : -1;
            pagingAndSorting.sort = _.set({}, sortBy, sortType);
        }

        return pagingAndSorting;
    }


};

module.exports = AppUtils;