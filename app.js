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
        "Exit",
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
          let userView2 = "role";
          viewTable(userView2);
          break;
        case "Add Department":
          addDapartment();
          break;
        case "Add Roles":
          addRole();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Roles":
          updateEmployeeRole();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

function returnInit(answer) {
  inquirer
    .prompt({
      name: "return",
      type: "input",
      message: "Press any key to return to the main screen.",
    })
    .then(function (answer) {
      initPrompt();
    });
}

function viewTable(answer) {
  connection.query("SELECT * FROM ??", answer, function (err, res) {
    if (err) throw err;
    console.table(res);
    returnInit();
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
      connection.query(
        "INSERT INTO department(name) VALUES (?)",
        answer.name,
        function (err, res) {
          if (err) throw err;
          console.log("Department Added!");
          returnInit();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "title",
        type: "input",
        message: "Please enter the title of the",
      },
      {
        name: "salary",
        type: "input",
        message: "Please enter the salary for the role.",
      },
      {
        name: "depID",
        type: "input",
        message: "Please enter the department ID.",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role(title, salary, department_id) VALUES (?,?,?)",
        [answer.title, answer.salary, answer.depID],
        function (err, res) {
          if (err) throw err;
          console.log(answer.title + "Has Been Added!");
          returnInit();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "first_name",
        type: "input",
        message: "Please enter the first name of the employee.",
      },
      {
        name: "last_name",
        type: "input",
        message: "Please enter the last name of the employee.",
      },
      {
        name: "role_id",
        type: "input",
        message: "Please enter the role id.",
      },
      {
        name: "manager_id",
        type: "input",
        message: "Please enter the ID of the employee's manager.",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
        [
          answer.first_name,
          answer.last_name,
          answer.role_id,
          answer.manager_id,
        ],
        function (err, res) {
          if (err) throw err;
          console.log(
            answer.first_name +
              " " +
              answer.last_name +
              " Has Been Added!"
          );
          returnInit();
        }
      );
    });
}

function updateEmployeeRole(answer) {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "Please enter the ID of the employee.",
      },
      {
        name: "new_role",
        type: "input",
        message: "Please enter the new role ID of the employee.",
      },
    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET role_id =" +
          answer.new_role +
          " WHERE id =" +
          answer.id +
          ";"
      );
      console.log(
        "Employee " +
          answer.id +
          "'s role has been updated to " +
          answer.new_role +
          "."
      );
      returnInit();
    });
}
