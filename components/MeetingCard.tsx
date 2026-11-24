import Link from "next/link";
import { deleteMeeting } from "@/lib/actions";
import type { SacramentMeeting } from "@/lib/types";

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({ meeting }: MeetingCardProps) {
  const formattedDate = new Date(meeting.date + "T00:00:00").toLocaleDateString(
    "en-US",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    },
  );

  const deleteMeetingWithId = deleteMeeting.bind(null, meeting.id);

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {formattedDate}
          </h3>
          <span className="inline-block px-2.5 py-1 text-xs font-medium uppercase tracking-wide bg-blue-100 text-blue-800 rounded-full">
            {meeting.meetingType}
          </span>
        </div>
        <div className="mt-4 space-y-1 text-sm text-gray-600">
          <p>
            <span className="font-medium text-gray-700">Presiding:</span>{" "}
            {meeting.presiding}
          </p>
          <p>
            <span className="font-medium text-gray-700">Conducting:</span>{" "}
            {meeting.conducting}
          </p>
          <p>
            <span className="font-medium text-gray-700">Opening Hymn:</span> #
            {meeting.openingHymn.number} - {meeting.openingHymn.title}
          </p>
        </div>
      </div>
      <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <Link
            href={`/meetings/${meeting.id}/edit`}
            className="text-sm font-medium text-gray-600 hover:text-gray-900"
          >
            Edit
          </Link>
          <form action={deleteMeetingWithId}>
            <button
              type="submit"
              className="text-sm font-medium text-red-600 hover:text-red-800"
            >
              Delete
            </button>
          </form>
        </div>

        <Link
          href={`/meetings/${meeting.id}`}
          className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800"
        >
          View Program &rarr;
        </Link>
      </div>
    </div>
  );
}
