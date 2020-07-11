INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES("James", "Holding",2, 1), ("Tom", "Brady",1, 2),("Dan", "Marino",3, 1),("Peyton", "Manning",4, 1),("Russell", "Wilson",5, 1),("Erlich", "Bachmann",6, 6),("Dinesh", "Nanjiani",1, 1),("Gilfoyle", "Martin",2, 1),("Burt", "Reynolds",3, 1),("Steve", "Perry",1, 1),("Ricky", "Williams",5, 1),("Ryan", "Tannehill",5, 1),("Kumail", "Raj",4, 1),("Bill", "Smith",4, 1),("Bob", "Martin",5, 1);

INSERT INTO role(title, salary, department_id)
VALUES("Analyst", "50000",1),("Developer", "75000",2),("Salesman", "100000",3),("HR Generalist", "65000",4),("Receptionist", "45000",5),("Chief Technology Officer", "150000",6);

INSERT INTO department(name)
VALUES("Quality Assurance"),("Software Development"),("Sales"),("Human Resources"),("Executive Leadership"),("General Staff");