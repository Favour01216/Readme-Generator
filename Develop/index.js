//inquirer
const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");
const { type } = require("os");

//Questions
const questions = [
  {
    type: "input",
    name: "title",
    message: "What is the title of your repository? (Required)",
    validate: (titleInput) => {
      if (titleInput) {
        return true;
      } else {
        console.log("Enter your repository title.");
        return false;
      }
    },
  },
  //Description part
  {
    type: "input",
    name: "description",
    message: "What is the description of your repository? (Required)",
    validate: (nameInput) => {
      if (nameInput) {
        return true;
      } else {
        console.log("Enter a description of the repository.");
        return false;
      }
    },
  },
  // Whether there is an intsllation or not
  {
    type: "input",
    name: "Installation",
    message: "Do you want an installtion process?",
  },
  {
    type: "input",
    name: "installations",
    message: "Please list installation instructions.",
    when: ({ Installation }) => {
      if (Installation) {
        return true;
      } else {
        return false;
      }
    },
  },
  //instructions
  {
    type: "input",
    name: "usage",
    message: "How do you use this project? (Required)",
    validate: (usageInput) => {
      if (usageInput) {
        return true;
      } else {
        console.log(
          "provide information on how to use project! it goes a long way"
        );
        return false;
      }
    },
  },
  // contribution
  {
    type: "confirm",
    name: "Contribution",
    message: "Do want other developers contribute to your repository?",
    validate: (contributionInput) => {
      if (contributionInput) {
        return true;
      } else {
        console.log(
          "You need to provide information on how to contribute to the project!"
        );
        return false;
      }
    },
  },
  // test
  {
    type: "input",
    name: "test",
    message: "Please explain how users may test your application.",
    validate: (testConfirm) => {
      if (testConfirm) {
        return true;
      } else {
        console.log("You need to describe how to test this project!");
        return false;
      }
    },
  },
  //license
  {
    type: "checkbox",
    name: "license",
    message: "Choose a license for your project (Required)",
    choices: [
      "Apache",
      "MIT",
      "Mozilla-Public",
      "GNU-General-Public",
      "Common-Development-and Distribution",
      "GNU GPLv3",
      "None",
      "Boost Software License 1.0",
    ],
    validate: (licenseInput) => {
      if (licenseInput) {
        return true;
      } else {
        console.log("You must pick a license for the project!");
        return false;
      }
    },
  },
  //username
  {
    type: "input",
    name: "github",
    message: "Enter your GitHub Username ",
    validate: (githubInput) => {
      if (githubInput) {
        return true;
      } else {
        console.log("Please enter your GitHub username!");
        return false;
      }
    },
  },
  //Email input
  {
    type: "input",
    name: "email",
    message: "Would you like to include your email?",
  },
];
// TODO: Create a function to write README file
function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (error) => {
    if (error) {
      return console.log("There was an error : " + error);
    } else {
      console.log("success! information now in README");
    }
  });
}

// TODO: Create a function to initialize app
function init() {
  inquirer.prompt(questions).then(function (userInput) {
    console.log(userInput);
    writeToFile("README.md", generateMarkdown(userInput));
  });
}

// Function call to initialize app
init();
