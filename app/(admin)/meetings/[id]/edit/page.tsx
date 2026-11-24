import Link from "next/link";
import { notFound } from "next/navigation";
import { getMeetingById } from "@/lib/meetings-db";
import { updateMeeting } from "@/lib/actions";
import EditMeetingForm from "./EditMeetingForm";

interface EditMeetingPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditMeetingPage({
  params,
}: EditMeetingPageProps) {
  const { id } = await params;
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    notFound();
  }

  const meeting = await getMeetingById(numericId);

  if (!meeting) {
    notFound();
  }

  const boundUpdateAction = updateMeeting.bind(null, meeting.id);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Edit Sacrament Meeting
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Update details for meeting #{meeting.id} on {meeting.date}.
          </p>
        </div>

        <Link
          href="/meetings"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Back to Meetings
        </Link>
      </div>

      <EditMeetingForm
        key={meeting.id}
        action={boundUpdateAction}
        meeting={meeting}
      />
    </div>
  );
}
