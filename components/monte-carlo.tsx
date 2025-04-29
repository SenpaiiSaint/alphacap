"use client"

import * as React from "react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts"
import { cn } from "@/lib/utils"

const generateSimulation = () => {
  const simulations = []
  const baseValue = 100
  const volatility = 0.2
  const timeSteps = 30

  for (let i = 0; i < 100; i++) {
    const path = []
    let value = baseValue

    for (let t = 0; t < timeSteps; t++) {
      const random = Math.random() * 2 - 1
      value *= (1 + volatility * random)
      path.push({
        time: t,
        value: value,
        simulation: i
      })
    }
    simulations.push(path)
  }
  return simulations
}

const simulations = generateSimulation()

export function MonteCarloFan() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart>
          <XAxis dataKey="time" />
          <YAxis />
          <Tooltip />
          {simulations.map((path, i) => (
            <Area
              key={i}
              data={path}
              type="monotone"
              dataKey="value"
              stroke={`rgba(59, 130, 246, 0.1)`}
              fill={`rgba(59, 130, 246, 0.1)`}
              strokeWidth={1}
              isAnimationActive={false}
            />
          ))}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
} 