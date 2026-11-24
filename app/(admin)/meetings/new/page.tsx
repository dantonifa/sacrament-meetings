import Link from "next/link";
import { notFound } from "next/navigation";
import { getMeetingById } from "@/lib/meetings-db";
import { updateMeeting } from "@/lib/actions";

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

  let meeting = null;

  try {
    meeting = await getMeetingById(numericId);
  } catch (error) {
    console.error(`Failed to load meeting with id=${numericId}:`, error);
    notFound();
  }

  if (!meeting) {
    console.warn(`No meeting row found in database with id=${numericId}`);
    notFound();
  }

  const boundUpdateAction = async (formData: FormData): Promise<void> => {
    "use server";
    await updateMeeting(meeting.id, {} as never, formData);
  };

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

      <form action={boundUpdateAction} className="space-y-4">
        {Object.entries(meeting)
          .filter(([name]) => name !== "id")
          .map(([name, value]) => {
            const label = name
              .replace(/([A-Z])/g, " $1")
              .replace(/_/g, " ")
              .replace(/^./, (character) => character.toUpperCase());
            const stringValue = value == null ? "" : String(value);
            const inputValue =
              name === "date" ? stringValue.slice(0, 10) : stringValue;

            return (
              <label key={name} className="block space-y-1">
                <span className="text-sm font-medium text-gray-700">{label}</span>
                <input
                  type={name === "date" ? "date" : "text"}
                  name={name}
                  defaultValue={inputValue}
                  className="w-full rounded-md border border-gray-300 px-3 py-2"
                />
              </label>
            );
          })}
        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
