const mysql = require('mysql');
const co = require('co-mysql')
const database = require('../config/default')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: database.database.HOST,
    user: database.database.USERNAME,
    password: database.database.password,
    database: database.database.DATABASE
})

const db = co(pool);
console.log(db)

exports.findUserData = name => {
    return db.query(`select * from user_table where username='${name}'`)
}