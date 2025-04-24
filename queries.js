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
  addCreditScore: 'INSERT INTO credit (customer_id,credit_provider, credit_score, credit_limit) VALUES (?, ?, ?, ?)',
  addAccount: 'INSERT INTO account (account_type,balance,customer_id) VALUES (?,?,?)',
  getCustomers:'SELECT customer_id,Fname,Lname FROM customer',
  transactions: 'SELECT transaction_history.account_id, transaction_history.date, transaction_history.operation, transaction_history.amount FROM transaction_history JOIN account on account.account_id = transaction_history.account_id WHERE customer_id = ?',
  findCustomer: 'SELECT customer_id,Fname,Lname FROM customer WHERE customer_id = ? OR Fname LIKE ? OR Lname LIKE ?',
  customerAccounts: 'SELECT account_id, account_type,balance FROM account WHERE customer_id = ?',
  specificCustomerInfo: 'SELECT Fname, Mname, Lname, Sex, DOB, Address, PHN FROM customer WHERE customer_id = ?',
  findTransactions: 'SELECT th.account_id,th.transaction_date,th.operation,th.amount FROM transaction_history as th JOIN account ON account.account_id = th.account_id JOIN customer ON customer.customer_id = account.customer_id WHERE customer.customer_id = ? AND th.account_id = ? AND account.account_type = ? AND th.transaction_date = ?',
  recentCustomerID: 'SELECT customer_id FROM customer ORDER BY customer_id DESC LIMIT 1'
};

module.exports = queries;
