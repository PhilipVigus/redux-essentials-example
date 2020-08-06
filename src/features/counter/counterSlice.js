import { createSlice } from "@reduxjs/toolkit";

// a slice is a coherent collection of reducer logic and actions for a single feature

// createSlice also automatically generates action creators, eg
//    - counterSlice.actions.increment()

// it also creates the reducer function to handle the actions
//    const newState = counterSlice.reducer({ value: 10}, counterSlice.actions.increment());
//    console.log(newState); // outputs { value: 11 }

// Reducer rules
// new state must only be calculated based on state and action arguments
// state is not mutable, and updates must be made immutably (createSlice gets around this by using Immer)
// there must be no asynchronous logic
export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    // creates three actions, increment, decrement and incrementByAmount
    // each one has an optional 'payload' field as well as its type
    // an action's type is made up of the slice name + / + the keys here, eg
    //    - counter/increment
    //    - coounter/decrement
    //    - counter/incrementByAmount
    increment: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

      // we don't have to return anything here because Immer is being used implicitly
      state.value += 1;
    },
    decrement: (state) => {
      // we don't have to return anything here because Immer is being used implicitly
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      // note we declare action as a parameter here so we can access its payload
      // we don't have to return anything here because Immer is being used implicitly
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

// the idea here is that thunks take a function as an argument rather than an action
// this allows the function to be run at the time it's needed, allowing the whole
// asynchronous thing to work

// A longer thunk example

/*
// the outside "thunk creator" function
const fetchUserById = userId => {
  // the inside "thunk function"
  return async (dispatch, getState) => {
    try {
      // make an async call in the thunk
      const user = await userAPI.fetchById(userId)
      // dispatch an action when we get the response back
      dispatch(userLoaded(user))
    } catch (err) {
      // If something went wrong, handle it here
    }
  }
}
*/

/*
// The actual thunk code
const thunkMiddleware = ({ dispatch, getState }) => next => action => {
  if (typeof action === 'function') {
    return action(dispatch, getState, extraArgument)
  }

  return next(action)
}
*/

export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.value;

export default counterSlice.reducer;
