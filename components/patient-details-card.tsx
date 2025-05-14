import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"
import { patientData as patient } from "./patient-data"
interface userId {
  id: string
}
export function PatientDetailsCard({ id }: userId) {
  return (
    <Card>
      <CardHeader className="pb-2 px-3 md:px-4">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-blue-500 mb-[3px]" strokeWidth={2} />
            <span>Patient Details</span>
          </div>
          <span className="inline-flex items-center rounded-full bg-green-100/80 px-2 py-1 text-xs font-medium text-green-600">
            updated
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-3 md:px-4">
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-40 text-sm font-medium text-muted-foreground">MDN:</div>
            <div className="text-base font-semibold">MD-{id.padStart(6, "0")}</div>
          </div>

          <div className="flex items-center">
            <div className="w-40 text-sm font-medium text-muted-foreground">Weight:</div>
            <div className="text-base font-semibold">{patient[id].weight || 72} kg</div>
          </div>

          <div className="flex items-center">
            <div className="w-40 text-sm font-medium text-muted-foreground">Height:</div>
            <div className="text-base font-semibold">{patient[id].height || 178} cm</div>
          </div>

          <div className="flex items-center">
            <div className="w-40 text-sm font-medium text-muted-foreground">Blood Group:</div>
            <div className="text-base font-semibold">{patient[id].bloodGroup || "A+"}</div>
          </div>

          <div className="flex">
            <div className="w-40 text-sm font-medium text-muted-foreground">Allergies:</div>
            <div className="flex flex-wrap gap-1">
              {(patient[id].allergies || ["Penicillin", "Sulfa"]).map((allergy, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-red-100/80 px-2 py-1 text-xs font-medium text-red-600 dark:bg-red-900/20 dark:text-red-300"
                >
                  {allergy}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-40 text-sm font-medium text-muted-foreground">Dietary Restrictions:</div>
            <div className="text-base font-semibold">{patient[id].dietaryRestrictions || "Low sodium"}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
