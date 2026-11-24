import type { ReactNode } from "react";
import Link from "next/link";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-6">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
        <div>
          <span className="inline-block rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-amber-800">
            Leader View
          </span>
          <h1 className="mt-1 text-xl font-bold text-gray-900">
            Sacrament Meeting Administration
          </h1>
        </div>

        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/meetings" className="text-gray-600 hover:text-gray-900">
            All Meetings
          </Link>
          <Link
            href="/meetings/new"
            className="rounded bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
          >
            New Meeting
          </Link>
        </nav>
      </header>

      <main>{children}</main>
    </div>
  );
}
