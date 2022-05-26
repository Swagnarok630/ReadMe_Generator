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
    }
]

function createReadme(answers) {
    fs.writeFileSync("./README.md", `
    # ${answers.title}
    ${answers.description}
    App can be found deployed [here](${answers.deployed}).

    ## Installation Instructions
    ${answers.installation}
    `)
}

inquirer
.prompt(questions)
.then((answers) => {
    createReadme(answers)
})
.catch((error) => {
    if (error.isTtyError) {
        console.error("Could not render in current environment.")
    } else {
        console.error("Something else went wrong.", error)
    }
});

