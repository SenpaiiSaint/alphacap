"use client";
import { useEffect, useState } from "react";

interface Fund { id: string; name: string; budget: number; }
interface Card { id: string; limit: number; last4: string; }
interface Expense { id: string; amount: number; vendor: string; category: string; createdAt: string; }

export default function DashboardPage() {
  const [funds, setFunds] = useState<Fund[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [fundRes, cardRes, expenseRes] = await Promise.all([
          fetch("/api/funds"),
          fetch("/api/cards"),
          fetch("/api/expenses"),
        ]);
        const fundsData = await fundRes.json();
        const cardsData = await cardRes.json();
        const expenseData = await expenseRes.json();

        setFunds(fundsData.funds);
        setCards(cardsData.cards);
        setExpenses(expenseData.expenses);
      } catch (e) {
        console.error("Error fetching dashboard data:", e);
      }
      setLoading(false);
    }
    fetchData();
  }, []);

  if (loading) return <div>Loading Dashboard...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="mb-4">
        <p>Funds: {funds.length}</p>
        <p>Cards: {cards.length}</p>
        <p>Expenses: {expenses.length}</p>
      </div>
      <div className="border p-4 rounded">
        <h2 className="font-bold mb-2">Spending Chart</h2>
        <p>Chart component goes here.</p>
      </div>
    </div>
  );
}
