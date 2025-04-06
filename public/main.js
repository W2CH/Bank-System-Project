// set global variable todos
let todos = [];

// function to set todos
const setTodos = (data) => {
  todos = data;
};

// function edit todo
const editTodo = (id) => {
  const descrip = todos.filter((todo) => todo.todo_id === id)[0].description;
  document.querySelector('#edited-description').value = descrip;
  document
    .querySelector('#save-edit-description')
    .addEventListener('click', function () {
      updateTodo(id);
    });
};

// function to display todos
const displayTodos = () => {
  todos.sort((a, b) => {
    return a.todo_id - b.todo_id;
  });
  const todoTable = document.querySelector('#todo-table');

  // display all todos by modifying the HTML in "todo-table"
  let tableHTML = '';
  todos.map((todo) => {
    tableHTML += `<tr key=${todo.todo_id}>
    <th>${todo.description}</th>
    <th><button class="btn btn-warning" type="button" data-toggle="modal" data-target="#edit-modal" onclick="editTodo(${todo.todo_id})">Edit</button></th>
    <th><button class="btn btn-danger" type="button" onclick="deleteTodo(${todo.todo_id})">Delete</button></th>
    </tr>`;
  });
  todoTable.innerHTML = tableHTML;
};

// select all the todos when the codes first run
console.log('start');
selectTodo();
console.log('started');

// The following are async function to select, insert, update and delete todos
// select all the todos
async function selectTodo() {
  // use try... catch... to catch error
  try {
    console.log('try to select');
    // GET all todos from "http://localhost:3000/todos"
    const response = await fetch('http://localhost:3000/todos', {
      // const response = await fetch("/todos", {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    // connect to heroku, remove localhost:port
    // const response = await fetch("/todos")
    const jsonData = await response.json();

    setTodos(jsonData);
    displayTodos();
  } catch (err) {
    console.log(err.message);
  }
}

// insert a new todo
async function insertTodo() {
  // read the todo description from input
  const inputBox = document.querySelector('#todo-description');
  const description = inputBox.value;
  // console.log(description);

  // use try... catch... to catch error
  try {
    // insert new todo to "http://localhost:3000/todos", with "POST" method
    const body = { description: description };

    // connect to heroku, remove localhost:port
    const response = await fetch('http://localhost:3000/todos', {
      // const response = await fetch("/todos", {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    selectTodo();
    inputBox.value = '';
  } catch (err) {
    console.log(err.message);
  }
}

// delete a todo by id
async function deleteTodo(id) {
  try {
    // delete a todo from "http://localhost:3000/todos/${id}", with "DELETE" method
    // connect to heroku, remove localhost:port
    const deleteTodo = await fetch(`http://localhost:3000/todos/${id}`, {
      // const deleteTodo = await fetch(`/todos/${id}`, {
      method: 'DELETE',
    });
    const deletedTodo = await deleteTodo.json();
    const index = todos.indexOf(deletedTodo);
    todos.splice(index, 1);
    displayTodos();
  } catch (err) {
    console.log(err.message);
  }
}

// update a todo description
async function updateTodo(id) {
  const description = document.querySelector('#edited-description').value;
  // console.log(description);
  // console.log(id);

  try {
    // update a todo from "http://localhost:3000/todos/${id}", with "PUT" method
    // connect to heroku, remove localhost:port
    const body = { description };
    const response = await fetch(`http://localhost:3000/todos/${id}`, {
      // const response = await fetch(`/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    let todo = todos.find((t) => t.todo_id === id);
    todo.description = description;
    displayTodos();
  } catch (err) {
    console.log(err.message);
  }
}
