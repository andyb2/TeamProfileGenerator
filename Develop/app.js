const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
 
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
 
const render = require("./lib/htmlRenderer");
const { create } = require("domain");
 
 
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)
 
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
 
// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.
 
// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.
 
// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
const employees = []
 
async function createManager(){
    const managerQuestions = [
        {message: 'What is the team managers name?', name:'name'},
        {message: 'What is the team managers id?', name:'id'},
        {message: 'What is your team managers email?', name:'email'},
        {message: 'What is the team managers office number?', name:'officeNumber'},
    ]
    const response = await inquirer.prompt(managerQuestions)
    const manager = new Manager(response.name, response.id, response.email, response.officeNumber)
    employees.push(manager)
    fs.writeFileSync(outputPath, render(employees), 'UTF-8')
    askEmployees();
}
createManager();
 
async function askEmployees(){
    const employeeType = await inquirer
    .prompt([
        {type: 'list', message: 'What type of employee would you like to add?', name: 'employee', choices: ['Engineer', 'Intern', 'No more employees']}
    ])
    
    switch(employeeType.employee){
        case "Engineer":
            createEngineer();
        break;

        case "Intern":
            createIntern();
        break;

        default:
            process.exit
    }
}
 
async function createEngineer(){
    const engineerQuestions = [
        {message: 'What is the engineers name?', name:'name'},
        {message: 'What is the team managers id?', name:'id'},
        {message: 'What is your team managers email?', name:'email'},
        {message: 'What is the engineers Git Hub username?', name:'github'},
    ]
    const response = await inquirer.prompt(engineerQuestions)
    const engineer = new Engineer(response.name, response.id, response.email, response.github)
    employees.push(engineer)
    fs.writeFileSync(outputPath , render(employees), 'UTF-8')
    askEmployees();
}
 
async function createIntern(){
    const internQuestions = [
        {message: 'What is the interns name?', name:'name'},
        {message: 'What is the team managers id?', name:'id'},
        {message: 'What is your team managers email?', name:'email'},
        {message: 'What school does the intern go to?', name:'school'},
    ]
    const response = await inquirer.prompt(internQuestions)
    const manager = new Intern(response.name, response.id, response.email, response.school)
    employees.push(manager)
    fs.writeFileSync(outputPath , render(employees), 'UTF-8')
    askEmployees();
}
