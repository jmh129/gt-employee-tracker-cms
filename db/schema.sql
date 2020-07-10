
DROP DATABASE IF EXISTS employee_DB;

CREATE DATABASE employee_DB;

USE employee_DB;

CREATE TABLE department (
id INT PRIMARY KEY AUTO_INCREMENT,
name VARCHAR(30),
);

CREATE TABLE role (
id INT PRIMARY KEY AUTO_INCREMENT,
title VARCHAR(30),
salary DECIMAL (10,4),
department_id INT, 
);

CREATE TABLE employee (
id INT PRIMARY KEY AUTO_INCREMENT,
first_name VARCHAR(30),
last_name VARCHAR(30),
role_id INT,
manager_id INT, 
);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("James", "Holding",2, 1), ("Tom", "Brady",1, 2),("Dan", "Marino",3, 1),("Peyton", "Manning",4, 1),("Russell", "Wilson",5, 1),("Erlich", "Bachmann",6, 1);

INSERT INTO role(title, salary, department_id)
VALUES("Analyst", "50000",1),("Developer", "75000",2),("Salesman", "100000",3),("HR Generalist", "65000",4),("Receptionist", "45000",5),("Chief Technology Officer", "150000",6);

INSERT INTO department(name)
VALUES("Quality Assurance"),("Software Development"),("Sales"),("Marketing"),("Human Resources"),("General Staff"),("Executive Leadership");
