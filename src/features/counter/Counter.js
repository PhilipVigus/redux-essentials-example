import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "./counterSlice";
import styles from "./Counter.module.css";

export function Counter() {
  // extracts the value of count using the selector defined in the slice
  // with access to the store we could write
  // const count = selectCount(store.getState())
  // but we can't import the store into components so a selector does the job
  // selectors can also be written inline, eg
  // const countPlusTwo = useSelector(state => state.counter.value + 2)

  // IMPORTANT
  // any time a dispatched action updates the redux store, useSelector will
  // rerun the selectCount selector. If the returned value has changed since
  // the last time it was run, the component will rerender
  const count = useSelector(selectCount);

  // gives us the actual dispatch method from the store so we can dispatch
  // actions as necessary
  const dispatch = useDispatch();

  // this is local state and nothing to do with redux at all, just used
  // as part of the interface to decide how much the counter is
  // incremented by
  const [incrementAmount, setIncrementAmount] = useState("2");

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          // note that this doesn't care that the code being called is asynchronous
          // this is SOOOOOOOOOOOOOOOOO COOOOOOOOOOOOOOOOL!!!!!!!!!
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div>
    </div>
  );
}
