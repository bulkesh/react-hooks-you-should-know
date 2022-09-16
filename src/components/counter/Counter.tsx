import { ReactElement, useState, useRef, useEffect, useLayoutEffect } from "react";

export function Counter(): ReactElement {
  const [counter, setCounter] = useState(0);
  const button = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setTimeout(() => {
      button.current?.focus();
    }, 1000);
  }, []);

//   useEffect(() => {
//     button.current.style.backgroundColor = 'green';
//   },[]);

  useLayoutEffect(() => {
    button.current.style.backgroundColor = 'green';
  },[]);

  return (
    <div>
        <h2>Counter Increment</h2>
      <div>Count : {counter}</div>
      <div>
        <button
          ref={button}
          className="btn btn-primary"
          onClick={() => setCounter(counter + 1)}
        >
          Increment
        </button>
      </div>
    </div>
  );
}
