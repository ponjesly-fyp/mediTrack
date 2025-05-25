"use client"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { Mars } from 'lucide-react';
import { Venus } from 'lucide-react';
import { useEffect, useState } from "react"
import { PatientCardSkeleton } from "@/components/patients-card-skeleton"
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
export default function WardView() {
  const [isLoading, setIsLoading] = useState(true)
  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable":
        return "bg-green-500"
      case "attention":
        return "bg-yellow-400"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }
  function getRandomStatus(): "stable" | "attention" | "critical" {
    const statuses = ["stable", "attention", "critical"] as const;
    const randomIndex = Math.floor(Math.random() * statuses.length);
    return statuses[randomIndex];
  }
  const [patients, setPatients] = useState<Patient[]>([])
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const res = await fetch("/api/getPatients")
        if (!res.ok) throw new Error("Failed to fetch patients")
        const data = await res.json()
        setPatients(data.patients)
      } catch (error) {
        console.error("Error fetching patients:", error)
      } finally {
        setIsLoading(false)
      }
    }
    fetchPatients()
  }, [])
  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl font-recursive">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl font-bold">Ward View</h1>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, bed ID, or department..."
            className="pl-8 w-full sm:w-[300px]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {isLoading ? (
          <PatientCardSkeleton />
        ) : (
          patients.map((patient) => (
            <Link href={`/patient/${patient.roomNumber}`} key={patient._id} className="block">
              <Card className="h-full hover:shadow-md transition-shadow border-[1px]">
                <CardContent className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex flex-row gap-1">
                        {patient.gender === "male" ? (
                          <Mars className="w-4 h-4 mt-[5px] text-blue-500" />
                        ) : (
                          <Venus className="w-4 h-4 mt-[5px] text-pink-500" />
                        )}
                        <h3 className="font-semibold text-lg">{patient.fullName}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground">{patient.roomType}</p>
                      <p className="text-sm font-medium mt-2">Bed: {patient.roomNumber}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(getRandomStatus())}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))
        )}
      </div>

    </div>
  )
}