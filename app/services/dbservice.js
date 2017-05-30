'use strict'
const promise       		= require('bluebird')
const taskModel		        = require('../models/taskmodel')

function createDB(){
  console.log('createDB')
  return taskModel.createDB()
}

module.exports = {
  createDB
}