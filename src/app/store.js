import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

// creates the application's store, passing a reducer in as an argument
// reducers take state and action, applying the action to the state if appropriate
// this particular reducer is imported from the slice relating to the counter
// functionality
export default configureStore({
  reducer: {
    // creates a counter 'state', with counterReducer deciding how to update it when an action is dispatched
    counter: counterReducer,
  },
});
