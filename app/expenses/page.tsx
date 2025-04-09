"use client";
import { useEffect, useState } from "react";

interface Expense { id: string; amount: number; vendor: string; category: string; createdAt: string; }

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [filter, setFilter] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchExpenses() {
      const res = await fetch("/api/expenses");
      const data = await res.json();
      setExpenses(data.expenses);
      setLoading(false);
    }
    fetchExpenses();
  }, []);

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.vendor.toLowerCase().includes(filter.toLowerCase()) ||
      expense.category.toLowerCase().includes(filter.toLowerCase())
  );

  const exportToCSV = () => {
    const header = "Vendor,Category,Amount,Date\n";
    const rows = filteredExpenses
      .map(exp => `${exp.vendor},${exp.category},${exp.amount},${new Date(exp.createdAt).toLocaleDateString()}`)
      .join("\n");
    const csvContent = header + rows;
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "expenses.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) return <div>Loading Expenses...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Expenses</h1>
      <input
        type="text"
        placeholder="Search expenses..."
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="p-2 border rounded mb-4 w-full"
      />
      <button onClick={exportToCSV} className="mb-4 bg-blue-500 text-white p-2 rounded">
        Export as CSV
      </button>
      <ul className="list-disc ml-5">
        {filteredExpenses.map(expense => (
          <li key={expense.id}>
            {expense.vendor} — ${expense.amount} on {new Date(expense.createdAt).toLocaleDateString()} ({expense.category})
          </li>
        ))}
      </ul>
    </div>
  );
}
