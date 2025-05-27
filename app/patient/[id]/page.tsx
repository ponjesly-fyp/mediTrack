/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { useState } from "react"
import { useEffect } from "react"
import { patientData } from "@/components/patient-data"
import { Droplets } from 'lucide-react';
import { LoaderCircle } from 'lucide-react';
import { Battery } from 'lucide-react';
import { SquareActivity } from 'lucide-react';
import { use } from "react"
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
import { PatientDetailsCard } from "@/components/patient-details-card";
import HeartbeatMonitor from "@/components/heartbeat-monitor";
import TemperatureMonitor from "@/components/temperature-monitor";
import PatientDetailsCardSkeleton from "@/components/patient-details-skeleton";
type Patient = {
  _id: string
  fullName: string
  age: number
  gender: string
  contactNumber: number
  weight: number
  height: number
  allergies: string[]
  bloodGroup: string
  roomNumber: string
  roomType: string
}

export default function PatientDashboard({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const { toast } = useToast()
  const [patientdata, setPatientData] = useState<Patient>()
  const [ivFlowPaused, setIvFlowPaused] = useState(false)
  const [level, setLevel] = useState(0)
  const [bpm, setBpm] = useState(72)
  const [temp, setTemp] = useState(96)
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let interval: NodeJS.Timeout;

    const fetchPatientData = async () => {
      try {
        const response = await fetch("/api/getPatient", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ roomNumber: id }),
        });

        if (!response.ok) throw new Error("Failed to fetch patients");

        const data = await response.json();
        setPatientData(data.patient);
      } catch (error) {
        console.error("Error fetching patients:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://hcsr04-bcae2-default-rtdb.asia-southeast1.firebasedatabase.app/.json"
        );
        const data = await response.json();
        setLevel(data.distance);
        setBpm(data.bpm);
        setTemp(data.temperature);
        if (data.buttonState == false) {
          if (navigator.vibrate) {
            navigator.vibrate(5000)
          }
          toast({
            variant: "destructive",
            title: `Emergency in Room ${id}`,
            description: `Patient ${patientdata?.fullName} has pressed the emergency button.`,
          })
        }
      } catch (error) {
        console.error("Error fetching sensor data:", error);
      }
    };

    const startPolling = () => {
      fetchData();
      interval = setInterval(() => {
        if (document.visibilityState === "visible") {
          fetchData();
        }
      }, 5000);
    };

    const stopPolling = () => {
      clearInterval(interval);
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        startPolling();
      } else {
        stopPolling();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    fetchPatientData();
    startPolling();

    return () => {
      stopPolling();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);


  const [pump, setPump] = useState(false);
  const [isRefilling, setIsRefilling] = useState(false)
  useEffect(() => {
    const fetchPumpState = async () => {
      try {
        const res = await fetch("https://hcsr04-bcae2-default-rtdb.asia-southeast1.firebasedatabase.app/pumpState.json");
        let data = await res.json();
        if (data === true) {
          await fetch("https://hcsr04-bcae2-default-rtdb.asia-southeast1.firebasedatabase.app/pumpState.json", {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(false),
          });
          data = false;
        }

        setPump(data);
      } catch (error) {
        console.error("Error fetching pump state:", error);
      }
    };

    fetchPumpState();
  }, []);

  const toggleBuzzer = async () => {
    const newState = !pump;
    await fetch("https://hcsr04-bcae2-default-rtdb.asia-southeast1.firebasedatabase.app/pumpState.json", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newState),
    });
    setPump(newState);
    setIsRefilling(!isRefilling)
  };

  const patient = {
    id: patientdata?.roomNumber,
    name: patientdata?.fullName,
    age: patientdata?.age,
    gender: patientdata?.gender.toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '),
    roomNumber: patientdata?.roomNumber,
    admissionDate: "2023-05-15",
    diagnosis: "Congestive Heart Failure",
    ivFlowRate: 120,
  }
  return (
    <div className="container mx-auto px-3 py-6 max-w-7xl font-recursive">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back to Ward View</span>
            </Link>
          </Button>
          {loading ? <div>
            <div className="h-6 w-40 rounded bg-muted animate-pulse mb-2"></div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="h-4 w-10 rounded bg-muted animate-pulse"></div>
              <span>•</span>
              <div className="h-4 w-12 rounded bg-muted animate-pulse"></div>
              <span>•</span>
              <div className="h-4 w-20 rounded bg-muted animate-pulse"></div>
            </div>
          </div> : <div>
            <h1 className="text-2xl font-bold font-recursive">{patient.name}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>{patient.age} yrs</span>
              <span>•</span>
              <span>{patient.gender}</span>
              <span>•</span>
              <span>Room {patient.roomNumber}</span>
            </div>
          </div>}
        </div>
      </div>

      {/* Row 1: IV Fluid Status (1/3) and Vitals (2/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - IV Fluid Status and Bed Exit Alerts */}
        <div className="space-y-6">
          {/* IV Fluid Status */}
          {loading ? <PatientDetailsCardSkeleton /> : <PatientDetailsCard
            name={patientdata?.fullName ?? ""}
            weight={patientdata?.weight ?? 72}
            height={patientdata?.height ?? 170}
            bloodGroup={patientdata?.bloodGroup ?? "Unknown"}
            allergies={patientdata?.allergies ?? []}
          />}
          <Card>
            <CardHeader className="pb-2 px-3 md:px-4">
              <CardTitle className="text-lg flex justify-between items-center">
                <div className="flex items-center gap-1">
                  <Battery className="h-5 w-5 text-blue-500 mb-[4px] -rotate-90" strokeWidth={2} />
                  <span>IV Fluid Status</span>
                </div>
                <Badge variant={ivFlowPaused ? "destructive" : "outline"}>{ivFlowPaused ? "Paused" : "Active"}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-4">
              <div className="flex flex-col items-center">
                <IVFluidIndicator
                  fluidLevel={level}
                  flowRate={patient.ivFlowRate}
                  isPaused={ivFlowPaused}
                />
                <div className="flex flex-row items-center justify-between w-full gap-2">
                  <Button
                    onClick={toggleBuzzer}
                    className={`mt-6 w-full py-6 rounded-xl bg-gradient-to-r from-red-400 to-red-500
                      } text-white font-semibold transition-all duration-500 hover:bg-opacity-90`}
                  >
                    {isRefilling ? (
                      <div className="flex flex-col items-center justify-center">
                        <div className="flex flex-row gap-2">
                          <LoaderCircle className="h-5 w-5 animate-spin" />
                          <h1>Refilling</h1>
                        </div>
                        <p className="text-xs font-normal">click to pause</p>
                      </div>
                    ) : (
                      <><Droplets className="h-5 w-5" /> Refill</>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Bed Exit Alerts - Added below IV Fluid Status */}
        </div>

        {/* Right Column - Real-Time Vitals */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-4 px-3 md:px-4">
              <CardTitle className="text-lg flex items-center gap-2">
                <SquareActivity className="h-5 w-5 text-red-500 mb-[0.75px]" strokeWidth={2} />
                <span>Real-Time Vitals</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="px-3 md:px-4 w-[100%] flex flex-col gap-3">
              <Card className="w-full mx-auto overflow-hidden">
                <CardContent className="p-4">
                  <HeartbeatMonitor heartRate={bpm} />
                </CardContent>
              </Card>
              <TemperatureMonitor temperature={temp} />
              <VitalsChart type="glucose" timeframe="1h" />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Row 2: Movement Tracking and Alert Log */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Movement Tracking */}
        <div>
          <MovementTracker />
        </div>

        {/* Alert Log */}
        <div>
          <AlertLog />
        </div>
      </div>
    </div>
  )
}
