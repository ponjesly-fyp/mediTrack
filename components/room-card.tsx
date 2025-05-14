import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { UserPlus } from 'lucide-react';
import { UserMinus } from 'lucide-react';
interface RoomCardProps {
    room: {
        id: number
        roomNumber: string
        roomType: string
        available: boolean
    }
}

export default function RoomCard({ room }: RoomCardProps) {
    const getText = (available: boolean) => {
        if (available) {
            return "Add Patient"
        }
        else {
            return "Remove Patient"
        }
    }
    const getBorder = (available: boolean) => {
        if (available) {
            return "border-green-500"
        }
        else {
            return "border-red-500"
        }
    }
    return (
        <Card className={`overflow-hidden border ${getBorder(room.available)} transition-all hover:shadow-md`}>
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
                {room.available ? <CardFooter className="items-center justify-center p-3 bg-green-500/90 text-white transition-all duration-300 hover:opacity-80">
                    <button className="font-medium text-sm flex flex-row gap-1">
                        <UserPlus className="text-white w-4 h-4 mt-[0.75px]"/>
                        {getText(room.available)}
                    </button>
                </CardFooter> : <CardFooter className="items-center justify-center p-3 bg-red-500/90 text-white transition-all duration-300 hover:opacity-80">
                    <button className="font-medium text-sm flex flex-row gap-1">
                        <UserMinus className="text-white w-4 h-4 mt-[0.75px]"/>
                        {getText(room.available)}
                    </button>
                </CardFooter>}
            </div>
        </Card>
    )
}
