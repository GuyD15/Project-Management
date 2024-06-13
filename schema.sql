-- Create the database
CREATE DATABASE IF NOT EXISTS project_management;

-- Use the created database
USE project_management;

-- Create the Projects table
CREATE TABLE IF NOT EXISTS Projects (
    project_id INT PRIMARY KEY AUTO_INCREMENT,
    project_name VARCHAR(255),
    start_date DATE,
    end_date DATE,
    budget DECIMAL(10, 2)
);

-- Create the Labor_Charges table
CREATE TABLE IF NOT EXISTS Labor_Charges (
    charge_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    employee_id INT,
    hours_worked DECIMAL(5, 2),
    rate DECIMAL(5, 2),
    date DATE,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id)
);

-- Create the Expenses table
CREATE TABLE IF NOT EXISTS Expenses (
    expense_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    description VARCHAR(255),
    amount DECIMAL(10, 2),
    date DATE,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id)
);

-- Create the Subcontractor_Invoices table
CREATE TABLE IF NOT EXISTS Subcontractor_Invoices (
    invoice_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    subcontractor_name VARCHAR(255),
    amount DECIMAL(10, 2),
    date DATE,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id)
);

-- Create the Other_Costs table
CREATE TABLE IF NOT EXISTS Other_Costs (
    cost_id INT PRIMARY KEY AUTO_INCREMENT,
    project_id INT,
    description VARCHAR(255),
    amount DECIMAL(10, 2),
    date DATE,
    FOREIGN KEY (project_id) REFERENCES Projects(project_id)
);
