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
     var newCustomer = await bankRepository.insertCustomer(Fname,Lname,Sex,DOB,Address,PHN);
  }
  catch (err) {
    console.log(err);
  }
  console.log(newCustomer);
  res.sendStatus(200);
});

app.post('/bank/addAccount/:customer_id', async (req, res) =>{
  // Retrieve json values
  const {account_type,balance} = req.body;
  const {customer_id} = req.params;
  try{
    // Add new account to database
    var newAccount = await bankRepository.insertAccount(account_type, balance,customer_id);
  }
  catch (err){
    console.log(err);
  }
  console.log(newAccount);
  res.sendStatus(200);
});

app.get('/bank/allCustomers', async(req,res) =>{
    try{
      const customers = await bankRepository.allCustomers();
      const allCustomers = {allCustomers : customers};
      res.json(allCustomers);
    }catch (err){
      console.log(err.message);
    }
});

app.get('/bank/customerTransactions/:customer_id', async(req, res) =>{
  const {customer_id} = req.params;
  try{
    const transactions = await bankRepository.allCustomerTransactions(customer_id);
    const allCustomerTransactions = {allCustomerTransactions : transactions};
    res.json(allCustomerTransactions);
  }catch(err){
    console.log(err);
  }
});

// TODO: API for customer lookup
// TODO: API for transaction lookup

const dao = new AppDAO();

const bankRepository = new Repository(dao);
bankRepository.createCustomerTable();

app.listen(3000, () => {
  console.log('server has started on port 3000');
});
