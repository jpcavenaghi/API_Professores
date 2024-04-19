const mysql = require('mysql2/promise')

const mysqlPool = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'root',
    database:'siga'
})

module.exports = mysqlPool