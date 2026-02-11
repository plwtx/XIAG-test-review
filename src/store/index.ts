import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    list: (state = { todos: [] }, action) => {
      switch (action.type) {
        case "ADD_TODO": {
          // const newState = state;
          // newState.todos.push(action.payload);
          // return newState;

          // FIX: Returning a new object with a new array instead of modifying original state.
          return {
            ...state,
            todos: [...state.todos, action.payload],
          };
        }
        case "REMOVE_TODO": {
          return {
            ...state,
            todos: state.todos.filter((t: any, index: number) => index !== action.payload),
          };
        }
        case "CHANGE_TODOS": {
          return {
            // As a good practice we should spread state here as well. Ensuring that we pass all existing properties into the new state. (Ex: filter, etc)
            ...state,
            todos: action.payload,
          };
        }
        default:
          return state;
      }
    },
  },
});
