---
title: "How to level-up your Cypress testing"
date: "2020-03-17"
description:
  "A tutorial about cypress-testing-library, waiting for network requests, custom commands, piping console logs to the
  test/terminal output and failing tests when there's a console error."
---

Cypress for end-to-end testing is awesome and easy to get started with. But once you've written more than a few tests
, you'll start to realize ways to improve your test infrastructure and implementations. Here are 5 techniques I've
 picked up that made huge improvements to my Cypress testing.

## We'll walk through 5 techniques

1. Use cypress-testing-library
2. Wait explicitly for network requests
3. Turn common actions into commands
4. Log browser warnings and errors in the terminal output
5. Fail tests when there's an unknown console error

## Set up the test project

Create a new React project with create-react-app and `cd` into it.

```xpath2
npx create-react-app cypress-tutorial
cd cypress-tutorial
```

Install cypress.

```xpath2
npm i -D cypress
```

Initialize cypress in your project by opening the development GUI for the first time.

```xpath2
npx cypress open
```

Delete the example test directory.

```xpath2
rm -R ./cypress/integration/examples
```

Run the app in a terminal window and keep it running at `http://localhost:3000` throughout the tutorial.
```xpath2
npm start
```

### Add ESLint and the Cypress linting rules

To avoid annoying linting issues with Cypress in your IDE, let's setup linting such that it understands Cypress's
global `cy` object.

```xpath2
npm i -D eslint eslint-plugin-cypress
```

Create an `.eslintrc.json`.

```xpath2
touch .eslintrc.json
```

Paste this code into your `.eslintrc.json` so that your IDE can understand the Cypress code and modern JavaScript.

```json
{
  "plugins": ["cypress"],
  "env": { "es6": true }
}
```

## Write a basic test

To have a starting point for implementing more advanced techniques, let's write a super basic test.

Create a new test file called `tutorial.spec.js`.

```xpath2
touch ./cypress/integration/tutorial.spec.js
```

Paste the following Cypress test code into the `tutorial.spec.js` file. All this test does is make sure the app works
by looking for the CRA boilerplate "Learn React" link.

**NOTE: Normally, you'd set the `baseUrl` in `cypress.json`!**

```javascript
describe("Cypress Tutorial", function() {
  it("works", function() {
    cy.visit("http://localhost:3000");
    cy.get("a").contains("Learn React");
  });
});
```

Run the test by opening the GUI with `npx cypress open` and see that the test passes.

## Technique 1: Use cypress-testing-library

You may have heard of Kent C. Dodds and his testing libraries like dom-testing-library and react-testing
-library. Well there's one for cypress, too, called [cypress-testing-library](https://testing-library.com/docs/cypress-testing-library/intro) and it's pretty sweet for easily
writing tests in a way that more closely mimics how a user will actually interact with your app, which means your
tests are better.

Install the library.

```xpath2
npm install -D @testing-library/cypress
```

Per the docs, we need to import the library into `cypress/support/commands.js` for it to work. So update that file
with the following...

```javascript
import "@testing-library/cypress/add-commands";
```

Now we have access to the awesome commands from cypress-testing-library right from the `cy` object just like normal
commands. Let's use one in our existing `tutorial.spec.js` test.

```javascript
describe("Cypress Tutorial", function() {
  it("Makes sure the app is working", function() {
    cy.visit("http://localhost:3000");
    cy.findByText("Learn React"); // formerly cy.get("a").contains("Learn React");
  });
});
```

Not much changed, but now we aren't looking for an `a` tag anymore, merely anything on the page that has
`Learn React`. This way of looking for it is closer to how a user will read and interact with the screen. You can
read more about that concept [here](https://testing-library.com/docs/guide-which-query).

And to make sure our test actually works and breaks when it's supposed to, change the text to search for `Learn Vue` and see the test break in the GUI.

## Technique 2: Wait explicitly for network requests

I've found that network requests are the biggest cause of flakiness in tests. Sometime they're quick, other times
they exceed your default timeout and cause your test to fail. While you could just increase the timeout, that makes
your tests longer than they need to be. There's a better way.

### Add a network request to the React app

We need a network request to test, so let's add a dummy one to the `App.js` file. Also, for some reason the native
`fetch` api doesn't work with cypress route stuff, so let's install and use axios.

```xpath2
npm i axios
```

Now paste this in `App.js`.

```javascript
import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const secondsToWait = 5;
    axios(`https://httpstat.us/200?sleep=${secondsToWait * 1000}`).then(
      response => {
        setLoaded(true);
      }
    );
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {loaded ? (
          <a
            className="App-link"
            href="https://reactjs.org"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        ) : null}
      </header>
    </div>
  );
}

