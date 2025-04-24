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
  createAccountTable: `CREATE TABLE IF NOT EXISTS account
                ( account_id INT NOT NULL AUTO_INCREMENT,
                  account_type VARCHAR(50) NOT NULL,
                  balance FLOAT NOT NULL,
                  customer_id INT NOT NULL,
                  PRIMARY KEY (account_id),
                  CONSTRAINT fk_customer_id
                    FOREIGN KEY (customer_id)
                    REFERENCES customer(customer_id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
                )`,
  createCreditInfoTable: `CREATE TABLE IF NOT EXISTS credit
                ( customer_id INT NOT NULL,
                  credit_provider VARCHAR(100) NOT NULL,
                  credit_score INT NOT NULL,
                  credit_limit INT NOT NULL,
                  CONSTRAINT fk_credit_customer_id
                    FOREIGN KEY (customer_id)
                    REFERENCES customer(customer_id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
                )`,
  createTransactionHistoryTable: `CREATE TABLE IF NOT EXISTS transaction_history
                ( account_id INT NOT NULL,
                  transaction_date DATE NOT NULL,
                  operation VARCHAR(45) NOT NULL,
                  amount FLOAT NOT NULL,
                  CONSTRAINT fk_transaction_account_id
                    FOREIGN KEY (account_id)
                    REFERENCES account(account_id)
                    ON DELETE CASCADE
                    ON UPDATE CASCADE
                )`,
  addCustomer: 'INSERT INTO customer (Fname,Lname,Sex,DOB,Address,PHN) VALUES (?, ?, ?, ?, ?, ?)',
  addCreditScore: 'INSERT INTO credit (customer_id,credit_provider, credit_score, credit_limit) VALUES (?, ?, ?, ?)',
  addAccount: 'INSERT INTO account (account_type,balance,customer_id) VALUES (?,?,?)',
  getCustomers:'SELECT customer_id,Fname,Lname FROM customer',
  transactions: 'SELECT transaction_history.account_id, transaction_history.transaction_date, transaction_history.operation, transaction_history.amount FROM transaction_history JOIN account on account.account_id = transaction_history.account_id WHERE customer_id = ?',
  findCustomer: 'SELECT customer_id,Fname,Lname FROM customer WHERE customer_id = ? OR Fname LIKE ? OR Lname LIKE ?',
  customerAccounts: 'SELECT account_id, account_type,balance FROM account WHERE customer_id = ?',
  specificCustomerInfo: 'SELECT Fname, Lname, Sex, DOB, Address, PHN, credit_provider, credit_score, credit_limit FROM customer  JOIN credit ON customer.customer_id = credit.customer_id WHERE customer.customer_id = ?',
  findTransactions: 'SELECT th.account_id,th.transaction_date,th.operation,th.amount FROM transaction_history as th JOIN account ON account.account_id = th.account_id JOIN customer ON customer.customer_id = account.customer_id WHERE customer.customer_id = ? OR th.account_id = ? OR account.account_type = ? OR th.transaction_date = ?',
  recentCustomerID: 'SELECT customer_id FROM customer ORDER BY customer_id DESC LIMIT 1'
};

module.exports = queries;
