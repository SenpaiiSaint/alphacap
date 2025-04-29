"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

const generateDailyReturns = () => {
  const returns = []
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const date = new Date(today)
    date.setDate(date.getDate() - i)
    returns.push({
      date: date.toISOString().split('T')[0],
      value: (Math.random() * 2 - 1) // Random returns between -1 and 1
    })
  }
  return returns
}

const dailyReturns = generateDailyReturns()

export function HeatCalendar() {
  return (
    <div className="grid grid-cols-7 gap-1">
      {dailyReturns.map((day) => {
        const intensity = Math.min(Math.abs(day.value) * 5, 1)
        const color = day.value > 0 
          ? `rgba(34, 197, 94, ${intensity})` // green
          : `rgba(239, 68, 68, ${intensity})` // red

        return (
          <div
            key={day.date}
            className={cn(
              "w-4 h-4 rounded-sm",
              "hover:scale-110 transition-transform",
              "cursor-pointer"
            )}
            style={{ backgroundColor: color }}
            title={`${day.date}: ${(day.value * 100).toFixed(2)}%`}
          />
        )
      })}
    </div>
  )
} 