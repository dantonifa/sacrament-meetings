import { NextResponse } from "next/server";
import { getMeetingById } from "@/lib/meetings-db";

interface RouteContext {
  params: Promise<{ id: string }>;
}

function parseMeetingId(rawId: string): number | null {
  if (!/^\d+$/.test(rawId)) {
    return null;
  }

  const parsed = Number(rawId);
  if (Number.isNaN(parsed) || !Number.isSafeInteger(parsed) || parsed <= 0) {
    return null;
  }

  return parsed;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const meetingId = parseMeetingId(id);

    if (meetingId === null) {
      return NextResponse.json(
        { error: "Invalid meeting ID. Expected a positive integer." },
        { status: 400 },
      );
    }

    const meeting = await getMeetingById(meetingId);

    if (!meeting) {
      return NextResponse.json(
        { error: `Meeting with ID ${meetingId} not found.` },
        { status: 404 },
      );
    }

    return NextResponse.json(meeting, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch meeting by ID:", error);
    return NextResponse.json(
      { error: "Failed to fetch meeting from database" },
      { status: 500 },
    );
  }
}
