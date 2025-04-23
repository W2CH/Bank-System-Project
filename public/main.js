/*
  when adding account -> send id of customer
*/


// set global variable todos

var customerJSON;
var customerID;


/*
*
*
* BEGINS WRRITTEN CODE
*
*/
getAllCustomers();

document.addEventListener("DOMContentLoaded",function(){
  document.getElementById("add-customer-view").hidden = true;
  document.getElementById("customer-detail").hidden = true;
  document.getElementById('customer-history').hidden = true;
  document.getElementById('customer-search').hidden = true;
  document.getElementById('add-account').hidden= true;
  document.getElementById('edit-customer').hidden = true;
  //document.getElementById('customer-search-result').hidden = true;
  // add customer div 
  const addCustomerForm = document.getElementById("addCustomer");
  const submitCustomerButton = document.getElementById("SubmitNewCust");
  const goBackButton = document.getElementById("goBack");
  // table in main
  const customerTable = document.getElementById("customer-table");
  // view history table
  const viewHistoryBackBtn = document.getElementById('history-back-to-main');
  // look up in main
  const lookUpCustomer = document.getElementById('lookUpCustomer');
  const lookUpCustomerGoBackBtn = document.getElementById('search-go-Back');
  const lookUpCustomerSearchBtn = document.getElementById('search-button');
  // look up result event
  //const searchBackToSearchBtn = document.getElementById('search-back-to-search');
  //const searchBackToMain = document.getElementById('search-back-to-main');
  // view customer detail
  const viewDetailBackBtn = document.getElementById('detail-back-to-main');
  const viewDetailAddAccount = document.getElementById('customer-detail-add-account');
  const viewDetailEditBtn = document.getElementById('customer-detail-edit-btn');
  const viewDetailEditCustomerBackBtn = document.getElementById('edit-go-back');
  const viewDetailEditCustomerSubmnitBtn= document.getElementById('edit-submit');
  // add account
  const addAccountBackBtn = document.getElementById('back-to-detail');
  const addAccountSubmitBtn = document.getElementById('submit-account');
  const searchResultTable = document.getElementById('customer-search-table');

  searchResultTable.addEventListener("click", e =>{
    e.preventDefault();
    const searchdDetailsBtn = e.target.closest('button.search-view-detail-btn');
    if (searchdDetailsBtn) {
      const custID = searchdDetailsBtn.dataset.custId;
      console.log(custID);
      customerID = custID;
      document.getElementById("customer-search").hidden = true;
      document.getElementById("customer-detail").hidden = false;
      viewCustomerDetail();
      getCustomerAccounts();
      return;
    }
    // view history
    const searchHistoryBtn = e.target.closest('button.search-view-history-btn');
    e.preventDefault();
    if (searchHistoryBtn) {
      const custID = searchHistoryBtn.dataset.custId;
      const custFName = searchHistoryBtn.dataset.custFname; // check get all customer dataset
      const custLName = searchHistoryBtn.dataset.custLname; // check get all customer dataset
      customerID = custID;
      document.getElementById("customer-search").hidden = true;
      document.getElementById("customer-history").hidden = false;
      //document.getElementById('history-title').innerHTML = "Customer Transaction History";
      viewCustomerHistory(custFName, custLName);
      return;
    }

  });
// search result events
/*
searchBackToSearchBtn.addEventListener('click', function(e){
  e.preventDefault();
  document.getElementById('customer-search-result').hidden = true;
  document.getElementById('customer-search').hidden = false;
  
});
searchBackToMain.addEventListener('click', function(e){
  e.preventDefault();
  document.getElementById('customer-search-result').hidden = true;
  document.getElementById('main-view').hidden = false;
});
*/
  // add account events
addAccountSubmitBtn.addEventListener('click', function(e){
  e.preventDefault();
  validateAddAccount();
});
addAccountBackBtn.addEventListener('click', function(e){
  e.preventDefault();
  document.getElementById("customer-detail").hidden = false;
  document.getElementById('add-account').hidden = true;
  getCustomerAccounts();
});
// view detail events
  viewDetailAddAccount.addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById("customer-detail").hidden = true;
    document.getElementById('add-account').hidden = false;
    refresh();
  });
  viewDetailBackBtn.addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('main-view').hidden = false;
    document.getElementById('customer-detail').hidden = true;
    customerID = '';
  });
  /*
  viewDetailEditBtn.addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('customer-detail').hidden = true;
    document.getElementById('edit-customer').hidden = false;
    refresh();
  });
  */
  viewDetailEditCustomerBackBtn.addEventListener('click', function(e){
    e.preventDefault();
    document.getElementById('customer-detail').hidden = false;
    document.getElementById('edit-customer').hidden = true;
    viewCustomerDetail();
  });
  viewDetailEditCustomerSubmnitBtn.addEventListener('click', function(e){
    e.preventDefault();
    validateEditCustomer();
  });
  // view history events
  viewHistoryBackBtn.addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('main-view').hidden = false;
    document.getElementById('customer-history').hidden = true;
  });
  // look up events
  lookUpCustomer.addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('main-view').hidden = true;
    document.getElementById('customer-search').hidden = false;
    document.getElementById('search-id').value = '';
    document.getElementById('search-fname').value = '';
    document.getElementById('search-lname').value = '';
    document.getElementById('customer-search-table').innerHTML = '';
    refresh();
  });
  lookUpCustomerSearchBtn.addEventListener("click",function(event){
    event.preventDefault();
    validateSearchCustomer();
});
  lookUpCustomerGoBackBtn.addEventListener('click', function(event){
    event.preventDefault();
    document.getElementById('main-view').hidden = false;
    document.getElementById('customer-search').hidden = true;
  });
  // table event (view details and view history)
  // view detail
  customerTable.addEventListener("click", e =>{
    e.preventDefault();
    const detailsBtn = e.target.closest('button.view-detail-btn');
    if (detailsBtn) {
      const custID = detailsBtn.dataset.custId;
      console.log(custID);
      customerID = custID;
      document.getElementById("main-view").hidden = true;
      document.getElementById("customer-detail").hidden = false;
      viewCustomerDetail();
      getCustomerAccounts();
      return;
    }
    // view history
    const historyBtn = e.target.closest('button.view-history-btn');
    e.preventDefault();
    if (historyBtn) {
      const custID = historyBtn.dataset.custId;
      const custFName = historyBtn.dataset.custFname; // check get all customer dataset
      const custLName = historyBtn.dataset.custLname; // check get all customer dataset
      customerID = custID;
      document.getElementById("main-view").hidden = true;
      document.getElementById("customer-history").hidden = false;
      //document.getElementById('history-title').innerHTML = "Customer Transaction History";
      viewCustomerHistory(custFName, custLName);
      return;
    }

  });
  // add customer events
  addCustomerForm.addEventListener("click", function(event){
      event.preventDefault();
      document.getElementById("main-view").hidden = true;
      document.getElementById("add-customer-view").hidden = false;
      refresh();
  });
  goBackButton.addEventListener("click",function(event){
      event.preventDefault();
      document.getElementById("add-customer-view").hidden = true;
      document.getElementById("main-view").hidden = false;
  });
  submitCustomerButton.addEventListener("click",function(event){
      event.preventDefault();
      validateAddCust();
      getAllCustomers();
  });
});

