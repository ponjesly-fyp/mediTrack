/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertTriangle, Bell, Droplet, Pill } from "lucide-react"


export function AlertLog() {
  // Sample alert data
  const alerts = [
    {
      id: 1,
      type: "vital",
      message: "Heart rate above normal range",
      timestamp: "14:25",
      severity: "high",
      icon: Activity,
    },
    {
      id: 2,
      type: "medication",
      message: "Medication due in 15 minutes",
      timestamp: "14:15",
      severity: "medium",
      icon: Pill,
    },
    {
      id: 3,
      type: "iv",
      message: "IV fluid level below 25%",
      timestamp: "13:50",
      severity: "medium",
      icon: Droplet,
    },
    {
      id: 4,
      type: "vital",
      message: "Blood pressure elevated",
      timestamp: "13:30",
      severity: "low",
      icon: Activity,
    },
    {
      id: 5,
      type: "movement",
      message: "Prolonged bed exit",
      timestamp: "12:45",
      severity: "high",
      icon: AlertTriangle,
    },
  ]

  // Get severity badge variant
  const getSeverityVariant = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive"
      case "medium":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3 px-3 md:px-4">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="h-5 w-5 text-orange-500" strokeWidth={2}/>
          <span>Alert Log</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 md:px-4">
        <div className="relative">
          {/* Top mask */}
          <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 bg-gradient-to-b from-white dark:from-[#0c0c0c] to-transparent z-10" />

          {/* Bottom mask */}
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-white dark:from-[#0c0c0c] to-transparent z-10" />

          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-md">
                <div
                  className={`
              rounded-full p-1.5
              ${alert.severity === "high"
                      ? "bg-red-100 text-red-500 dark:bg-red-950/50"
                      : alert.severity === "medium"
                        ? "bg-yellow-100 text-yellow-600 dark:bg-yellow-950/50"
                        : "bg-blue-100 text-blue-500 dark:bg-blue-950/50"
                    }
            `}
                >
                  <alert.icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start gap-2">
                    <div className="font-medium text-sm">{alert.message}</div>
                    <Badge variant={getSeverityVariant(alert.severity)} className="shrink-0">
                      {alert.severity}
                    </Badge>
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">{alert.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
