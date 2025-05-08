import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import { patientData } from "@/components/patient-data"
export default function WardView() {

  // Function to get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "stable":
        return "bg-green-500"
      case "attention":
        return "bg-yellow-500"
      case "critical":
        return "bg-red-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
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
        {Object.entries(patientData).map(([id, bed]) => (
          <Link href={`/patient/${id}`} key={id} className="block">
            <Card className={`h-full hover:shadow-md transition-shadow ${bed.gender == "Male" ? "border-blue-400": bed.gender == "Female" ? "border-pink-400" : "border-t-pink-400 border-b-blue-400 border-r-blue-400 border-l-pink-400"} border-[3px]`}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg">{bed.patientName}</h3>
                    <p className="text-sm text-muted-foreground">{bed.department}</p>
                    <p className="text-sm font-medium mt-2">Bed: {bed.bedId}</p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(bed.status)}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}