/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import React from 'react'
import { use } from 'react'
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import PatientFormBoard from '@/components/add-patient-form'
const PatientForm = ({ params }: { params: Promise<{ id: string }> }) => {
    const roomNumber = use(params)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const handleSubmit = async (formData: FormData) => {
        setIsSubmitting(true)
        await new Promise((resolve) => setTimeout(resolve, 1500))
        setIsSubmitting(false)
        alert("Patient added successfully!")
    }
    return (
        <div className="min-h-screen bg-background font-recursive">
            <div className="container px-[17px] md:px-[25px] pb-8 pt-1">
                <div className="mb-5">
                    <Link href="/admin/rooms" className="mb-4 inline-flex items-center text-gray-500 hover:text-gray-800 text-sm">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-medium text-gray-800">Room | <span className='font-bold'>{roomNumber.id}</span></h1>
                    <p className="text-gray-500 text-sm">Enter patient details for admission</p>
                </div>
                <div className="p-0">
                    <PatientFormBoard onSubmit={handleSubmit} isSubmitting={isSubmitting} roomNumber={roomNumber.id}/>
                </div>
            </div>
        </div>
    )
}
export default PatientForm