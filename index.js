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
        message: "What is the description of your project?",
    },
    {
        type: "input",
        name: "installation",
        message: "How do you install your project?",
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
* [License](#license)
* [Contributing](#contributing)
* [Tests](#tests)
* [Questions](#questions)


## <a name="installation"></a>Installation Instructions
${answers.installation}

## <a name="usage"></a>Usage

## <a name="license"></a>License

## <a name="contributing"></a>Contributing

## <a name="tests"></a>Tests

## <a name="questions"></a>Questions
If there are any questions or concerns regarding the app, you may contact me through the following:
* Github - <https://github.com/${answers.github}>
* E-mail - ${answers.email}
    `)
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

