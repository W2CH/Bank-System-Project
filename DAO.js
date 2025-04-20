const mysql = require('mysql2');
const Promise = require('bluebird');

class AppDAO {
  constructor() {
    // Set up the database connection
    this.connection = mysql.createConnection({
      host: '127.0.0.1', // Your database host
      user: 'root', // Your MySQL username
      password: '123456789', // Your MySQL password
      port: '3000', // Your MySQL port, normally "3306"
      database: 'banksystem', // DO NOT EDIT (You need to create a "test" database from your "MySQL Workbench")
    });

    // Connect to the database
    this.connection.connect((err) => {
      if (err) {
        console.error('Error connecting to the database:', err.message);
        return;
      }
      console.log('Connected to the MySQL database');
    });
  }

  // Ask gbt what would happen if this function did not return a promise
  run(sql, params = []) {
    // Extra credit: look into nested call backs (shows me why promises exist)
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, (err, results, fields) => {
        // resolve and reject are just fancy setter methods
        if (err) {
          console.error('Error executing query:', err.message);
          reject(err);
          return;
        }
        console.log('Query results:', results);
        resolve(results);
      });
    });
  }

  close() {
    // Close the connection when you're done
    this.connection.end((err) => {
      if (err) {
        console.error('Error closing the connection:', err.message);
        return;
      }
      console.log('Connection closed');
    });
  }
}

module.exports = AppDAO;
