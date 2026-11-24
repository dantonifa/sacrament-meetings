"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import type { MeetingFormState } from "@/lib/actions";
import type { SacramentMeeting, SpeakerItem } from "@/lib/types";

interface EditMeetingFormProps {
  action: (
    prevState: MeetingFormState,
    formData: FormData,
  ) => Promise<MeetingFormState>;
  meeting: SacramentMeeting;
}

const INITIAL_STATE: MeetingFormState = {};

export default function EditMeetingForm({
  action,
  meeting,
}: EditMeetingFormProps) {
  const [state, formAction, isPending] = useActionState(action, INITIAL_STATE);

  const [openingHymnNumber, setOpeningHymnNumber] = useState(
    meeting.openingHymn?.number ? String(meeting.openingHymn.number) : "",
  );
  const [openingHymnTitle, setOpeningHymnTitle] = useState(
    meeting.openingHymn?.title ?? "",
  );
  const [sacramentHymnNumber, setSacramentHymnNumber] = useState(
    meeting.sacramentHymn?.number ? String(meeting.sacramentHymn.number) : "",
  );
  const [sacramentHymnTitle, setSacramentHymnTitle] = useState(
    meeting.sacramentHymn?.title ?? "",
  );
  const [closingHymnNumber, setClosingHymnNumber] = useState(
    meeting.closingHymn?.number ? String(meeting.closingHymn.number) : "",
  );
  const [closingHymnTitle, setClosingHymnTitle] = useState(
    meeting.closingHymn?.title ?? "",
  );

  const [speakers, setSpeakers] = useState<SpeakerItem[]>(
    meeting.speakers ?? [],
  );

  const addSpeaker = () => {
    setSpeakers((prev) => [...prev, { name: "", topic: "", type: "speaker" }]);
  };

  const updateSpeaker = (
    index: number,
    field: keyof SpeakerItem,
    value: string,
  ) => {
    setSpeakers((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item)),
    );
  };

  const removeSpeaker = (index: number) => {
    setSpeakers((prev) => prev.filter((_, i) => i !== index));
  };

  const openingHymnJson = JSON.stringify({
    number: Number(openingHymnNumber) || 0,
    title: openingHymnTitle.trim(),
  });

  const sacramentHymnJson = JSON.stringify({
    number: Number(sacramentHymnNumber) || 0,
    title: sacramentHymnTitle.trim(),
  });

  const closingHymnJson = JSON.stringify({
    number: Number(closingHymnNumber) || 0,
    title: closingHymnTitle.trim(),
  });

  const speakersJson = JSON.stringify(
    speakers
      .map((s) => ({
        name: s.name.trim(),
        topic: s.topic.trim(),
        type: s.type,
      }))
      .filter((s) => s.name || s.topic),
  );

  return (
    <form
      action={formAction}
      noValidate
      className="space-y-6 rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
    >
      <input type="hidden" name="openingHymnJson" value={openingHymnJson} />
      <input type="hidden" name="sacramentHymnJson" value={sacramentHymnJson} />
      <input type="hidden" name="closingHymnJson" value={closingHymnJson} />
      <input type="hidden" name="speakersJson" value={speakersJson} />

      {state.message && (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {state.message}
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            id="date"
            name="date"
            type="date"
            defaultValue={meeting.date}
            aria-describedby={state.errors?.date ? "date-error" : undefined}
            aria-invalid={Boolean(state.errors?.date)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
          />
          <div id="date-error" aria-live="polite" className="mt-1 min-h-5">
            {state.errors?.date?.[0] && (
              <p className="text-xs text-red-600">{state.errors.date[0]}</p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="meetingType"
            className="block text-sm font-medium text-gray-700"
          >
            Meeting Type
          </label>
          <select
            id="meetingType"
            name="meetingType"
            defaultValue={meeting.meetingType}
            aria-describedby={
              state.errors?.meetingType ? "meetingType-error" : undefined
            }
            aria-invalid={Boolean(state.errors?.meetingType)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
          >
            <option value="regular">Regular</option>
            <option value="testimony">Testimony</option>
            <option value="stake">Stake</option>
            <option value="general">General</option>
          </select>
          <div
            id="meetingType-error"
            aria-live="polite"
            className="mt-1 min-h-5"
          >
            {state.errors?.meetingType?.[0] && (
              <p className="text-xs text-red-600">
                {state.errors.meetingType[0]}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="presiding"
            className="block text-sm font-medium text-gray-700"
          >
            Presiding
          </label>
          <input
            id="presiding"
            name="presiding"
            type="text"
            defaultValue={meeting.presiding}
            aria-describedby={
              state.errors?.presiding ? "presiding-error" : undefined
            }
            aria-invalid={Boolean(state.errors?.presiding)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
          />
          <div id="presiding-error" aria-live="polite" className="mt-1 min-h-5">
            {state.errors?.presiding?.[0] && (
              <p className="text-xs text-red-600">
                {state.errors.presiding[0]}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="conducting"
            className="block text-sm font-medium text-gray-700"
          >
            Conducting
          </label>
          <input
            id="conducting"
            name="conducting"
            type="text"
            defaultValue={meeting.conducting}
            aria-describedby={
              state.errors?.conducting ? "conducting-error" : undefined
            }
            aria-invalid={Boolean(state.errors?.conducting)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
          />
          <div
            id="conducting-error"
            aria-live="polite"
            className="mt-1 min-h-5"
          >
            {state.errors?.conducting?.[0] && (
              <p className="text-xs text-red-600">
                {state.errors.conducting[0]}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t border-gray-200 pt-4">
        <h3 className="text-base font-semibold text-gray-900">Hymns</h3>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="editOpeningHymnNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Opening Hymn #
            </label>
            <input
              id="editOpeningHymnNumber"
              type="number"
              min={0}
              value={openingHymnNumber}
              onChange={(e) => setOpeningHymnNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="editOpeningHymnTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Opening Hymn Title
            </label>
            <input
              id="editOpeningHymnTitle"
              type="text"
              value={openingHymnTitle}
              onChange={(e) => setOpeningHymnTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="editSacramentHymnNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Sacrament Hymn #
            </label>
            <input
              id="editSacramentHymnNumber"
              type="number"
              min={0}
              value={sacramentHymnNumber}
              onChange={(e) => setSacramentHymnNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="editSacramentHymnTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Sacrament Hymn Title
            </label>
            <input
              id="editSacramentHymnTitle"
              type="text"
              value={sacramentHymnTitle}
              onChange={(e) => setSacramentHymnTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label
              htmlFor="editClosingHymnNumber"
              className="block text-sm font-medium text-gray-700"
            >
              Closing Hymn #
            </label>
            <input
              id="editClosingHymnNumber"
              type="number"
              min={0}
              value={closingHymnNumber}
              onChange={(e) => setClosingHymnNumber(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
            />
          </div>

          <div>
            <label
              htmlFor="editClosingHymnTitle"
              className="block text-sm font-medium text-gray-700"
            >
              Closing Hymn Title
            </label>
            <input
              id="editClosingHymnTitle"
              type="text"
              value={closingHymnTitle}
              onChange={(e) => setClosingHymnTitle(e.target.value)}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4 border-t border-gray-200 pt-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-gray-900">
            Speakers &amp; Musical Numbers
          </h3>
          <button
            type="button"
            onClick={addSpeaker}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            + Add Speaker
          </button>
        </div>

        {speakers.map((speaker, index) => (
          <div
            key={index}
            className="grid gap-3 rounded-md border border-gray-200 p-3 sm:grid-cols-4"
          >
            <div>
              <label
                htmlFor={`edit-speaker-name-${index}`}
                className="block text-xs font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id={`edit-speaker-name-${index}`}
                type="text"
                value={speaker.name}
                onChange={(e) => updateSpeaker(index, "name", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor={`edit-speaker-topic-${index}`}
                className="block text-xs font-medium text-gray-700"
              >
                Topic / Song
              </label>
              <input
                id={`edit-speaker-topic-${index}`}
                type="text"
                value={speaker.topic}
                onChange={(e) => updateSpeaker(index, "topic", e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor={`edit-speaker-type-${index}`}
                className="block text-xs font-medium text-gray-700"
              >
                Type
              </label>
              <select
                id={`edit-speaker-type-${index}`}
                value={speaker.type}
                onChange={(e) =>
                  updateSpeaker(
                    index,
                    "type",
                    e.target.value as SpeakerItem["type"],
                  )
                }
                className="mt-1 block w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm text-gray-900"
              >
                <option value="speaker">Speaker</option>
                <option value="musical-number">Musical Number</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={() => removeSpeaker(index)}
                className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 border-t border-gray-200 pt-4 sm:grid-cols-2">
        <div>
          <label
            htmlFor="openingPrayer"
            className="block text-sm font-medium text-gray-700"
          >
            Opening Prayer
          </label>
          <input
            id="openingPrayer"
            name="openingPrayer"
            type="text"
            defaultValue={meeting.openingPrayer}
            aria-describedby={
              state.errors?.openingPrayer ? "openingPrayer-error" : undefined
            }
            aria-invalid={Boolean(state.errors?.openingPrayer)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
          />
          <div
            id="openingPrayer-error"
            aria-live="polite"
            className="mt-1 min-h-5"
          >
            {state.errors?.openingPrayer?.[0] && (
              <p className="text-xs text-red-600">
                {state.errors.openingPrayer[0]}
              </p>
            )}
          </div>
        </div>

        <div>
          <label
            htmlFor="closingPrayer"
            className="block text-sm font-medium text-gray-700"
          >
            Closing Prayer
          </label>
          <input
            id="closingPrayer"
            name="closingPrayer"
            type="text"
            defaultValue={meeting.closingPrayer}
            aria-describedby={
              state.errors?.closingPrayer ? "closingPrayer-error" : undefined
            }
            aria-invalid={Boolean(state.errors?.closingPrayer)}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900"
          />
          <div
            id="closingPrayer-error"
            aria-live="polite"
            className="mt-1 min-h-5"
          >
            {state.errors?.closingPrayer?.[0] && (
              <p className="text-xs text-red-600">
                {state.errors.closingPrayer[0]}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="stakeBusiness"
          name="stakeBusiness"
          type="checkbox"
          defaultChecked={meeting.stakeBusiness}
          className="h-4 w-4 rounded border-gray-300"
        />
        <label
          htmlFor="stakeBusiness"
          className="text-sm font-medium text-gray-700"
        >
          Stake Business
        </label>
      </div>

      <div className="flex items-center justify-end gap-3 pt-2">
        <Link
          href="/meetings"
          className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </Link>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? "Saving..." : "Update Meeting"}
        </button>
      </div>
    </form>
  );
}
