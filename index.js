const inquirer = require("inquirer");
const fs = require("fs");

const questions = [
    {
        type: "input",
        name: "title",
        message: "What is the title of your project?",
    }
]

function createReadme(input) {
    fs.writeFileSync("./README.md", "testing " + input)
}

inquirer
.prompt(questions)
.then((answers) => {
    createReadme(answers.title)
})
.catch((error) => {
    if (error.uhoh) {
        console.error("Whoopsie!")
    } else {
        console.error("Something went wrong!", error)
    }
});

