/* eslint-disable @typescript-eslint/no-unused-vars */
import { database } from "@/lib/dbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const roomNumber = body.roomNumber
    const db = await database()
    const room = await db.collection("rooms").findOne({ roomNumber: body.roomNumber })
    const patientData = {
        ...body,
        roomType:room!.roomType
    }
    const result = await db.collection('patientData').insertOne(patientData)
    await db.collection('rooms').updateOne({roomNumber},{ $set: { available: false } })
    return NextResponse.json({ insertedId: result.insertedId, message: "inserted" },{status:200})
  } catch (error) {
    console.error('Insert error:', error)
    return NextResponse.json({ message: 'Failed to insert data' }, { status: 500 })
  }
}