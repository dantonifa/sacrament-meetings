"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  createMeeting as createMeetingDb,
  updateMeeting as updateMeetingDb,
  deleteMeeting as deleteMeetingDb,
} from "@/lib/meetings-db";
import type {
  Hymn,
  MeetingType,
  SacramentMeeting,
  SpeakerItem,
  WardBusinessItem,
} from "@/lib/types";

export type MeetingFormState = {
  message?: string;
  errors?: {
    date?: string[];
    meetingType?: string[];
    presiding?: string[];
    conducting?: string[];
    openingPrayer?: string[];
    closingPrayer?: string[];
  };
};

const EMPTY_HYMN: Hymn = { number: 0, title: "" };

const MeetingFormSchema = z.object({
  date: z.string().trim().min(1, "Date is required."),
  meetingType: z.enum(["testimony", "regular", "stake", "general"], {
    message: "Please select a valid meeting type.",
  }),
  presiding: z.string().trim().min(1, "Presiding leader is required."),
  conducting: z.string().trim().min(1, "Conducting leader is required."),
  openingPrayer: z.string().trim().min(1, "Opening prayer is required."),
  closingPrayer: z.string().trim().min(1, "Closing prayer is required."),
  stakeBusiness: z.boolean().default(false),
  announcementsJson: z.string().optional(),
  openingHymnJson: z.string().optional(),
  wardBusinessJson: z.string().optional(),
  sacramentHymnJson: z.string().optional(),
  speakersJson: z.string().optional(),
  closingHymnJson: z.string().optional(),
});

function parseJsonField<T>(raw: string | null | undefined, fallback: T): T {
  if (typeof raw !== "string" || !raw.trim()) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function buildMeetingPayload(formData: FormData): Omit<SacramentMeeting, "id"> {
  const d = MeetingFormSchema.parse({
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    openingPrayer: formData.get("openingPrayer"),
    closingPrayer: formData.get("closingPrayer"),
    stakeBusiness:
      formData.get("stakeBusiness") === "on" ||
      formData.get("stakeBusiness") === "true",
    announcementsJson: formData.get("announcementsJson")?.toString(),
    openingHymnJson: formData.get("openingHymnJson")?.toString(),
    wardBusinessJson: formData.get("wardBusinessJson")?.toString(),
    sacramentHymnJson: formData.get("sacramentHymnJson")?.toString(),
    speakersJson: formData.get("speakersJson")?.toString(),
    closingHymnJson: formData.get("closingHymnJson")?.toString(),
  });

  return {
    date: d.date,
    meetingType: d.meetingType as MeetingType,
    presiding: d.presiding,
    conducting: d.conducting,
    announcements: parseJsonField<string[]>(d.announcementsJson, []),
    openingHymn: parseJsonField<Hymn>(d.openingHymnJson, EMPTY_HYMN),
    openingPrayer: d.openingPrayer,
    wardBusiness: parseJsonField<WardBusinessItem[]>(d.wardBusinessJson, []),
    stakeBusiness: d.stakeBusiness,
    sacramentHymn: parseJsonField<Hymn>(d.sacramentHymnJson, EMPTY_HYMN),
    speakers: parseJsonField<SpeakerItem[]>(d.speakersJson, []),
    closingHymn: parseJsonField<Hymn>(d.closingHymnJson, EMPTY_HYMN),
    closingPrayer: d.closingPrayer,
  };
}

export async function createMeeting(
  _prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const rawFields = {
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    openingPrayer: formData.get("openingPrayer"),
    closingPrayer: formData.get("closingPrayer"),
    stakeBusiness:
      formData.get("stakeBusiness") === "on" ||
      formData.get("stakeBusiness") === "true",
    announcementsJson: formData.get("announcementsJson")?.toString(),
    openingHymnJson: formData.get("openingHymnJson")?.toString(),
    wardBusinessJson: formData.get("wardBusinessJson")?.toString(),
    sacramentHymnJson: formData.get("sacramentHymnJson")?.toString(),
    speakersJson: formData.get("speakersJson")?.toString(),
    closingHymnJson: formData.get("closingHymnJson")?.toString(),
  };

  const parsed = MeetingFormSchema.safeParse(rawFields);
  if (!parsed.success) {
    return {
      message: "Please fix the highlighted fields below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const payload = buildMeetingPayload(formData);

  try {
    await createMeetingDb(payload);
  } catch (error) {
    console.error("Failed to create meeting:", error);
    throw new Error("Unable to save the new meeting. Please try again.");
  }

  revalidatePath("/meetings");
  redirect("/meetings");
}

export async function updateMeeting(
  id: number,
  _prevState: MeetingFormState,
  formData: FormData,
): Promise<MeetingFormState> {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new Error("Invalid meeting ID.");
  }

  const rawFields = {
    date: formData.get("date"),
    meetingType: formData.get("meetingType"),
    presiding: formData.get("presiding"),
    conducting: formData.get("conducting"),
    openingPrayer: formData.get("openingPrayer"),
    closingPrayer: formData.get("closingPrayer"),
    stakeBusiness:
      formData.get("stakeBusiness") === "on" ||
      formData.get("stakeBusiness") === "true",
    announcementsJson: formData.get("announcementsJson")?.toString(),
    openingHymnJson: formData.get("openingHymnJson")?.toString(),
    wardBusinessJson: formData.get("wardBusinessJson")?.toString(),
    sacramentHymnJson: formData.get("sacramentHymnJson")?.toString(),
    speakersJson: formData.get("speakersJson")?.toString(),
    closingHymnJson: formData.get("closingHymnJson")?.toString(),
  };

  const parsed = MeetingFormSchema.safeParse(rawFields);
  if (!parsed.success) {
    return {
      message: "Please fix the highlighted fields below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const payload = buildMeetingPayload(formData);

  try {
    await updateMeetingDb(numericId, payload);
  } catch (error) {
    console.error(`Failed to update meeting ${numericId}:`, error);
    throw new Error("Unable to update this meeting. Please try again.");
  }

  revalidatePath("/meetings");
  revalidatePath(`/meetings/${numericId}/edit`);
  redirect("/meetings");
}

export async function deleteMeeting(id: number): Promise<void> {
  const numericId = Number(id);
  if (!Number.isInteger(numericId) || numericId <= 0) {
    throw new Error("Invalid meeting ID.");
  }

  try {
    await deleteMeetingDb(numericId);
  } catch (error) {
    console.error(`Failed to delete meeting ${numericId}:`, error);
    throw new Error("Unable to delete this meeting. Please try again.");
  }

  revalidatePath("/meetings");
}
