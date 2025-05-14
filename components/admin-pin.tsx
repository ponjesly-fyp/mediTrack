"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Button } from "@/components/ui/button"
import { RectangleEllipsis } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Image from "next/image"

export default function PinVerification() {
    const router = useRouter()
    const [otp, setOtp] = useState("")
    const [isModalOpen, setIsModalOpen] = useState(false)

    const correctPin = process.env.NEXT_PUBLIC_ADMIN_PIN

    const handleVerify = () => {
        if (otp === correctPin) {
            router.push("/admin/rooms")
        } else {
            setIsModalOpen(true)
        }
    }
    return (
        <div className="flex min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-80px)] flex-col items-center justify-center px-4 py-4 overflow-hidden">
            <div className="w-full max-w-md space-y-8 rounded-lg border px-6 py-10 shadow-md">
                <div className="flex flex-col items-center justify-center">
                    <div className="flex flex-row gap-2">
                        <RectangleEllipsis className="w-7 h-7 mt-[2px]"/>
                        <h1 className="text-2xl font-bold">Enter Admin Pin</h1>
                    </div>
                    <div className="mt-2 text-muted-foreground text-center">
                        Please enter the 4-digit PIN
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="flex justify-center mb-3">
                        <InputOTP
                            maxLength={4}
                            value={otp}
                            onChange={setOtp}
                            pattern="^[0-9]+$"
                            render={() => (
                                <InputOTP maxLength={4} value={otp} onChange={setOtp}>
                                    <InputOTPGroup className="[text-security:disc] [-webkit-text-security:disc]">
                                        <InputOTPSlot index={0} className="w-[50px] h-[50px] border-black text-semibold text-lg"/>
                                        <InputOTPSlot index={1} className="w-[50px] h-[50px] border-black text-semibold text-lg"/>
                                        <InputOTPSlot index={2} className="w-[50px] h-[50px] border-black text-semibold text-lg"/>
                                        <InputOTPSlot index={3} className="w-[50px] h-[50px] border-black text-semibold text-lg"/>
                                    </InputOTPGroup>
                                </InputOTP>
                            )}
                        />
                    </div>

                    <Button className="w-full bg-black py-6 hover:opacity-90 hover:bg-black" onClick={handleVerify} disabled={otp.length !== 4}>
                        Verify
                    </Button>
                </div>
            </div>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="w-[calc(100vw-40px)] md:max-w-md rounded-xl pt-8 font-recursive">
                    <DialogHeader>
                        <DialogTitle className="flex flex-row gap-2 items-center justify-center">
                            <span>Incorrect PIN</span>
                        </DialogTitle>
                        <DialogDescription className="text-center">
                            The PIN you entered is incorrect
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center space-y-4">
                        <div className="relative h-[270px] w-[270px] overflow-hidden rounded-md">
                            <Image
                                src="/seeman.jpg"
                                alt="Error illustration"
                                fill
                                className="object-fit"
                            />
                        </div>
                        <Button onClick={() => setIsModalOpen(false)} className="w-full bg-black py-6 hover:opacity-90 hover:bg-black">Try Again</Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
