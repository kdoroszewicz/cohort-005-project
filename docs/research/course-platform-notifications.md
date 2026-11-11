# What notifications course platforms send

Research for issue #5 (part of #3). Researched 2026-11-11.

**Question:** What in-app notifications do comparable course platforms send, and to which roles? Which do users find valuable and which noisy? What patterns exist for grouping and digests, and how does the feed look (bell dropdown or page, unread badges)?

**Sources:** first-party help centres and docs (Thinkific, Teachable, Podia, Maven, Open edX, Udemy, Udemy Business, Coursera). Each claim links to its source. Where I could not open the page itself and relied on the search engine's copy of an official page, the claim is marked *(index only)*.

## Summary

- **Most platforms document email, not in-app.** Teachable's and Thinkific's admin notification lists are email-only. Thinkific's only bell is in the mobile app and Communities. The in-app feeds that are documented (Open edX, Podia, Maven, Udemy) are all about **conversation**: replies, mentions, comments, Q&A, grading.
- **Money and enrolment events go to the seller, and only by email.** New order or paid sale, new sign-up or enrolment, failed or cancelled subscription, payout. They are toggled per event and often restricted to the owner role.
- **Learners get few notifications:** receipts, welcome or enrolment, completion or certificate, replies to their own comments, due-date or progress reminders. Transactional ones (receipts, payment failures) usually **can't be turned off**.
- **Digests are the main answer to noise.** Podia added hourly, daily and weekly digests in April 2026 because each comment, reaction and post had sent its own email. Open edX sends daily by default. Udemy sends daily Q&A and new-student/review digests to instructors. Maven sends inbox email at most twice a day.
- **Feed UI:** a bell in the header with an unread count, opening a dropdown or tray. The tray has category tabs (Open edX) or All/Unread filters (Podia), plus "mark all as read", a "View all" full page, and a gear icon for preferences. Clicking an item opens it and marks it read.
- **No platform I checked documents in-app notifications for refund decisions or team seat claims.** These are the Cadence-specific gaps (see "Mapping to Cadence").

## Per-platform findings

### Thinkific (help centre, undated living articles)

