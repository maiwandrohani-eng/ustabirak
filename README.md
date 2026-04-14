# UstayaBirak Platform

UstayaBirak is a mobile-first, real-time on-demand services marketplace that connects workers and customers across instant and scheduled bookings.

## What is included

- `apps/api`: Fastify + Socket.IO backend with matching, booking workflow, escrow/release payment states, reviews, disputes, and admin metrics.
- `apps/web`: Customer-facing web app for discovery, filtering by category, and instant booking with live status events.
- `apps/mobile`: Expo React Native app scaffold with worker/customer role views and real-time marketplace events.
- `apps/admin`: Admin dashboard for users, jobs, commissions, disputes visibility, and real-time system events.
- `packages/shared`: Shared types and theme constants used by all apps.

## Core product flows implemented

1. Customer requests a service (`POST /jobs/request`)
2. Matching engine ranks nearby/qualified workers and pushes real-time job offers
3. Worker accepts (`POST /jobs/:jobId/respond`)
4. Job transitions through `accepted -> in_progress -> completed -> confirmed`
5. Payment enters escrow when accepted and releases on customer confirmation
6. Customer reviews worker after completion
7. Admin monitors events, growth, and commission revenue

## Worker features

- Registration and worker account creation (`POST /auth/register` with role `worker`)
- Professional profile edits (`PUT /workers/:workerId/profile`)
- Availability setup (`PUT /workers/:workerId/availability`)
- Job inbox via sockets (`job:new`)
- Accept/reject jobs (`POST /jobs/:jobId/respond`)
- Upcoming/past jobs (`GET /workers/:workerId/jobs`)
- Earnings and payout ledger (`GET /workers/:workerId/earnings`)

## Customer features

- Search by category + filters (`GET /workers/search`)
- Book instantly or scheduled (`POST /jobs/request`)
- Real-time status updates from workers
- Completion confirmation (`POST /jobs/:jobId/confirm`)
- Reviews and trust feedback (`POST /reviews`)

## Trust and risk controls

- Worker verification status
- AI-style ranking score from distance, rating, response speed, completion rate, and trust
- Cancellation endpoint with refund behavior (`POST /jobs/:jobId/cancel`)
- Dispute endpoint (`POST /jobs/:jobId/dispute`)
- Admin commission configuration (`PUT /admin/settings/commission`)

## Logo-based design system

The UI adopts the brand colors inferred from the provided logo:

- Primary: `#ff533f`
- Secondary gray: `#5f5c5d`
- Background: `#050505`

This palette is applied across web, mobile, and admin with high-contrast trust-first UX.

## Quick start

1. Install dependencies

```bash
npm install
```

2. Start backend

```bash
npm run dev:api
```

3. Start customer web app

```bash
npm run dev:web
```

4. Start admin dashboard

```bash
npm run dev:admin
```

5. Start mobile app

```bash
npm run dev:mobile
```

## Scale-up roadmap for production

- Replace in-memory data with PostgreSQL + Prisma and Redis caching
- Use Stripe Connect for live escrow-like payment handling and worker payouts to bank accounts
- Add FCM/APNs push notifications
- Introduce auth with OAuth2/JWT refresh + role-based permissions
- Add GDPR modules: consent tracking, PII deletion, export, retention policy
- Add observability: OpenTelemetry traces + metrics + centralized logs
- Deploy as microservices with queue-backed workflows (matching, payouts, dispute handling)

## API examples

### Request a job

```bash
curl -X POST http://localhost:4000/jobs/request \
  -H "Content-Type: application/json" \
  -d '{
    "customerId":"c1",
    "category":"electrician",
    "title":"Fix kitchen outlet",
    "description":"No power in two sockets",
    "scheduledAt":"2026-04-14T15:30:00.000Z",
    "amount":40,
    "location":{"lat":41.015,"lng":28.98,"city":"Istanbul","district":"Beyoglu"}
  }'
```

### Worker accepts

```bash
curl -X POST http://localhost:4000/jobs/<jobId>/respond \
  -H "Content-Type: application/json" \
  -d '{"workerId":"w1","decision":"accept"}'
```

### Customer confirms completion and releases payout

```bash
curl -X POST http://localhost:4000/jobs/<jobId>/confirm
```