function refresh(){
  document.getElementById('account-type').value = "";
  document.getElementById('account-balance').value = "";
  document.getElementById("FName").value = "";
  document.getElementById("LName").value = "";
  document.getElementById("Sex").value = "";
  document.getElementById("DOB").value = "";
  document.getElementById("Addy").value = "";
  document.getElementById("PhoneNum").value = "";
  document.getElementById("FName").value = "";
  document.getElementById("LName").value = "";
  document.getElementById("Sex").value = "";
  document.getElementById("DOB").value = "";
  document.getElementById("Addy").value = "";
  document.getElementById("PhoneNum").value = "";
  document.getElementById("edit-fname").value = "";
  document.getElementById('edit-mname').value = "";
  document.getElementById("edit-mname").value = "";
  document.getElementById("edit-lname").value = "";
  document.getElementById("edit-dob").value = "";
  document.getElementById("edit-address").value = "";
  document.getElementById("edit-phn").value = "";
  document.getElementById('add-account-notice').innerHTML="";
  document.getElementById("notice").innerHTML ='';
  document.getElementById('edit-customer-notice').innerHTML = '';
  document.getElementById('search-id').value = '';
  document.getElementById('search-fname').value = '';
  document.getElementById('search-lname').value = '';
  document.getElementById('customer-search-notice').innerHTML = '';
}

async function viewCustomerHistory(a, b){
  document.getElementById('history-title').innerHTML = a + " " + b + " Transaction History";

  const customerTable = document.getElementById('history-table');
  let newHTML = '';

  try {
    const response = await fetch(`http://localhost:3000/bank/customerTransactions/${customerID}`, {
      method: 'GET',
    });
    const jsonData = await response.json();
    const customerData = jsonData.allCustomerTransactions;
    console.log(customerData); 
    customerData.forEach(customer => {
      newHTML += `
        <tr>
          <th>${customer.account_id}</th>
          <th>${customer.date.substring(0,10)}</th>
          <th>${customer.operation}</th>
          <th>${customer.amount}</th>
        </tr>`;
  });
  if (!newHTML){
    customerTable.innerHTML = `<tr>
            <th>N/A</th>
            <th>N/A</th>
            <th>N/A</th>
            <th>N/A</th>
          </tr>
    `; 
  }
  else {
    customerTable.innerHTML = newHTML;
  }
  } catch (err) {
    console.log(err.message);
  }
};

