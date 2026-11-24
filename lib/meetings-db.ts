import { neon } from "@neondatabase/serverless";
import type { SacramentMeeting } from "./types";

const ITEMS_PER_PAGE = 5;

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not set in environment variables");
  }
  return neon(process.env.DATABASE_URL);
}

interface MeetingRow {
  id: number;
  date: string;
  meeting_type: SacramentMeeting["meetingType"];
  presiding: string;
  conducting: string;
  announcements: string[] | null;
  opening_hymn: SacramentMeeting["openingHymn"];
  opening_prayer: string;
  ward_business: Array<{
    description?: string;
    action?: string;
    person?: string;
    calling?: string;
  }> | null;
  stake_business: boolean | null;
  sacrament_hymn: SacramentMeeting["sacramentHymn"];
  speakers: Array<{
    name: string;
    topic: string;
    type?: "speaker" | "musical-number";
  }> | null;
  closing_hymn: SacramentMeeting["closingHymn"];
  closing_prayer: string;
}

function mapRowToMeeting(row: MeetingRow): SacramentMeeting {
  return {
    id: row.id,
    date: row.date,
    meetingType: row.meeting_type,
    presiding: row.presiding,
    conducting: row.conducting,
    announcements: row.announcements ?? [],
    openingHymn: row.opening_hymn,
    openingPrayer: row.opening_prayer,
    wardBusiness: (row.ward_business ?? []).map((item) => ({
      description:
        item.description ??
        [item.action, item.person, item.calling].filter(Boolean).join(" - "),
    })),
    stakeBusiness: Boolean(row.stake_business),
    sacramentHymn: row.sacrament_hymn,
    speakers: (row.speakers ?? []).map((s) => ({
      name: s.name,
      topic: s.topic,
      type: s.type ?? "speaker",
    })),
    closingHymn: row.closing_hymn,
    closingPrayer: row.closing_prayer,
  };
}

export async function getMeetings(
  query: string = "",
  currentPage: number = 1,
): Promise<SacramentMeeting[]> {
  const sql = getSql();
  const safePage =
    Number.isInteger(currentPage) && currentPage > 0 ? currentPage : 1;
  const searchTerm = `%${query.trim()}%`;
  const offset = (safePage - 1) * ITEMS_PER_PAGE;

  const rows = await sql`
    SELECT
      id,
      TO_CHAR(date, 'YYYY-MM-DD') AS date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    FROM meetings
    WHERE
      presiding       ILIKE ${searchTerm}
      OR conducting   ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
  `;

  return (rows as MeetingRow[]).map(mapRowToMeeting);
}

