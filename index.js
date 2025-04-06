const express = require('express');
const app = express();
const cors = require('cors');

const AppDAO = require('./DAO');
const Repository = require('./Repository');
const Todo = require('./model');

app.use(express.static('public'));

// middleware
app.use(cors());
app.use(express.json());

//ROUTES

//get all todo
app.get('/todos', async (req, res) => {
  try {
    console.log('try to fetch');
    const allTodos = await todoRepository.getAllTodos();
    console.log('get all todos ', allTodos);
    res.json(allTodos);
  } catch (err) {
    console.log(err.message);
  }
});

//get a todo by id
app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await todoRepository.getTodoById(id);
    // console.log("get todo by id ", todo);
    res.json(todo);
  } catch (err) {
    console.log(err.message);
  }
});

//insert a todo
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await todoRepository.insertTodo(description);
    // console.log("insert todo ", newTodo);
    res.json(newTodo);
  } catch (err) {
    console.log(err.message);
  }
});

//update a todo by id
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    newTodo = new Todo(id, description);
    const updateTodo = await todoRepository.updateTodo(newTodo);
    // console.log("update todo ", updateTodo);
    res.json(updateTodo);
  } catch (err) {
    console.error(err.message);
  }
});

//delete a todo by id
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await todoRepository.deleteTodo(id);
    // console.log("delete todo", deleteTodo);
    res.json(deleteTodo);
  } catch (err) {
    console.log(err.message);
  }
});

app.get('*', function (req, res) {
  path = __dirname + '/public/index.html';
  res.sendFile(path);
});

const dao = new AppDAO();
const todoRepository = new Repository(dao);
todoRepository.createTable();

app.listen(3000, () => {
  console.log('server has started on port 3000');
});