function validateSearchCustomer(){
  const custID = document.getElementById('search-id').value;
  const fName = document.getElementById('search-fname').value;
  const lName = document.getElementById('search-lname').value;
  document.getElementById('customer-search-notice').innerHTML = '';

  let valid = true;
  let errMsg = 'Error: <br><br>';

  if (custID === '' && fName === '' && lName === ''){
    valid = false;
    errMsg += 'You must enter at least 1 field <br><br>';
  }

  if (custID){
    if (!/^\d+$/.test(custID)){
      valid = false;
      errMsg += 'ID must be positive integer <br><br>';
    }
  }


  if(fName){
    if (!/^[A-Za-z]+$/.test(fName)){
      valid = false;
      errMsg += 'First name must be only characters <br><br>';
    }
  }

  if (lName){
    if (!/^[A-Za-z]+$/.test(lName)){
      valid = false;
      errMsg += 'Last name must be only characters <br><br>';
    }
  }

  if (valid){
    searchCustomer();
    
  }
  else {
    document.getElementById('customer-search-notice').innerHTML = errMsg;
  }
}

async function searchCustomer(){
  let custID = document.getElementById('search-id').value;
  let fName = document.getElementById('search-fname').value;
  let lName = document.getElementById('search-lname').value;

 if (!custID){
  custID = -1;
 }
 if (!fName){
  fName = -1;
 }
 if (!lName){
  lName = -1;
 }
 console.log(fName, lName);
  const searchTable = document.getElementById('customer-search-table');
  let newHTML = '';

  try {
    const response = await fetch(`http://localhost:3000/bank/customerSearch/${custID}/${fName}/${lName}`, {
      method: 'GET',
    });
    const jsonData = await response.json();
    customerData = jsonData.customerSearchResults; // MAY NEED TO CHANGE THIS
    console.log(customerData);
    customerData.forEach(customer => {
      newHTML += `
        <tr>
          <th>${customer.customer_id}</th>
          <th>${customer.Fname}</th>
          <th>${customer.Lname}</th>
          <th>
            <button 
              class="search-view-detail-btn" 
              data-cust-id="${customer.customer_id}" 
              type="button">
              View Details
            </button>
          </th>
          <th>
            <button 
              class="search-view-history-btn" 
                data-cust-id="${customer.customer_id}" 
                data-cust-fname='${customer.Fname}'
                data-cust-lname='${customer.Lname}'
              type="button">
              View Transactions
            </button>
          </th>
        </tr>`;
    });

    searchTable.innerHTML = newHTML; 
    refresh();
  } catch (err) {
    console.log(err.message);
  }

}

function validateEditCustomer(){
  const fName = document.getElementById("edit-fname").value;
  const mname = document.getElementById('edit-mname').value;
  const lName = document.getElementById("edit-mname").value;
  const sex = document.getElementById("edit-lname").value;
  const dob = document.getElementById("edit-dob").value;
  const addy = document.getElementById("edit-address").value;
  const phoneNum = document.getElementById("edit-phn").value;
  document.getElementById('edit-customer-notice').innerHTML = '';
  let errMsg = 'Error: <br><br>';

  let valid = true;

  if (fName === '' && mname === '' && lName === '' && sex === '' && dob === '' && addy === '' && phoneNum === ''){
    valid = false;
    errMsg += 'you must enter at least 1 field <br><br>';
  };

  const phoneRegex = /^\d{10}$/;
  if (phoneNum){
    if (!phoneRegex.test(phoneNum)) {
      valid = false;
      errMsg += "Phone Number must be 10 digits.<br><br>";
    };
  }

  if (valid){
    editCustomer();
    document.getElementById('edit-customer-notice').innerHTML = "Submitted!";
  }
  else {
    document.getElementById('edit-customer-notice').innerHTML = errMsg;
  }
};

