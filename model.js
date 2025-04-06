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

module.exports = Todo;