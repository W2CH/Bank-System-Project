const queries = require('./queries');

class Repository {
  constructor(dao) {
    this.dao = dao;
  }

  createTable() {
    const sql = queries.createTable;
    return this.dao.run(sql);
  }

  insertTodo(description) {
    return this.dao.run(queries.insertTodo, [description]);
  }

  updateTodo(todo) {
    const { id, description } = todo;
    return this.dao.run(queries.updateTodo, [description, id]);
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
