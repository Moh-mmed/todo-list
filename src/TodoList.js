import React, { Component } from 'react'
import NewTodoForm from './NewTodoForm'
import Todo from './Todo'
import { v4 as uuidV4 } from "uuid";
import './TodoList.css'
class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [...this.getTodos()],
    };
    this.add = this.add.bind(this);
    this.remove = this.remove.bind(this);
    this.update = this.update.bind(this);
    this.makeTodos = this.makeTodos.bind(this);
  }
  getTodos() {
    let todos = [];
    if (localStorage.getItem("todos")) {
      todos = [...JSON.parse(localStorage.getItem("todos"))];
    }
    return todos;
  }
  componentDidUpdate(prevProps, prevState) {
    console.log('Updated')
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  }
  add(todo) {
    let { task } = todo;
    let newTodo = { task: task, id: uuidV4() };
    let todos = [...this.state.todos, newTodo];
    this.setState({
      todos: todos,
    });
    // localStorage.setItem("todos", JSON.stringify(todos));
  }
  update(id, updatedTask) {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, task: updatedTask };
      }
      return todo;
    });
      this.setState({ todos: updatedTodos });
        //  localStorage.setItem("todos", JSON.stringify(updatedTodos));
  }
  remove(id) {
    const todos = this.state.todos.filter((todo) => todo.id !== id);
    this.setState({
      todos: todos,
    });
    // localStorage.setItem("todos", JSON.stringify(todos));
  }
  makeTodos() {
    return this.state.todos.map((todo) => {
      return (
        <Todo
          key={todo.id}
          id={todo.id}
          task={todo.task}
          removeTodo={this.remove}
          updateTodo={this.update}
        />
      );
    });
  }
  render() {
    return (
      <div className="TodoList">
        <div className="TodoList-header">
          <h1> Todo List</h1>
        </div>
        <div className="TodoList-body">{this.makeTodos()}</div>
        <div className="TodoList-NewTodoForm">
          <NewTodoForm addTodo={this.add} />
        </div>
      </div>
    );
  }
}

export default TodoList