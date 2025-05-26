"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, Heart, User } from "lucide-react"
import { Sparkles } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai"
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "./ui/button";
interface dataProps {
  name: string,
  weight: number,
  height: number,
  bloodGroup: string,
  allergies: string[]
}
interface PatientSummary {
  summary: string;
  riskFactors: string[];
  advice: string;
}
export function PatientDetailsCard({ name, weight, height, bloodGroup, allergies }: dataProps) {
  const [patientSummary, setPatientSummary] = useState<PatientSummary | null>({
    summary: "",
    riskFactors: [],
    advice: "",
  })
  const [open, setOpen] = useState(false)
  const gemini = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY!)
  const aiModel = gemini.getGenerativeModel({ model: "gemini-2.0-flash" })
  const generatePatientSummary = async ({
    fullName,
    weight,
    height,
    bloodGroup,
    allergies,
  }: {
    fullName: string;
    weight: number;
    height: number;
    bloodGroup: string;
    allergies: string[];
  }) => {
    const prompt = `
      You are a medical assistant AI. Based on the patient's profile, generate a brief health summary. Mention the patient's name naturally. Comment on physical attributes, blood group implications, and allergy-related precautions. Be concise and professional.

      Patient Details:
      - Full Name: ${fullName}
      - Weight: ${weight} kg
      - Height: ${height} cm
      - Blood Group: ${bloodGroup}
      - Allergies: ${allergies.length > 0 ? allergies.join(", ") : "None"}

      Respond strictly in this JSON format:
      {
        "summary": "string - 2-3 line summary including patient's name",
        "riskFactors": ["string", "string"],
        "advice": "short medical advice or note"
      }
      Return only the JSON. No extra explanation.
      `;
    const result = await aiModel.generateContent(prompt);
    const jsonString = await result.response.text();
    const cleaned = jsonString.replace(/```(?:json)?\s*([\s\S]*?)\s*```/, '$1');
    const jsonData = JSON.parse(cleaned);

    setPatientSummary({
      summary: jsonData.summary,
      riskFactors: jsonData.riskFactors,
      advice: jsonData.advice,
    });
  };
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
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <button className="px-4 py-2 rounded-l-full rounded-r-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold shadow-md hover:from-blue-600 hover:to-purple-700 transition-colors text-sm w-full flex flex-row gap-1 items-center justify-center" onClick={() => {
                generatePatientSummary({fullName: name, weight, height, allergies, bloodGroup});
              }}>
                <Sparkles className="w-4 h-4" />
                <h1>Generate Summary</h1>
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[500px] flex flex-col font-recursive">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Medical Summary - {name}
                </DialogTitle>
                <DialogDescription>Comprehensive health overview and risk assessment</DialogDescription>
              </DialogHeader>

              <div className="space-y-3 overflow-y-auto flex-1 pr-2">
                {/* Summary Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Heart className="w-5 h-5 text-green-600" />
                      Health Summary
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground leading-relaxed">{patientSummary!.summary}</p>
                  </CardContent>
                </Card>

                {/* Risk Factors Section */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-base">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      Risk Factors
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {patientSummary!.riskFactors.map((risk, index) => (
                        <Badge key={index} variant="destructive" className="text-xs">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {risk}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Medical Advice Section */}
                <Card className="border-amber-200 bg-amber-50">
                  <CardHeader>
                    <CardTitle className="text-base text-amber-800">Medical Advice</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-amber-700 font-medium">{patientSummary!.advice}</p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={() => setOpen(false)} variant="outline">
                  Close
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardContent>
    </Card>
  )
}
