"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Fund { id: string; name: string; budget: number; }

export default function FundsPage() {
  const { data: session } = useSession();
  const [funds, setFunds] = useState<Fund[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchFunds() {
      const res = await fetch("/api/funds");
      const data = await res.json();
      setFunds(data.funds);
      setLoading(false);
    }
    fetchFunds();
  }, []);

  if (loading) return <div>Loading Funds...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Funds</h1>
      {(session?.user?.role === "MANAGER" || session?.user?.role === "ADMIN") ? (
        <button className="mb-4 bg-green-500 text-white p-2 rounded">
          Create New Fund
        </button>
      ) : (
        <p>You do not have permission to create funds.</p>
      )}
      <ul className="list-disc ml-5">
        {funds.map(fund => (
          <li key={fund.id}>
            {fund.name} — Budget: ${fund.budget.toLocaleString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
