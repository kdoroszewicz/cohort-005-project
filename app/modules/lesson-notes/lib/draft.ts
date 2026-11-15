import { MAX_NOTE_LENGTH } from "~/lib/notes";

export type NoteDraftStatus = {
  length: number;
  max: number;
  tooLong: boolean;
  /** Nothing to save: blank, or the same text as the saved note. */
  unchanged: boolean;
  canSave: boolean;
};

export function describeNoteDraft(
  draft: string,
  savedBody: string | null
): NoteDraftStatus {
  const tooLong = draft.length > MAX_NOTE_LENGTH;
  const blank = draft.trim().length === 0;
  const unchanged = blank || draft === savedBody;

  return {
    length: draft.length,
    max: MAX_NOTE_LENGTH,
    tooLong,
    unchanged,
    canSave: !tooLong && !unchanged,
  };
}
