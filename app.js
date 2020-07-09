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
          let userView = "employee";
          viewTable(userView);
          break;
        case "View Department":
          let userView1 = "department";
          viewTable(userView1);
          break;
        case "View Roles":
          let userView3 = "role";
          viewTable(userView3);
          break;
        case "Add Department":
          addDapartment();
          break;
      }
    });
}

function viewTable(answer) {
  connection.query("SELECT * FROM ??", answer, function (err, res) {
    if (err) throw err;
    console.table(res);
  });
}

function addDapartment() {
  inquirer
    .prompt({
      name: "name",
      type: "input",
      message: "Please enter the new department.",
    })
    .then(function (answer) {
      console.log(answer.name);
      connection.query(
        "INSERT INTO department(name) VALUES (?)",
        answer.name,
        function (err, res) {
          if (err) throw err;
          console.log("Department added!");
        }
      );
    });
}
