'use strict'

const Request = require('supertest');
const promise = require('bluebird')

let server

before(function() {
	return promise.try(() => require('../../app/app')())
	.then(function(app){
		server = app.server
		global.request = Request(server)
		return
	})
});

after(function (done) {
	server.close();
	done();
});