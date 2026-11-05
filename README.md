# KitsEye — KITSW College Grievance Management

A MERN application for submitting, reviewing, assigning, tracking and resolving campus grievances. This repository is a fresh implementation because no existing source-code project was present in the supplied workspace. It follows the supplied KitsEye requirements and earlier project direction.

## Stack

- React 18 + Vite, React Router, Axios, Recharts, Lucide
- Node.js + Express 4
- MongoDB + Mongoose
- JWT authentication + bcryptjs password hashing
- Multer file uploads, Helmet, CORS and rate limiting

## Requirements

- Node.js 20+ and npm
- MongoDB Community Server running locally, or a MongoDB Atlas connection string

## Quick start

1. Open a terminal in the project root.
2. Install root and workspace dependencies:

   ```bash
   npm install
   npm --prefix server install
   npm --prefix client install
   ```

3. Create the server environment file:

   ```bash
   copy server\.env.example server\.env
   ```

   On macOS/Linux use `cp server/.env.example server/.env`.

4. Set `MONGO_URI` and replace `JWT_SECRET` with a long random secret (32+ characters).
5. Seed demo data:

   ```bash
   npm run seed
   ```

6. Start the API and frontend:

   ```bash
   npm run dev
   ```

   Frontend: http://localhost:5173  
   API health: http://localhost:5000/api/health

## Demo accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@kitseye.demo | Admin@12345 |
| Student | student@kitseye.demo | Student@12345 |
| Student | sara@kitseye.demo | Student@12345 |
| Infrastructure department | infra@kitseye.demo | Dept@12345 |
| Hostel department | hostel@kitseye.demo | Dept@12345 |

These are demo-only credentials. Change them before any shared deployment. The seed script clears the KitsEye collections before inserting demo data; do not run it against a production database.

## Environment variables

See `server/.env.example`. `CLIENT_URL` accepts a comma-separated list of allowed frontend origins. `UPLOAD_DIR` is relative to the server working directory.

For a separately deployed frontend, set `VITE_API_URL` at frontend build time, e.g. `https://your-api.example.com/api`.

## Implemented features

- Student registration/login; admin and department staff login
- Server-verified JWT authentication and role middleware
- Student dashboard and grievance submission with optional anonymity
- Categories, priority, location, evidence upload (JPG/PNG/WEBP/PDF, 5 MB each, max 5)
- Admin review, approve, reject, request-information and department assignment
- Department-scoped complaint access, accept/progress/resolution actions
- Student tracking, additional information and reopening requests
- Timestamped status history
- In-app notifications and unread/read state
- Authenticated attachment download endpoint with complaint-owner / assigned-department / admin checks
- SLA sweep runs every 15 minutes while the API process is running, plus an admin-triggered endpoint
- Keyword moderation heuristic for a small configured set of English, Hindi and Telugu terms; flags for human review only
- SLA deadline calculation (24 hours / 72 hours / 7 days), overdue statistics and admin-triggered escalation
- Analytics by status/category/month, user/department management and audit log views
- Responsive landing page and role-specific navigation

## API overview

All protected routes require `Authorization: Bearer <JWT>`.

### Authentication

- `POST /api/auth/register` — create student account
- `POST /api/auth/login` — login
- `GET /api/auth/me` — current user

### Grievances

- `POST /api/complaints` — student submission (multipart form; `attachments` field)
- `GET /api/complaints` — role-scoped list; supports `status`, `category`, `priority`, `search`, `page`, `limit`
- `GET /api/complaints/stats` — role-scoped metrics
- `GET /api/complaints/:id` — authorized details and history
- `POST /api/complaints/:id/identity` — admin-only, justification-required access to an anonymous submitter reference (audited)
- `PATCH /api/complaints/:id/moderation` — admin marks a moderation flag reviewed
- `GET /api/files/:filename` — authenticated attachment download with role/ownership checks
- `PATCH /api/complaints/:id/review` — admin actions: `approve`, `reject`, `needs-info`, `assign`
- `PATCH /api/complaints/:id/department` — department actions: `accept`, `progress`, `resolve`
- `PATCH /api/complaints/:id/student` — student actions: `provide-info`, `reopen`

### Workspace

- `GET /api/notifications`
- `PATCH /api/notifications/:id/read`
- `GET /api/departments`, `POST /api/departments` (admin)
- `GET /api/users`, `POST /api/users` (admin)
- `GET /api/audit-logs` (admin)
- `POST /api/escalate` (admin-triggered SLA sweep)

## Tests and build

```bash
npm test
npm run build
```

The current automated tests cover the deterministic moderation helper. They do **not** constitute full end-to-end coverage of every role, database workflow, file handling or deployment scenario. A MongoDB instance is required for integration testing and local operation.

## Important security / deployment notes

- Never use real student passwords as demo credentials.
- Do not use Aadhaar numbers as login credentials.
- Anonymous submission hides identity from department-facing data in the current API. It is pseudonymous, not complete technical anonymity: the application retains the authenticated account reference for ownership and tracking.
- The moderation detector is a small keyword heuristic, not an AI language-understanding system. It will have false positives and false negatives.
- Upload validation checks MIME type and size, and downloads use an authorization-checked endpoint. Production deployments should additionally inspect file signatures, scan uploads for malware and use private object storage.
- Configure HTTPS, strong secrets, a production CORS allowlist, database backups, log retention and account recovery before real institutional use.
- SLA escalation runs in a 15-minute in-process scheduler and is also admin-triggerable. For multi-instance production deployments, replace this with a single monitored background worker/queue to avoid duplicate processing and add notification retries.
- Add institutional policy, retention, grievance confidentiality and escalation rules with KITSW before production use.

## Project structure

```text
kitseye/
  client/                 React + Vite application
  server/
    config/               MongoDB connection
    controllers/          Request handlers
    middleware/           Authentication, uploads, errors
    models/               Mongoose models
    routes/               REST route definitions
    services/             Moderation, notifications, audit
    tests/                Node test runner tests
    uploads/              Local upload directory
  package.json
```

### Windows quick setup

Run PowerShell in the project root:

```powershell
.\setup-windows.ps1
```

Edit `server/.env`, make sure MongoDB is running, then run:

```powershell
npm run seed
npm run dev
```
