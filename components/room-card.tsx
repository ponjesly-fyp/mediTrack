"use client"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { UserPlus } from 'lucide-react';
import { UserMinus } from 'lucide-react';
import { useRouter } from "next/navigation";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction
} from "@/components/ui/alert-dialog";
import { useState } from "react";
interface RoomCardProps {
    room: {
        id: number
        roomNumber: string
        roomType: string
        available: boolean
    }
}
export default function RoomCard({ room }: RoomCardProps) {
    const router = useRouter()
    const [inputValue, setInputValue] = useState("");
    const getText = (available: boolean) => {
        if (available) {
            return "Add Patient"
        }
        else {
            return "Remove Patient"
        }
    }
    return (
        <Card className={`overflow-hidden border transition-all hover:shadow-md`}>
            <CardContent className="p-0">
                <div className="border-b border-gray-100 p-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-800">Room {room.roomNumber}</h3>
                        {room.available ? <span className="inline-flex items-center rounded-full bg-green-100/80 px-2 py-1 text-xs font-medium text-green-600">
                            Available
                        </span> : <span className="inline-flex items-center rounded-full bg-red-100/80 px-2 py-1 text-xs font-medium text-red-600">
                            Occupied
                        </span>}
                    </div>
                    <p className="text-gray-500 text-sm">{room.roomType}</p>
                </div>
            </CardContent>
            <div>
                {room.available ? <CardFooter className="items-center justify-center p-3 bg-black/90 text-white transition-all duration-300 hover:opacity-90" onClick={() => {
                    router.push(`/admin/new-patient/${room.roomNumber}`)
                }}>
                    <button className="font-semibold text-sm flex flex-row gap-1">
                        <UserPlus className="w-4 h-4 mt-[0.75px]" />
                        {getText(room.available)}
                    </button>
                </CardFooter> : <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <CardFooter className="items-center justify-center p-3 bg-black/90 text-white transition-all duration-300 cursor-pointer hover:opacity-90">
                            <button className="font-semibold text-sm flex flex-row gap-1">
                                <UserMinus className="w-4 h-4 mt-[0.75px]" />
                                {getText(room.available)}
                            </button>
                        </CardFooter>
                    </AlertDialogTrigger>

                    <AlertDialogContent className="font-recursive rounded-xl">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Room | {room.roomNumber}</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will remove the patient from the room.
                                Type &quot;{room.roomNumber}&quot; to proceed:
                            </AlertDialogDescription>
                        </AlertDialogHeader>

                        <input
                            type="text"
                            className="w-full mt-1 border-2 border-gray-600/50 focus:border-gray-600 focus:ring-0 focus:outline-none px-3 py-2 rounded text-black transition-colors duration-300"
                            placeholder="Enter room number"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                        />

                        <AlertDialogFooter className="mt-4">
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={() => {
                                    console.log("Confirmed");
                                }}
                                disabled={inputValue !== room.roomNumber}
                                className="bg-red-500 hover:bg-red-500 hover:opacity-90 transition-opacity duration-300"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>}
            </div>
        </Card>
    )
}
