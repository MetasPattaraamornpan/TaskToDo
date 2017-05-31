'use strict'

const fs        = require('fs')
const promise   = require('bluebird')
const chai      = require('chai')
const expect    = chai.expect

let prefixPath  = '/api/v1/taskapi'
let task_id = [];

describe('integration test Task', function() {

    it('Task create success', done => {
        let userData = {
            "subject":"Subject test",
	        "detail":"test create subject task",
            "status":"pending"
        }
        request
            .post(`${prefixPath}/task`)
            .send(userData)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(200)

				expect(obj).be.json
				expect(obj).to.be.a('object')
				expect(obj).to.have.property('task_id')
				expect(obj).to.have.property('status')

                expect(obj.status).eql("pending")
                expect(obj.subject).eql("Subject test")
                expect(obj.detail).eql("test create subject task")
                task_id.push(obj.task_id)
                done();
            })
    })

    it('Task create success no detail', done => {
        let userData = {
            "subject":"Subject test no detail",
            "status":"pending"
        }
        request
            .post(`${prefixPath}/task`)
            .send(userData)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(200)

				expect(obj).be.json
				expect(obj).to.be.a('object')
				expect(obj).to.have.property('task_id')
				expect(obj).to.have.property('status')

                expect(obj.status).eql("pending")
                expect(obj.subject).eql("Subject test no detail")
                expect(obj.detail).eql("")
                task_id.push(obj.task_id)
                done();
            })
    })

    it('Task create success no Subject have detail', done => {
        let userData = {
            "detail":"No Subject Test",
            "status":"pending"
        }
        request
            .post(`${prefixPath}/task`)
            .send(userData)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(200)

				expect(obj).be.json
				expect(obj).to.be.a('object')
				expect(obj).to.have.property('task_id')
				expect(obj).to.have.property('status')

                expect(obj.status).eql("pending")
                expect(obj.subject).eql("No Subject")
                expect(obj.detail).eql("No Subject Test")
                task_id.push(obj.task_id)
                done();
            })
    })

    it('Task create success with done', done => {
        let userData = {
            "status":"done"
        }
        request
            .post(`${prefixPath}/task`)
            .send(userData)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(200)

				expect(obj).be.json
				expect(obj).to.be.a('object')
				expect(obj).to.have.property('task_id')
				expect(obj).to.have.property('status')

                expect(obj.status).eql("done")
                expect(obj.subject).eql("No Subject")
                expect(obj.detail).eql("")
                task_id.push(obj.task_id)
                done();
            })
    })

    it('Task create success with default value', done => {
        let userData = {
        }
        request
            .post(`${prefixPath}/task`)
            .send(userData)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(200)

				expect(obj).be.json
				expect(obj).to.be.a('object')
				expect(obj).to.have.property('task_id')
				expect(obj).to.have.property('status')

                expect(obj.status).eql("pending")
                expect(obj.subject).eql("No Subject")
                expect(obj.detail).eql("")
                task_id.push(obj.task_id)
                done();
            })
    })

    it('Task get all task', done => {
        request
            .get(`${prefixPath}/tasks`)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(200)

				expect(obj).be.json
				expect(obj).to.be.a('array')

                done();
            })
    })

    it('Task get all task with pending', done => {
        request
            .get(`${prefixPath}/tasks?status=pending`)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(200)

				expect(obj).be.json
				expect(obj).to.be.a('array')

                expect(obj[0].status).eql("pending")
                done();
            })
    })

    it('Task get all task with done', done => {
        request
            .get(`${prefixPath}/tasks?status=done`)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(200)

				expect(obj).be.json
				expect(obj).to.be.a('array')

                expect(obj[0].status).eql("done")
                done();
            })
    })

    it('Task get all task with incorrect status', done => {
        request
            .get(`${prefixPath}/tasks?status=none`)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(400)

				expect(obj).be.json
                expect(obj).to.be.a('object')
                expect(obj).to.have.property('error')

                expect(obj.error).eql("status not match")
                done();
            })
    })

    it('Task get single task', done => {
        request
            .get(`${prefixPath}/task/`+task_id[0])
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(200)

				expect(obj).be.json
				expect(obj).to.be.a('object')

                expect(obj.status).eql("pending")
                expect(obj.subject).eql("Subject test")
                expect(obj.detail).eql("test create subject task")
                expect(obj.task_id).eql(task_id[0])
                done();
            })
    })
    
    it('Task get single task with not number', done => {
        request
            .get(`${prefixPath}/task/stringTest`)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(400)

                expect(obj).be.json
                expect(obj).to.be.a('object')
                expect(obj).to.have.property('error')

                expect(obj.error).eql("task_id is not number")
                done();
            })
    })

    it('Task edit single task', done => {
        let userData = {
            "task_id": task_id[0],
            "subject":"Subject test edit",
	        "detail":"edit detail"
        }

        request
            .put(`${prefixPath}/task`)
            .send(userData)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(200)

				expect(obj).be.json
				expect(obj).to.be.a('object')

                expect(obj.status).eql("pending")
                expect(obj.subject).eql("Subject test edit")
                expect(obj.detail).eql("edit detail")
                expect(obj.task_id).eql(task_id[0])
                done();
            })
    })

    it('Task edit single task only Subject', done => {
        let userData = {
            "task_id": task_id[0],
            "subject":"Only Subject edit"
        }

        request
            .put(`${prefixPath}/task`)
            .send(userData)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(200)

				expect(obj).be.json
				expect(obj).to.be.a('object')

                expect(obj.status).eql("pending")
                expect(obj.subject).eql("Only Subject edit")
                expect(obj.detail).eql("edit detail")
                expect(obj.task_id).eql(task_id[0])
                done();
            })
    })

    it('Task edit single task only detail', done => {
        let userData = {
            "task_id": task_id[0],
            "detail":"only edit detail"
        }

        request
            .put(`${prefixPath}/task`)
            .send(userData)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(200)

				expect(obj).be.json
				expect(obj).to.be.a('object')

                expect(obj.status).eql("pending")
                expect(obj.subject).eql("Only Subject edit")
                expect(obj.detail).eql("only edit detail")
                expect(obj.task_id).eql(task_id[0])
                done();
            })
    })

    it('Task edit single task not send id', done => {
        let userData = {
            "subject":"Subject test edit",
	        "detail":"edit detail"
        }

        request
            .put(`${prefixPath}/task`)
            .send(userData)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(400)

				expect(obj).be.json
                expect(obj).to.be.a('object')
                expect(obj).to.have.property('error')

                expect(obj.error).eql("task_id required")
                done();
            })
    })

    it('Task set status task done', done => {
        let userData = {
            "task_id": task_id[0],
            "status":"done"
        }

        request
            .put(`${prefixPath}/task/status`)
            .send(userData)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(200)

				expect(obj).be.json
				expect(obj).to.be.a('object')

                expect(obj.status).eql("done")
                expect(obj.task_id).eql(task_id[0])
                done();
            })
    })

    it('Task set status task pending', done => {
        let userData = {
            "task_id": task_id[0],
            "status":"pending"
        }

        request
            .put(`${prefixPath}/task/status`)
            .send(userData)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(200)

				expect(obj).be.json
				expect(obj).to.be.a('object')

                expect(obj.status).eql("pending")
                expect(obj.task_id).eql(task_id[0])
                done();
            })
    })

    it('Task set status task incorrect', done => {
        let userData = {
            "task_id": task_id[0],
            "status":"none"
        }

        request
            .put(`${prefixPath}/task/status`)
            .send(userData)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(400)

				expect(obj).be.json
                expect(obj).to.be.a('object')
                expect(obj).to.have.property('error')

                expect(obj.error).eql("status not match")
                done();
            })
    })

    it('Task set status task not sent id', done => {
        let userData = {
            "status":"done"
        }

        request
            .put(`${prefixPath}/task/status`)
            .send(userData)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(400)

				expect(obj).be.json
                expect(obj).to.be.a('object')
                expect(obj).to.have.property('error')

                expect(obj.error).eql("task_id required")
                done();
            })
    })

    it('Task delete all task_id', done => {
        for(let i=0; i<task_id.length; i++){
            request
                .delete(`${prefixPath}/task/`+task_id[i])
                .end(function(err, res){
                    let obj = res.body
                    expect(res.status).eql(200)

                    expect(obj).be.json
                    expect(obj).to.be.a('object')

                    expect(obj.task_id).eql(task_id[i])
                })
        }
        done();
    })

    it('Task get single task with no data', done => {
        request
            .get(`${prefixPath}/task/`+task_id[0])
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(404)

                expect(obj).be.json
                expect(obj).to.be.a('object')
                expect(obj).to.have.property('error')

                expect(obj.error).eql("No data returned from the query.")
                done();
            })
    })

    it('Task edit single task with on data', done => {
        let userData = {
            "task_id": task_id[0],
            "subject":"Subject test edit",
	        "detail":"edit detail"
        }

        request
            .put(`${prefixPath}/task`)
            .send(userData)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(404)

                expect(obj).be.json
                expect(obj).to.be.a('object')
                expect(obj).to.have.property('error')

                expect(obj.error).eql("No data returned from the query.")
                done();
            })
    })

    it('Task set status task', done => {
        let userData = {
            "task_id": task_id[0],
            "status":"done"
        }

        request
            .put(`${prefixPath}/task/status`)
            .send(userData)
            .end(function(err, res){
            	let obj = res.body
                expect(res.status).eql(404)

                expect(obj).be.json
                expect(obj).to.be.a('object')
                expect(obj).to.have.property('error')

                expect(obj.error).eql("No data returned from the query.")
                done();
            })
    })

    it('Task delete with no data', done => {
        request
            .delete(`${prefixPath}/task/`+task_id[0])
            .end(function(err, res){
                let obj = res.body
                expect(res.status).eql(404)

                expect(obj).be.json
                expect(obj).to.be.a('object')
                expect(obj).to.have.property('error')

                expect(obj.error).eql("No data returned from the query.")
                done();
            })
    })

    it('Task delete with not number', done => {
        request
            .delete(`${prefixPath}/task/stringTest`)
            .end(function(err, res){
                let obj = res.body
                expect(res.status).eql(400)

                expect(obj).be.json
                expect(obj).to.be.a('object')
                expect(obj).to.have.property('error')

                expect(obj.error).eql("task_id is not number")
                done();
            })
    })

    it('Task delete with null', done => {
        request
            .delete(`${prefixPath}/task/`)
            .end(function(err, res){
                let obj = res.body
                expect(res.status).eql(404)

                expect(obj).be.json
                expect(obj).to.be.a('object')
                expect(obj).to.have.property('error')

                expect(obj.error).eql('"/api/v1/taskapi/task/" not found')
                done();
            })
    })

});
