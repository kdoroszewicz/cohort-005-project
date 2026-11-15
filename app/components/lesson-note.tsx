import { useState } from "react";
import { useFetcher } from "react-router";
import { NotebookPen } from "lucide-react";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";
import { Textarea } from "~/components/ui/textarea";
import { cn, formatRelativeTime } from "~/lib/utils";
import { describeNoteDraft } from "~/modules/lesson-notes";

export type SavedNote = { body: string; updatedAt: string } | null;

/**
 * The Student's private Note on a Lesson. Laid out like the Questions &
 * Discussion card further down the page so the two read as one set.
 */
export function LessonNote({ note }: { note: SavedNote }) {
  const fetcher = useFetcher<{ ok: boolean; error?: string }>();
  const [draft, setDraft] = useState(note?.body ?? "");
  const isSaving = fetcher.state !== "idle";
  const error = fetcher.data?.error;
  const status = describeNoteDraft(draft, note?.body ?? null);
  const hasUnsavedChanges = !status.unchanged;

  return (
    <Card className="mb-8">
      <CardContent className="p-6">
        <NoteHeader />

        <fetcher.Form method="post" className="space-y-2">
          <input type="hidden" name="intent" value="save-note" />
          <Textarea
            name="body"
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            rows={4}
            aria-label="Your notes"
            aria-invalid={status.tooLong || undefined}
            placeholder="What stood out in this lesson?"
            className="min-h-28 resize-y"
          />

          <div className="flex items-center gap-3">
            <Button
              type="submit"
              size="sm"
              disabled={isSaving || !status.canSave}
            >
              {isSaving ? "Saving..." : note ? "Save changes" : "Save note"}
            </Button>

            <NoteStatus
              error={error}
              hasUnsavedChanges={hasUnsavedChanges}
              updatedAt={note?.updatedAt}
            />

            <span
              className={cn(
                "ml-auto text-xs",
                status.tooLong ? "text-destructive" : "text-muted-foreground"
              )}
            >{`${status.length} / ${status.max}`}</span>
          </div>
        </fetcher.Form>
      </CardContent>
    </Card>
  );
}

function NoteHeader() {
  return (
    <>
      <div className="mb-1 flex items-center gap-2">
        <NotebookPen className="size-5 text-primary" />
        <h2 className="text-xl font-semibold">Your notes</h2>
      </div>
      <p className="mb-4 text-sm text-muted-foreground">
        Jot things down while you watch. Only you can see these.
      </p>
    </>
  );
}

function NoteStatus({
  error,
  hasUnsavedChanges,
  updatedAt,
}: {
  error: string | undefined;
  hasUnsavedChanges: boolean;
  updatedAt: string | undefined;
}) {
  if (error) return <span className="text-sm text-destructive">{error}</span>;
  if (hasUnsavedChanges)
    return (
      <span className="text-xs text-muted-foreground">Unsaved changes</span>
    );
  if (!updatedAt) return null;
  return (
    <span suppressHydrationWarning className="text-xs text-muted-foreground">
      Saved · last edited {formatRelativeTime(updatedAt)}
    </span>
  );
}
