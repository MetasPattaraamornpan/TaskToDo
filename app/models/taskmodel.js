'use strict'
const promise 				= require('bluebird')
const pgModelErrorResponse 	= require('../helpers/commons').pgModelErrorResponse
const pg_promise			= require('pg-promise')({ promiseLib: promise })
const config 				= require('../config/environment')

function insert(params) {
	console.log('insertTask', params);
	let fields = [
		params.subject || "No Subject",
		params.detail || "",
		params.status || "pending"
	];
	let sql = `INSERT INTO task (
		subject,
		detail, 
		status, 
		created_at, 
		updated_at
		) values ($1, $2, $3, NOW(), NOW()) RETURNING task_id, subject, detail, status`;
	return pg.one(sql, fields)
		.catch(err=> pgModelErrorResponse(err))
}

function selectAll(params) {
	console.log('selectAll', params);
	let sql;
	let fields;
	if(params.status == "all"){
		fields = [
			'pending','done',
		];
		sql = `SELECT task_id, subject, detail, status FROM task WHERE status IN ($1,$2) `;
	}else{
		fields = [
			params.status || "pending",
		];
		sql = `SELECT task_id, subject, detail, status FROM task WHERE status IN ($1) `;
	}
	return pg.query(sql,fields)
	.catch(err=> pgModelErrorResponse(err))
}

function select(params) {
	console.log('select', params);
	let fields = [
		params.task_id
	];
	let sql = `SELECT task_id, subject, detail, status FROM task WHERE task_id = $1 `;
	return pg.one(sql, fields)
	.catch(err=> pgModelErrorResponse(err))
}

function updateTask(params) {
	console.log('updateTask', params);
	let fields = [
		params.task_id,
	];
	let sql = `UPDATE task SET updated_at= 'NOW()'`
	let count = 2;
	for(let key in params){
		if(key == 'task_id' || key == 'status') continue
		fields.push(params[key])
		sql += ` , ${key} = $`+count
		count++
	}
	sql +=` WHERE task_id = $1 RETURNING task_id, subject, detail, status `;
	return pg.one(sql, fields)
	.catch(err=> pgModelErrorResponse(err))
}

function updateTaskStatus(params) {
	console.log('updateTaskStatus', params);
	let fields = [
		params.task_id,
		params.status,
	];
	let sql = `UPDATE task SET updated_at= 'NOW()', status = $2 WHERE task_id = $1 RETURNING task_id, subject, detail, status `
	return pg.one(sql, fields)
	.catch(err=> pgModelErrorResponse(err))
}

function deleteTask(params) {
	console.log('deleteTask', params);
	let fields = [
		params.task_id
	];
	let sql = `DELETE FROM task WHERE task_id = $1 RETURNING task_id, subject, detail, status `
	return pg.one(sql, fields)
	.catch(err=> pgModelErrorResponse(err))
}

function createDB() {
	console.log('createDB');
	let sql = `CREATE SEQUENCE task_id_seq
			START WITH 1
			INCREMENT BY 1
			NO MINVALUE
			NO MAXVALUE
			CACHE 1;

		CREATE TABLE task (
			task_id integer DEFAULT nextval('task_id_seq'::regclass) NOT NULL,
			subject text,
			detail text,
			created_at timestamp without time zone,
			updated_at timestamp without time zone,
			status text
		);`
	return pg.query(sql)
	.catch(err=> pgModelErrorResponse(err))
}




module.exports = {
  insert,
  select,
  selectAll,
  updateTask,
  updateTaskStatus,
  deleteTask,
  createDB
}