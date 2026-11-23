"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

export function Pagination({ totalPages }: { totalPages: number }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const rawPage = Number(searchParams.get("page") ?? "1");
  const currentPage = Number.isInteger(rawPage) && rawPage > 0 ? rawPage : 1;

  if (totalPages <= 1) {
    return null;
  }

  function createPageURL(page: number) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    const queryString = params.toString();
    return queryString ? `${pathname}?${queryString}` : pathname;
  }

  const prevDisabled = currentPage <= 1;
  const nextDisabled = currentPage >= totalPages;

  return (
    <nav
      aria-label="Pagination"
      className="flex items-center justify-between gap-4 border-t pt-4"
    >
      {prevDisabled ? (
        <span
          aria-disabled="true"
          className="cursor-not-allowed rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-400"
        >
          Previous
        </span>
      ) : (
        <Link
          href={createPageURL(currentPage - 1)}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </Link>
      )}

      <span className="text-sm text-gray-600">
        Page{" "}
        <strong className="font-semibold text-gray-900">{currentPage}</strong>{" "}
        of <strong className="font-semibold text-gray-900">{totalPages}</strong>
      </span>

      {nextDisabled ? (
        <span
          aria-disabled="true"
          className="cursor-not-allowed rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-400"
        >
          Next
        </span>
      ) : (
        <Link
          href={createPageURL(currentPage + 1)}
          className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </Link>
      )}
    </nav>
  );
}
