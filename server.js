const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Hawaii2017!', // Replace with your MySQL root password
  database: 'project_management'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to the database.');
});

// Fetch projects and their costs
app.get('/projects/costs', (req, res) => {
  const query = `
    SELECT 
      p.project_id,
      p.project_name,
      p.start_date,
      p.end_date,
      p.budget,
      COALESCE(SUM(l.hours_worked * l.rate), 0) AS total_labor_cost,
      COALESCE(SUM(e.amount), 0) AS total_expenses,
      COALESCE(SUM(s.amount), 0) AS total_invoices,
      COALESCE(SUM(o.amount), 0) AS total_other_costs,
      COALESCE(SUM(l.hours_worked * l.rate), 0) + 
      COALESCE(SUM(e.amount), 0) + 
      COALESCE(SUM(s.amount), 0) + 
      COALESCE(SUM(o.amount), 0) AS total_cost
    FROM Projects p
    LEFT JOIN Labor_Charges l ON p.project_id = l.project_id
    LEFT JOIN Expenses e ON p.project_id = e.project_id
    LEFT JOIN Subcontractor_Invoices s ON p.project_id = s.project_id
    LEFT JOIN Other_Costs o ON p.project_id = o.project_id
    GROUP BY p.project_id;
  `;
  db.query(query, (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Update project details
app.post('/projects/:id/update', (req, res) => {
  const projectId = req.params.id;
  const { project_name, start_date, end_date, budget, hours_worked, rate, expense_description, expense_amount, subcontractor_name, invoice_amount, other_cost_description, other_cost_amount } = req.body;

  console.log('Project ID:', projectId); // Log to check values
  console.log('Project Name:', project_name);
  console.log('Start Date:', start_date);
  console.log('End Date:', end_date);
  console.log('Budget:', budget);
  console.log('Hours Worked:', hours_worked);
  console.log('Rate:', rate);
  console.log('Expense Description:', expense_description);
  console.log('Expense Amount:', expense_amount);
  console.log('Subcontractor Name:', subcontractor_name);
  console.log('Invoice Amount:', invoice_amount);
  console.log('Other Cost Description:', other_cost_description);
  console.log('Other Cost Amount:', other_cost_amount);

  if (!projectId || !project_name || !start_date || !end_date || !budget || !hours_worked || !rate || !expense_description || !expense_amount || !subcontractor_name || !invoice_amount || !other_cost_description || !other_cost_amount) {
    return res.status(400).json({ message: 'Invalid project data' });
  }

  const projectQuery = 'UPDATE Projects SET project_name = ?, start_date = ?, end_date = ?, budget = ? WHERE project_id = ?';
  db.query(projectQuery, [project_name, start_date, end_date, budget, projectId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Failed to update project' });
    }

    const laborQuery = 'UPDATE Labor_Charges SET hours_worked = ?, rate = ? WHERE project_id = ?';
    db.query(laborQuery, [hours_worked, rate, projectId], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: 'Failed to update labor charges' });
      }

      const expenseQuery = 'UPDATE Expenses SET description = ?, amount = ? WHERE project_id = ?';
      db.query(expenseQuery, [expense_description, expense_amount, projectId], (err, results) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ message: 'Failed to update expenses' });
        }

        const invoiceQuery = 'UPDATE Subcontractor_Invoices SET subcontractor_name = ?, amount = ? WHERE project_id = ?';
        db.query(invoiceQuery, [subcontractor_name, invoice_amount, projectId], (err, results) => {
          if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to update subcontractor invoices' });
          }

          const otherCostQuery = 'UPDATE Other_Costs SET description = ?, amount = ? WHERE project_id = ?';
          db.query(otherCostQuery, [other_cost_description, other_cost_amount, projectId], (err, results) => {
            if (err) {
              console.error(err);
              return res.status(500).json({ message: 'Failed to update other costs' });
            }

            res.json({ message: 'Project updated successfully' });
          });
        });
      });
    });
  });
});

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
