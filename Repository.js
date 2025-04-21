const queries = require('./queries');

class Repository {
  constructor(dao) {
    this.dao = dao;
  }

  insertCustomer(Fname,Lname,Sex,DOB,Address,PHN){
    return this.dao.run(queries.addCustomer, [Fname, Lname,Sex,DOB,Address,PHN]);
  }

  insertAccount(account_type, balance,customer_id){
    return this.dao.run(queries.addAccount, [account_type,balance,customer_id]);
  }
  allCustomers(){
    return this.dao.run(queries.getCustomers);
  }
  allCustomerTransactions(customer_id){
    return this.dao.run(queries.transactions, [customer_id]);
  }
  createCustomerTable() {
    const sql = queries.createCustomerTable;
    return this.dao.run(sql);
  }
}

module.exports = Repository;
