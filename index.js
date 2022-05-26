// Node variables
const inquirer = require("inquirer");
const fs = require("fs");

// Variable object for license badges
const badges = {
    MIT: "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)",
    GPLv3: "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)",
    BSD: "[![License](https://img.shields.io/badge/License-BSD_3--Clause-blue.svg)](https://opensource.org/licenses/BSD-3-Clause)",
    ISC: "[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg)](https://opensource.org/licenses/ISC)",
    ['Creative Commons']: "[![License: CC BY 4.0](https://licensebuttons.net/l/by/4.0/80x15.png)](https://creativecommons.org/licenses/by/4.0/)",
    Unlicense: "[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)",
    ["No license"]: ""
}

// Variable object for licenses
const licenselink = {
    MIT: "[MIT](https://opensource.org/licenses/MIT)",
    GPLv3: "[GPLv3](https://www.gnu.org/licenses/gpl-3.0)",
    BSD: "[BSD](https://opensource.org/licenses/BSD-3-Clause)",
    ISC: "[ISC](https://opensource.org/licenses/ISC)",
    ['Creative Commons']: "[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)",
    Unlicense: "[Unlicense](http://unlicense.org/)",
    ["No license"]: ""
}

// Variable object for questions
const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the title of your project?",
        default: "The Secret Project",
    },
    {
        type: "input",
        name: "description",
        message: "Give a brief description of your project.",
        default: "It's a big secret! Shhhh...",
    },
    {
        type: "input",
        name: "installation",
        message: "Explain the procedure to install your project.",
        default: "Just run it from the root directory.",
    },
    {
        type: "input",
        name: "usage",
        message: "Please provide additional instructions and/or examples of the apps use.",
        default: "Just follow the prompts after running.",
    },
    {
        type: "input",
        name: "contribution",
        message: "How may others contribute to the project?",
        default: "Anyone is welcome to add anything they'd like!",
    },
    {
        type: "input",
        name: "tests",
        message: "If there are any test cases for this project, please explain them here.",
        default: "No test cases here.",
    },
    {
        type: "input",
        name: "deployed",
        message: "What is the link to your deployed project?",
        default: "https://www.github.com/Swagnarok630/ReadMe_Generator",
    },
    {
        type: "input",
        name: "github",
        message: "What is your github username?",
        default: "Swagnarok630",
    },
    {
        type: "input",
        name: "email",
        message: "What is your email?",
        default: "swagnarok.630@gmail.com",
    },
    {
        type: "checkbox",
        name: "license",
        message: "Select licenses used:",
        choices: ["MIT", "GPLv3", "BSD", "ISC", "Creative Commons", "Unlicense", "No license"]
    }
]

// Function to create readme file after user has answered all questions
function createReadme(answers) {
    // Loop to gather license options and put badges into an array for later use
    let license = [];
    for (i = 0; i < answers.license.length; i++) {
        for (const prop in badges) {
            if (answers.license[i] === prop) {
                license.push(badges[prop])
            }
        }
    }
    // console.log(license)

    // Loop to gather license options and put license links into an array for later use
    let link = [];
    for (i = 0; i < answers.license.length; i++) {
        for (const value in licenselink) {
            if (answers.license[i] === value) {
                link.push(licenselink[value])
            }
        }
    }
    // console.log(link)

    // Actual file write portion of the function
    fs.writeFileSync("./generatedREADME.md", `
# ${answers.title}
${license.join(" ")}

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
Copyright (c) ${answers.github}. All rights reserved.

Licensed under ${link.join(" ")} license(s).
    `)
    // console.log(answers.license)
}

// Using inquirer to ask user a set of questions and then create a readme file
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

