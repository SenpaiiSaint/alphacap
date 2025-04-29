"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { portfolioData } from "@/lib/mock-data";

export function PriceUpdates() {
  const [prices, setPrices] = React.useState<Record<string, number>>({});
  const [lastUpdate, setLastUpdate] = React.useState<string>("");

  React.useEffect(() => {
    // Simulate WebSocket connection
    const ws = new WebSocket("wss://example.com/prices");

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setPrices(data.prices);
      setLastUpdate(new Date().toLocaleTimeString());
    };

    // Simulate price updates
    const interval = setInterval(() => {
      const mockPrices = portfolioData.reduce((acc, fund) => {
        const change = (Math.random() * 2 - 1) * 0.01; // Random change between -1% and 1%
        acc[fund.name] = fund.value * (1 + change);
        return acc;
      }, {} as Record<string, number>);

      setPrices(mockPrices);
      setLastUpdate(new Date().toLocaleTimeString());
    }, 5000);

    return () => {
      ws.close();
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-medium">Live Prices</h3>
        <span className="text-xs text-slate-500">
          Last update: {lastUpdate}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {portfolioData.map((fund) => {
          const currentPrice = prices[fund.name] || fund.value;
          const change = ((currentPrice - fund.value) / fund.value) * 100;

          return (
            <div
              key={fund.name}
              className="flex items-center justify-between p-2 bg-slate-50 rounded-lg"
            >
              <span className="text-sm">{fund.name}</span>
              <div className="text-right">
                <div className="text-sm font-medium">
                  ${currentPrice.toLocaleString()}
                </div>
                <div
                  className={cn(
                    "text-xs",
                    change > 0 ? "text-green-500" : "text-red-500"
                  )}
                >
                  {change > 0 ? "+" : ""}
                  {change.toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
