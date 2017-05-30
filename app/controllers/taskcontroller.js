'use strict'

const promise 		= require('bluebird')
const commons      = require('../helpers/commons')
const taskService	= require('../services/taskservice')

function insertTask(req, res) {
	console.log('insertTask' , req.body)
	let specs = {
		subject: [],
		detail: [],
		status: []
	}
	
	return promise.try(() => commons.vadidate(specs , req.body))
		.then((p)=> taskService.insertTask(p))
		.then((resData)=> commons.handleResponse(res, resData))
		.catch((err)=> commons.handleError(res, err))
}

function updateTask(req, res) {
	console.log('updateTask' , req.body)
	let specs = {
		task_id: ['required', 'number'],
		subject: [],
		detail: []
	}
	
	return promise.try(() => commons.vadidate(specs , req.body))
		.then((p)=> taskService.updateTask(p))
		.then((resData)=> commons.handleResponse(res, resData))
		.catch((err)=> commons.handleError(res, err))
}

function selectTask(req, res) {
	console.log('selectAllTask' , req.params)
	let specs = {
		task_id: ['required', 'number']
	}
	return promise.try(() => commons.vadidate(specs , req.params))
		.then((p)=> taskService.selectTask(p))
		.then((resData)=> commons.handleResponse(res, resData))
		.catch((err)=> commons.handleError(res, err))
}

function selectAllTask(req, res) {
	console.log('selectAllTask' , req.query)
	let specs = {
		status: []
	}
	return promise.try(() =>commons. vadidate(specs , req.query))
		.then((p)=> taskService.selectAllTask(p))
		.then((resData)=> commons.handleResponse(res, resData))
		.catch((err)=> commons.handleError(res, err))
}

function updateTaskStatus(req, res) {
	console.log('updateTaskStatus' , req.body)
	let specs = {
		task_id: ['required', 'number'],
		status: ['required']
	}
	return promise.try(() => commons.vadidate(specs , req.body))
		.then((p)=> taskService.updateTaskStatus(p))
		.then((resData)=> commons.handleResponse(res, resData))
		.catch((err)=> commons.handleError(res, err))
}

function deleteTask(req, res) {
	console.log('deleteTask' , req.params)
	let specs = {
		task_id: ['required', 'number']
	}
	return promise.try(() => commons.vadidate(specs , req.params))
		.then((p)=> taskService.deleteTask(p))
		.then((resData)=> commons.handleResponse(res, resData))
		.catch((err)=> commons.handleError(res, err))
}

module.exports = {
    insertTask,
	selectTask,
	selectAllTask,
	updateTask,
	updateTaskStatus,
	deleteTask
}