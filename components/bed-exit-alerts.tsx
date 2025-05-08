"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, CheckCircle, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BedExitAlertsProps {
  patientId: number
}

export function BedExitAlerts({ patientId }: BedExitAlertsProps) {
  const { toast } = useToast()
  const [activeAlert, setActiveAlert] = useState(true)

  // Sample alert data
  const alertData = {
    timestamp: "14:32",
    riskLevel: "high", // "high" or "low"
    history: [
      { date: "May 7, 2023", time: "14:32", resolved: false },
      { date: "May 7, 2023", time: "12:50", resolved: true },
      { date: "May 6, 2023", time: "23:15", resolved: true },
      { date: "May 6, 2023", time: "18:40", resolved: true },
    ],
  }

  const acknowledgeAlert = () => {
    setActiveAlert(false)
    toast({
      title: "Alert Acknowledged",
      description: "Bed exit alert has been acknowledged and cleared",
    })
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <span>Bed Exit Alerts</span>
          <Badge variant={activeAlert ? "destructive" : "outline"}>{activeAlert ? "Active Alert" : "No Alerts"}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activeAlert && (
          <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-md p-4 animate-pulse">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
              <div className="flex-1">
                <div className="font-medium">Patient Out of Bed</div>
                <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                  <Clock className="h-3 w-3" />
                  <span>Alert triggered at {alertData.timestamp}</span>
                </div>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant={alertData.riskLevel === "high" ? "destructive" : "warning"}>
                    {alertData.riskLevel === "high" ? "High Risk" : "Low Risk"}
                  </Badge>
                  <Button size="sm" onClick={acknowledgeAlert}>
                    Acknowledge
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div>
          <div className="text-sm text-muted-foreground mb-2">Alert History</div>
          <div className="space-y-2 max-h-[200px] overflow-y-auto pr-1">
            {alertData.history.map((alert, index) => (
              <div key={index} className="flex items-center justify-between p-2 text-sm border rounded-md">
                <div>
                  <div className="font-medium">Patient Out of Bed</div>
                  <div className="text-xs text-muted-foreground">
                    {alert.date} at {alert.time}
                  </div>
                </div>
                <Badge variant={alert.resolved ? "outline" : "destructive"} className="ml-2">
                  {alert.resolved ? (
                    <span className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Resolved
                    </span>
                  ) : (
                    <span className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Active
                    </span>
                  )}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