export async function getMeetingsTotalPages(
  query: string = "",
): Promise<number> {
  const sql = getSql();
  const searchTerm = `%${query.trim()}%`;

  const rows = await sql`
    SELECT COUNT(*)::int AS count
    FROM meetings
    WHERE
      presiding       ILIKE ${searchTerm}
      OR conducting   ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;

  const totalItems = Number(
    (rows[0] as { count?: number } | undefined)?.count ?? 0,
  );
  return Math.max(1, Math.ceil(totalItems / ITEMS_PER_PAGE));
}

export async function getMeetingById(
  id: number,
): Promise<SacramentMeeting | null> {
  const sql = getSql();

  const rows = await sql`
    SELECT
      id,
      TO_CHAR(date, 'YYYY-MM-DD') AS date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    FROM meetings
    WHERE id = ${id}
  `;

  const row = (rows as MeetingRow[])[0];
  return row ? mapRowToMeeting(row) : null;
}

export async function getMeetingsByDate(
  date: string,
): Promise<SacramentMeeting[]> {
  const sql = getSql();

  const rows = await sql`
    SELECT
      id,
      TO_CHAR(date, 'YYYY-MM-DD') AS date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    FROM meetings
    WHERE date = ${date}::date
    ORDER BY date DESC
  `;

  return (rows as MeetingRow[]).map(mapRowToMeeting);
}

export async function createMeeting(
  meeting: Omit<SacramentMeeting, "id">,
): Promise<SacramentMeeting> {
  const sql = getSql();

  const rows = await sql`
    INSERT INTO meetings (
      date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
    ) VALUES (
      ${meeting.date}::date,
      ${meeting.meetingType},
      ${meeting.presiding},
      ${meeting.conducting},
      ${meeting.announcements},
      ${JSON.stringify(meeting.openingHymn)}::jsonb,
      ${meeting.openingPrayer},
      ${JSON.stringify(meeting.wardBusiness)}::jsonb,
      ${meeting.stakeBusiness},
      ${JSON.stringify(meeting.sacramentHymn)}::jsonb,
      ${JSON.stringify(meeting.speakers)}::jsonb,
      ${JSON.stringify(meeting.closingHymn)}::jsonb,
      ${meeting.closingPrayer}
    )
    RETURNING
      id,
      TO_CHAR(date, 'YYYY-MM-DD') AS date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
  `;

  return mapRowToMeeting((rows as MeetingRow[])[0]);
}

export async function updateMeeting(
  id: number,
  updates: Partial<Omit<SacramentMeeting, "id">>,
): Promise<SacramentMeeting | null> {
  const existing = await getMeetingById(id);
  if (!existing) return null;

  const merged: Omit<SacramentMeeting, "id"> = {
    date: updates.date ?? existing.date,
    meetingType: updates.meetingType ?? existing.meetingType,
    presiding: updates.presiding ?? existing.presiding,
    conducting: updates.conducting ?? existing.conducting,
    announcements: updates.announcements ?? existing.announcements,
    openingHymn: updates.openingHymn ?? existing.openingHymn,
    openingPrayer: updates.openingPrayer ?? existing.openingPrayer,
    wardBusiness: updates.wardBusiness ?? existing.wardBusiness,
    stakeBusiness: updates.stakeBusiness ?? existing.stakeBusiness,
    sacramentHymn: updates.sacramentHymn ?? existing.sacramentHymn,
    speakers: updates.speakers ?? existing.speakers,
    closingHymn: updates.closingHymn ?? existing.closingHymn,
    closingPrayer: updates.closingPrayer ?? existing.closingPrayer,
  };

  const sql = getSql();

  const rows = await sql`
    UPDATE meetings
    SET
      date = ${merged.date}::date,
      meeting_type = ${merged.meetingType},
      presiding = ${merged.presiding},
      conducting = ${merged.conducting},
      announcements = ${merged.announcements},
      opening_hymn = ${JSON.stringify(merged.openingHymn)}::jsonb,
      opening_prayer = ${merged.openingPrayer},
      ward_business = ${JSON.stringify(merged.wardBusiness)}::jsonb,
      stake_business = ${merged.stakeBusiness},
      sacrament_hymn = ${JSON.stringify(merged.sacramentHymn)}::jsonb,
      speakers = ${JSON.stringify(merged.speakers)}::jsonb,
      closing_hymn = ${JSON.stringify(merged.closingHymn)}::jsonb,
      closing_prayer = ${merged.closingPrayer}
    WHERE id = ${id}
    RETURNING
      id,
      TO_CHAR(date, 'YYYY-MM-DD') AS date,
      meeting_type,
      presiding,
      conducting,
      announcements,
      opening_hymn,
      opening_prayer,
      ward_business,
      stake_business,
      sacrament_hymn,
      speakers,
      closing_hymn,
      closing_prayer
  `;

  const row = (rows as MeetingRow[])[0];
  return row ? mapRowToMeeting(row) : null;
}

export async function deleteMeeting(id: number): Promise<boolean> {
  const sql = getSql();
  const rows = await sql`
    DELETE FROM meetings
    WHERE id = ${id}
    RETURNING id
  `;
  return rows.length > 0;
}
