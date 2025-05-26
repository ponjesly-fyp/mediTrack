import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User } from "lucide-react"
import { Sparkles } from 'lucide-react';
interface dataProps {
  weight: number,
  height: number,
  bloodGroup: string,
  allergies: string[]
}
export function PatientDetailsCard({ weight, height, bloodGroup, allergies }: dataProps) {
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
            <div className="text-base font-semibold">MD-{"101".padStart(6, "0")}</div>
          </div>

          <div className="flex items-center">
            <div className="w-40 text-sm font-medium text-muted-foreground">Weight:</div>
            <div className="text-base font-semibold">{weight || 72} kg</div>
          </div>

          <div className="flex items-center">
            <div className="w-40 text-sm font-medium text-muted-foreground">Height:</div>
            <div className="text-base font-semibold">{height || 178} cm</div>
          </div>

          <div className="flex items-center">
            <div className="w-40 text-sm font-medium text-muted-foreground">Blood Group:</div>
            <div className="text-base font-semibold">{bloodGroup || "A+"}</div>
          </div>

          <div className="flex">
            <div className="w-40 text-sm font-medium text-muted-foreground">Allergies:</div>
            <div className="flex flex-wrap gap-1">
              {(allergies || ["Penicillin", "Sulfa"]).slice(0, 2).map((allergy, index) => (
                <span
                  key={index}
                  className="inline-flex items-center rounded-full bg-red-100/80 px-2 py-1 text-xs font-medium text-red-600 dark:bg-red-900/20 dark:text-red-300"
                >
                  {allergy}
                </span>
              ))}
            </div>
          </div>
          <button className="px-4 py-2 rounded-l-full rounded-r-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-purple-700 transition-colors text-sm w-full flex flex-row gap-1 items-center justify-center">
            <Sparkles className="w-4 h-4"/>
            <h1>Generate Summary</h1>
          </button>
        </div>
      </CardContent>
    </Card>
  )
}
