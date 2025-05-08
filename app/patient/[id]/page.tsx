"use client"

import { useState } from "react"
import { useEffect } from "react"
import { patientData } from "@/components/patient-data"
import {use} from "react"
import Link from "next/link"
import { Activity, ArrowLeft, ChevronDown, Download, Pause, Play } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { IVFluidIndicator } from "@/components/iv-fluid-indicator"
import { VitalsChart } from "@/components/vitals-chart"
import { MovementTracker } from "@/components/movement-tracker"
import { BedExitAlerts } from "@/components/bed-exit-alerts"
import { AlertLog } from "@/components/alert-log"

export default function PatientDashboard({ params }: { params: Promise<{ id: string }> }) {
  const {id} = use(params)
  const patientInfo = patientData[String(id)]
  const { toast } = useToast()
  const [ivFlowPaused, setIvFlowPaused] = useState(false)
  const [level,setLevel] = useState(0)
  useEffect(() => {
    const fetchData = async ()=>{
      const response = await fetch(`https://hcsr04-bcae2-default-rtdb.asia-southeast1.firebasedatabase.app/.json`)
      const data = await response.json()
      setLevel(data.distance)
    }
    fetchData()
    const interval = setInterval(fetchData,5000)
    return () => clearInterval(interval);
  },[])
  const patient = {
    id: Number.parseInt(id),
    name: patientInfo.patientName,
    age: patientInfo.age,
    gender: patientInfo.gender,
    roomNumber: patientInfo.bedId,
    admissionDate: "2023-05-15",
    diagnosis: "Congestive Heart Failure",
    ivFlowRate: 120,
  }

  const toggleIVFlow = () => {
    setIvFlowPaused(!ivFlowPaused)
    toast({
      title: ivFlowPaused ? "IV Flow Resumed" : "IV Flow Paused",
      description: `IV flow has been ${ivFlowPaused ? "resumed" : "paused"} for ${patient.name}`,
    })
  }

  const downloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Medical report has been downloaded successfully",
    })
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Ward View</span>
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{patient.name}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{patient.age} yrs</span>
              <span>•</span>
              <span>{patient.gender}</span>
              <span>•</span>
              <span>Room {patient.roomNumber}</span>
            </div>
          </div>
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <Button variant="default" onClick={downloadReport} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            <span>Download Report</span>
          </Button>
        </div>
      </div>

      {/* Row 1: IV Fluid Status (1/3) and Vitals (2/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - IV Fluid Status and Bed Exit Alerts */}
        <div className="space-y-6">
          {/* IV Fluid Status */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex justify-between items-center">
                <span>IV Fluid Status</span>
                <Badge variant={ivFlowPaused ? "destructive" : "outline"}>{ivFlowPaused ? "Paused" : "Active"}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <IVFluidIndicator
                  fluidLevel={level}
                  flowRate={patient.ivFlowRate}
                  isPaused={ivFlowPaused}
                />
                <Button
                  onClick={toggleIVFlow}
                  variant={ivFlowPaused ? "destructive" : "default"}
                  className="mt-4 w-full"
                >
                  {ivFlowPaused ? (
                    <>
                      <Play className="h-4 w-4 mr-2" /> Resume IV Flow
                    </>
                  ) : (
                    <>
                      <Pause className="h-4 w-4 mr-2" /> Pause IV Flow
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bed Exit Alerts - Added below IV Fluid Status */}
          <BedExitAlerts patientId={patient.id} />
        </div>

        {/* Right Column - Real-Time Vitals */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5" />
                <span>Real-Time Vitals</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="1h">
                <div className="flex justify-between items-center mb-4">
                  <TabsList>
                    <TabsTrigger value="1h">1h</TabsTrigger>
                    <TabsTrigger value="24h">24h</TabsTrigger>
                    <TabsTrigger value="7d">7d</TabsTrigger>
                  </TabsList>
                  <Button variant="secondary" size="sm" className="text-xs flex items-center">
                    More Details <ChevronDown className="ml-1 h-3 w-3" />
                  </Button>
                </div>
                <TabsContent value="1h" className="space-y-6">
                  <VitalsChart type="heartRate" timeframe="1h" />
                  <VitalsChart type="spo2" timeframe="1h" />
                  <VitalsChart type="temperature" timeframe="1h" />
                  <VitalsChart type="glucose" timeframe="1h" />
                </TabsContent>
                <TabsContent value="24h" className="space-y-6">
                  <VitalsChart type="heartRate" timeframe="24h" />
                  <VitalsChart type="spo2" timeframe="24h" />
                  <VitalsChart type="temperature" timeframe="24h" />
                  <VitalsChart type="glucose" timeframe="24h" />
                </TabsContent>
                <TabsContent value="7d" className="space-y-6">
                  <VitalsChart type="heartRate" timeframe="7d" />
                  <VitalsChart type="spo2" timeframe="7d" />
                  <VitalsChart type="temperature" timeframe="7d" />
                  <VitalsChart type="glucose" timeframe="7d" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Row 2: Movement Tracking and Alert Log */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Movement Tracking */}
        <div>
          <MovementTracker patientId={patient.id} />
        </div>

        {/* Alert Log */}
        <div>
          <AlertLog patientId={patient.id} />
        </div>
      </div>
    </div>
  )
}
