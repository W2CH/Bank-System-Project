/*
  when adding account -> send id of customer
*/


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


// BEGINS WRRITTEN CODE
document.addEventListener("DOMContentLoaded",function(){
  document.getElementById("add-customer-view").hidden = true;
  const addCustomerForm = document.getElementById("addCustomer");
  const submitCustomerButton = document.getElementById("SubmitNewCust");
  const goBackButton = document.getElementById("goBack");

  
  addCustomerForm.addEventListener("click", function(event){
      event.preventDefault();
      document.getElementById("main-view").hidden = true;
      document.getElementById("add-customer-view").hidden = false;
  });
  goBackButton.addEventListener("click",function(event){
      event.preventDefault();
      document.getElementById("add-customer-view").hidden = true;
      document.getElementById("main-view").hidden = false;
  });
  submitCustomerButton.addEventListener("click",function(event){
      event.preventDefault();
      validateAddCust();
  });
});



function validateAddCust(){
  // const id = document.getElementById("ID").value;
  // const ssn = document.getElementById("SSN").value;
  const fName = document.getElementById("FName").value;
  const lName = document.getElementById("LName").value;
  const sex = document.getElementById("Sex").value;
  const dob = document.getElementById("DOB").value;
  const addy = document.getElementById("Addy").value;
  const phoneNum = document.getElementById("PhoneNum").value;

  let valid = true;
  let errMsg = "Error Missing/Invalid Fields: <br><br>";

  document.getElementById("notice").innerHTML ='';

  /*
  if (id ===''){
      valid = false;
      errMsg += "ID required.<br>";
  }
  */

  if (fName === '' || lName === '') {
      console.log('test');
      valid = false;
      errMsg += "First and Last Name are required.<br>";
  }

  if (sex ===''){
      valid = false;
      errMsg += "Sex required.<br>";
  }

  if(addy ===''){
      valid = false;
      errMsg +="Address required.<br>";
  }

  if(dob === ''){
      valid = false;
      errMsg += "Date of Birth required.<br>";
  }

  /*
  const ssnRegex = /^\d{9}$/;
  if (ssn === '' && !ssnRegex.test(ssn)) {
      valid = false;
      errMsg += "SSN must be 9 digits.<br>";
  }
  */

  const phoneRegex = /^\d{10}$/;
  if (phoneNum === '' && !phoneRegex.test(phoneNum)) {
      valid = false;
      errMsg += "Phone Number must be 10 digits.<br>";
  }


  if(valid){
      document.getElementById("notice").innerHTML += "<br><br><strong>SUBMITTED!</strong>";
      addNewCustToDB(); // add to DB
  }
  else {
      document.getElementById("notice").innerHTML += "<br><br>" + errMsg;
  }

};

async function addNewCustToDB(){
  // retrieve data
  const newFName = document.getElementById("FName").value;
  const newLName = document.getElementById("LName").value;
  const newSex = document.getElementById("Sex").value;
  const newDOB = document.getElementById("DOB").value;
  const newAddy = document.getElementById("Addy").value;
  const newPhoneNum = document.getElementById("PhoneNum").value;

  // JSON format
  const body = {
      Fname : newFName,
      Lname : newLName,
      Sex : newSex,
      DOB : newDOB,
      Address : newAddy,
      PHN : newPhoneNum
  };

  // connect to server 
  try {
      const response = await fetch('http://localhost:3000/bank/addCustomer',{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
      });
      if (!response.ok) {
          console.error("Fetch failed with status:", response.status);
      } else {
          console.log("Customer added successfully!");
      }
      //refresh(); // call method to update table in Main View
  } catch (err) {
      console.log(err.message);
  }
};

async function refresh(){
  let customerData = [];
  const customerTable = document.getElementById('customer-table');
  let newHTML = '';

  try {
      console.log('try to get cust from DB');
      const response = await fetch('http://localhost:3000/bank/allCustomers', {
        // const response = await fetch("/todos", {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const jsonData = await response.json();
      customerData = jsonData;
      
      customerData.map((customerElement) => {
          newHTML += `<tr key=${customerElement.cust_ID}>
          <th>${customerElement.cust_ID}</th>
          <th>${customerElement.fname}</th>
          <th>${customerElement.mname}</th>
          <th>${customerElement.lname}</th>
          <th><button class="view-detail-btn" type="button">View Details</button></th>
          <th> button class="view-history-btn" type="button">View Transactions</button></th>
          </tr>`;
      });
      customerTable.innerHTML = newHTML; 
  } catch (err) {
      console.log(err.message);
  }
};
