'use client';
import type { SacramentMeeting } from '@/lib/types';

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({ meeting }: MeetingDetailProps) {
  const formattedDate = new Date(meeting.date + 'T00:00:00').toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 max-w-2xl mx-auto print:shadow-none print:border-none print:p-0">
      {/* Print Button (hidden when printing) */}
      <div className="flex justify-end mb-6 print:hidden">
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          Print Program
        </button>
      </div>

      {/* Program Header */}
      <div className="text-center border-b border-gray-200 pb-6 mb-6">
        <h2 className="text-xl font-bold uppercase tracking-wider text-gray-900">Instituto Ward</h2>
        <h1 className="text-2xl font-extrabold text-blue-900 mt-1">Sacrament Meeting Program</h1>
        <p className="text-gray-600 mt-2 font-medium">{formattedDate}</p>
        <span className="inline-block mt-3 px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-gray-100 text-gray-700 rounded-full">
          {meeting.meetingType} meeting
        </span>
      </div>

      {/* Leadership & Conduct */}
      <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-50 p-4 rounded-lg text-sm">
        <div>
          <span className="font-semibold text-gray-700">Presiding:</span> {meeting.presiding}
        </div>
        <div>
          <span className="font-semibold text-gray-700">Conducting:</span> {meeting.conducting}
        </div>
      </div>

      {/* Agenda Items */}
      <div className="space-y-4 text-gray-800 text-sm">
        <div className="flex justify-between border-b border-gray-100 pb-3">
          <span className="font-medium text-gray-600">Opening Hymn</span>
          <span className="text-right font-medium">#{meeting.openingHymn.number} &mdash; {meeting.openingHymn.title}</span>
        </div>

        <div className="flex justify-between border-b border-gray-100 pb-3">
          <span className="font-medium text-gray-600">Opening Prayer</span>
          <span className="text-right">{meeting.openingPrayer}</span>
        </div>

        <div className="border-b border-gray-100 pb-3">
          <span className="font-medium text-gray-600 block mb-1">Ward Business</span>
          {meeting.wardBusiness.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-gray-700">
              {meeting.wardBusiness.map((item, index) => (
                <li key={index}>{item.description}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic text-xs">None</p>
          )}
          {meeting.stakeBusiness && (
            <p className="mt-1 text-xs font-semibold text-blue-700">* Stake Business included</p>
          )}
        </div>

        <div className="flex justify-between border-b border-gray-100 pb-3">
          <span className="font-medium text-gray-600">Sacrament Hymn</span>
          <span className="text-right font-medium">#{meeting.sacramentHymn.number} &mdash; {meeting.sacramentHymn.title}</span>
        </div>

        {/* Administration of Sacrament note */}
        <div className="text-center py-2 text-xs uppercase tracking-widest text-gray-400 font-semibold border-b border-gray-100">
          Administration of the Sacrament
        </div>

        {/* Speakers / Musical Numbers */}
        <div className="border-b border-gray-100 pb-3">
          <span className="font-medium text-gray-600 block mb-2">Speakers & Musical Numbers</span>
          <div className="space-y-2">
            {meeting.speakers.map((speaker, index) => (
              <div key={index} className="flex justify-between items-start bg-gray-50 p-2.5 rounded">
                <div>
                  <span className="font-medium">{speaker.name}</span>
                  {speaker.topic && <span className="block text-xs text-gray-500">Topic: {speaker.topic}</span>}
                </div>
                <span className="text-xs uppercase tracking-wide bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                  {speaker.type}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between border-b border-gray-100 pb-3">
          <span className="font-medium text-gray-600">Closing Hymn</span>
          <span className="text-right font-medium">#{meeting.closingHymn.number} &mdash; {meeting.closingHymn.title}</span>
        </div>

        <div className="flex justify-between border-b border-gray-100 pb-3">
          <span className="font-medium text-gray-600">Closing Prayer</span>
          <span className="text-right">{meeting.closingPrayer}</span>
        </div>

        {/* Announcements */}
        {meeting.announcements && meeting.announcements.length > 0 && (
          <div className="pt-2">
            <span className="font-medium text-gray-600 block mb-1">Announcements</span>
            <ul className="list-disc list-inside space-y-1 text-xs text-gray-600">
              {meeting.announcements.map((announcement, index) => (
                <li key={index}>{announcement}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}