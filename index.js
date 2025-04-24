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
   const {Fname,Lname,Sex,DOB,Address,PHN, CredProvider, CredScore, CredLimit} = req.body;
  try{
     await bankRepository.insertCustomer(Fname,Lname,Sex,DOB,Address,PHN);
     const customerObj = await bankRepository.recentCustomer();
     const [{customer_id}] = customerObj;
     console.log(customer_id);
     await bankRepository.insertCreditInfo(customer_id, CredProvider, CredScore, CredLimit);
  }
  catch (err) {
    console.log(err);
  }
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
app.get('/bank/customerSearch/:customer_id/:Fname/:Lname', async(req,res) =>{
  // Frontend needs to handle case where some of these field aren't provided. Use -1 or "" for variables not populated.
  let {customer_id,Fname,Lname} = req.params;
  if (Fname === '-1'){
    Fname = '';
  }
  else{
    Fname = '%' + Fname + '%';
  }
  if (Lname === '-1'){
    Lname = '';
  }
  else {
    Lname = '%' + Lname + '%';
  }

  try{
    const results = await bankRepository.findCustomer(customer_id,Fname,Lname);
    const customerSearchResults = {customerSearchResults : results};
    res.json(customerSearchResults);
  }catch(err){
    console.log(err);
  }
});
// TODO: API for transaction lookup
app.get('/bank/transaction/:customer_id/:account_id/:account_type/:transaction_date', async(req, res) =>{
  // Search by account id, account type, and date
  let {customer_id,account_id,account_type,transaction_date} = req.params;

if(account_type === '-1'){
  account_type = null;
}
if(transaction_date === '-1'){
  transaction_date = null;
}

  try{
    const results = await bankRepository.findTransactions(customer_id, account_id,account_type,transaction_date);
    const transactionResults = {transactionResults : results};
    res.json(transactionResults);
  }catch(err){
    console.log(err);
  }
});

// TODO: Get customer info
app.get('/bank/customer/:customer_id', async(req, res) =>{
  const {customer_id} = req.params;
  try{
    const customer = await bankRepository.customerDetails(customer_id);
    const customerInfo = {customerInfo : customer};
    res.json(customerInfo);
  }catch(err){
    console.log(err);
  }
});

// TODO: Get customer accounts
app.get('/bank/customerAccounts/:customer_id', async(req, res) =>{
  const {customer_id} = req.params;
  try{
    const customerAccounts = await bankRepository.customerAccounts(customer_id);
    const accounts = {customerAccounts : customerAccounts};
    res.json(accounts);
  }catch(err){
    console.log(err);
  }
});

const dao = new AppDAO();

const bankRepository = new Repository(dao);
bankRepository.createCustomerTable();

app.listen(3000, () => {
  console.log('server has started on port 3000');
});
