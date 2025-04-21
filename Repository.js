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

  createCustomerTable() {
    const sql = queries.createCustomerTable;
    return this.dao.run(sql);
  }

  deleteTodo(id) {
    return this.dao.run(queries.deleteTodo, [id]);
  }

  getTodoById(id) {
    return this.dao.run(queries.getTodoById, [id]);
  }

  getAllTodos() {
    return this.dao.run(queries.selectTodos, []);
  }
}

module.exports = Repository;
