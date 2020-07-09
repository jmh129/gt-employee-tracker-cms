
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
VALUES("James", "Holding",1, 1), ("Tom", "Brady",2,  2);

INSERT INTO role(title, salary, department_id)
VALUES("Senior Analyst", "100000",1);

INSERT INTO department(name)
VALUES("Quality Assurance");