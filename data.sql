-- Insert sample projects
INSERT INTO Projects (project_name, start_date, end_date, budget)
VALUES
('Project A', '2024-01-01', '2024-06-01', 100000),
('Project B', '2024-02-01', '2024-07-01', 150000);

-- Insert sample labor charges
INSERT INTO Labor_Charges (project_id, employee_id, hours_worked, rate, date)
VALUES
(1, 1, 40, 50, '2024-01-15'),
(1, 2, 35, 45, '2024-01-20'),
(2, 1, 30, 55, '2024-02-10');

-- Insert sample expenses
INSERT INTO Expenses (project_id, description, amount, date)
VALUES
(1, 'Equipment', 5000, '2024-01-18'),
(2, 'Travel', 3000, '2024-02-15');

-- Insert sample subcontractor invoices
INSERT INTO Subcontractor_Invoices (project_id, subcontractor_name, amount, date)
VALUES
(1, 'Subcontractor A', 10000, '2024-01-25'),
(2, 'Subcontractor B', 15000, '2024-02-20');

-- Insert sample other costs
INSERT INTO Other_Costs (project_id, description, amount, date)
VALUES
(1, 'Miscellaneous', 2000, '2024-01-30'),
(2, 'Miscellaneous', 2500, '2024-02-25');
