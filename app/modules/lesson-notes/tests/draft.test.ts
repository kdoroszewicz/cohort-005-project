import { describe, expect, it } from "vitest";
import { describeNoteDraft } from "../index";
import { MAX_NOTE_LENGTH } from "~/lib/notes";

describe("describeNoteDraft", () => {
  it("lets a new note be saved", () => {
    expect(describeNoteDraft("Generics are like parameters", null)).toEqual({
      length: 28,
      max: MAX_NOTE_LENGTH,
      tooLong: false,
      unchanged: false,
      canSave: true,
    });
  });

  it("has nothing to save when the draft is blank", () => {
    const status = describeNoteDraft("   \n ", null);
    expect(status.unchanged).toBe(true);
    expect(status.canSave).toBe(false);
  });

  it("has nothing to save when the draft matches the saved note", () => {
    const status = describeNoteDraft("same text", "same text");
    expect(status.unchanged).toBe(true);
    expect(status.canSave).toBe(false);
  });

  it("can save an edit to a saved note", () => {
    expect(describeNoteDraft("same text, edited", "same text").canSave).toBe(
      true
    );
  });

  it("accepts a note exactly at the limit", () => {
    const status = describeNoteDraft("a".repeat(MAX_NOTE_LENGTH), null);
    expect(status.tooLong).toBe(false);
    expect(status.canSave).toBe(true);
  });

  it("refuses a note one character over the limit", () => {
    const status = describeNoteDraft("a".repeat(MAX_NOTE_LENGTH + 1), null);
    expect(status).toMatchObject({
      length: MAX_NOTE_LENGTH + 1,
      tooLong: true,
      canSave: false,
    });
  });

  it("has nothing to save when the draft differs from the saved note only by surrounding whitespace", () => {
    const status = describeNoteDraft("same text \n", "same text");
    expect(status.unchanged).toBe(true);
    expect(status.canSave).toBe(false);
  });

  it("accepts a note at the limit with trailing whitespace", () => {
    const status = describeNoteDraft(`${"a".repeat(MAX_NOTE_LENGTH)}  `, null);
    expect(status).toMatchObject({
      length: MAX_NOTE_LENGTH,
      tooLong: false,
      canSave: true,
    });
  });

  it("shows clearing a saved note as an unsaved change that cannot be saved", () => {
    const status = describeNoteDraft("  ", "saved text");
    expect(status.unchanged).toBe(false);
    expect(status.canSave).toBe(false);
  });
});
