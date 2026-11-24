import Link from "next/link";

export default function EditMeetingNotFound() {
  return (
    <div className="mx-auto max-w-xl rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">Meeting not found</h2>
      <p className="mt-2 text-sm text-gray-600">
        The sacrament meeting you are trying to edit could not be found. It may
        have been removed or the link may be invalid.
      </p>

      <div className="mt-6">
        <Link
          href="/meetings"
          className="inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}
