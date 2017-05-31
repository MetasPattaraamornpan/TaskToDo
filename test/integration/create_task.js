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

});
