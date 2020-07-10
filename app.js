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
        "View All Records",
        "View Employees",
        "Add Employee",
        "View Department",
        "Add Department",
        "View Roles",
        "Add Roles",
        "Update Employee Role",
        "View Budget",
        "Exit",
      ],
    })
    .then(function (answer) {
      switch (answer.initialQuestion) {
        case "View All Records":
          viewAll();
          break;
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
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "View Budget":
          viewBudget();
          break;
        case "Exit":
          connection.end();
          break;
      }
    });
}

function returnInit() {
  inquirer
    .prompt({
      name: "return",
      type: "input",
      message: "Press any key to return to the main screen.",
    })
    .then(function () {
      initPrompt();
    });
}

function viewAll() {
  connection.query(
    "SELECT employee.id AS 'Employee ID', first_name AS 'First Name', last_name AS 'Last Name', title AS 'Title',  name AS 'Department', manager_id AS 'Manager ID',salary AS 'Salary' FROM role JOIN department ON role.department_id=department.id RIGHT JOIN employee ON role.id=employee.role_id",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      returnInit();
    }
  );
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
  connection.query("SELECT * FROM department", function (err, data) {
    if (err) throw err;
    const arrayOfDepartments = data.map((object) => object.name);
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
          type: "list",
          message: "Plese select a department",
          name: "department_id",
          choices: arrayOfDepartments,
        },
      ])
      .then(function (answer) {
        let department = data.filter(
          (object) => object.name === answer.department_id
        );
        connection.query(
          "INSERT INTO role(title, salary, department_id) VALUES (?,?,?)",
          [answer.title, answer.salary, department[0].id],
          function (err, res) {
            if (err) throw err;
            console.log(answer.title + "Has Been Added!");
            returnInit();
          }
        );
      });
  });
}

function addEmployee() {
  connection.query("SELECT * FROM role", function (err, data) {
    if (err) throw err;
    const arrayOfRoles = data.map((object) => object.title);
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
          type: "list",
          message: "Plese select a roles",
          name: "role_id",
          choices: arrayOfRoles,
        },
        {
          name: "manager_id",
          type: "input",
          message: "Please enter the ID of the employee's manager.",
        },
      ])
      .then(function (answer) {
        let role = data.filter(
            (object) => object.title === answer.role_id
          );
        connection.query(
          "INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)",
          [
            answer.first_name,
            answer.last_name,
            role[0].id,
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
  });
}

function updateEmployeeRole() {
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

function viewBudget() {
  connection.query(
    "SELECT name AS 'Department Name', SUM(salary) AS 'Sum of Salaries', COUNT(employee.role_id) AS 'Number of Employees' FROM department INNER JOIN role ON department.id=role.department_id INNER JOIN employee ON role.id=employee.role_id GROUP BY department_id ORDER BY SUM(salary) DESC;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      returnInit();
    }
  );
}
