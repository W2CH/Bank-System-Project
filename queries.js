const queries = {
  createTable: `CREATE TABLE IF NOT EXISTS todo (
      todo_id INT AUTO_INCREMENT PRIMARY KEY,
      description TEXT)`,
  insertTodo: `INSERT INTO todo (description) VALUES (?)`,
  updateTodo: `UPDATE todo SET description = ? WHERE todo_id = ?`,
  deleteTodo: `DELETE FROM todo WHERE todo_id = ?`,
  getTodoById: `SELECT * FROM todo WHERE todo_id = ?`,
  selectTodos: `SELECT * FROM todo`,
};

module.exports = queries;
