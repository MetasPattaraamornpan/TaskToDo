'use strict'

// utill
const mapErrorMessage       = require('./helpers/commons').mapErrorMessage
// routers  
const router 	            = require('express').Router()

const taskController        = require('./controllers/taskcontroller')
const dbController          = require('./controllers/dbcontroller')

module.exports = function(app) {

    
    router
        .get('/creatdb', dbController.createDB)
        .get('/task/:task_id', taskController.selectTask)
        .get('/tasks', taskController.selectAllTask)
        .post('/task', taskController.insertTask)
        .put('/task', taskController.updateTask)
        .put('/task/status', taskController.updateTaskStatus)
        .delete('/task/:task_id', taskController.deleteTask)

    app
        .use('/api/v1/taskapi', router)
    
    // Not found route
    app.use(function(req, res, next) {
        throw new Error(JSON.stringify({ status: 404, message: `"${req.url}" not found` }))
    })

    // Error handle
    // Note : we should not show internal error message
    app.use(function(err, req, res, next) {
        let errObj = mapErrorMessage(err)

        // log error stack
        console.log('[Error ' + errObj.status + '] ', err)

        // reply error
        if (errObj.status) res.status(errObj.status)

        res.send({ status: errObj.status, message: errObj.message })
        return;
    })
}
