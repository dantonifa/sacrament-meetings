import Link from "next/link";
import { createMeeting } from "@/lib/actions";

export default function NewMeetingPage() {
  const handleCreate = async (formData: FormData): Promise<void> => {
    "use server";
    await createMeeting({}, formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            New Sacrament Meeting
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Create a new sacrament meeting schedule entry.
          </p>
        </div>

        <Link
          href="/meetings"
          className="text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          Back to Meetings
        </Link>
      </div>

      <form action={handleCreate} className="space-y-4">
        <label className="block space-y-1">
          <span className="text-sm font-medium text-gray-700">Date</span>
          <input
            type="date"
            name="date"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium text-gray-700">
            Meeting Type
          </span>
          <select
            name="meetingType"
            defaultValue="regular"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2 bg-white"
          >
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium text-gray-700">Presiding</span>
          <input
            type="text"
            name="presiding"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium text-gray-700">Conducting</span>
          <input
            type="text"
            name="conducting"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium text-gray-700">
            Opening Prayer
          </span>
          <input
            type="text"
            name="openingPrayer"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="block space-y-1">
          <span className="text-sm font-medium text-gray-700">
            Closing Prayer
          </span>
          <input
            type="text"
            name="closingPrayer"
            required
            className="w-full rounded-md border border-gray-300 px-3 py-2"
          />
        </label>

        <label className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            name="stakeBusiness"
            className="h-4 w-4 rounded border-gray-300"
          />
          <span className="text-sm font-medium text-gray-700">
            Stake Business
          </span>
        </label>

        <button
          type="submit"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Create Meeting
        </button>
      </form>
    </div>
  );
}
