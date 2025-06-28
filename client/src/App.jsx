import { useEffect, useState } from 'react';

function App() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    const res = await fetch('http://localhost:5000/api/expenses');
    const data = await res.json();
    setExpenses(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!amount || !category) return;

    const res = await fetch('http://localhost:5000/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ amount, category }),
    });

    const newExpense = await res.json();
    setExpenses((prev) => [...prev, newExpense]);
    setAmount('');
    setCategory('');
  };

  const getTotal = () => {
    return expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2);
  };

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: 20 }}>
      <h1>Expense Tracker</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
          style={{ marginRight: 10 }}
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          style={{ marginRight: 10 }}
        />
        <button type="submit">Add</button>
      </form>

      <h2>Total: ${getTotal()}</h2>
      <ul>
        {expenses.map((exp) => (
          <li key={exp.id}>
            ${exp.amount} - {exp.category}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
