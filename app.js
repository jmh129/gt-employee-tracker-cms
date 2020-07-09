var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  port: 3306,

  user: "root",

  password: "password",
  database: "employee_DB",
});

connection.connect(function (err) {
  if (err) throw err;
  console.log("Connection Thread ID:" + connection.threadId);
  console.log("Opening Screen");
  initPrompt();
});

function initPrompt() {
  inquirer
    .prompt({
      name: "initialQuestion",
      type: "list",
      message: "What would you like to do today?",
      choices: [
        "View Employees",
        "Add Employee",
        "View Department",
        "Add Department",
        "View Roles",
        "Add Roles",
        "Update Employee Roles",
      ],
    })
    .then(function (answer) {
      switch (answer.initialQuestion) {
        case "View Employees":
          viewEmployees();
          break;
      }
    });
}

function viewEmployees() {
  connection.query("SELECT * FROM employee", function (err, res) {
    if (err) throw err;
    console.log(res);
  });
}
