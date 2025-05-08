/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { Line, LineChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent } from "@/components/ui/card"
import { Activity, Droplet, Heart, Thermometer } from "lucide-react"

interface VitalsChartProps {
  type: "heartRate" | "spo2" | "temperature" | "glucose"
  timeframe: "1h" | "24h" | "7d"
}

export function VitalsChart({ type, timeframe }: VitalsChartProps) {
  // Generate sample data based on vital type and timeframe
  const generateData = () => {
    const data = []
    const points = timeframe === "1h" ? 12 : timeframe === "24h" ? 24 : 7

    let baseValue = 0
    let minValue = 0
    let maxValue = 0
    let unit = ""
    let color = ""
    let icon = null

    switch (type) {
      case "heartRate":
        baseValue = 75
        minValue = 60
        maxValue = 100
        unit = "bpm"
        color = "hsl(0, 85%, 60%)" // Red for heart rate
        icon = <Heart className="h-4 w-4 text-red-500" />
        break
      case "spo2":
        baseValue = 97
        minValue = 94
        maxValue = 100
        unit = "%"
        color = "hsl(210, 100%, 50%)" // Blue for SpO2
        icon = <Droplet className="h-4 w-4 text-blue-500" />
        break
      case "temperature":
        baseValue = 37
        minValue = 36
        maxValue = 38
        unit = "°C"
        color = "hsl(30, 100%, 50%)" // Orange for temperature
        icon = <Thermometer className="h-4 w-4 text-orange-500" />
        break
      case "glucose":
        baseValue = 110
        minValue = 80
        maxValue = 140
        unit = "mg/dL"
        color = "hsl(280, 75%, 60%)" // Purple for glucose
        icon = <Activity className="h-4 w-4 text-purple-500" />
        break
    }

    // Generate time labels based on timeframe
    const now = new Date()

    for (let i = 0; i < points; i++) {
      const time = new Date(now)

      if (timeframe === "1h") {
        const minutesAgo = (points - i - 1) * 5
        const label =
          minutesAgo === 0
            ? "0 min"
            : minutesAgo >= 60
              ? `${Math.floor(minutesAgo / 60)} hr ago`
              : `${minutesAgo} min`

        const variance = Math.random() * (maxValue - minValue) * 0.2
        const value = Math.max(minValue, Math.min(maxValue, baseValue + variance - 0.1))

        data.push({
          time: label,
          value: Number(value.toFixed(1)),
        })
      } else if (timeframe === "24h") {
        time.setHours(now.getHours() - (points - i))

        const variance = Math.random() * (maxValue - minValue) * 0.3
        const value = Math.max(minValue, Math.min(maxValue, baseValue + variance - 0.1))

        data.push({
          time: time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          value: Number(value.toFixed(1)),
        })
      } else {
        // 7d
        time.setDate(now.getDate() - (points - i))

        const variance = Math.random() * (maxValue - minValue) * 0.4
        const value = Math.max(minValue, Math.min(maxValue, baseValue + variance - 0.1))

        data.push({
          time: time.toLocaleDateString([], { month: "short", day: "numeric" }),
          value: Number(value.toFixed(1)),
        })
      }
    }

    return { data, unit, color, currentValue: data[data.length - 1].value, icon }
  }

  const { data, unit, color, currentValue, icon } = generateData()

  // Get title and normal range based on vital type
  const getVitalInfo = () => {
    switch (type) {
      case "heartRate":
        return { title: "Heart Rate", range: "60-100 bpm" }
      case "spo2":
        return { title: "SpO₂", range: "95-100%" }
      case "temperature":
        return { title: "Temperature", range: "36.5-37.5°C" }
      case "glucose":
        return { title: "Blood Glucose", range: "80-130 mg/dL" }
    }
  }

  const { title, range } = getVitalInfo()

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-md shadow-sm p-2 text-xs">
          <p className="font-medium">{payload[0].payload.time}</p>
          <p className="text-foreground">
            {title}:{" "}
            <span className="font-semibold">
              {payload[0].value} {unit}
            </span>
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <Card className="overflow-hidden w-full">
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            {icon}
            <div>
              <h3 className="font-medium text-sm">{title}</h3>
              <p className="text-xs text-muted-foreground">Normal : {range}</p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold">{currentValue}</span>
            <span className="text-sm ml-1">{unit}</span>
          </div>
        </div>
        <div className="h-32 w-full mt-5 relative">
          <ResponsiveContainer width="100%" height="100%" className="w-full absolute top-0">
            <LineChart data={data} margin={{ top: 5, right: 5, left: -37, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0} />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 10 }}
                tickMargin={5}
                axisLine={{ stroke: "#e0e0e0", strokeWidth: 1 }}
              />
              <YAxis
                domain={[
                  (dataMin: number) => Math.floor(dataMin * 0.95),
                  (dataMax: number) => Math.ceil(dataMax * 1.05),
                ]}
                tick={{ fontSize: 10 }}
                tickLine={false}
                tickMargin={5}
                axisLine={{ stroke: "#e0e0e0", strokeWidth: 1 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="value"
                stroke={color}
                strokeWidth={2}
                dot={{ r: 2, fill: color, strokeWidth: 0 }}
                activeDot={{ r: 3, stroke: color, strokeWidth: 1, fill: color }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
