import { NextResponse } from "next/server";
import { getMeetings, getMeetingsByDate } from "@/lib/meetings-db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");

  const meetings = date ? await getMeetingsByDate(date) : await getMeetings();

  return NextResponse.json(meetings, { status: 200 });
}
