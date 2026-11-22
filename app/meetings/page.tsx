import MeetingCard from "@/components/MeetingCard";
import { getMeetings } from "@/lib/meetings-db";

export default async function MeetingsPage() {
  const meetings = await getMeetings();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-gray-800">
          All Scheduled Meetings
        </h2>
        <span className="text-sm text-gray-500">
          {meetings.length} Total Records
        </span>
      </div>

      <div className="grid gap-6">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </div>
  );
}
