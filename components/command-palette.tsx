"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { portfolioData, transactions, alerts } from "@/lib/mock-data";

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <CommandPrimitive className="flex h-full w-full flex-col overflow-hidden rounded-lg">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandPrimitive.Input
              placeholder="Search across funds, transactions, alerts..."
              className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-slate-500 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <CommandPrimitive.List className="max-h-[300px] overflow-y-auto overflow-x-hidden">
            <CommandPrimitive.Empty className="py-6 text-center text-sm">
              No results found.
            </CommandPrimitive.Empty>
            <CommandPrimitive.Group heading="Funds">
              {portfolioData.map((fund) => (
                <CommandPrimitive.Item
                  key={fund.name}
                  value={fund.name}
                  className="flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900"
                >
                  <span className="ml-2">{fund.name}</span>
                  <span className="ml-auto text-xs text-slate-500">
                    ${fund.value.toLocaleString()}
                  </span>
                </CommandPrimitive.Item>
              ))}
            </CommandPrimitive.Group>
            <CommandPrimitive.Group heading="Transactions">
              {transactions.map((transaction) => (
                <CommandPrimitive.Item
                  key={transaction.id}
                  value={transaction.description}
                  className="flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900"
                >
                  <span className="ml-2">{transaction.description}</span>
                  <span className="ml-auto text-xs text-slate-500">
                    ${Math.abs(transaction.amount).toLocaleString()}
                  </span>
                </CommandPrimitive.Item>
              ))}
            </CommandPrimitive.Group>
            <CommandPrimitive.Group heading="Alerts">
              {alerts.map((alert) => (
                <CommandPrimitive.Item
                  key={alert.id}
                  value={alert.message}
                  className="flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-slate-100 aria-selected:text-slate-900"
                >
                  <span className="ml-2">{alert.message}</span>
                  <span className="ml-auto text-xs text-slate-500">
                    {alert.date}
                  </span>
                </CommandPrimitive.Item>
              ))}
            </CommandPrimitive.Group>
          </CommandPrimitive.List>
        </CommandPrimitive>
      </DialogContent>
    </Dialog>
  );
}
