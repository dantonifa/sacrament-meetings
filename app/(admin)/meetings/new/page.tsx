import Link from "next/link";

export default function NewMeetingPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            Create Sacrament Meeting
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Add a new sacrament meeting program to the schedule.
          </p>
        </div>

        <Link
          href="/meetings"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Back to Meetings
        </Link>
      </div>

      <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6">
        <p className="text-sm text-gray-700">Create meeting form goes here.</p>
      </div>
    </div>
  );
}
