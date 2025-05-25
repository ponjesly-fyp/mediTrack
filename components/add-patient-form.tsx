/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Check, ChevronsUpDown, Stethoscope } from 'lucide-react';
import { User } from 'lucide-react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Mars } from 'lucide-react';
import { Transgender } from 'lucide-react';
import { Venus } from 'lucide-react';
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { useRouter } from "next/navigation"
import {
    Command,
    CommandGroup,
    CommandItem,
} from "@/components/ui/command"
import { cn } from "@/lib/utils"
import { toast } from "@/hooks/use-toast"
interface PatientFormProps {
    onSubmit: (formData: FormData) => void
    isSubmitting: boolean
    roomNumber: string
}
const ALLERGY_OPTIONS = [
    "Penicillin",
    "Sulfa Drugs",
    "Aspirin",
    "NSAIDs",
    "Latex",
    "Peanuts",
    "Dairy",
    "Gluten",
    "Soy",
    "Shellfish",
    "Eggs",
]
interface FormDataType {
    roomNumber: string
    fullName: string;
    age: number;
    gender: string;
    contactNumber: number;
    weight: number;
    height: number;
    allergies: string[];
    bloodGroup: string;
}
export default function PatientFormBoard({ onSubmit, isSubmitting, roomNumber }: PatientFormProps) {
    const [selectedAllergies, setSelectedAllergies] = useState<string[]>([])
    const toggleAllergy = (allergy: string) => {
        setSelectedAllergies((prev: string[]) =>
            prev.includes(allergy)
                ? prev.filter((a) => a !== allergy)
                : [...prev, allergy]
        )
    }
    const router = useRouter()
    const [formData, setFormData] = useState<FormDataType>({
        roomNumber: "",
        fullName: "",
        age: 0,
        gender: "",
        contactNumber: 0,
        weight: 0,
        height: 0,
        allergies: [],
        bloodGroup: ""
    })
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }
    const insertHandler = async (formData: FormDataType) => {
        const response = await fetch('/api/insertPatient', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        })
        if (response.status == 500) {
            toast({
                title: "Server Busy",
                description: "We couldn't admit the patient at the moment. Please try again shortly.",
                variant: "destructive",
            })
        } else {
            const data = await response.json();
            if (data.message == "inserted") {
                router.push("/admin/rooms")
                toast({
                    title: "Patient Admitted",
                    description: "The patient has been successfully added to the system.",
                    variant: "default",
                })
            }
        }
    }
    return (
        <form action={onSubmit} className="space-y-8">
            <div className="grid md:grid-row-1 gap-6 md:grid-cols-2">
                <div className="space-y-4">
                    <Card className="p-4 shadow-none">
                        <div className="flex flex-row gap-1">
                            <User className="w-[19px] h-[19px] text-blue-500 mt-[3px]" />
                            <h3 className="mb-4 text-lg font-medium text-foreground">Personal Information</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="fullName" className="text-sm text-muted-foreground flex flex-row gap-1">
                                    <div className="text-md">FullName</div>
                                </Label>
                                <Input
                                    id="fullName"
                                    name="fullName"
                                    onChange={handleInputChange}
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
                                    onChange={handleInputChange}
                                    placeholder="58"
                                    required
                                    className="focus-visible:ring-gray-600/50"
                                />
                            </div>
                            <div className="space-y-2 flex flex-col items-start justify-center">
                                <Label htmlFor="age" className="text-sm text-muted-foreground flex flex-row gap-1">
                                    <div className="text-md">Gender</div>
                                </Label>
                                <ToggleGroup type="single" size="sm" onValueChange={(value) => {
                                    setFormData({ ...formData, gender: value })
                                }}>
                                    <ToggleGroupItem value="male" aria-label="Toggle bold" className="border-1 p-4 py-5">
                                        <Mars className="text-blue-500" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="female" aria-label="Toggle italic" className="border-1 p-4 py-5">
                                        <Venus className="text-pink-500" />
                                    </ToggleGroupItem>
                                    <ToggleGroupItem value="other" aria-label="Toggle strikethrough" className="border-1 p-4 py-5">
                                        <Transgender className="text-green-500" />
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
                                    onChange={handleInputChange}
                                    placeholder="(+91) 9025604733"
                                    required
                                    className="focus-visible:ring-gray-600/50"
                                />
                            </div>
                        </div>
                    </Card>
                </div>
                <div className="space-y-4">
                    <Card className="p-4 shadow-none">
                        <div className="flex flex-row gap-1">
                            <Stethoscope className="w-[19px] h-[19px] text-red-500 mt-[4px]" />
                            <h3 className="mb-4 text-lg font-medium text-foreground">Medical Information</h3>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="weight" className="text-sm text-muted-foreground">
                                    Weight (kg)
                                </Label>
                                <Input
                                    id="weight"
                                    name="weight"
                                    type="number"
                                    onChange={handleInputChange}
                                    step="0.1"
                                    placeholder="70.5"
                                    className="focus-visible:ring-gray-600/50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="height" className="text-sm text-muted-foreground">
                                    Height (cm)
                                </Label>
                                <Input
                                    id="height"
                                    name="height"
                                    type="number"
                                    onChange={handleInputChange}
                                    step="0.1"
                                    placeholder="170"
                                    className="focus-visible:ring-gray-600/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm text-muted-foreground">Allergies</label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            className="w-full justify-between text-muted-foreground hover:text-muted-foreground"
                                        >
                                            {selectedAllergies.length > 0
                                                ? `${selectedAllergies.length} selected`
                                                : "Choose allergies"}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[300px] p-0">
                                        <Command>
                                            <CommandGroup className="font-recursive">
                                                {ALLERGY_OPTIONS.map((allergy) => (
                                                    <CommandItem
                                                        key={allergy}
                                                        onSelect={() => toggleAllergy(allergy)}
                                                    >
                                                        <Check
                                                            className={cn(
                                                                "mr-2 h-4 w-4",
                                                                selectedAllergies.includes(allergy)
                                                                    ? "opacity-100"
                                                                    : "opacity-0"
                                                            )}
                                                        />
                                                        {allergy}
                                                    </CommandItem>
                                                ))}
                                            </CommandGroup>
                                        </Command>
                                    </PopoverContent>
                                </Popover>

                                <div className="text-sm text-muted-foreground flex flex-row gap-2 flex-wrap items-center">
                                    <p>Selected Allergies:</p>
                                    <div className="flex flex-row gap-1 flex-wrap">
                                        {selectedAllergies.map((a) => (
                                            <div key={a} className="bg-gradient-to-r from-red-400 to-red-500 text-white p-1 text-xs rounded-full px-2">
                                                {a}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="bloodGroup" className="text-sm text-muted-foreground">
                                    Blood Group
                                </Label>
                                <Select name="bloodGroup" onValueChange={(value) => {
                                    setFormData({ ...formData, bloodGroup: value })
                                }}>
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
                        <Button type="submit" className="bg-black text-white hover:opacity-90 hover:bg-black w-full md:w-auto" disabled={isSubmitting} onClick={() => {
                            const updatedFormData = {
                                ...formData,
                                allergies: selectedAllergies,
                                roomNumber: roomNumber,
                            }
                            setFormData(updatedFormData)
                            insertHandler(updatedFormData)
                        }}>
                            {isSubmitting ? "Processing..." : "Admit Patient"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}
