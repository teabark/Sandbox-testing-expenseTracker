const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let expenses = [];

// Get all expenses
app.get('/api/expenses', (req, res) => {
  res.json(expenses);
});

// Add an expense
app.post('/api/expenses', (req, res) => {
  const { amount, category } = req.body;
  if (!amount || !category) {
    return res.status(400).json({ error: 'Amount and category required' });
  }

  const newExpense = {
    id: Date.now(),
    amount: parseFloat(amount),
    category
  };

  expenses.push(newExpense);
  res.status(201).json(newExpense);
});

// Clear all expenses (for testing/demo purposes)
app.delete('/api/expenses', (req, res) => {
  expenses = [];
  res.status(200).json({ message: 'All expenses cleared' });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
