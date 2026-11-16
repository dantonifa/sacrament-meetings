import type { SacramentMeeting } from './types';

const meetings: SacramentMeeting[] = [
  {
    id: 1,
    date: '2026-10-04',
    meetingType: 'general',
    presiding: 'President Russell M. Nelson',
    conducting: 'President Dallin H. Oaks',
    announcements: [
      'General Conference Sunday Morning and Afternoon Sessions',
      'Regular ward sacrament meetings resume next Sunday',
    ],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'General Authority Assignment',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      {
        name: 'General Authorities and General Officers',
        topic: 'October 2026 General Conference',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    closingPrayer: 'General Authority Assignment',
  },
  {
    id: 2,
    date: '2026-10-25',
    meetingType: 'stake',
    presiding: 'President Carlos Mendoza',
    conducting: 'President Roberto Zelaya',
    announcements: [
      'San Pedro Sula Honduras Stake Conference',
      'Adult leadership session Saturday at 4:00 PM',
    ],
    openingHymn: { number: 26, title: 'Joseph Smith’s First Prayer' },
    openingPrayer: 'Sister Elena Morales',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 175, title: 'O God, the Eternal Father' },
    speakers: [
      {
        name: 'Sister Sofia Alvarado',
        topic: 'Covenant Belonging in the Home',
        type: 'speaker',
      },
      {
        name: 'Stake Combined Choir',
        topic: 'Come, Follow Me',
        type: 'musical-number',
      },
      {
        name: 'President Carlos Mendoza',
        topic: 'Strengthening Rising Generations',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 152, title: 'God Be with You Till We Meet Again' },
    closingPrayer: 'Brother Marco Tulio Reyes',
  },
  {
    id: 3,
    date: '2026-11-01',
    meetingType: 'testimony',
    presiding: 'Bishop David Morales',
    conducting: 'Bishop David Morales',
    announcements: [
      'Fast and Testimony Meeting',
      'Ward temple trip scheduled for Saturday, November 21',
    ],
    openingHymn: { number: 85, title: 'How Firm a Foundation' },
    openingPrayer: 'Brother Jorge Castillo',
    wardBusiness: [
      { description: 'Release of Sister Claudia Pineda as Primary Secretary' },
      { description: 'Sustaining of Sister Valeria Gomez as Primary Secretary' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: 'In Remembrance of Thy Suffering' },
    speakers: [],
    closingHymn: { number: 134, title: 'I Believe in Christ' },
    closingPrayer: 'Sister Gabriela Mejia',
  },
  {
    id: 4,
    date: '2026-11-08',
    meetingType: 'regular',
    presiding: 'Bishop David Morales',
    conducting: 'Brother Luis Fernando Paz',
    announcements: [
      'Ward choir practice today at 12:30 PM in the chapel',
      'Youth service project next Saturday at 8:00 AM',
    ],
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Carmen Rodriguez',
    wardBusiness: [
      { description: 'Sustaining of Brother Esteban Cruz as Elders Quorum Instructor' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
    speakers: [
      {
        name: 'Brother Daniel Ordonez',
        topic: 'Gratitude in Everyday Discipleship',
        type: 'speaker',
      },
      {
        name: 'Young Women Ensemble',
        topic: 'Love One Another',
        type: 'musical-number',
      },
      {
        name: 'Sister Patricia Hernandez',
        topic: 'Enduring to the End with Joy',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Hector Banegas',
  },
  {
    id: 5,
    date: '2026-11-15',
    meetingType: 'regular',
    presiding: 'Bishop David Morales',
    conducting: 'Brother Andres Molina',
    announcements: [
      'Ward family history indexing workshop Wednesday at 7:00 PM',
      'Missionary preparation class begins next Sunday during second hour',
    ],
    openingHymn: { number: 92, title: 'For the Beauty of the Earth' },
    openingPrayer: 'Sister Lorena Vasquez',
    wardBusiness: [
      { description: 'Welcome new ward members: the Martinez family' },
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 172, title: 'In Humility, Our Savior' },
    speakers: [
      {
        name: 'Sister Mariana Castro',
        topic: 'Developing Christlike Attributes',
        type: 'speaker',
      },
      {
        name: 'Brother Ricardo Flores (Violin Solo)',
        topic: 'Be Still, My Soul',
        type: 'musical-number',
      },
      {
        name: 'Brother Samuel Reyes',
        topic: 'Faith Precedes the Miracle',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 223, title: 'Have I Done Any Good?' },
    closingPrayer: 'Sister Rosa Maria Nunez',
  },
  {
    id: 6,
    date: '2026-11-22',
    meetingType: 'regular',
    presiding: 'Bishop David Morales',
    conducting: 'Brother Luis Fernando Paz',
    announcements: [
      'Ward Thanksgiving devotional next Friday at 6:30 PM',
    ],
    openingHymn: { number: 94, title: 'Come, Ye Thankful People' },
    openingPrayer: 'Brother Kevin Alvarado',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 181, title: 'Jesus of Nazareth, Savior and King' },
    speakers: [
      {
        name: 'Sister Natalia Santos',
        topic: 'Counting Our Blessings',
        type: 'speaker',
      },
      {
        name: 'Primary Children Choir',
        topic: 'My Heavenly Father Loves Me',
        type: 'musical-number',
      },
      {
        name: 'Bishop David Morales',
        topic: 'Giving Thanks in All Things',
        type: 'speaker',
      },
    ],
    closingHymn: { number: 241, title: 'Count Your Blessings' },
    closingPrayer: 'Sister Teresa Maldonado',
  },
];

export function getMeetings(date?: string | null): SacramentMeeting[] {
  if (date) {
    return meetings.filter((m) => m.date === date);
  }
  return meetings;
}

export function getMeetingById(id: number): SacramentMeeting | null {
  return meetings.find((m) => m.id === id) ?? null;
}