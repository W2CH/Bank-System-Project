const queries = {
  createCustomerTable: `CREATE TABLE IF NOT EXISTS customer
                ( customer_id INT NOT NULL AUTO_INCREMENT,
                  Fname VARCHAR(45) NOT NULL,
                  Lname VARCHAR(45)  NOT NULL,
                  Sex VARCHAR(45)  NOT NULL,
                  DOB DATE NOT NULL,
                  Address VARCHAR(200) NOT NULL,
                  PHN VARCHAR(50)  NOT NULL,
                  PRIMARY KEY (customer_id)
                )`,
  addCustomer: 'INSERT INTO customer (Fname,Lname,Sex,DOB,Address,PHN) VALUES (?, ?, ?, ?, ?, ?)',
  addAccount: 'INSERT INTO account (account_type,balance,customer_id) VALUES (?,?,?)',
  getCustomers:'SELECT * FROM customer',
  transactions: 'SELECT transaction_history.account_id, transaction_history.operation, transaction_history.amount FROM transaction_history JOIN account on account.account_id = transaction_history.account_id WHERE customer_id = ?'
};

module.exports = queries;
