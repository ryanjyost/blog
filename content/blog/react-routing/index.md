---
title: "React Router Architecture that's Simple, Scalable and Protected"
date: "2020-01-03"
description: "A tutorial for setting up advanced routing in single page React applications."
---

Routing in React, usually using the popular [React Router](https://medium.com/r/?url=https%3A%2F%2Freacttraining.com%2Freact-router%2Fweb%2Fguides%2Fquick-start) library, can get messy pretty quickly.

- How do I manage all these routes?
- What's the best way to implement authenticated/protected routes?
- How should I handle nested routes?

While there are obviously tons of great answers to these questions, I've tried several unsatisfactory methods before the one I'll walk through in this tutorial, which I found to be a nice implementation for an [open source react/redux boilerplate](https://medium.com/r/?url=https%3A%2F%2Fgithub.com%2Fryanjyost%2Freact-spa-starter) I'm working on.

## Prerequisites

- Solid understanding of modern React (hooks, etc.)
- Familiarity with [React Router](https://reacttraining.com/react-router/web/guides/quick-start)
- [This code example on using route configs.](https://reacttraining.com/react-router/web/example/route-config)

## Setup a Project

Create a new React app with [create-react-app](https://github.com/facebook/create-react-app#readme) and cd into the project.

```dotenv
npx create-react-app routing-tutorial
cd routing-tutorial
npm install
```

Install the React Router library.

```dotenv
npm install react-router-dom
```

Start the app and keep it running throughout the rest of the tutorial.

```dotenv
npm start
```

To enable the ability to use routes in our app, we need to wrap the app in `react-router`'s `<BrowserRouter />` component. So open the `index.js` file and update it with the following code.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

We'll also want some basic UI structure to eventually show a menu of all our route links and then the content of the
particular route we are on. So open up the `App.js` file and replace the code in there with the following...

```jsx
import React from "react";

function App() {
  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "stretch" }}>
      <div style={{ flex: 0.3, backgroundColor: "#f2f2f2" }}>route menu</div>
      <div>content</div>
    </div>
  );
}

export default App;
```

Once that code is updated, you should see this in your browser.
![Image](https://yosts-posts.s3.amazonaws.com/routing_layout.png)

## Route Configs

The basic way to implement routing in React is to just render the `<Route/>` components directly, like the [following
example](https://reacttraining.com/react-router/web/example/basic).

```jsx
<Switch>
  <Route exact path="/">
    <Home />
  </Route>
  <Route path="/about">
    <About />
  </Route>
  <Route path="/dashboard">
    <Dashboard />
  </Route>
</Switch>
```

While there's nothing wrong with that method, it can get pretty verbose/repetitive when building a non-trivial app
and make it tough to refactor and simply just keep track of what the hell is going on with your routing.

A more programmatic and organized way of implementing routing is to set up route configs, i.e. arrays and objects of
route configuration that can be looped through and rendered as `<Route/>`'s.

In the words of the `react-router` [docs](https://reacttraining.com/react-router/web/example/route-config)...

> Some folks find value in a centralized route config.
> A route config is just data. React is great at mapping
> data into components, and `<Route>` is a component. Our route config is just an array of logical "routes"
> with `path` and `component` props, ordered the same
> way you'd do inside a `<Switch>`.

Let's make our own basic route config for this app with the following characteristics...

- `/` - index route where a user can log into the app
- `/app` - routes for authenticated users

Create a file `routes.js` and paste the following code into it.

```jsx
import React from "react";

const ROUTES = [
  { path: "/", key: "ROOT", exact: true, component: () => <h1>Log in</h1> },
  {
    path: "/app",
    key: "APP",
    component: () => <h1>App</h1>,
    routes: [
      {
        path: "/app",
        key: "APP_ROOT",
        exact: true,
        component: () => <h1>App Index</h1>,
      },
      {
        path: "/app/page",
        key: "APP_PAGE",
        exact: true,
        component: () => <h1>App Page</h1>,
      },
    ],
  },
];

export default ROUTES;
```

Note the following things about the code above...

- The structure of the `ROUTES` array mimics the route structure of the app. Nested routes are just nested `routes` arrays.
- Each particular route config object has the following properties...
  - `path` - the route that's handled by this config
  - `key` - a unique identifier for the route. We won't use them really in the tutorial, but they become siper
    helpful when you want to reference/link to routes without hard-coding paths to screens that might be reconfigured.
  - `exact` - a bool that determines whether the `path` should be matched for exactly, or just partially. [More info
    here.](https://reacttraining.com/react-router/web/api/Route/exact-bool)
  - `component` - the component to render when the app is at the particular `path`

## Rendering Routes

We need to actually render the routes according to the configs, which requires some extra helpful components.

### Helper Components

In `routes.js`, make the following updates.

```jsx
import React from "react";
import { Route, Switch } from "react-router-dom"; // <-- New code

...route configs don't change...
export default ROUTES;

/**
 * Render a route with potential sub routes
 * https://reacttraining.com/react-router/web/example/route-config
 */
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={props => <route.component {...props} routes={route.routes} />}
    />
  );
}

```

This component allows rendering of sub-routes if applicable. In the words of the official docs...

> A special wrapper for <Route> that knows how to
> handle "sub"-routes by passing them in a `routes`
> prop to the component it renders.

With that above component we can render an individual route, but we also need to be able to render an array of routes
as specified in our `ROUTES` config. So below the `RouteWithSubRoutes` declaration, add the below code for a new
component, `RenderRoutes`.

```jsx
/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */
export function RenderRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, i) => {
        return <RouteWithSubRoutes key={route.key} {...route} />;
      })}
      <Route component={() => <h1>Not Found!</h1>} />
    </Switch>
  );
}
```

_Note the "Not Found" route in there, which will render if there isn't a matching route in the `Switch`.
This architecture handles undefined routes at each nested level of routes, so you can theoretically stay
within nested sections of your app (like `/app`) rather than have one general, top-level "404 - Not Found" page. You
could customize the functionality of undefined paths and different sections, too._

### Update Route Configs

The final update we need to make to the `routes.js` file here is to use the `RenderRoutes` as the `component` of the
`APP` config, which is the config that declares nested routes in the `/app` pathname space.

So update the `ROUTES` with the following.

```jsx
const ROUTES = [
  { path: "/", key: "ROOT", exact: true, component: () => <h1>Log in</h1> },
  {
    path: "/app",
    key: "APP",
    component: RenderRoutes, // here's the update
    routes: [
      {
        path: "/app",
        key: "APP_ROOT",
        exact: true,
        component: () => <h1>App Index</h1>,
      },
      {
        path: "/app/page",
        key: "APP_PAGE",
        exact: true,
        component: () => <h1>App Page</h1>,
      },
    ],
  },
];
```

### Actually Render the Routes

Now open up your `App.js` file and add the `RenderRoutes` component to the content section of the app. This is where
the top level `ROUTES` are fed into the `RenderRoutes` component. Any nested arrays of route configs use this
`RenderRoutes` component as well, as seen in the previous step.

```jsx
import React from "react";
import ROUTES, { RenderRoutes } from "./routes";

function App() {
  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "stretch" }}>
      <div style={{ flex: 0.3, backgroundColor: "#f2f2f2" }}>route menu</div>
      <div>
        <RenderRoutes routes={ROUTES} />
      </div>
    </div>
  );
}

export default App;
```

### Test Your Basic Routing

Now you should be able to manually update the pathname after `localhost:3000` of your app to see the proper content
rendered in the right-side of the app.

- `/` should show "Log In"
- `/fake` should show "Not Found"
- `/app` should show "App Index"
- `/app/page` should show "App Page"
- `/app/fake` should show "Not Found"

And that's the very basics of routing in React! Keep reading to implement a menu that's programatically built from
the route configs and protect routes from unauthenticated users.

## Render an Arbitrarily Nested Route Menu/Tree

Most apps have a menu of links that makes it easy for the user to navigate the app, so let's implement a way to
render a menu that mirrors that nested route structure defined with the `ROUTES` configs.

Because we can't be sure how deep the nested routing gets, we'll need to use some recursion each time the route
configs have another `routes` array.

Open `App.js`, import the `Link` component from `react-router-dom` and add a function `displayRouteMenu` under the `App` functional component declaration and use the function in the left-side of the app.

Here's the completely updated `App.js`

```jsx
import React from "react";
import { Link } from "react-router-dom";
import ROUTES, { RenderRoutes } from "./routes";

function App() {
  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "stretch" }}>
      <div style={{ flex: 0.3, backgroundColor: "#f2f2f2" }}>
        {displayRouteMenu(ROUTES)}
      </div>
      <div>
        <RenderRoutes routes={ROUTES} />
      </div>
    </div>
  );
}

export default App;

/**
 * Render a nested hierarchy of route configs with unknown depth/breadth
 */
function displayRouteMenu(routes) {
  /**
   * Render a single route as a list item link to the config's pathname
   */
  function singleRoute(route) {
    return (
      <li key={route.key}>
        <Link to={route.path}>
          {route.key} ({route.path})
        </Link>
      </li>
    );
  }

  // loop through the array of routes and generate an unordered list
  return (
    <ul>
      {routes.map(route => {
        // if this route has sub-routes, then show the ROOT as a list item and recursively render a nested list of route links
        if (route.routes) {
          return (
            <React.Fragment key={route.key}>
              {singleRoute(route)}
              {displayRouteMenu(route.routes)}
            </React.Fragment>
          );
        }

        // no nested routes, so just render a single route
        return singleRoute(route);
      })}
    </ul>
  );
}
```

Read through the comments of the `displayRouteMenu` function to get a feel for how it works.

With the updates above, you should be able to click the links in the left-side menu and navigate through the app.

## Restricting Routes to Logged-In Users

Most apps have some sort of authentication in order to access areas of the app. Let's do the same (in a very
rudimentary/fake way to keep the tutorial simple) and only allow "logged-in" users to access `/app` routes.

**NOTE** I'm going to use `localStorage` to save a username and mimic the app keeping track of an authenticated user
. Obviously in a legit app, there'd be some form of server-side or 3rd party authentication, Redux or other state
management, etc. So do NOT do this in a real production app!

### Login Component

First, we need to make a very basic login component. So create a new file called `Login.js` and paste the following
code into it.

```jsx
import React, { useState } from "react";
import { Redirect, useHistory } from "react-router-dom";

export default function Login() {
  const [user, updateUser] = useState("");
  const history = useHistory();

  // "log in" a user
  function handleLogin() {
    localStorage.setItem("user", user);
    history.push("/app");
  }

  // if user already "authenticated", redirect them to the app
  if (localStorage.getItem("user")) {
    alert(
      "You're already authenticated in localStorage and being redirected into the app."
    );
    return <Redirect to={"/app"} />;
  }

  return (
    <div style={{ padding: 50 }}>
      <h1>Log In</h1>
      <div>
        <label>User (anything will work)</label>
        <input value={user} onChange={e => updateUser(e.target.value)} />
        <button disabled={!user} onClick={handleLogin}>
          Log In
        </button>
      </div>
    </div>
  );
}
```

This component let's a user provide a username and click "Log In", which saves the username to `localStorage` and
redirects the user to the `/app`, i.e. allowing them to enter the app.

Also note the `if` block with the `alert` inside of it. That block tells the app to automatically redirect the user
to the `/app` if there's already a `user` item in `localStorage`. This makes users happy,
so they don't have to keep logging into your app if they've done so recently on the same computer.

In order to render the `Login` component at the `/` path, you need to update the proper route config in `routes.js`.

```jsx
import React from "react";
import { Route, Switch } from "react-router-dom";
import Login from "./Login"

const ROUTES = [
  { path: "/", key: "ROOT", exact: true, component: Login }, //here's the update
  {
    path: "/app",
    key: "APP",
    component: RenderRoutes,
    routes: [
      {
        path: "/app",
        key: "APP_ROOT",
        exact: true,
        component: () => <h1>App Index</h1>,
      },
      {
        path: "/app/page",
        key: "APP_PAGE",
        exact: true,
        component: () => <h1>App Page</h1>,
      },
    ],
  },
];

//...same below...
```

### Logout Button

Just to make life easy when testing how the app and routing work, let's also add a logout button to the left sidebar
in the `App.js` file.

```jsx
import React from "react";
import { Link, useHistory } from "react-router-dom";
import ROUTES, { RenderRoutes } from "./routes";

function App() {
  const history = useHistory();

  function logout() {
    localStorage.removeItem("user");
    history.push("/");
  }

  return (
    <div style={{ display: "flex", height: "100vh", alignItems: "stretch" }}>
      <div style={{ flex: 0.3, backgroundColor: "#f2f2f2" }}>
        {displayRouteMenu(ROUTES)}
        <button onClick={logout}>Log Out</button>
      </div>
      <div>
        <RenderRoutes routes={ROUTES} />
      </div>
    </div>
  );
}

export default App;
... same stuff below

```

### Test the Route Functionality (so far...)

Ok, let's see how the routing works so far.

- Go to the `/` route, type in your name and click "Log in". You should be directed to the `/app` route.
- Visit the `ROOT (/)` route and you should be redirected back to the `/app` because you're already logged in.
- Click the "Log Out" button, which should redirect you back to the `/` route.
- Try to access the `/app` routes - **whoops! we still need to restrict "unauthenticated" traffic**. You're not
  logged in anymore, so shouldn't be able to access those routes!!!

### Don't Allow Unauthenticated Users to Access the App Routes

In order to prevent unauthenticated users (any vistor without a `user` in `localStorage` for this example), we need
to make some update that redirects the unauthenticated traffic back to the login screen. _You could also show a
warning screen instead of a redirect, but we'll just redirect in this example._

Many examples I've seen use some sort of `ProtectedRoute` higher order component, which I find to be suboptimal and
kind of annoying to deal with when using a ton of routes. So rather than protect each individual route, we can
protect sections of routes by wrapping them with a component that checks for an authenticated user
, then either renders the routes normally or redirects to another page.

For this simple example, all we have to do is update the `APP` route config that currently just uses the
`RenderRoutes` component to redirect unauthenticated traffic.

So open up `routes.js`, import the `Redirect` component and update the `ROUTES` with the following...

```jsx
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Login from "./Login";

const ROUTES = [
  { path: "/", key: "ROOT", exact: true, component: Login },
  {
    path: "/app",
    key: "APP",
    component: props => {
      if (!localStorage.getItem("user")) {
        alert("You need to log in to access app routes");
        return <Redirect to={"/"} />;
      }
      return <RenderRoutes {...props} />;
    },
    routes: [
      {
        path: "/app",
        key: "APP_ROOT",
        exact: true,
        component: () => <h1>App Index</h1>,
      },
      {
        path: "/app/page",
        key: "APP_PAGE",
        exact: true,
        component: () => <h1>App Page</h1>,
      },
    ],
  },
];

export default ROUTES;

//... same below
```

Now make sure you're logged out and try to access the `/app` routes, and it doesn't let you - victory!

##And that's it!
Obviously this paradigm can be expanded upon to handle any number of advanced/weird routing setups, but hopefully
this basic tutorial shows you how to get started with solid routing in React.

For a more advanced example, you can [check out this repo](https://github.com/ryanjyost/react-spa-starter).
