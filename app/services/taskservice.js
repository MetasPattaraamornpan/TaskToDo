'use strict'
const promise       		  = require('bluebird')
const taskModel		        = require('../models/taskmodel')
function insertTask(p){
  console.log('insertTask', p)
  if(p.status && ['pending','done'].indexOf(p.status) == -1) throw {status : 400, err : "status not match"}
  return taskModel.insert(p)
}

function selectAllTask(p){
  console.log('selectAllTask', p)
  if(p.status && ['pending','done'].indexOf(p.status) == -1) throw {status : 400, err : "status not match"}
  return taskModel.selectAll(p)
}

function selectTask(p){
  console.log('selectTask', p)
  return taskModel.select(p)
}

function updateTask(p){
  console.log('updateTask', p)
  return taskModel.updateTask(p)
}

function updateTaskStatus(p){
  console.log('updateTaskStatus', p)
  if(['pending','done'].indexOf(p.status) == -1) throw {status : 400, err : "status not match"}
  return taskModel.updateTaskStatus(p)
}

function deleteTask(p){
  console.log('deleteTask', p)
  return taskModel.deleteTask(p)
}

module.exports = {
  insertTask,
  selectTask,
  selectAllTask,
  updateTask,
  updateTaskStatus,
  deleteTask
}