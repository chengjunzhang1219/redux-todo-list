import React, { Component } from "react";
import { connect } from "react-redux";

class App extends Component {
  taskNameHandler = (event) => {
    this.props.dispatch({
      type: "VALUE_HANDLER",
      payload: {
        taskName: event.target.value
      }
    });
  };

  addTaskHandler = (event) => {
    event.preventDefault();
    let id = new Date().getTime();
    if (this.props.taskName) {
      this.props.dispatch({
        type: "ADD_TASK",
        payload: {
          task: {
            name: this.props.taskName,
            completed: false,
            id
          }
        }
      });
      this.props.dispatch({
        type: "VALUE_HANDLER",
        payload: {
          taskName: ""
        }
      });
    }
  };

  taskCompletedHandler = (event) => {
    this.props.dispatch({
      type: "TOGGLE_COMPLETED_TASK",
      payload: {
        id: event.target.id
      }
    });
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.addTaskHandler}>
          <input value={this.props.taskName} onChange={this.taskNameHandler} />
          <button type="submit">Add Task</button>
        </form>
        <ul>
          {this.props.tasks.map((task) => {
            return (
              <li
                key={task.id}
                style={{
                  textDecoration: task.completed && "line-through"
                }}
                onClick={this.taskCompletedHandler}
                id={task.id}
              >
                {task.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.list
  };
};

export default connect(mapStateToProps)(App);
