/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bed, FootprintsIcon as Walking } from "lucide-react"

interface MovementTrackerProps {
  patientId: number
}

export function MovementTracker({ patientId }: MovementTrackerProps) {
  // Sample movement data
  const movementData = {
    currentStatus: "in-bed", // "in-bed" or "out-of-bed"
    movementCount: 8,
    recentMovements: [
      { time: "14:32", type: "exit" },
      { time: "14:15", type: "entry" },
      { time: "13:45", type: "exit" },
      { time: "13:20", type: "entry" },
      { time: "12:50", type: "exit" },
      { time: "12:30", type: "entry" },
    ],
    sensorStatus: "connected", // "connected" or "disconnected"
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Movement Tracking</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Status */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Current Status</div>
          <Badge
            variant={movementData.currentStatus === "in-bed" ? "outline" : "secondary"}
            className="flex items-center gap-1"
          >
            {movementData.currentStatus === "in-bed" ? (
              <>
                <Bed className="h-3 w-3" />
                <span>In Bed</span>
              </>
            ) : (
              <>
                <Walking className="h-3 w-3" />
                <span>Out of Bed</span>
              </>
            )}
          </Badge>
        </div>

        {/* Movement Timeline */}
        <div>
          <div className="text-sm text-muted-foreground mb-2">Movement Timeline</div>
          <div className="relative">
            <div className="absolute left-2 top-0 bottom-0 w-0.5 bg-muted"></div>
            <div className="space-y-3 ml-6">
              {movementData.recentMovements.map((movement, index) => (
                <div key={index} className="relative">
                  <div className="absolute -left-6 mt-1 w-2 h-2 rounded-full bg-primary"></div>
                  <div className="flex justify-between">
                    <span className="font-medium text-sm">
                      {movement.type === "entry" ? "Returned to bed" : "Left bed"}
                    </span>
                    <span className="text-xs text-muted-foreground">{movement.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Movement Count */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Total Movements (24h)</div>
          <div className="text-xl font-bold">{movementData.movementCount}</div>
        </div>

        {/* Sensor Status */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">Sensor Status</div>
          <Badge variant={movementData.sensorStatus === "connected" ? "outline" : "destructive"}>
            {movementData.sensorStatus === "connected" ? "Connected" : "Disconnected"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
