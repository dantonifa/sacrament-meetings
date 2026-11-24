"use client";

import { useEffect } from "react";
import Link from "next/link";

interface MeetingsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function MeetingsError({ error, reset }: MeetingsErrorProps) {
  useEffect(() => {
    console.error("Meetings route error:", error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl rounded-lg border border-red-200 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-gray-900">Something went wrong</h2>
      <p className="mt-2 text-sm text-gray-600">
        {error.message ||
          "An unexpected error occurred while loading or updating sacrament meeting data."}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Try Again
        </button>

        <Link
          href="/meetings"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Back to Meetings
        </Link>
      </div>
    </div>
  );
}