export default App;
```

With the updates above, the app now doesn't show the "Learn React" link until the network request finishes after 5
seconds. Check it out for yourself by reloading your app at `http://localhost:3000`.

Because the "Learn React" link doesn't show up for 5 seconds, which is longer than Cypress' default timeout, the test
now fails.

### The bad fix: increasing the timeout

One suboptimal way to "fix" your test would be to increase the default timeout of the `findByText` command, like below.

```javascript
describe("Cypress Tutorial", function() {
  it("Makes sure the app is working", function() {
    cy.visit("http://localhost:3000");
    cy.findByText("Learn React", { timeout: 10000 });
  });
});
```

Now your test passes, but it waits for the network request for 10 seconds every time you run the test - even if the
network only needs 2 seconds. That's a lot of time to add to your test suite - multiplied by however many times you
use this strategy!

### The better fix: alias and wait

Cypress has a thing called [aliases](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Aliases) that let you explicitly reference various things in your tests like elements, fixtures
and, in our case, [network requests](https://docs.cypress.io/guides/core-concepts/variables-and-aliases.html#Requests)!

Let's improve our test by aliasing the network request and waiting for it before looking for the "Learn Text" link.

```javascript
describe("Cypress Tutorial", function() {
  it("works", function() {
    cy.server();

    // alias the network request
    cy.route("/200?**").as("fakeNetworkRequest");

    cy.visit("http://localhost:3000");

    // wait for the network request to complete
    cy.wait("@fakeNetworkRequest");

    // now look for the link
    cy.findByText("Learn React");
  });
});
```

Some explanations/things to note about the above...

- [`cy.server()`](https://docs.cypress.io/api/commands/server.html#Syntax) lets you "start a server to begin routing
  responses to cy.route() and to change the behavior of network requests."
- [`cy.route()`](https://docs.cypress.io/api/commands/route.html#Syntax) lets you manage network behavior and
  takes an explicit url or a glob to match certain request patterns. You can also get more specific with a config
  object, which is what I chose to do above.

Now our test passes and waits only as long as it needs to, even if you increase the `secondsToWait` in `App.js`!

## Technique 3: Turn common actions into commands

As you write more and more tests, you'll find that you're reusing a lot of the same logic for doing common
interactions like...

- logging into your app
- selecting weird elements
- navigating to a page
- prepping some data/state on the page
- much more...

Our tutorial app and test are really simple - but this wouldn't be a tutorial without a convoluted example to
show off some technology!

So let's write a new test that checks that the "Learn React" href is "https://reactjs.org". In that test
, we'll use some reusable commands that we create.

### Write the new tests, without any commands

In the same `describe` block as the first test, add this one. Obviously very similar to the first, so we'll extract
out the common bits shortly.

```javascript
it("has a link pointing to the react website", function() {
    cy.server();
    cy.route("/200?**").as("fakeNetworkRequest");

    cy.visit("http://localhost:3000");

    cy.wait("@fakeNetworkRequest");

    cy.findByText("Learn React").should(
      "have.attr",
      "href",
      "https://reactjs.org"
    );
});
```

Run that test in the GUI to make sure it passes.

### Our first command

We may have a reason to verify the `href` of links in other tests, which we could extract out into a nice, custom
Cypress command.

_Obviously your real world app and tests will provide more legit reasons to write reusable commands._

Open up `cypress/support/commands.js` and add the below code, a.k.a. our custom command.

```javascript
import "@testing-library/cypress/add-commands"; //same as before for cypress-testing-library

Cypress.Commands.add("verifyLink", (linkText, href) => {
  cy.findByText(linkText).should("have.attr", "href", href);
});
```

So we just added a command `verifyLink` that takes two args - the `linkText` to look for and the `href` the link
should have.

Go back to `tutorial.spec.js` and use the command!

```javascript
it("has a link pointing to the react website", function() {
  cy.server();
  cy.route("/200?**").as("fakeNetworkRequest");

  cy.visit("http://localhost:3000");

  cy.wait("@fakeNetworkRequest");

  cy.verifyLink("Learn React", "https://reactjs.org");
});
```

### Bonus: Use beforeEach to reuse test code within the same test suite.

Sometimes test code is repeated just within a spec file/suite, which we can extract out with options like `beforeEach`, `afterEach`, and sometimes just good ole fashioned JavaScript functions.

Here in `tutorial.spec.js`, we'll leverage `beforeEach`. Below is the latest version of our test suite.

```javascript
describe("Cypress Tutorial", function() {
  beforeEach(function() {
    cy.server();
    cy.route("/200?**").as("fakeNetworkRequest");

    cy.visit("http://localhost:3000");

    cy.wait("@fakeNetworkRequest");
  });

  it("works", function() {
    cy.findByText("Learn React");
  });

  it("has a link pointing to the react website", function() {
    cy.verifyLink("Learn React", "https://reactjs.org");
  });
});
```

## Technique 4: Log browser warnings and errors in the headless/terminal output

When you run the Cypress test suite in headless mode, it's nice to be able to see console warnings and errors that
may help you debug why your tests failed. This doesn't happen by default in the terminal output, so let's make it
happen.

### Add a console warning and error to the app

First, we'll need errors and warnings to pass through to the terminal. So update `App.js` with the following code...

```javascript
//... same above
function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {

    console.log("This is a log");
    console.warn("This is a warning");
    console.error("This is an error");

    const secondsToWait = 1;
    axios(`https://httpstat.us/200?sleep=${secondsToWait * 1000}`).then(
      response => {
        setLoaded(true);
      }
    );
  }, []);

