const mysql = require('mysql2/promise');

const dbPool = mysql.createPool({
    user:'admin',
    password:'pringles',
    host: 'userinformation.cl0f4ipns0iz.us-east-1.rds.amazonaws.com',
    port: 3306,
    database: 'UserInforamtionDB'
});

module.exports = dbPool;