async function editCustomer(){
  const fName = document.getElementById("edit-fname").value;
  const mname = document.getElementById('edit-mname').value;
  const lName = document.getElementById("edit-mname").value;
  const sex = document.getElementById("edit-lname").value;
  const dob = document.getElementById("edit-dob").value;
  const addy = document.getElementById("edit-address").value;
  let phoneNum = document.getElementById("edit-phn").value;

  if (phoneNum === ''){
    phoneNum = -1;
  }

  const body = {
    Fname : fName,
    Mname : mname,
    Lname : lName,
    Sex : sex,
    DOB : dob,
    Address : addy,
    PHN : phoneNum
  }

  try {
    await fetch(`http://localhost:3000/bank/editCustomer/${customerID}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch (err) {
    console.log(err.message);
  }
};

function validateAddAccount(){
  const accountType = document.getElementById('account-type').value;
  const accountBalance = document.getElementById('account-balance').value;
  let valid = true;
  let errMsg = "Error: <br><br>";

  document.getElementById('add-account-notice').innerHTML="";

  if (accountType === ''){
    valid = false;
    errMsg += "Select an account type <br><br>";
  }

  if (accountBalance === '' || !/^\d+$/.test(accountBalance)){
    valid = false;
    errMsg += 'Enter an amount for balance, can only be numbers <br><br>'
  }

  if (valid){
    document.getElementById("add-account-notice").innerHTML += "<br><br><strong>SUBMITTED!</strong>";
    addAccount();
  }
  else {
    document.getElementById("add-account-notice").innerHTML += "<br><br>" + errMsg;
  }
}

async function addAccount(){
  const accountType = document.getElementById('account-type').value;
  const accountBalance = document.getElementById('account-balance').value;

  const body = {
    account_type : accountType,
    balance : accountBalance
  };
  
try {
  await fetch(`http://localhost:3000/bank/addAccount/${customerID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
} catch (err) {
  console.log(err.message);
}
};



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

async function viewCustomerDetail(){
  const customerTable = document.getElementById('detail-customer-info');
  let newHTML = '';
  try {
    const response = await fetch(`http://localhost:3000/bank/customer/${customerID}`, {
      method: 'GET',
    });
    const jsonData = await response.json();
    const customerData = jsonData.customerInfo;
    console.log(customerData);

    customerData.forEach(customer => {
      newHTML += `
        <tr>
          <th>${customer.Fname}</th>
          <th>${customer.Mname || 'N/A'}</th>
          <th>${customer.Lname}</th>
          <th>${customer.Sex}</th>
          <th>${customer.DOB.substring(0,10)}</th>
          <th>${customer.Address}</th>
          <th>${customer.PHN}</th>
        </tr>`;
    });
  customerTable.innerHTML = newHTML; 

  } catch (err) {
    console.log(err.message);
  }
};

// FIX
async function getCustomerAccounts(){
  const customerTable = document.getElementById('detail-account-list');
  let newHTML = '';

  try {
    const response = await fetch(`http://localhost:3000/bank/customerAccounts/${customerID}`, {
      method: 'GET',
    });
    const jsonData = await response.json();
    const customerData = jsonData.customerAccounts;
    console.log(customerData);

    customerData.forEach(customer => {
      newHTML += `
        <tr>
          <th>${customer.account_id}</th>
          <th>${customer.account_type}</th>
          <th>${customer.balance}</th>
        </tr>`;
    });
    if (!newHTML){
      customerTable.innerHTML = `<tr>
            <th>N/A</th>
            <th>N/A</th>
            <th>N/A</th>
          </tr>`; 
    }
    else {
      customerTable.innerHTML = newHTML;
    }
  } catch (err) {
    console.log(err.message);
  }
}

async function getAllCustomers(){
  let customerData = [];
  const customerTable = document.getElementById('customer-table');
  let newHTML = '';

  try {
      console.log('try to get cust from DB');
      const response = await fetch('http://localhost:3000/bank/allCustomers', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const jsonData = await response.json();
      customerData = jsonData.allCustomers;
      console.log(customerData);
      customerData.forEach(customer => {
        newHTML += `
          <tr>
            <th>${customer.customer_id}</th>
            <th>${customer.Fname}</th>
            <th>${customer.Lname}</th>
            <th>
              <button 
                class="view-detail-btn" 
                data-cust-id="${customer.customer_id}" 
                type="button">
                View Details
              </button>
            </th>
            <th>
              <button 
                class="view-history-btn" 
                data-cust-id="${customer.customer_id}" 
                data-cust-fname='${customer.Fname}'
                data-cust-lname='${customer.Lname}'
                type="button">
                View Transactions
              </button>
            </th>
          </tr>`;
      });
      if (!newHTML){
        customerTable.innerHTML = `
          <tr>
          <th>N/A</th>
          <th>N/A</th>
          <th>N/A</th>
          <th>N/A</th>
          <th>N/A</th>
        </tr>
        `;
      }
      else
        customerTable.innerHTML = newHTML; 
  } catch (err) {
      console.log(err.message);
  }
};
