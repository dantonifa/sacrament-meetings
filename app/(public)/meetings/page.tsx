import { Suspense } from "react";
import MeetingCard from "@/components/MeetingCard";
import MeetingSearch from "@/components/MeetingSearch";
import { Pagination } from "@/components/Pagination";
import { getMeetings, getMeetingsTotalPages } from "@/lib/meetings-db";

interface MeetingsPageProps {
  searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function MeetingsPage({
  searchParams,
}: MeetingsPageProps) {
  const resolvedParams = await searchParams;
  const query = resolvedParams.query?.trim() ?? "";
  const parsedPage = Number(resolvedParams.page ?? "1");
  const currentPage =
    Number.isInteger(parsedPage) && parsedPage > 0 ? parsedPage : 1;

  const [meetings, totalPages] = await Promise.all([
    getMeetings(query, currentPage),
    getMeetingsTotalPages(query),
  ]);

  return (
    <section aria-labelledby="meetings-heading" className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 id="meetings-heading" className="text-xl font-bold text-gray-900">
          All Scheduled Meetings
        </h2>
        <span className="text-sm text-gray-700">
          Page {currentPage} of {Math.max(1, totalPages)}
        </span>
      </div>

      <Suspense
        fallback={<div className="h-10 w-full max-w-md rounded bg-gray-100" />}
      >
        <MeetingSearch />
      </Suspense>

      {meetings.length === 0 ? (
        <p className="rounded border border-gray-200 p-4 text-sm text-gray-700">
          No scheduled meetings matched your search.
        </p>
      ) : (
        <div className="grid gap-6">
          {meetings.map((meeting) => (
            <MeetingCard key={meeting.id} meeting={meeting} />
          ))}
        </div>
      )}

      <Suspense fallback={null}>
        <Pagination totalPages={Math.max(1, totalPages)} />
      </Suspense>
    </section>
  );
}
