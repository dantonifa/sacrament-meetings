import Link from "next/link";
import { notFound } from "next/navigation";
import { getMeetingById } from "@/lib/meetings-db";

export default async function EditMeetingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Edit Meeting #{meeting.id}
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Date: {meeting.date} — {meeting.meetingType}
          </p>
        </div>

        <Link
          href={`/meetings/${meeting.id}`}
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Back to Meeting Detail
        </Link>
      </div>

      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6">
        <p className="text-sm text-gray-700">Edit meeting form goes here.</p>
      </div>
    </div>
  );
}
