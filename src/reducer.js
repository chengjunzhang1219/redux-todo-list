import { combineReducers } from "redux";

const initialState = {
  taskName: "",
  tasks: []
};

const list = (state = initialState, action) => {
  switch (action.type) {
    case "VALUE_HANDLER": {
      return {
        ...state,
        taskName: action.payload.taskName
      };
    }
    case "ADD_TASK": {
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task]
      };
    }
    case "TOGGLE_COMPLETED_TASK": {
      const toggleTask = task => {
        if (task.id.toString() === action.payload.id.toString()) {
          task.completed = !task.completed;
        }
        return task;
      };

      return {
        ...state,
        tasks: state.tasks.map(toggleTask)
      };
    }
    default: {
      return state;
    }
  }
};

const reds = combineReducers({ list });

export default reds;
