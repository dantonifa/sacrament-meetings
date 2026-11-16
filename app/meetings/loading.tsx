import React from 'react';

export default function MeetingsLoading() {
  return (
    <div className="flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
      <span className="ml-3 text-gray-600 font-medium">Loading meetings...</span>
    </div>
  );
}