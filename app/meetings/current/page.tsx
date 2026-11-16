import { Suspense } from 'react';
import { connection } from 'next/server';
import { redirect } from 'next/navigation';
import { getMeetings } from '@/lib/meetings-db';

async function CurrentMeetingRedirect(): Promise<never> {
  await connection();

  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 (Sun) through 6 (Sat)
  const sunday = new Date(today);
  sunday.setDate(today.getDate() - dayOfWeek); // roll back to Sunday

  const targetDateStr = sunday.toISOString().split('T')[0];

  const meetings = getMeetings();
  const currentMeeting = meetings.find((m) => m.date === targetDateStr);

  if (currentMeeting) {
    redirect(`/meetings/${currentMeeting.id}`);
  } else {
    redirect('/meetings');
  }
}

export default function CurrentMeetingPage() {
  return (
    <Suspense fallback={<p>Loading current Sunday meeting...</p>}>
      <CurrentMeetingRedirect />
    </Suspense>
  );
}