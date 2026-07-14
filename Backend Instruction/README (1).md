# 🏛️ ASHRAY – Smart Foundation & Donation Management Platform

> **Foundation Operating System (Foundation OS)**  
> A centralized, scalable, and transparent platform for non-profit organizations, charities, and humanitarian foundations to manage members, volunteers, donors, campaigns, field operations, and financial accountability.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Key Features](#key-features)
3. [Technology Stack](#technology-stack)
4. [System Architecture](#system-architecture)
5. [Project Structure](#project-structure)
6. [Database Design Philosophy](#database-design-philosophy)
7. [Getting Started](#getting-started)
8. [Environment Variables](#environment-variables)
9. [API Documentation](#api-documentation)
10. [ER Diagrams](#er-diagrams)
11. [Security & Compliance](#security--compliance)
12. [Deployment](#deployment)
13. [Contributing](#contributing)

---

## Project Overview

ASHRAY digitizes the complete management lifecycle of humanitarian foundations. From a visitor registering as a volunteer to a donor tracking exactly how their Zakat was spent in a remote district, every interaction is logged, audited, and made transparent.

The platform supports:

- **Multi-level organizational hierarchy**: National → Division → District → Upazila → Union → Ward
- **Multi-role membership**: Volunteers, General Members, Individual Donors, Corporate Donors, Staff, Executive Members, Coordinators
- **Digital identity**: QR-code-based membership cards for instant verification
- **Transparent donations**: Live donation feeds, real-time campaign progress, and expense-tracked project execution
- **Field operations**: Volunteer assignments, activity reports, beneficiary verification, and relief distribution
- **AI-powered insights**: Donation prediction, fraud detection, smart volunteer matching, and route optimization

---

## Key Features

| Domain | Capabilities |
|--------|-------------|
| **Authentication & Membership** | OTP-based registration, JWT sessions, digital membership cards with QR codes, role-based profiles, renewal tracking |
| **RBAC & Security** | Granular permissions, row-level access policies, 2FA, IP whitelist/blacklist, audit logging, GDPR-compliant data retention |
| **Organization** | Hierarchical branches, committee management, area assignments, regional coordinators, branch budgets & inventory |
| **Donor Management** | Recurring subscriptions, corporate CSR tracking, donor wallets, certificates & badges, referral rewards |
| **Campaigns & Projects** | Emergency campaigns, milestone tracking, fund allocation, project budgets, beneficiary management, gallery & reports |
| **Donations & Payments** | Multi-gateway support (SSLCommerz, bKash, Nagad, Stripe), automated receipts, fund transfers, settlements |
| **Volunteer Ops** | Skill-based assignments, attendance & task tracking, field activity reports, expense reimbursement, performance scoring |
| **Beneficiary Relief** | Need assessment, relief packages, QR-based distribution verification, digital acknowledgement, follow-up visits |
| **Media & Events** | Event registration, photo/video galleries, live donation ticker, success stories, press releases, newsletters |
| **Notifications** | Push, Email, SMS, In-App, broadcast campaigns, emergency alerts, support tickets, FAQ |
| **Analytics** | Real-time dashboards, KPIs, donation analytics, branch performance, scheduled reports, audit trails |
| **Admin & CMS** | Dynamic page builder, menu management, multi-language & currency, SEO, backup & maintenance mode |
| **AI & Automation** | Smart recommendations, demand forecasting, fraud/duplicate detection, OCR & face verification, workflow automation |

---

## Technology Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Language** | Go 1.22+ | High-performance backend services |
| **Framework** | Echo (labstack/echo/v4) | HTTP router, middleware, context management |
| **ORM** | GORM (gorm.io/gorm) | PostgreSQL driver, migrations, associations |
| **Database** | PostgreSQL 15+ | Primary relational store (NeonDB / Supabase / Aiven) |
| **Cache** | Redis | Session store, rate limiting, live donation feed |
| **Queue** | Redis / RabbitMQ | Background jobs, email/SMS dispatch, report generation |
| **Search** | Elasticsearch (optional) | Full-text search on beneficiaries, campaigns, media |
| **Storage** | AWS S3 / Cloudinary | File uploads, gallery images, documents |
| **AI/ML** | Python microservices (FastAPI) | Prediction models, OCR, face verification (gRPC bridge) |
| **DevOps** | Docker, GitHub Actions, Render/Railway/Fly.io | Containerization, CI/CD, deployment |

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Client Layer                        │
│  (Web App │ Mobile App │ Admin Dashboard │ Public Website) │
└────────────────────┬────────────────────────────────────────┘
                     │ HTTPS / JSON
┌────────────────────▼────────────────────────────────────────┐
│                      API Gateway (Echo)                      │
│  • Rate Limiting │ CORS │ Request ID │ Recovery │ Logger   │
└────────────────────┬────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        ▼            ▼            ▼
┌──────────────┐ ┌──────────┐ ┌─────────────┐
│   Auth MW    │ │ Role MW  │ │  Audit MW   │
│  JWT Verify  │ │ RBAC     │ │  Access Log │
└──────┬───────┘ └────┬─────┘ └──────┬──────┘
       └─────────────┬┴──────────────┘
                     ▼
┌─────────────────────────────────────────────────────────────┐
│                    Handler Layer (DTO In/Out)               │
│  • Bind & Validate │ Extract Claims │ Call Service │ Respond │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   Service Layer (Business Logic)             │
│  • Rules │ Calculations │ Orchestration │ Event Publishing  │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                  Repository Layer (GORM / Raw SQL)           │
│  • CRUD │ Transactions │ Row Locks │ Preloads │ Scopes    │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│              PostgreSQL (Primary) + Redis (Cache)            │
│  • Row-Level Security │ Replication │ Backups │ Connection   │
│    Pooling (SetMaxOpenConns, SetMaxIdleConns)               │
└─────────────────────────────────────────────────────────────┘
```

### Clean Architecture Rules (Strict)

1. **Handlers** never talk to the database directly. They bind DTOs, validate input, extract JWT claims, call Services, and return JSON.
2. **Services** contain all business logic: password hashing, JWT generation, capacity checks, fund allocation rules, and notification triggers.
3. **Repositories** execute all GORM operations: CRUD, complex joins, transactions, and row-level locks (`FOR UPDATE`).
4. **Models** are pure GORM structs representing database tables. They are never exposed directly to the API.
5. **DTOs** define request payloads and response structures. Validation tags use `go-playground/validator/v10`.

### Dependency Injection

```go
// main.go – manual wiring
userRepo := repository.NewUserRepository(db)
authService := service.NewAuthService(userRepo, cfg, redis)
authHandler := handler.NewAuthHandler(authService)

campaignRepo := repository.NewCampaignRepository(db)
campaignService := service.NewCampaignService(campaignRepo, donationRepo, notificationService)
campaignHandler := handler.NewCampaignHandler(campaignService)
```

---

## Project Structure

```
ashray/
├── cmd/
│   └── api/
│       └── main.go                 # Application entry point, DI wiring
├── internal/
│   ├── config/                     # Env, constants, feature flags
│   ├── middleware/
│   │   ├── auth.go                 # JWT verification
│   │   ├── rbac.go                 # Role & permission checks
│   │   ├── audit.go                # Access logging
│   │   └── error.go                # Centralized error recovery
│   ├── dto/                        # Request & response structs
│   ├── handler/                    # HTTP handlers (Echo context)
│   ├── service/                    # Business logic
│   ├── repository/                 # Data access layer
│   ├── models/                     # GORM database models
│   ├── queue/                      # Background job workers
│   ├── notification/               # Push, Email, SMS dispatchers
│   └── ai/                         # gRPC client to Python ML services
├── pkg/
│   ├── utils/                      # Password, JWT, QR, Slug helpers
│   ├── response/                   # Standard JSON envelope
│   └── validator/                  # Custom validation rules
├── migrations/                     # GORM AutoMigrate + seed data
├── docs/                           # Module documentation (this suite)
├── tests/
│   ├── integration/                # API & DB integration tests
│   └── unit/                       # Service-layer unit tests
├── docker-compose.yml
├── Dockerfile
├── Makefile
└── .env.example
```

---

## Database Design Philosophy

1. **Normalization**: Core entities are normalized to 3NF to prevent duplication and ensure integrity.
2. **Auditability**: Every financial, membership, and administrative action creates an `*Activity` or `*Log` record.
3. **Hierarchical Integrity**: Geographic and organizational hierarchies use self-referential foreign keys with `ON DELETE RESTRICT` to prevent orphaned branches.
4. **Soft Deletes**: Financial records (donations, payments, expenses) are never hard-deleted; status transitions track their lifecycle.
5. **Partitioning**: Large time-series tables (`live_donation_feeds`, `audit_logs`, `notification_recipients`) use PostgreSQL native partitioning by `created_at` month.
6. **Indexes**: Foreign keys, search fields (`email`, `phone`, `national_id`), and frequently filtered columns (`status`, `role`, `created_at`) are indexed.
7. **Constraints**: Check constraints enforce business rules at the DB level (e.g., `price_per_hour > 0`, `CHECK (role IN ('driver', 'admin'))` style equivalents).

---

## Getting Started

### Prerequisites

- Go 1.22+
- PostgreSQL 15+
- Redis 7+
- Docker (optional)

### Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/your-org/ashray.git
cd ashray

# 2. Copy environment variables
cp .env.example .env
# Edit .env with your database and Redis credentials

# 3. Start dependencies (Docker)
docker-compose up -d postgres redis

# 4. Run migrations & seed data
make migrate
make seed

# 5. Start the development server (with Air hot-reload)
make dev
# Server runs at http://localhost:8080
```

### Running Tests

```bash
make test-unit
make test-integration
make test-coverage
```

---

## Environment Variables

```env
# Server
PORT=8080
ENV=development
LOG_LEVEL=debug

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USER=ashray
DB_PASSWORD=secret
DB_NAME=ashray_db
DB_SSLMODE=disable
DB_MAX_OPEN_CONNS=25
DB_MAX_IDLE_CONNS=10
DB_CONN_MAX_LIFETIME=30m

# Redis
REDIS_URL=redis://localhost:6379/0

# JWT
JWT_SECRET=your-256-bit-secret-here
JWT_ACCESS_EXPIRY=15m
JWT_REFRESH_EXPIRY=7d

# Encryption
BCRYPT_COST=12

# Storage (S3 or Cloudinary)
STORAGE_PROVIDER=s3
S3_BUCKET=ashray-uploads
S3_REGION=ap-southeast-1

# Payment Gateways (comma-separated enabled gateways)
PAYMENT_GATEWAYS=bkash,sslcommerz,nagad,stripe
BKASH_BASE_URL=https://tokenized.sandbox.bka.sh
SSLCOMMERZ_STORE_ID=ashrxxx
SSLCOMMERZ_STORE_PASS=xxx

# Notification
FIREBASE_PROJECT_ID=ashray-foundation
SMTP_HOST=smtp.sendgrid.net
SMS_PROVIDER=twilio

# AI Service (gRPC)
AI_SERVICE_HOST=localhost
AI_SERVICE_PORT=50051
```

---

## API Documentation

| Module | File | Description |
|--------|------|-------------|
| Authentication & Membership | `docs/01_AUTHENTICATION_AND_MEMBERSHIP.md` | Registration, OTP, JWT, digital cards, QR verification, renewals |
| RBAC & Security | `docs/02_RBAC_AND_SECURITY.md` | Roles, permissions, access policies, 2FA, audit, compliance |
| Organization Structure | `docs/03_ORGANIZATION_STRUCTURE.md` | Branches, committees, hierarchy, area assignments |
| Donor Management | `docs/04_DONOR_MANAGEMENT.md` | Donor profiles, subscriptions, wallets, certificates, referrals |
| Campaigns & Projects | `docs/05_CAMPAIGN_AND_PROJECT.md` | Fundraising, emergency relief, milestones, budgets, expenses |
| Donation & Payment | `docs/06_DONATION_AND_PAYMENT.md` | Payments, gateways, receipts, fund transfers, settlements |
| Volunteer & Field Ops | `docs/07_VOLUNTEER_AND_FIELD_OPS.md` | Assignments, schedules, attendance, field reports, rewards |
| Beneficiary & Relief | `docs/08_BENEFICIARY_AND_RELIEF.md` | Registration, need assessment, distribution, QR verification |
| Events & Media | `docs/09_EVENTS_AND_MEDIA.md` | Event management, galleries, live feed, success stories |
| Notifications & Support | `docs/10_NOTIFICATIONS_AND_SUPPORT.md` | Multi-channel notifications, alerts, tickets, FAQ |
| Analytics & Reports | `docs/11_ANALYTICS_AND_REPORTS.md` | Dashboards, KPIs, scheduled reports, audit trails |
| Admin, CMS & System | `docs/12_ADMIN_CMS_AND_SYSTEM.md` | Content management, settings, backups, localization |
| AI & Automation | `docs/13_AI_AND_AUTOMATION.md` | Smart recommendations, predictions, fraud detection, OCR |

---

## ER Diagrams

Master and module-wise ER diagrams are provided in:

- **DBML** (for Eraser.io import): `docs/14_ER_DIAGRAMS_MASTER.md`
- **Mermaid** (for GitHub/GitLab rendering): Embedded in each module doc
- **SQL DDL** (for Lucidchart import): `docs/14_ER_DIAGRAMS_MASTER.md`

---

## Security & Compliance

- **Authentication**: bcrypt (cost 12) + JWT (RS256 or HS256) + optional TOTP 2FA
- **Authorization**: RBAC with module-level `canView/create/update/delete/approve/export` flags
- **Data Protection**: AES-256 encryption for PII at rest, TLS 1.3 in transit
- **Audit**: Immutable `AccessLog`, `AuditLog`, `SecurityActivityLog` tables
- **Compliance**: GDPR data deletion requests, consent tracking, privacy policy versioning
- **Rate Limiting**: 100 req/min for public endpoints, 1000 req/min for authenticated users
- **Input Validation**: Strict DTO validation, SQL injection prevention via GORM parameterized queries, XSS output encoding

---

## Deployment

### Production Checklist

- [ ] `ENV=production` with structured JSON logging
- [ ] Database connection pooling tuned (`SetMaxOpenConns` = `2 * CPU cores`)
- [ ] Redis configured for session clustering
- [ ] Automated daily backups with `pg_dump` + S3
- [ ] Health check endpoint `GET /health` for load balancers
- [ ] Sentry or Datadog integration for error tracking
- [ ] `golang.org/x/crypto/acme/autocert` or reverse proxy TLS termination

### Platforms

| Platform | Type | Notes |
|----------|------|-------|
| Render | Web Service | Native Go buildpack, auto-deploy from GitHub |
| Railway | Web Service | PostgreSQL + Redis plugins available |
| Fly.io | Containers | Docker deploy, global edge routing |
| AWS ECS | Containers | Fargate for auto-scaling, RDS for PostgreSQL |

---

## Contributing

1. Fork the repository and create a feature branch (`git checkout -b feat/module-name`)
2. Follow Clean Architecture: Handler → Service → Repository
3. Write unit tests for Services and integration tests for Handlers
4. Ensure `go fmt`, `golint`, and `go vet` pass cleanly
5. Open a Pull Request with a clear description and linked issue

---

**License**: MIT  
**Maintainer**: ASHRAY Engineering Team  
**Support**: engineering@ashray.foundation
