/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Activity, AlertTriangle, Bell, Droplet, Pill } from "lucide-react"

interface AlertLogProps {
  patientId: number
}

export function AlertLog({ patientId }: AlertLogProps) {
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
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <span>Alert Log</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-md">
              <div
                className={`
                rounded-full p-1.5
                ${
                  alert.severity === "high"
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
      </CardContent>
    </Card>
  )
}
