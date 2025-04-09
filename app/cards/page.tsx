"use client";
import { useEffect, useState } from "react";

interface Card { id: string; limit: number; last4: string; active: boolean; }

export default function CardsPage() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCards() {
      const res = await fetch("/api/cards");
      const data = await res.json();
      setCards(data.cards);
      setLoading(false);
    }
    fetchCards();
  }, []);

  if (loading) return <div>Loading Cards...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Cards</h1>
      <ul className="list-disc ml-5">
        {cards.map((card) => (
          <li key={card.id}>
            Card ending in {card.last4} — Limit: ${card.limit} — {card.active ? "Active" : "Inactive"}
          </li>
        ))}
      </ul>
    </div>
  );
}
