import { MAX_NOTE_LENGTH } from "~/lib/notes";

export type NoteDraftStatus = {
  length: number;
  max: number;
  tooLong: boolean;
  /** The draft says the same as the saved note, or there is neither. */
  unchanged: boolean;
  canSave: boolean;
};

export function describeNoteDraft(
  draft: string,
  savedBody: string | null
): NoteDraftStatus {
  // The server trims before it validates and stores, so judge the draft the
  // same way or a trailing space reads as an unsaved change forever.
  const body = draft.trim();
  const tooLong = body.length > MAX_NOTE_LENGTH;
  const blank = body.length === 0;
  const unchanged = body === (savedBody ?? "");

  return {
    length: body.length,
    max: MAX_NOTE_LENGTH,
    tooLong,
    unchanged,
    canSave: !tooLong && !blank && !unchanged,
  };
}
