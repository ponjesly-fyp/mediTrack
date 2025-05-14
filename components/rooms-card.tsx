import { database } from "@/lib/dbConnection"
import RoomCard from "./room-card"
import { WithId } from "mongodb"
interface RoomFromDB {
  _id: string
  roomNumber: string
  roomType: string
  available: boolean
}
export default async function RoomsPage() {
  const db = await database()
  const rooms = (await db.collection("rooms").find({}).toArray()) as unknown as WithId<RoomFromDB>[]
  return (
    <div className="min-h-screen bg-background">
      <div className="px-5 md:px-6 container py-2">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">Hospital Rooms</h1>
            <p className="text-gray-500 text-sm hidden md:flex">
              Manage room availability and patient admissions
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {rooms.map((room) => (
            <RoomCard
              key={room._id.toString()}
              room={{
                id: parseInt(room.roomNumber.replace(/\D/g, "")) || Math.random(),
                roomNumber: room.roomNumber,
                roomType: room.roomType,
                available: room.available,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