//... same below
```

Check in your browser console for those three messages.

### Run the tests in headless mode

To see the terminal test output before it shows console warnings and errors, run the following.

```xpath2
npx cypress run
```

### Logging console output

This is going to seem kinda elaborate for something so simple, but it's worth it and exposes some
possibilities in Cypress generally.

Open up `cypress/commands/index.js` and add the following code to the bottom of the file.

```javascript
Cypress.on("window:before:load", win => {
  cy.stub(win.console, "error", msg => {
    cy.now("task", "error", msg);
  });

  cy.stub(win.console, "warn", msg => {
    cy.now("task", "warn", msg);
  });
});
```

There's a decent bit going on here - let's break it down.

- `Cypress.on` is a way to listen for
  [Cypress events](https://docs.cypress.io/api/events/catalog-of-events.html#Event-Types),
- we run a function on the `window:before:load` event (basically before the tests run)
- To intercept the console methods we [stub](https://docs.cypress.io/api/commands/stub.html#Syntax) them.
- `cy.now` is something I learned about [here](https://github.com/cypress-io/cypress/issues/300) and [here](https://stackoverflow.com/questions/53898085/check-if-an-error-has-been-written-to-the-console)
  and seems to avoid an issue with `cy.task` and promises that Cypress doesn't like. **I wish there was a better way
  , so if you know of any let me know!**

We need to update one more file, `cypress/plugins/index.js`, to get things to work. Here's the code you'll need
in that file, which listens for the `tasks` we just set up in `cypress/commands/index.js` and logs to the [internal
Cypress process](https://docs.cypress.io/guides/tooling/plugins-guide.html#Using-a-plugin) (including the terminal
output with nice colors).

```javascript
module.exports = on => {
  on(`task`, {
    error(message) {
      console.error("\x1b[31m", "ERROR:", message, "\x1b[0m");
    },
    warn(message) {
      console.warn("\x1b[33m", "WARNING:", message, "\x1b[0m");
    },
  });
};
```

Now run the tests in headless mode with `npx cypress run` and you should see the logs in your terminal output!

![tests-with-logging](https://yosts-posts.s3.amazonaws.com/tests-with-logging.png)

## Technique 5: Fail tests when there's an unknown console error

Cypress tests fail on uncaught exceptions already, which is basically your app crashing. But sometimes we might want
to fail the test when there's a `console.error` in the browser during the test.

Fortunately, we can easily add this behavior to our Cypress tests with a small addition to the code from the preview
section. Open `cypress/support/index` and update the `Cypress.on` listener block to match below, which just has one
extra line.

```javascript
Cypress.on("window:before:load", win => {
  cy.stub(win.console, "error", msg => {
    cy.now("task", "error", msg);
    throw new Error(msg); // all we needed to add!
  });

  cy.stub(win.console, "warn", msg => {
    cy.now("task", "warn", msg);
  });
});
```

No rerun the test suite and see that it fails!

### Bonus - ignore known errors

Sometimes we know of console errors that we just can't get rid of, but we want to still fail tests for _unknown_
errors. That's a simple fix by only throwing the `Error` when we don't recognize the error message. See below for
how we can ignore our current app's console error.

```javascript
Cypress.on("window:before:load", win => {
  cy.stub(win.console, "error", msg => {
    if (msg.includes("This is an error")) {
      return null;
    }

    cy.now("task", "error", msg);
    throw new Error(msg);
  });

  cy.stub(win.console, "warn", msg => {
    cy.now("task", "warn", msg);
  });
});
```

Rerun the test suite and the console error will no longer fail your tests!

## And that's it!

I have more Cypress techniques (like making it work with modern SPA apps/tools like react-router and adding to a CI
/CD pipeline) I didn't have space for in this tutorial, so those will be
[coming soon](https://www.ryanjyost.com/subscribe)!
