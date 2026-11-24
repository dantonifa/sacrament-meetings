"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "All Meetings", href: "/meetings" },
    { name: "Today's Program", href: "/meetings/current" },
    { name: "New Meeting", href: "/meetings/new" },
  ];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 flex space-x-6">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.name}
              href={link.href}
              className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {link.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
