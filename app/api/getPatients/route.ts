/* eslint-disable @typescript-eslint/no-unused-vars */
import { database } from "@/lib/dbConnection";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const db = await database();
        const patients = await db.collection("patientData").find().toArray();
        return NextResponse.json({ patients }, { status: 200 });
    } catch (error) {
        console.error("Fetch error:", error);
        return NextResponse.json({ message: "Failed to fetch data" }, { status: 500 });
    }
}