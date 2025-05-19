"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {ToggleGroup,ToggleGroupItem} from "@/components/ui/toggle-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Mars } from 'lucide-react';
import { Transgender } from 'lucide-react';
import { Venus } from 'lucide-react';
interface PatientFormProps {
    onSubmit: (formData: FormData) => void
    isSubmitting: boolean
}

export default function PatientFormBoard({ onSubmit, isSubmitting }: PatientFormProps) {
    const [hasDiabetes, setHasDiabetes] = useState(false)
    return (
        <form action={onSubmit} className="space-y-8">
            <div className="grid md:grid-row-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <Card className="p-4 shadow-none">
                        <h3 className="mb-4 text-lg font-medium text-foreground">Personal Information</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-sm text-muted-foreground flex flex-row gap-1">
                                    <div className="text-md">FullName</div>
                                </Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    placeholder="Seeman"
                                    required
                                    className="focus-visible:ring-gray-600/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="age" className="text-sm text-muted-foreground flex flex-row gap-1">
                                    <div className="text-md">Age</div>
                                </Label>
                                <Input
                                    id="age"
                                    name="age"
                                    type="number"
                                    placeholder="58"
                                    required
                                    className="focus-visible:ring-gray-600/50"
                                />
                            </div>
                            <div className="space-y-2 flex flex-col items-start justify-center">
                                <Label htmlFor="age" className="text-sm text-muted-foreground flex flex-row gap-1">
                                    <div className="text-md">Gender</div>
                                </Label>
                                <ToggleGroup type="single" size="sm">
                                    <ToggleGroupItem value="male" aria-label="Toggle bold" className="border-1 p-4 py-5">
                                        <Mars className="text-blue-500"/>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="female" aria-label="Toggle italic" className="border-1 p-4 py-5">
                                        <Venus className="text-pink-500"/>
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="other" aria-label="Toggle strikethrough" className="border-1 p-4 py-5">
                                        <Transgender className="text-green-500"/>
                                    </ToggleGroupItem>
                                </ToggleGroup>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="age" className="text-sm text-muted-foreground flex flex-row gap-1">
                                    <div className="text-md">Contact Number</div>
                                </Label>
                                <Input
                                    id="contactNumber"
                                    name="contactNumber"
                                    placeholder="(123) 456-7890"
                                    required
                                    className="focus-visible:ring-gray-600/50"
                                />
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="space-y-4">
                    <Card className="p-4 shadow-none">
                        <h3 className="mb-4 text-lg font-medium text-foreground">Medical Information</h3>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="weight" className="text-sm text-muted-foreground">
                                    Weight (kg)
                                </Label>
                                <Input
                                    id="weight"
                                    name="weight"
                                    type="number"
                                    step="0.1"
                                    placeholder="70.5"
                                    className="focus-visible:ring-gray-600/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="height" className="text-sm text-muted-foreground">
                                    Height (ft)
                                </Label>
                                <Input
                                    id="height"
                                    name="height"
                                    type="number"
                                    step="0.1"
                                    placeholder="5.9"
                                    className="focus-visible:ring-gray-600/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bloodGroup" className="text-sm text-muted-foreground">
                                    Blood Group
                                </Label>
                                <Select name="bloodGroup">
                                    <SelectTrigger className="focus-visible:ring-gray-600/50">
                                        <SelectValue placeholder="Select blood group" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="A+">A+</SelectItem>
                                        <SelectItem value="A-">A-</SelectItem>
                                        <SelectItem value="B+">B+</SelectItem>
                                        <SelectItem value="B-">B-</SelectItem>
                                        <SelectItem value="AB+">AB+</SelectItem>
                                        <SelectItem value="AB-">AB-</SelectItem>
                                        <SelectItem value="O+">O+</SelectItem>
                                        <SelectItem value="O-">O-</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex items-center space-x-2">
                                <Switch
                                    id="hasDiabetes"
                                    name="hasDiabetes"
                                    checked={hasDiabetes}
                                    onCheckedChange={setHasDiabetes}
                                    className="data-[state=checked]:bg-[#444444]"
                                />
                                <Label htmlFor="hasDiabetes" className="text-sm text-muted-foreground">
                                    Does the patient have diabetes?
                                </Label>
                            </div>
                        </div>
                    </Card>
                    <div className="flex justify-center md:justify-end items-center md:items-end w-full space-x-4">
                        <Button
                            variant="outline"
                            type="reset"
                            className="text-muted-foreground hover:bg-transparent hover:text-foreground w-full md:w-auto"
                        >
                            Reset Form
                        </Button>
                        <Button type="submit" className="bg-black text-white hover:opacity-90 hover:bg-black w-full md:w-auto" disabled={isSubmitting}>
                            {isSubmitting ? "Processing..." : "Admit Patient"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}
