'use strict'

const promise 		= require('bluebird')
const commons      = require('../helpers/commons')
const dbService	    = require('../services/dbservice')

function createDB(req, res) {
	console.log('createDB')
	
	return promise.try(() => dbService.createDB())
		.then((resData)=> commons.handleResponse(res, resData))
		.catch((err)=> commons.handleError(res, err))
}

module.exports = {
    createDB
}