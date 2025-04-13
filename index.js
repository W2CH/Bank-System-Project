const express = require('express');
const app = express();
const cors = require('cors');

const AppDAO = require('./DAO');
const Repository = require('./Repository');
const Customer = require('./model');

app.use(express.static('public'));

// middleware
app.use(cors());
app.use(express.json());

//ROUTES
app.post('/bank/addCustomer', async (req,res) =>{
  // Retrieve json values
   const {Fname,Lname,Sex,DOB,Address,PHN} = req.body;
  try{
     const newCustomer = await bankRepository.insertCustomer(Fname, Lname,Sex,DOB,Address,PHN);
  }
  catch (err) {
    console.log(err);
  }
  console.log(newCustomer);
  res.sendStatus(200);
});
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
    // req.body is an object not a json
    const { description } = req.body;

    // Print newTodo and see what it is.
    // When does a promise stop being a promise?
    const newTodo = await todoRepository.insertTodo(description);
    console.log("insert todo ", newTodo);
    // res.json(newTodo);
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

// TODO: Change the name of todoRepo variable
const bankRepository = new Repository(dao);
bankRepository.createCustomerTable();

app.listen(3000, () => {
  console.log('server has started on port 3000');
});
