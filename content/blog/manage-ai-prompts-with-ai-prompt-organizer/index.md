---
title: "How to Manage and Scale Your AI Prompts in Node with ai-prompt-organizer"
date: "2023-09-24"
description: "A tutorial that walks you through how to better manage your AI prompts."
---

![](https://yosts-posts.s3.amazonaws.com/ai-prompt-organizer.png)

As software uses more and more prompt-based AI tools like OpenAI, and as those tools are able to handle bigger and more complex prompts, codebases will inevitably get bloated with text.
But if we separate our prompts from our code, we can keep our codebases clean, organized, scalable and overall easier to manage.

I created `ai-prompt-organizer` to help me manage my own prompts and turned it into a [public npm package](https://medium.com/r/?url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fai-prompt-organizer). Hopefully it helps others be more productive when it comes to prompt-based work.

[Check out ai-prompt-organizer here.](https://medium.com/r/?url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fai-prompt-organizer)

This tutorial will show you how to leverage `ai-prompt-organizer` in your Node projects, step-by-step.

```txt
1. Init an example Node project (optional)
2. Set up ai-prompt-organizer
3. Build out your prompt library
  a. Nested objects
  b. Named exports
  c. Default export a string
  d. Nested folders
4. Use variables in your prompts
5. Use any prompt inside of another prompt
```

## Init an example Node project (optional)

```bash
npm init
```

Create an `example.js` file.

```bash
touch example.js
```

In `package.json` add a script to run our little example program.

```json
/* package.json */

"start": "node example.js"
```

In `example.js`, add a `console.log` to make sure it runs.

```js
/* example.js */

console.log("Hello World!");
```

Run the program. You can run this any time you need to check on later parts of the tutorial.

```bash
npm run start
```

Make sure you see "Hello World!" in your terminal output.

## Set up ai-prompt-organizer

Install `ai-prompt-organizer`

```bash
npm install ai-prompt-organizer
```

Create a `prompts` directory. This is where your prompt library will live.

```bash
mkdir prompts
```

The simplest way to start your prompt library is with an `index.cjs` file.

```bash
touch prompts/index.cjs
```

In your new file, default export an object.

```js
/* /prompts/index.cjs */

module.exports = {};
```

Create your first prompt by adding a property to the object.

```js
/* /prompts/index.cjs */

module.exports = {
  firstPrompt: "This is my first prompt!",
};
```

Now go to `example.js`, import `ai-prompt-organizer` and use the prompt.

```js
/* example.js */

const PromptOrganizer = require("ai-prompt-organizer");

const prompt = PromptOrganizer.get("firstPrompt");

console.log(prompt);
// This is my first prompt!
```

## Build out your prompt library

You can organize your prompt library however you want. The structure of your prompt library (nesting, folder names, file names, etc.) determines how you access your prompts (via nested dot notation).

Be sure to use `.cjs` file extensions!

### Nested objects

```js
/* /prompts/index.cjs */

module.exports = {
  level0: {
    level1: {
      level2: {
        nestedPrompt: "This is a nested prompt!",
      },
    },
  },
};
```

```js
const prompt = PromptOrganizer.get("level0.level1.level2.nestedPrompt");
console.log(prompt);
// This is a nested prompt!
```

### Named exports

If you don't like dealing with objects, then named exports could be the move.

```bash
touch prompts/namedExports.cjs
```

```js
/* /prompts/namedExports.js */

module.exports.namedExportPrompt = "This is a named export prompt!";
```

```js
/* example.js */

const prompt = PromptOrganizer.get("namedExports.namedExportPrompt");

console.log(prompt);
// This is a named export prompt!
```

### Default export a string

This option is great for super long prompts.

```bash
touch prompts/superLongPrompt.cjs
```

```js
/* /prompts/superLongPrompt.cjs */

module.exports = `This is a super long prompt!`;
```

```js
/* example.js */

const prompt = PromptOrganizer.get("superLongPrompt");

console.log(prompt);
// This is a super long prompt!
```

### Nested folders

```bash
mkdir prompts/folderA
mkdir prompts/folderA/folderB
mkdir prompts/folderA/folderB/folderC
touch prompts/folderA/folderB/folderC/nestedFile.cjs
```

```js
/* /prompts/folderA/folderB/folderC/nestedFile.cjs */

module.exports = {
  promptInNestedFile: "This is a prompt in a nested file!",
};
```

```js
/* example.js */

const prompt = PromptOrganizer.get(
  "folderA.folderB.folderC.nestedFile.promptInNestedFile"
);

console.log(prompt);
// This is a super long prompt!
```

## Use variables in your prompts

Sometimes we need to inject dynamic data into our prompts, which is easy with `ai-prompt-organizer` inputs.

```js
/* example.js */

const inputs = { currentTimestamp: Date.now() };

// same concept as PromptOrganizer.get("promptThatTakesCurrentTs", inputs)
const prompt = PromptOrganizer.use(
  "The current time is {{currentTimestamp}}",
  inputs
);

console.log(prompt);
// The current time is 1695519417079
```

NOTE: `PromptOrganizer.use()` is just an easy way to use a prompt directly vs. grabbing it from the library. You can utilize inputs in the same way with `PromptOrganizer.get()` and use the bracket notation throughout your library prompts.

## Use any prompt inside of another prompt

All you have to do is reference the prompt in double brackets, using dot notation like you would in `PromptOrganizer.get()`.

_Beware of circular dependencies!_

```js
/* /prompts/index.cjs */

module.exports = {
  start: "This is the",
  middle: "middle of the",
  end: "sentence.",
  full: "Here is a full sentence: {{start}} {{middle}} {{end}}",
};
```

```js
/* example.js */

const prompt = PromptOrganizer.get("full");

console.log(prompt);
// Here is a full sentence: This is the middle of the sentence.
```

## And that's it!

Example Repo: https://github.com/ryanjyost/ai-prompt-organizer-tutorial<br/>
NPM: https://www.npmjs.com/package/ai-prompt-organizer<br/>
GitHub: https://github.com/ryanjyost/ai-prompt-organizer
