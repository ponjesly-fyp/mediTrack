/* eslint-disable @typescript-eslint/no-unused-vars */
import { database } from "@/lib/dbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const db = await database();
    const body = await req.json();

    if (!body.roomNumber) {
      return NextResponse.json({ message: "roomNumber is required" }, { status: 400 });
    }

    const patient = await db
      .collection("patientData")
      .findOne({ roomNumber: body.roomNumber });

    if (!patient) {
      return NextResponse.json({ message: "Patient not found" }, { status: 404 });
    }

    return NextResponse.json({ patient }, { status: 200 });
  } catch (error) {
    console.error("Error in /api/getPatient:", error);
    return NextResponse.json({ message: "Failed to fetch data" }, { status: 500 });
  }
}
