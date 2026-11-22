import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {/* Hero Section */}
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
            WDD 430 Full-Stack Project
          </span>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">
            Sacrament Meeting Planner
          </h1>
          <p className="text-gray-600 text-base leading-relaxed">
            A comprehensive web application designed to help bishoprics and branch leaders efficiently organize agendas, speakers, musical numbers, and print ward programs.
          </p>
          <div className="flex space-x-4">
            <Link
              href="/meetings"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-2.5 rounded-lg shadow-sm transition-colors text-sm"
            >
              View All Meetings
            </Link>
            <Link
              href="/meetings/current"
              className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-5 py-2.5 rounded-lg shadow-sm transition-colors text-sm"
            >
              Current Sunday
            </Link>
          </div>
        </div>

        {/* Hero Illustration */}
        <div className="relative h-72 w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200">
          <Image
            src="/next.svg"
            alt="Sacrament Meeting Planner Hero Illustration"
            fill
            className="object-contain p-8 bg-linear-to-br from-blue-50 to-indigo-50"
            priority
          />
        </div>
      </div>
    </div>
  );
}