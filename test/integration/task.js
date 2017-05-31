'use strict'

const fs        = require('fs')
const promise   = require('bluebird')
const chai      = require('chai')
const expect    = chai.expect

let prefixPath  = '/api/v1/taskapi'
let task_id = [];

describe('integration test Task', function() {

    it('Task create success with default value', done => {
        let userData = {
            "subject":"Subject test",
	        "detail":"test create subject task"
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
                task_id.push(obj.task_id)
                done();
            })
    })

    
    it('Task create success with null', done => {
        request
            .post(`${prefixPath}/task`)
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

                expect(obj.length).be.gt(2)
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
                expect(res.status).eql(200)

				expect(obj).be.json
				expect(obj).to.be.a('object')

                expect(obj.status).eql("done")
                expect(obj.task_id).eql(task_id[0])
                done();
            })
    })

    for(let key in task_id){
        it('Task delete task_id'+key, done => {
            request
                .delete(`${prefixPath}/task/`+task_id[key])
                .end(function(err, res){
                    let obj = res.body
                    expect(res.status).eql(200)

                    expect(obj).be.json
                    expect(obj).to.be.a('object')

                    expect(obj.task_id).eql(task_id[key])
                    done();
                })
        })
    }
    

});
