import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

// creates the application's store, passing a reducer in as an argument
// reducers take state and action, applying the action to the state if appropriate
export default configureStore({
  reducer: {
    counter: counterReducer,
  },
});
