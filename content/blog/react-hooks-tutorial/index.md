---
title: React hooks tutorial for beginners
date: "2019-08-17"
description: Learn how to implement the most useful React hooks - useState, useEffect, useContext, useReducer, and useMemo -  in one simple component.
---

I'm pretty new to React hooks, too, so I don't know enough to confuse you or get too deep.

## Let's get started

Initialize a new app with [create-react-app](https://github.com/facebook/create-react-app).

```dotenv
npx create-react-app react-hooks-tutorial
```

> Not familiar with npx? [Read this.](https://medium
> .com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b)

Enter the project’s directory and fire up the app.

```dotenv
cd react-hooks-tutorial
npm start
```

> If you get errors about permissions, you might need to use `sudo`.  
> You also might need to [chown the app directory](https://askubuntu.com/questions/6723/change-folder-permissions-and-ownership).

This tutorial will use React hooks to manipulate the spinning React logo and other aspects of the boilerplate `App.js`.

## Change the spin direction with the `useState` hook

Let's use the most simple hook `useState` to toggle the direction of the React logo between clockwise and
counterclockwise.

First, import the hook.

```jsx
import React, { useState } from "react";
```

Next we create the hook, which declares a state variable `spinClockwise` and initializes its value to be `true`. As part
of the hook declaration,
React creates a method to update the new state variable.

```jsx
const [spinClockwise, setSpinDirection] = useState(true);
```

Update the React logo's `animationDirection` to be set based on our component's state.

```jsx
<img
  src={logo}
  className="App-logo"
  alt="logo"
  style={{ animationDirection: spinClockwise ? "normal" : "reverse" }}
/>
```

Below the `img`, add a button that toggles the spin direction.

```jsx
<button onClick={() => setSpinDirection(!spinClockwise)}>
  {spinClockwise ? "Switch to counterclockwise" : "Switch to clockwise"}
</button>
```

####Here's how your `App.js` should look at this point.

```jsx
import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [spinClockwise, setSpinDirection] = useState(true);
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{ animationDirection: spinClockwise ? "normal" : "reverse" }}
        />
        <button onClick={() => setSpinDirection(!spinClockwise)}>
          {spinClockwise ? "Switch to counterclockwise" : "Switch to clockwise"}
        </button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
```

Click the button and see the React logo spin in different directions. That's our first hook in action!

**Learn more about `useState` [here](https://reactjs.org/docs/hooks-overview.html#state-hook).**

## Customize the browser page title with the `useEffect` hook

Gotta import the hook.

```jsx
import React, { useState, useEffect } from "react";
```

In the component, but outside the return statement, add the hook.

```jsx
useEffect(() => {
  document.title = "React Hooks Tutorial";
}, []);
```

Check out your updated browser page title to make sure the hook worked.

####What's going on here?
Here's the explanation of the `useEffect` hook from the [React docs](https://reactjs.org/docs/hooks-reference.html#useeffect)

> The Effect Hook, `useEffect`, adds the ability to perform side effects from a function component. It serves the same purpose as `componentDidMount`, `componentDidUpdate`, and `componentWillUnmount` in React classes, but unified into a single API.

So the `useEffect` hook takes a function as the first argument, which is executed after every completed render, unless
it's
provided a second argument. The optional second argument is an array of values that the effect depends on. If it's an
empty array, then the effect will only be run once, when the component mounts. It's basically `componentDidMount`.

**Learn more about `useEffect` [here](https://reactjs.org/docs/hooks-reference.html#useeffect).**

## Tweak the "Learn React" link with `useContext`

You know the drill.

```jsx
import React, { useState, useEffect, useContext } from "react";
```

Outside of the`App` functional component, but in the same file, declare a new context like the code below.

```jsx
const ExampleContext = React.createContext({
  text: "Learn React Hooks",
  href: "https://reactjs.org/docs/hooks-intro.html",
});
```

Now inside our component, get the `ExampleContext`'s value with the `useContext` hook, which takes the whole
context object as an argument.

```jsx
const contextValue = useContext(ExampleContext);
```

Now we'll use the `contextValue` to set a new link that's more specific about learning React hooks.

```jsx
<a
  className="App-link"
  href={contextValue.href}
  target="_blank"
  rel="noopener noreferrer"
>
  {contextValue.text}
</a>
```

####Here's how your `App.js` should look at this point.

```jsx
import React, { useState, useEffect, useContext } from "react";
import logo from "./logo.svg";
import "./App.css";

const ExampleContext = React.createContext({
  text: "Learn React Hooks",
  href: "https://reactjs.org/docs/hooks-intro.html",
});

function App() {
  const [spinClockwise, setSpinDirection] = useState(true);
  const contextValue = useContext(ExampleContext);

  useEffect(() => {
    document.title = "React Hooks Tutorial";
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{ animationDirection: spinClockwise ? "normal" : "reverse" }}
        />
        <button onClick={() => setSpinDirection(!spinClockwise)}>
          {spinClockwise ? "Switch to counterclockwise" : "Switch to clockwise"}
        </button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href={contextValue.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {contextValue.text}
        </a>
      </header>
    </div>
  );
}

export default App;
```

**Learn more about `useContext` [here](https://reactjs.org/docs/hooks-reference.html#usecontext).**

## Change the speed of the logo's spin with `useReducer`

If you aren't familiar with flux patterns or haven't used Redux before, then this can look pretty weird and confusing
. You might want [learn the concept](https://www.robinwieruch.de/javascript-reducer/) behind `useReducer` before looking at this example.

```jsx
import React, { useState, useEffect, useContext, useReducer } from "react";
```

Define a new reducer function (outside the component function) with one piece of state, `spinDuration` (in seconds).

```jsx
const initialState = { spinDuration: 2 };

function reducer(state, action) {
  switch (action.type) {
    case "increaseSpeed":
      return { spinDuration: state.spinDuration - 0.2 };
    case "decreaseSpeed":
      return { spinDuration: state.spinDuration + 0.2 };
    default:
      return state;
  }
}
```

When we want to `increaseSpeed` of the logo, we have to decrease the spin duration of the logo. That's just how the
`animation-duration` css property works, which we'll add to the `img` soon.

Now, under where we put `useContext`, let's create our reducer's `state` and `dispatch`.

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

- `state` is an object that we initialized with `initialState` that has the current state property values.
- `dispatch` is a function that sends objects (usually referred to as actions) with a `type` property, so the reducer
  knows what update needs to be made to `state`.

To actually dispatch actions and change the speed of the spinning logo, create two buttons (below the one to toggle
spin direction).

```jsx
<button
  disabled={state.spinDuration <= 0.4}
  onClick={() => dispatch({ type: "increaseSpeed" })}
>
  Increase speed
</button>
<button
  disabled={state.spinDuration >= 3}
  onClick={() => dispatch({ type: "decreaseSpeed" })}
>
  Decrease speed
</button>
```

Finally, update the logo `img` to have it's `animation-duration` tied to the `state`.

```jsx
<img
  src={logo}
  className="App-logo"
  alt="logo"
  style={{
    animationDirection: spinClockwise ? "normal" : "reverse",
    animationDuration: `${state.spinDuration}s`,
  }}
/>
```

Mess around with the buttons and see the logo spin slower and faster. That's all being done with `useReducer`.

## Efficiently re-render the spin direction button with `useMemo`

This hook helps you take advantage of a performance optimization technique called _memoization_.

_`useCallback` does something similar, but returns a memoized callback function, rather than a value._

From Wikipedia...

> In computing, memoization or memoisation is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

In the context of React and `useMemo`, rather than recalculate values, re-run functions or rebuild content every time
our component re-renders, we can memoize them, a.k.a. make them rerun only when certain values update.

First, let's refactor our spin direction button to be returned by a simple render function.

```jsx
// ... no changes

const renderSpinDirectionButton = () => {
    console.log("RENDER BUTTON");
    return (
      <button onClick={() => setSpinDirection(!spinClockwise)}>
        {spinClockwise ? "Switch to counterclockwise" : "Switch to clockwise"}
      </button>
    );
};
  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{
            animationDirection: spinClockwise ? "normal" : "reverse",
            animationDuration: `${state.spinDuration}s`
          }}
        />

       {renderSpinDirectionButton()}

// ... no changes
```

All we did was move the original button into a render function, and added a `console.log` to see how frequently that
button re-renders.

Open up your browser `console` and notice how often that button re-renders when it doesn't need to change,
particularly when increasing and decreasing the spin speed. Ideally, that button would only re-render when it's
clicked, so that the button text can update.

> Obviously re-rendering that button isn't in need of memoization for performance optimization, but it
> works as an example.

We only need to **two** things to the `renderSpinDirectionButton` function to memoize it, a.k.a. make it only
re-render when the `spinClockwise` state variable changes.

1. Pass the function into `useMemo` as the first argument.
2. Provide an array of dependencies as the second argument in `useMemo`.

Here's the updated code. _Note that we only re-render the button when `spinClockwise` updates, and that
`renderSpinDirectionButton` is now the returned value of the memoized function, rather than a function to be executed._

```jsx
import React, { useState, useEffect, useContext, useReducer, useMemo } from "react";

// ... no changes

const renderSpinDirectionButton = useMemo(
    () => {
      console.log("RENDER BUTTON");
      return (
        <button onClick={() => setSpinDirection(!spinClockwise)}>
          {spinClockwise ? "Switch to counterclockwise" : "Switch to clockwise"}
        </button>
      );
    },
    [spinClockwise]
);

return (
// ... no changes

 {renderSpinDirectionButton}

// ... no changes

```

Check out the browser console now, and notice how the button re-renders when it's clicked, a.k.a. when the
`spinClockwise` variable changes. That's memoization doing its job.

## And that's it!

You now know how to implement the basics of React's most useful hooks.

#####Here's the final App.js

```jsx
import React, {
  useState,
  useEffect,
  useContext,
  useReducer,
  useMemo,
} from "react";
import logo from "./logo.svg";
import "./App.css";

const ExampleContext = React.createContext({
  text: "Learn React Hooks",
  href: "https://reactjs.org/docs/hooks-intro.html",
});

const initialState = { spinDuration: 2 };

function reducer(state, action) {
  switch (action.type) {
    case "increaseSpeed":
      return { spinDuration: state.spinDuration - 0.2 };
    case "decreaseSpeed":
      return { spinDuration: state.spinDuration + 0.2 };
    default:
      return state;
  }
}

function App() {
  const [spinClockwise, setSpinDirection] = useState(true);
  const contextValue = useContext(ExampleContext);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    document.title = "React Hooks Tutorial";
  }, []);

  const renderSpinDirectionButton = useMemo(() => {
    console.log("RENDER BUTTON");
    return (
      <button onClick={() => setSpinDirection(!spinClockwise)}>
        {spinClockwise ? "Switch to counterclockwise" : "Switch to clockwise"}
      </button>
    );
  }, [spinClockwise]);

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{
            animationDirection: spinClockwise ? "normal" : "reverse",
            animationDuration: `${state.spinDuration}s`,
          }}
        />

        {renderSpinDirectionButton}
        <button
          disabled={state.spinDuration <= 0.4}
          onClick={() => dispatch({ type: "increaseSpeed" })}
        >
          Increase speed
        </button>
        <button
          disabled={state.spinDuration >= 3}
          onClick={() => dispatch({ type: "decreaseSpeed" })}
        >
          Decrease speed
        </button>
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href={contextValue.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {contextValue.text}
        </a>
      </header>
    </div>
  );
}

export default App;
```
