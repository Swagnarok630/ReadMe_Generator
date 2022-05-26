const inquirer = require("inquirer");
const fs = require("fs");

const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the title of your project?",
    },
    {
        type: "input",
        name: "description",
        message: "Give a brief description of your project.",
    },
    {
        type: "input",
        name: "installation",
        message: "Explain the procedure to install your project.",
    },
    {
        type: "input",
        name: "usage",
        message: "Please provide additional instructions and/or examples of the apps use.",
    },
    {
        type: "input",
        name: "contribution",
        message: "How many others contribute to the project?",
    },
    {
        type: "input",
        name: "tests",
        message: "If there are any test cases for this project, please explain them here.",
    },
    {
        type: "input",
        name: "deployed",
        message: "What is the link to your deployed project?",
    },
    {
        type: "input",
        name: "github",
        message: "What is your github username?",
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?",
    },
    {
        type: "checkbox",
        name: "license",
        message: "Select licenses used:",
        choices: ["MIT", "GPLv3", "BSD", "ISC", "Creative Commons", "Unlicense", "No license"]
    }
]

function createReadme(answers) {
    fs.writeFileSync("./README.md", `
# ${answers.title}

## Description
${answers.description}

App can be found deployed [here](${answers.deployed}).

## Table of Contents
* [Installation](#installation)
* [Usage](#usage)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)
* [License](#license)


## <a name="installation"></a>Installation Instructions
${answers.installation}

## <a name="usage"></a>Usage
${answers.usage}

## <a name="contributing"></a>Contributing
${answers.contribution}

## <a name="tests"></a>Tests
${answers.tests}

## <a name="questions"></a>Questions
If there are any questions or concerns regarding the app, you may contact me through the following:
* Github - <https://github.com/${answers.github}>
* E-mail - ${answers.email}

## <a name="license"></a>License
    `)
    console.log(answers.license)
}

inquirer
.prompt(questions)
.then((answers) => {
    createReadme(answers)
    console.log("README successfully created!")
})
.catch((error) => {
    if (error.isTtyError) {
        console.error("Could not render in current environment.")
    } else {
        console.error("Something else went wrong.", error)
    }
});

