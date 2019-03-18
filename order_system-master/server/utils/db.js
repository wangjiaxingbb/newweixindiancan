const mysql = require('mysql');//连接mysql
const config = require('../config');//全局
const pool = mysql.createPool({//创建连接值
	host: config.HOST,
	user: config.USERNAME,
	password: config.PASSWORD,
	database: config.DATABASE
});
	//后台sql
	//打印sql语句

let query = function(sql, values) {
	console.log(`sql语句: ${sql}`);
	return new Promise((resolve, reject) => {
		pool.getConnection(function(err, connection) {
			if (err) {
				resolve(err);
			} else {
				connection.query(sql, values, (err, rows) => {
					if (err) {
						reject(err);
					} else {
						resolve(rows);
					}
					connection.release();
				});
			}
		});
	});
};
//创建表得sql语句
let createTable = function(sql) {
	return query(sql, []);
};

let findDataById = function(table, id) {
	let _sql = 'SELECT * FROM ?? WHERE id = ? ';
	return query(_sql, [table, id, start, end]);
};
//分页查询数据
let findDataByPage = function(table, keys, start, pageSize) {
	let _sql = 'SELECT ?? FROM ??  LIMIT ? , ?';
	return query(_sql, [keys, table, start, pageSize]);
};
//插入
let insertData = function(table, values) {
	let _sql = 'INSERT INTO ?? SET ?';
	return query(_sql, [table, values]);
};

let updateData = function(table, values, id) {
	let _sql = 'UPDATE ?? SET ? WHERE id = ?';
	return query(_sql, [table, values, id]);
};

let deleteDataById = function(table, id) {
	let _sql = 'DELETE FROM ?? WHERE id = ?';
	return query(_sql, [table, id]);
};
//查询
let select = function(table, keys) {
	let _sql = 'SELECT ?? FROM ?? ';
	return query(_sql, [keys, table]);
};
//统计
let count = function(table) {
	let _sql = 'SELECT count(1) AS total_count FROM ?? ';
	return query(_sql, [table]);
};

module.exports = {
	query,
	createTable,
	findDataById,
	findDataByPage,
	deleteDataById,
	insertData,
	updateData,
	select,
	count
};
