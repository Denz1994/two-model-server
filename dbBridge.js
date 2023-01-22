// const mysql = require('mysql2/promise');

// const dbPool = mysql.createPool({
//     user:'admin',
//     password:'pringles',
//     host: 'userinformation.cl0f4ipns0iz.us-east-1.rds.amazonaws.com',
//     port: 3306,
//     database: 'userinformation'
// });

// module.exports = dbPool;

const mysql = require('mysql');

const connection = mysql.createConnection({
    user:'admin',
    password:'pringles',
    host: 'userinformation.cl0f4ipns0iz.us-east-1.rds.amazonaws.com',
    port: 3306,
    database: 'UserInforamtionDB'
});

connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err);
    console.log(connection)
    return;
  }

  console.log('Connected to database.');
});

connection.end();