Source: [Automated Email Notifications](https://support.thinkific.com/hc/en-us/articles/360039095614-Automated-Email-Notifications).

The **admin** tab lists emails for Site Owners and Site Admins. Each user sets their own:

- Sign-ups and subscriptions: new sign-up, new order, new payout (Site Owner only), new lead, subscription cancelled, subscription payment failed, unpaid subscription.
- Student engagement: new community post, assignment submission, new discussion post, discussion reply, new review (written *or updated*).
- New Site Admins get **every notification on by default**. Course Admins have no settings of their own. They inherit the Site Owner's, but only for discussion posts, replies and assignment submissions on their own courses.

The **student** tab lists emails the owner switches on: site welcome, weekly reminder of course progress, discussion replies, receipts, course or bundle or community welcome, course completion, incomplete-purchase reminder, upcoming-payment reminder (7 days before), and a "Get Started" reminder sent if there's no progress within 2 days of enrolling.

Some emails **can't be turned off**: digital-download access, webinar or coaching access, webinar reminders 24h before, failed payment, free-trial end.

Students themselves can turn off only weekly reminders, discussion replies and community activity.

Course completion is **not sent to admins by default**. Admins have to add themselves to the cc on the student's completion email ([source](https://support.thinkific.com/hc/en-us/articles/360048909674-Can-I-get-notified-when-my-student-completes-a-course)).

In-app: the mobile app and Communities have a bell with a **red dot** for unread items, plus push notifications for community activity *(index only, from Thinkific support and changelog)*. The web admin has no notification feed documented.

### Teachable (article dated 2026-01-21)

Source: [Email notifications](https://support.teachable.com/en/articles/11682445-email-notifications).

Admin emails, set per user under Settings > Notifications:

- Enrolment: new student joins the school, enrolment in a paid product, enrolment in a free product. These go to owners, authors and affiliates.
- Comments: comment needs moderation, new comment in your course, new comment in a thread you commented on, reply to your comment. These go to owners and authors.
- Subscriptions: payment failed or cancelled for non-payment, student cancelled. These go to owners only.

Student emails, set by the owner for the whole school: certificate of completion, comments in threads they're in, drip content unlocked, automatic unenrolment when access expires, free-product receipt.

Owners can force a student email off for everyone, whatever each student has opted into. Stripe sends subscription payment emails, and those can't be changed in Teachable.

The article doesn't mention any in-app notifications.

### Podia (articles dated 2026-10-06 to 2026-10-08)

- **Admin toggles** ([Managing admin notifications](https://help.podia.com/en/articles/15565211-managing-admin-notifications)): member departures, affiliate sales, blog comments, free product sales, members joining for free, paid sales, payment-plan instalment succeeded or failed, subscription cancellations, subscription changes. You can also **mute particular products** while leaving the rest on.
- **Community feed** ([Notifications](https://help.podia.com/en/articles/14089638-notifications)):
  - It covers new posts in spaces you follow, comments on your posts, replies to your comments, mentions, reactions, and reports (moderation).
  - It opens as a **popover from the sidebar** with **All / Unread** filters, **mark all as read** and a settings link. **"View all"** opens a full page.
  - Clicking an item opens it and marks it read. The feed only covers the Podia you're viewing.
- **Channels and digests** ([Managing notifications](https://help.podia.com/en/articles/14744410-managing-notifications)):
  - Each type can be on or off separately for **web** and **email**.
  - Activity email can be instant, hourly, daily (8:10 local time), weekly (Friday 8:10) or off.
  - Chat emails are **grouped with a 10-minute delay**.
  - The unsubscribe link in an email turns off only that one type.
- **Why digests were added** ([changelog, 2026-04-28](https://changelog.podia.com/en/get-activity-notifications-as-an-hourly-or-daily-email-digest)): before then, every new comment, reaction and post sent its own email. Digests let members catch up on their own schedule as communities grow.

### Maven (cohort courses)

- The student inbox covers DMs, @-tags and replies to threads, with email **at most twice a day** ([Student home, 2026-04-14](https://help.maven.com/en/articles/9081204-student-home)).
- Due-date reminder emails go out the day before, only to students who haven't finished the item. **Items due within 24h are bundled into one email.** No due date means no email ([Student notifications, 2024-02-02](https://help.maven.com/en/articles/8887252-student-notifications)).
- Instructors are emailed when tagged, sent a DM, or when a thread they're in gets a reply. Posting in #announcements emails every enrolled student *(index only, Maven help centre)*.

### Open edX (open-source docs, Teak/Ulmo releases, 2025)

This is the best-documented in-app design. Sources: [Notifications & Preferences](https://docs.openedx.org/en/release-teak/learners/sfd_notifications/index.html) and [Ulmo release notes](https://docs.openedx.org/en/ulmo/community/release_notes/ulmo/ulmo_notifications.html).

- **Bell in the upper right of every page, with an unread count.** It opens a **tray with tabs by area**: Discussions, Grading, Updates.
- Clicking a notification opens the content. Notifications expire after 3 months.
- Types:
  - Discussion: replies or comments on your posts and posts you follow, endorsements, new posts, new questions, reported content (moderators only).
  - Course updates from the instructor.
  - Grading: grade received; new submission needing grading (staff only).
- Defaults keep noise down: new discussion posts and new questions are **off** in both tray and email. New-submission alerts for staff are tray-only. Most email defaults to **daily**.
- The email digest is grouped by area and goes out daily at 22:00 UTC, or weekly on Saturday. Each activity can be set separately, per course. A gear icon in the tray opens preferences.

### Udemy (marketplace)

Udemy's help centre moved to a JavaScript-only site (success.udemy.com) that I couldn't fetch, so everything here is *(index only)* from the indexed copy of [Instructor Account Notifications](https://support.udemy.com/hc/articles/115008393928-Instructor-Account-Notifications) and [student notification preferences](https://support.udemy.com/hc/articles/229231147).

- Instructors have a header bell with a **red number badge** for on-site notifications, such as Q&A replies and promotional-email confirmations. They also get the **Daily Q&A Digest** and the **New Student & Review Daily Digest**, which can be set per course.
- **Q&A reply and direct-message notifications cannot be disabled.** (This is stated on a mirror of the article, so it's lower confidence.)
- Students manage notification preferences in Account settings, with a toggle for each category and checkboxes inside each.
- The instructor mobile app can push DMs, Q&A and reviews, with a choice of frequency.

### Udemy Business (closest analogue to Team Licence / Team Admin)

These are all *(index only)*, from [business-support.udemy.com](https://business-support.udemy.com/hc/en-us/categories/4421571586583-Managing-users):

- The admin and owner get an email when **licences are running low** (Manage > Settings > Email reminders) ([source](https://business-support.udemy.com/hc/articles/33345372897559-Email-Reminders-for-Low-License-Availability)).
- A learner gets an email when an admin **assigns them a licence**.
- When an approval is requested, **all account admins** are emailed, and the requester is emailed when it's approved or rejected (custom-course approval flow).

### Coursera

- Learners pick email categories under Settings > Communication Preferences: Coursera emails, course announcements and reminders, partner emails, degree emails. Forum emails are controlled by following or unfollowing a thread *(index only)* ([source](https://www.coursera.support/s/article/929742317-Check-and-Update-Your-Email-Communication-Preferences?language=en_US)).
- The Coursera community has a thread titled **"Daily email spam"**, which signals that learners find the daily reminder emails noisy. I couldn't open the thread (it needs JavaScript), so only the title is evidence.

## Patterns

### Roles

| Role (theirs) | Cadence term | What they typically get |
| --- | --- | --- |
| Learner / student / member | **Student** | Receipt, Enrollment welcome, completion or certificate, reply to my comment, mention, reminders (due date, weekly progress, "get started") |
| Instructor / author / course admin | **Instructor** | New Enrollment on my course, new comment or Q&A on my lesson, reply in a thread I'm in, new or updated review (rating), submission to grade |
| Owner / site admin | (closest: **Platform Admin**) | New order, payout, failed or cancelled subscription, moderation queue or reports |
| Business admin (Udemy Business) | **Team Admin** | Licences running low, approval requests. The learner side is emailed "licence assigned" |
| Platform staff | **Platform Admin** | Not documented publicly. Where staff get anything, it's a moderation queue (Teachable "comment needs moderation", Podia and Open edX "reported content") |

### Valuable and noisy

Valuable (high-signal, the kind platforms make hard to turn off):

- Replies to *my* comment or thread, @mentions, DMs.
- Grade or result received.
- Anything about money: receipts, failed payments, renewal or trial-end warnings. These are non-optional on Thinkific and Teachable/Stripe.

Noisy (the kind platforms turn off by default or move into digests):

- Every new post or comment in a course (off by default in Open edX).
- Reactions (Podia moved them into digests).
- Per-event emails in an active community, which is why Podia added digests.
- Daily reminder emails (the Coursera "Daily email spam" thread).

Instructor volume is the other source of noise. Thinkific turns every notification on by default for new Site Admins. Udemy instead rolls new students, reviews and Q&A into **daily digests**.

### Grouping and digests

- Per-type, per-channel toggles (web or email) are universal. Open edX also lets you set them **per course**, and Podia lets you **mute a product**.
- Common cadences are instant, hourly, daily and weekly. Daily is the usual default (Open edX). Delivery times are fixed: Open edX uses 22:00 UTC; Podia uses 8:10 in the user's local time.
- Bundling in a time window: Maven merges items due within 24h; Podia holds chat for 10 minutes.
- Digest emails are grouped by area (Open edX: Discussions, Grading, Updates).
- An unsubscribe link in an email turns off **only that type** (Podia, Maven).
- No source described folding repeated in-app items into one entry (e.g. "5 new replies on Lesson 3"). Feeds seem to list one row per event.

### Feed UI

- A bell in the header with an **unread count** (Open edX, Udemy) or a **red dot** (Thinkific mobile and Communities).
- A **dropdown or tray** with tabs by category (Open edX) or All/Unread filters (Podia), **mark all as read**, a link to settings (gear), and **"View all" → a full page** (Podia).
- Clicking an item opens what it refers to and marks it read. Notifications expire after 3 months (Open edX).

## Mapping to Cadence

These are suggestions drawn from the patterns above, not findings.

| Cadence event | Recipient | Evidence it's worth an in-app notification |
| --- | --- | --- |
| Reply in a lesson comment thread I'm in | Student, Instructor | Universal, and treated as high-signal everywhere |
| New comment on my lesson | Instructor | Common, but noisy at volume. Digest it, as Udemy and Teachable do for authors |
| New Enrollment on my course (Individual Purchase or Claimed Seat) | Instructor | Teachable and Thinkific send one per event. Udemy uses a daily digest |
| New or updated rating | Instructor | Thinkific (written or updated), Udemy (digest) |
| Quiz result | Student | Open edX "grade received" is on by default |
| Refund Request opened | Platform Admin | Nearest analogue is the moderation queue or approval requests to all admins (Udemy Business) |
| Refund Request approved or declined | buyer (Student or Team Admin) | Analogue: requester told of approval or rejection (Udemy Business). Not documented for refunds on any platform |
| Issued Refund / Failed Refund | buyer | Analogue: money events are non-optional emails (Thinkific, Stripe). Not documented as in-app |
| Seat claimed / Unclaimed Seats running low | Team Admin | Analogue: Udemy Business low-licence reminder |
| Enrollment granted via Claimed Seat | Student | Analogue: Udemy Business "licence assigned" email |

## Gaps and uncertainty

- **Refunds:** none of the platforms publicly documents refund-decision notifications. Udemy handles refunds through support. Cadence's Refund Request flow has no direct precedent here.
- **Udemy and Coursera:** their help centres are JavaScript-only Salesforce sites that I couldn't fetch. Those claims come from search-index copies and a third-party mirror of Udemy's help centre (kvzcldemo.zendesk.com), so check them before relying on them.
- **Thinkific bell:** the details come from search snippets, and the changelog entry is undated.
- **No usage data:** "valuable or noisy" is inferred from what platforms default off or move into digests, plus Podia's stated reason. No platform published engagement metrics.
- **Help-centre articles change without notice.** Dates above are the articles' own dates where they showed one. Thinkific articles are undated.
- **Not covered:** Kajabi, Skillshare and LinkedIn Learning.
