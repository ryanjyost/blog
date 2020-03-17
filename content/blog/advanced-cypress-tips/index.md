---
title: "Advanced techniques for end-to-end Cypress testing"
date: "2020-03-06"
description: "If you're looking to level up your Cypress test suite, then this tutorial is for you."
---

## Advanced techniques we'll walk through

1. dfssd

## Set up the test project

Create a new React project with create-react-app.

```
npx create-react-app cypress tutorial
```

Install cypress.

```
npm i -D cypress
```

Initialize cypress in your project by opening the development GUI for the first time.

```
npx cypress open
```

Delete the example test directory.

```
rm -R ./cypress/integration/examples
```

### Add ESLint and the Cypress linting rules

To avoid annoying linting issues with Cypress in your IDE, let's setup linting such that it understands Cypress's
global `cy` object.

```
npm i -D eslint eslint-plugin-cypress
```

Create an `.eslintrc.json`.

```
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

```
touch ./cypress/integration/tutorial.spec.js
```

Paste the following Cypress test code into the `tutorial.spec.js` file. All this test does is make sure the app works
by looking for the CRA boilerplate "Learn React" link.

```javascript
describe("Cypress Tutorial", function() {
  it("Makes sure the app is working", function() {
    cy.visit("http://localhost:3000");
    cy.get("a").contains("Learn React");
  });
});
```

Run the test by opening the GUI with `npx cypress open`

## Technique 1: Use cypress-testing-library

You may have heard of Kent C. Dodds and his testing libraries like JSDom-testing-library and react-testing
-library. Well there's one for cypress, too, called cypress-testing-library and it's pretty sweet for more easily
writing tests in a way that more closely mimics how a user will actually interact with your app, which means your
tests are better.

Install the library.

```
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

And to make sure our test actually works and breaks when it's supposed to, change the text to search for to `Learn Vue` and see the test break in the GUI.
