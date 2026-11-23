"use client";

import NavLinks from "./NavLinks";

export default function Header() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="bg-blue-900 text-white shadow-md">
      <div className="max-w-4xl mx-auto px-4 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <h1 className="text-xl font-bold tracking-tight">
            Sacrament Meeting Planner
          </h1>
          {currentDate && (
            <p className="text-xs text-blue-200">{currentDate}</p>
          )}
        </div>
        <NavLinks />
      </div>
    </header>
  );
}
