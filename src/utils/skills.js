const skills = [
  /*
    GENERAL
   */
  {
    name: "JavaScript",
    icon: "fab fa-js-square",
    color: "#f7df1e",
    isFile: false,
    factor: 2.5,
    type: "general",
  },
  {
    name: "ES6 / ES7",
    icon: "fab fa-js-square",
    color: "#f7df1e",
    isFile: false,
    factor: 2,
    type: "general",
  },
  { name: "Async/Await", type: "general" },
  {
    name: "npm",
    icon: "fab fa-npm",
    color: "#cb3837",
    isFile: false,
    factor: 2,
    type: "general",
  },
  {
    name: "Git",
    icon: "fab fa-git-square",
    color: "#f14e32",
    isFile: false,
    factor: 1.5,
    type: "general",
  },
  {
    name: "Bash",
    type: "general",
  },
  {
    name: "Webpack",
    // icon: images.webpack.sizes,
    color: "#61dafb",
    isFile: true,
    factor: 1.5,
    type: "general",
  },
  {
    name: "ESLint",
    type: "general",
  },
  {
    name: "JSDoc",
    type: "general",
  },
  {
    name: "Babel",
    // icon: images.babel.sizes,
    color: "#61dafb",
    isFile: true,
    factor: 1,
    type: "general",
  },

  /*
    FRONT END
   */

  {
    name: "React",
    icon: "fab fa-react",
    color: "#61dafb",
    isFile: false,
    factor: 2.5,
    type: "front",
  },
  {
    name: "Redux",
    // icon: images.redux.sizes,
    color: "#61dafb",
    isFile: true,
    factor: 2,
    type: "front",
  },
  {
    name: "React Native",
    icon: "fab fa-react",
    color: "#111",
    isFile: false,
    factor: 2,
    type: "front",
  },
  {
    name: "Emotion",
    type: "front",
  },
  {
    name: "Styled Components",
    type: "front",
  },
  {
    name: "Sass/SCSS",
    icon: "fab fa-sass",
    color: "#c6538c",
    isFile: false,
    factor: 1,
    type: "front",
  },
  {
    name: "Storybook",
    type: "front",
  },
  {
    name: "Responsive Design",
    icon: "fas fa-expand",
    color: "#888",
    isFile: false,
    factor: 1.5,
    type: "front",
  },
  {
    name: "Bootstrap",
    // icon: images.bootstrap.sizes,
    color: "#61dafb",
    isFile: true,
    factor: 2,
    type: "front",
  },
  {
    name: "Material UI",
    type: "front",
  },
  {
    name: "HTML5",
    icon: "fab fa-html5",
    color: "#E34C26",
    isFile: false,
    factor: 2,
    type: "front",
  },
  {
    name: "CSS3",
    icon: "fab fa-css3-alt",
    color: "#3B5998",
    isFile: false,
    factor: 2,
    type: "front",
  },

  {
    name: "jQuery",
    // icon: images.jquery.sizes,
    color: "#61dafb",
    isFile: true,
    factor: 1.5,
    type: "front",
  },
  // {
  //   name: "Ember",
  //   // icon: images.ember.sizes,
  //   color: "#61dafb",
  //   isFile: true,
  //   factor: 1.5,
  //   type: "front",
  // },

  /*
    BACK END
   */

  {
    name: "Node",
    icon: "fab fa-node",
    color: "#43853d",
    isFile: false,
    factor: 1.5,
    type: "back",
  },
  {
    name: "Express",
    icon: "fab fa-node-js",
    color: "#555",
    isFile: false,
    factor: 1.5,
    type: "back",
  },
  {
    name: "MongoDB",
    // icon: images.mongodb.sizes,
    color: "#61dafb",
    isFile: true,
    factor: 1.5,
    type: "back",
  },
  {
    name: "Mongoose",
    type: "back",
  },
  {
    name: "Puppeteer",
    type: "back",
  },
  {
    name: "Hapi.js",
    type: "back",
  },
  {
    name: "Redis",
    type: "back",
  },

  /*
    TESTING
   */

  {
    name: "Mocha",
    type: "test",
  },
  {
    name: "Chai",
    type: "test",
  },
  {
    name: "Jest",
    type: "test",
  },
  {
    name: "Cypress",
    type: "test",
  },

  /*
    Concepts
   */

  {
    name: "REST API",
    icon: "fas fa-exchange-alt",
    color: "#888",
    isFile: false,
    factor: 1.5,
    type: "concepts",
  },
  {
    name: "CI/CD",
    type: "concepts",
  },
  { name: "Agile/SCRUM", type: "concepts" },
  {
    name: "Technical Writing",
    icon: "fas fa-pencil-alt",
    color: "#888",
    isFile: false,
    factor: 1.5,
    type: "concepts",
  },
  {
    name: "Testing",
    type: "concepts",
  },
  {
    name: "Authentication",
    type: "concepts",
  },

  /*
   Concepts
  */
  {
    name: "GitHub",
    type: "tools",
  },
  {
    name: "Bitbucket",
    type: "tools",
  },
  {
    name: "Jira",
    type: "tools",
  },
  {
    name: "AWS (Certified Cloud Practitioner)",
    type: "tools",
  },
  {
    name: "CircleCI",
    type: "tools",
  },
  {
    name: "Heroku",
    type: "tools",
  },

  // {
  //   name: "Handlebars",
  //   // icon: images.handlebars.sizes,
  //   color: "#61dafb",
  //   isFile: true,
  //   factor: 1.2,
  //   type: "front",
  // },

  // {
  //   name: "WordPress",
  //   icon: "fab fa-wordpress",
  //   color: "#0087be",
  //   isFile: false,
  //   factor: 1,
  // },
  // {
  //   name: "Meteor.js",
  //   // icon: images.meteor.sizes,
  //   color: "#333",
  //   isFile: true,
  //   factor: 1.5,
  //   type: "back",
  // },
];

export default skills;
