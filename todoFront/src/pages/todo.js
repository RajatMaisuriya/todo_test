import React, { Component } from "react";
import ApiService from "../api/todoapi";

const apiService = new ApiService();
class Todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      todoItems: [],
      title: "",
      des: "",
      ddate: "",
      status: "",
    };
  }

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.createTodo();
  };

  componentDidMount() {
    this.getTask();
  }

  getTask() {
    const userID = localStorage.getItem("userID");
    console.log(userID);
    apiService
      .getTask(userID)
      .then((response) => {
        if (response) {
          const result = JSON.stringify(response);
          console.log(result);
          this.setState({ todoItems: response });
        } else {
          window.alert(response.message);
        }
      })
      .catch((error) => {
        window.alert("Error while Sign Up user:" + error);
      });
  }

  createTodo() {
    const userID = localStorage.getItem("userID");
    const { title, des, ddate, status } = this.state;
    apiService
      .create_Todo(title, des, ddate, status, userID)
      .then((response) => {
        if (response.status) {
          this.getTask();
          // this.setState({ todoItems: response.data });
        } else {
          window.alert(response.message);
        }
      })
      .catch((error) => {
        window.alert("Error Validating user:" + error);
      });
  }

  render() {
    const { todoItems, title, des, ddate, status } = this.state;
    return (
      <div>
        <div className="container">
          <h1>Create TODO</h1>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Description">Description</label>
              <input
                type="text"
                name="des"
                id="des"
                value={des}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="DueDate">Due date</label>
              <input
                type="date"
                name="ddate"
                id="ddate"
                value={ddate}
                onChange={this.handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="Status">Select Status</label>
              <select
                name="status"
                id="status"
                value={status}
                onChange={this.handleChange}
              >
                <option value="Pending">Pendding</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <button type="submit" className="btn">
              Create
            </button>
          </form>
        </div>
        <div>
          <h1>Your Todo List</h1>
          <table border="1">
            <thead>
              <tr>
                <th>Task Title</th>
                <th>Description</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {todoItems.map((item) => (
                <tr key={item}>
                  <td>{item.taskTitle}</td>
                  <td>{item.description}</td>
                  <td>{item.dueDate}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Todo;
