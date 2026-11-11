# In-app notification vendors for Cadence

Research for [#4](https://github.com/kdoroszewicz/cohort-005-project/issues/4), part of [#3](https://github.com/kdoroszewicz/cohort-005-project/issues/3).

- **Researched:** 2026-11-11. Pricing pages and plan contents change often. Re-check them before signing up.
- **Scope:** an in-app feed for Students, Instructors, Team Admins and Platform Admins. Email and push may come later. Cadence uses React Router v7, TypeScript, Node, and a single SQLite file through Drizzle.
- **Sources:** vendor pricing pages, vendor docs, SDK READMEs (through Context7), and the Novu GitHub repo. A claim with no citation is my own inference and is marked as such.

## Working assumption for "small scale"

The numbers below are an assumption, not a measurement. Assume roughly 1,000 active users, each getting about 10 in-app notifications a month, for about 10,000 in-app messages a month. Most vendors bill one unit per delivery per channel. Adding email later would roughly double the count for every notification that also goes out by email ([Knock plans: "A workflow that notifies a user by both email and in-app results in two messages"](https://docs.knock.app/manage-your-account/knock-plans)).

## Summary table

| Vendor | Free tier | First paid tier | EU data residency | Prebuilt React feed | Headless hooks | Preference centre | Node trigger SDK | Real-time |
|---|---|---|---|---|---|---|---|---|
| **Knock** | 10k messages/mo | Starter $250/mo, 50k messages, then $0.005 each | **No.** "Expected by end of 2026". Transfers use SCCs. | Yes: `NotificationFeedPopover`, `NotificationIconButton` | Yes: `useNotifications`, `useNotificationStore` | Preferences API. You build the UI from documented patterns. | `@knocklabs/node` | Managed WebSocket |
| **Novu Cloud** | 10k workflow runs/mo. Inbox messages kept 30 days. | Pro from $30/mo, 30k runs, then $1.20 per 1k | **Yes, all plans**, Frankfurt (`eu.api.novu.co`). DPA and SCC available. SOC 2 Type II. | Yes: `<Inbox />` with `appearance` and `render*` props | Yes: `useNotifications`, `useCounts` | Yes, included in Inbox | `@novu/api` | WebSocket (`eu.socket.novu.co`) |
| **Novu self-hosted (Community)** | Free (MIT core) | n/a | Wherever you host it. You are the processor, and Novu offers no DPA. | Same `<Inbox />` | Same | Yes | Same | Yes |
| **MagicBell** | 1k deliveries/mo | Startup $249/mo, 50k, then $0.0025 each | Not documented. Says "GDPR compliant" and offers DPAs. No region named. | Yes: `Inbox`, `FloatingInbox`, `ToastContainer` | Not documented for React | Yes: `UserPreferences` component | `magicbell-js` (project client) | Not documented |
| **Courier** | 10k sends/mo | Business $0.005 per send, no platform fee | Yes, eu-west-1 (Ireland), "by arrangement". The plan tier is inconsistent across Courier's own pages. | Yes: `CourierInbox` with theme and `render*` slots | Yes: `useCourier()` | Yes: hosted page, `CourierPreferences`, and hooks | `@trycourier/courier` | Yes |
| **SuprSend** | 10k notifications/mo, with SuprSend branding | Essentials $100/mo, 50k, then $2 per 1k. Preferences start on Business, $250/mo. | Yes. Each workspace has a data region, "including the EU". | Yes: `Inbox` (`@suprsend/react`) | Yes: `@suprsend/react-core` | Yes: hosted, embedded, and headless hooks | Node SDK (package not verified here) | WebSocket |
| **Stream Activity Feeds** | Build: 5k activities/mo, no overage | Start $499/mo (annual) | Dublin region, chosen in the dashboard. GDPR listed. | No drop-in bell. Hooks plus your own UI. | Yes: `useAggregatedActivities`, `useNotificationStatus` | No | Node SDK | Yes |
| **Pingram (formerly NotificationAPI)**, a newcomer | Free tier (email and SMS quotas) | Budget plans from $20/mo | **Yes, all plans** (US, EU, CA) | Yes: `NotificationPopup` (`@notificationapi/react`) | Yes: `@notificationapi/core` | Prebuilt preference screen | Server SDKs (Node not verified here) | WebSocket |
| **Build it ourselves** | $0 software | Engineering time | Our own hosting | We build it | n/a | We build it | n/a | SSE or polling |

## Frontrunners

1. **Novu Cloud (EU region).**
   - It is the only mainstream vendor that offers EU hosting (Frankfurt) on **every plan, including Free**.
   - It also publishes a downloadable DPA and SCCs and is SOC 2 Type II.
   - The free tier (10k runs) covers the working assumption. The next step up is Pro at $30/mo, so it is the cheapest paid tier here.
   - The React `<Inbox />` includes preferences.
   - The core is MIT-licensed, so self-hosting is a real exit path, which lowers lock-in.
2. **Courier.**
   - It has the most complete prebuilt UI: an inbox, a React preference component, and a hosted preference page for email unsubscribe links later.
   - The free tier is 10k sends. After that it is pay-as-you-go at $0.005 per send with no platform fee, which stays gentle at small scale.
   - It has an EU datacenter, but the EU region is enabled only "by arrangement", and Courier's own pages disagree on which plan includes it. Confirm with sales.
3. **SuprSend.**
   - Workspaces can be placed in an EU data region.
   - It has a drop-in React `Inbox`, headless hooks, and an embedded preference centre.
   - The free tier is 10k notifications with branding. Preferences need Business at $250/mo.
   - Self-hosting and BYOC are available, but they need an Enterprise licence.

**Knock** has arguably the most polished React SDK and dev experience, but it has **no EU residency today** (promised for "end of 2026"). The jump from free to paid is also steep ($0 to $250/mo). **MagicBell**'s 1k free tier is too small, and it documents no EU region. **Stream** is a general activity-feed engine and comes with no notification-centre UI. **Pingram** is worth watching for EU hosting on all plans, but it is younger and its in-app features are less documented.

## Per-vendor notes

### Knock

- **Pricing:**
  - Free: 10k messages/mo. Knock does not hard-cap and contacts you instead.
  - Starter: $250/mo for 50k messages, then $0.005 each.
  - Feed retention is unlimited and configurable. Log retention is 30 days.
  - Source: [knock.app/pricing](https://knock.app/pricing).
- **Billing unit:** a message is "counted each time a notification is successfully delivered to a single user on a single channel" ([plans docs](https://docs.knock.app/manage-your-account/knock-plans)).
- **EU / GDPR:**
  - The plans docs say: "We expect to support EU data residency by the end of 2026" ([plans docs](https://docs.knock.app/manage-your-account/knock-plans)).
  - The privacy policy says Knock is not located in Europe and relies on EU SCCs and the UK Addendum for transfers ([privacy policy](https://knock.app/legal/privacy-policy), [DPA](https://knock.app/legal/data-processing-addendum)).
  - SOC 2 Type 2; the report is available on request ([security](https://docs.knock.app/developer-tools/security)).
- **UI:**
  - `@knocklabs/react` provides `KnockProvider`, `KnockFeedProvider`, `NotificationFeedPopover` and `NotificationIconButton`. You import the CSS unless you override the styling.
  - Headless mode uses `useAuthenticatedKnockClient`, `useNotifications` and `useNotificationStore` ([knocklabs/javascript README](https://github.com/knocklabs/javascript/blob/main/packages/react/README.md)).
- **Preferences:** a preferences API, with a documented React pattern for building your own preference centre ([React preferences](https://docs.knock.app/in-app-ui/react/preferences)). I found no drop-in preference component.
- **Real-time:** a managed WebSocket. The SDKs handle reconnection ([socket behavior](https://docs.knock.app/in-app-ui/feeds/socket-behavior)).
- **Lock-in:** workflows, templates and preferences live in Knock. Knock has no self-host option.

### Novu (Cloud)

- **Pricing:**
  - Free: 10k workflow runs/mo.
  - Pro: from $30/mo for 30k runs.
  - Team: from $250/mo for 250k runs.
  - Overage on paid plans is $1.20 per 1k runs ([novu.co/pricing](https://novu.co/pricing)).
- **Retention:**
  - Inbox messages: 30 days on Free, 90 days on Pro and Team.
  - Activity logs: 24 hours on Free, 7 days on Pro.
  - Source: [security docs](https://docs.novu.co/platform/additional-resources/security).
  - The 30-day inbox retention on Free matters for a course platform. Old notifications disappear.
- **EU / GDPR:**
  - The EU region is in Frankfurt and is available on all plans. Use `eu.api.novu.co` and `eu.socket.novu.co`.
  - API keys are tied to their region. Data cannot be moved between regions, so choose EU when you create the account.
  - DPA and SCC template at novu.co/dpa. SOC 2 Type II.
  - Source: [security docs](https://docs.novu.co/platform/additional-resources/security).
  - One Novu comparison page says EU is limited to Business and Enterprise. The pricing page and security docs both say all plans, so the comparison page is probably out of date.
- **UI:**
  - `@novu/react` `<Inbox />` themes through `appearance` (variables plus per-element classes, Tailwind supported).
  - `renderNotification` replaces each item, but you then rebuild the built-in actions yourself.
  - Headless hooks: `useNotifications`, `useCounts` ([Inbox customisation](https://docs.novu.co/platform/inbox/advanced-customization/customize-notification-items), [headless mode](https://docs.novu.co/platform/inbox/headless-mode)).
- **Node SDK:** `@novu/api`, with `novu.trigger({ workflowId, to, payload })`. Set `serverURL: "https://eu.api.novu.co"` for the EU region ([novu-ts README](https://github.com/novuhq/novu-ts/blob/main/README.md)).

### Novu (self-hosted Community edition)

- **Licence:** the repo is MIT, except `enterprise/packages`, which is under a proprietary licence ([LICENSE-ENTERPRISE](https://github.com/novuhq/novu/blob/next/LICENSE-ENTERPRISE)).
- **Gaps compared with Cloud:**
  - 1 team member.
  - No SSO, MFA or RBAC.
  - No email activity tracking and no snooze.
  - You cannot remove the Novu branding.
  - No DPA or SOC 2. GDPR "installation dependent".
  - The Inbox and preference components are available.
  - Source: [Self-hosted vs Cloud](https://docs.novu.co/community/self-hosted-and-novu-cloud).
- **Operations:**
  - Deployment is Docker Compose with MongoDB and Redis.
  - Migrations are manual. There is no Helm chart.
  - The docs aim it at teams comfortable with container infrastructure ([self-hosting overview](https://docs.novu.co/community/self-hosting-novu/overview), [Docker](https://docs.novu.co/community/self-hosting-novu/deploy-with-docker)).
  - My inference: a MongoDB and Redis stack is heavy next to Cadence's single SQLite file.

### MagicBell

- **Pricing:**
  - Builder (free): 1k deliveries/mo.
  - Startup: $249/mo for 50k deliveries, then $0.0025 each.
  - Source: [magicbell.com/pricing](https://www.magicbell.com/pricing).
- **EU / GDPR:** the trust centre says "fully compliant with GDPR" and "We provide data processing agreements". It names no hosting region and does not mention SOC 2 ([security](https://www.magicbell.com/security)).
- **UI:**
  - `@magicbell/react` provides `ContextProvider`, `Inbox`, `FloatingInbox`, `UserPreferences`, `InlineNotification`, `ToastContainer` and `WebPushButton`.
  - Theming uses CSS custom properties and class overrides.
  - No headless hooks are documented ([React library](https://www.magicbell.com/docs/libraries/react)).
- **Node:** `magicbell-js/project-client`, with `createBroadcast` ([magicbell-js](https://www.magicbell.com/docs/libraries/magicbell-js)).
- **Channels:** email (SES, SendGrid, Mailgun, SMTP), APNs, FCM, Expo, web push, Twilio SMS, Slack and Teams ([docs](https://www.magicbell.com/docs)).

### Courier

- **Pricing:**
  - Developer (free): 10k sends/mo.
  - Business: $0.005 per send, no platform fee.
  - Source: [courier.com/pricing](https://www.courier.com/pricing).
- **EU / GDPR:**
  - Courier runs two regions: US (us-east-1) and EU (eu-west-1, Ireland). The same API key works in both. Only the base URL changes (`api.eu.courier.com`).
  - The EU region is "provisioned by arrangement", and new workspaces cannot be created in it ([security docs](https://www.courier.com/docs/workspaces/security)).
  - **Conflict:** the pricing page lists EU Data Residency under Business. A Courier blog post says Enterprise ([EU residency blog](https://www.courier.com/blog/eu-data-residency-notifications)). Confirm with sales.
- **UI:**
  - `@trycourier/courier-react` `CourierInbox` has a `CourierInboxTheme` and `renderHeader`, `renderListItem` and `renderEmptyState` slots ([custom inbox](https://www.courier.com/docs/in-app/build-a-custom-inbox), [customise](https://www.courier.com/docs/in-app/customize-the-inbox)).
  - Headless use goes through `useCourier()`.
- **Preferences:**
  - A hosted preference page needs no frontend code and suits email footers.
  - `CourierPreferences` is a React component, available from v9.2.0.
  - `useCourier().preferences` hooks support a fully custom UI.
  - Source: [embedding preferences](https://www.courier.com/docs/platform/preferences/embedding-preferences).
- **Node:** `client.send.message({ message: { to: { user_id }, template, routing: { channels: ["inbox"] } } })` ([send to inbox](https://www.courier.com/docs/in-app/send-to-the-inbox)).

### SuprSend

- **Pricing:**
  - Free: 10k/mo, with SuprSend branding in the inbox.
  - Essentials: $100/mo for 50k, then $0.002 each.
  - Business: $250/mo for 50k, then $0.005 each. This is the first tier that lists "User Preferences".
  - Source: [suprsend.com/pricing](https://www.suprsend.com/pricing).
- **EU:**
  - "Each workspace has a data region, including the EU" ([what is SuprSend](https://docs.suprsend.com/docs/what-is-suprsend)).
  - The enterprise page mentions US or EU residency ([enterprise](https://www.suprsend.com/enterprise)).
  - The pricing page itself names custom regions only under Enterprise. Confirm whether an EU workspace is available on Free and Essentials.
- **Hosting options:** SuprSend cloud on every plan. BYOC and full self-hosting need an Enterprise licence.
- **UI:**
  - `@suprsend/react` provides a drop-in `Inbox` that handles WebSocket, pagination and real-time.
  - `@suprsend/react-core` is the headless option (`useFeedClient`, `useFeedData`).
  - Toasts are your own job, using `ToastNotificationCard` ([inbox quick start](https://docs.suprsend.com/docs/inbox-quick-start)).
- **Preferences:** hosted and embedded preference centres, with headless hooks at the channel, category, and channel-within-category levels ([embedded preference centre](https://docs.suprsend.com/docs/embedded-preference-centre)).

### Stream Activity Feeds

- **Pricing:**
  - Build (free): 125k API calls and 5k activities/mo, with no overage allowed.
  - Start: $499/mo billed annually, or $599 monthly.
  - A "$100 monthly free credit for makers" applies to teams of fewer than 5 people with under $10k monthly revenue. Availability is "limited".
  - Source: [Stream pricing](https://getstream.io/activity-feeds/pricing/).
- **EU:** Dublin (`dublin`) is a selectable Feeds region ([performance & regions](https://getstream.io/activity-feeds/docs/javascript/v2/performance/), [security FAQ](https://getstream.io/security/faq/)). That FAQ page is old, so re-confirm.
- **UI:** notification feeds track is_seen and is_read. React hooks are `useAggregatedActivities` and `useNotificationStatus`. Unread counts are computed from the last 1,000 activities ([React notification feeds](https://getstream.io/activity-feeds/docs/react/notification-feeds/)). There is no drop-in bell or inbox and no preference centre.
- **Fit:** it is an activity-feed engine, not a notification orchestrator. It has no multi-channel workflows, email or push.

### Pingram (formerly NotificationAPI), the newcomer

- **Rebrand:** `notificationapi.com/pricing` now 301-redirects to `pingram.io/pricing`.
- **Pricing:** budget-based, from $20/mo. Email costs $0.0005 each.
- **EU:** the EU region is listed for all plans (US, EU, CA) ([pricing](https://www.pingram.io/pricing)).
- **UI:** `@notificationapi/react` provides `NotificationPopup` and a preference screen. `@notificationapi/core` is the headless option, with WebSocket delivery ([in-app docs](https://www.pingram.io/docs/channels/inapp)).
- **Uncertainty:**
  - The pricing page does not say how in-app messages are billed.
  - The props of the preference component are thinly documented.
  - The vendor is smaller and younger than the others.

## Build it ourselves (for comparison)

This is my own estimate, not taken from a source. A minimal version that fits Cadence's stack would need the following.

- **Database: a `notifications` table in SQLite, through Drizzle.**
  - Columns: `id`, `recipientUserId`, `type`, `actorUserId?`, `subjectType` and `subjectId` (for example a course or comment), `payload` (JSON), `createdAt`, `seenAt?`, `readAt?`, `archivedAt?`.
  - Index on `(recipientUserId, createdAt desc)`.
  - It would sit next to the existing tables (`users`, `teams`, `teamMembers`, `comments`, `enrollments`) in `app/db/schema.ts`.
- **Database: a `notification_preferences` table** with `(userId, type, channel, enabled)`, in case preferences are needed later.
- **Fan-out at write time.** Domain events insert one row per recipient. Examples: a new comment notifies the instructor, a purchase notifies the team admin, a refund notifies the platform admin. Role-based audiences such as "all Team Admins of team X" are resolved in our own code. This is the main thing a vendor's "topics" or "tenants" feature would otherwise do.
- **Read state:** a loader for the feed with cursor pagination, an unread-count loader for the bell badge, and actions for mark read, mark all read, and archive.
- **Real-time:**
  - The simplest option is a React Router resource route that streams SSE, plus an in-process event emitter. This works because Cadence runs as a single Node process on one SQLite file.
  - Polling the unread count every 30 to 60 seconds through `useRevalidator` is even simpler.
  - Running more than one instance later would need Redis pub/sub or similar.
- **UI:** a bell, a popover list and a settings page, built with the Radix and Tailwind components already in the repo.
- **Later channels:** email would mean a provider such as SES, Postmark or Resend, plus templating, unsubscribe links, retries and digests. This is where vendors earn their price. The in-app feed alone is a small feature to build.
- **GDPR:** the data stays in our own database, so there is no new subprocessor and no extra DPA.

## Lock-in and export

- **All SaaS vendors:** workflow and template definitions, subscriber and user records, and preference state live with the vendor. Your app keeps the user IDs, so recipients map cleanly. Re-creating workflows elsewhere is the main switching cost.
- **Novu:** the lowest lock-in. The MIT-licensed core can be self-hosted, and the Inbox SDK is the same in both versions. Cloud data cannot be moved between regions.
- **Knock and Courier:** both publish migration guides between each other (for example [Courier: migrate from Knock](https://courier.com/docs/tutorials/migrate/from-knock)). This suggests their concepts map closely, so switching is feasible.
- **SuprSend:** self-hosting is possible only under an Enterprise licence.
- **Build:** no lock-in, but every feature is ours to build.

## Open questions and uncertainty

- **Courier:** which plan actually includes the EU datacenter (Business or Enterprise)?
- **SuprSend:** can an EU workspace be chosen on the Free and Essentials plans?
- **MagicBell:** where is data hosted, and what is the SOC 2 status? Neither is documented publicly.
- **Knock:** will EU residency ship by the end of 2026 as promised? Its docs carry that promise.
- **Novu Free:** inbox retention is 30 days, so old notifications disappear. Decide whether that is acceptable.
- **Pricing:** all figures come from pages fetched on 2026-11-11, in USD, excluding VAT.
