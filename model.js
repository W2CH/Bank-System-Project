class Todo {
  constructor(id, description){
    this.id = id;
    this.description = description;
  }

  getId() {
    return this.id;
  }

  getDescription() {
    return this.description
  }

  setId(id) {
    this.id = id;
  }

  setDescription(description) {
    this.description = description
  }

}
class Customer {
  constructor(Fname,Lname,Sex,DOB,Address,PHN){
    this.Fname = Fname;
    this.Lname = Lname;
    this.Sex = Sex;
    this.DOB = DOB;
    this.Address = Address;
    this.PHN = PHN;
  }
}
module.exports = Customer;