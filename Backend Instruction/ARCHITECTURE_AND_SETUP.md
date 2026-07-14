# System Architecture & Developer Onboarding

> This document explains how ASHRAY is architected, how data flows through the system, and how a junior backend developer should reason about building features.

---

## 1. Architectural Patterns

### 1.1 Clean Architecture (Layered)

ASHRAY follows a strict layered architecture to ensure testability, maintainability, and separation of concerns.

```
┌────────────────────────────────────────────┐
│  External World (HTTP, CLI, Queue Workers) │
└──────────────┬─────────────────────────────┘
               │ DTOs (Request / Response)
┌──────────────▼─────────────────────────────┐
│  Handler Layer (Echo Context)              │
│  • Bind JSON → DTO                         │
│  • Validate DTO (validator/v10)            │
│  • Extract JWT claims from context         │
│  • Call Service methods                    │
│  • Return standardized JSON envelope       │
└──────────────┬─────────────────────────────┘
               │ Domain Models / Structs
┌──────────────▼─────────────────────────────┐
│  Service Layer (Business Logic)            │
│  • Enforce business rules                  │
│  • Hash passwords, generate JWTs           │
│  • Calculate available spots, fund balances│
│  • Orchestrate multi-step workflows        │
│  • Publish domain events to queue          │
└──────────────┬─────────────────────────────┘
               │ GORM Models
┌──────────────▼─────────────────────────────┐
│  Repository Layer (Data Access)            │
│  • CRUD operations                         │
│  • Complex queries with Preload/Join       │
│  • Database transactions (Tx)              │
│  • Row-level locking (FOR UPDATE)          │
│  • Raw SQL for reporting/analytics         │
└──────────────┬─────────────────────────────┘
               │ SQL / TCP
┌──────────────▼─────────────────────────────┐
│  PostgreSQL (+ Redis Cache/Queue)          │
└────────────────────────────────────────────┘
```

**Golden Rule**: A Handler must never import `gorm.io/gorm`. A Repository must never import `github.com/labstack/echo/v4`.

### 1.2 Dependency Injection (Manual)

We do not use a DI framework. Dependencies are wired manually in `main.go` to keep the dependency graph explicit and compile-time safe.

```go
// cmd/api/main.go
func main() {
    cfg := config.Load()
    db := database.Connect(cfg.Database)
    redis := cache.Connect(cfg.Redis)
    queue := queue.NewRedisQueue(redis)

    // Repositories
    userRepo := repository.NewUserRepository(db)
    membershipRepo := repository.NewMembershipRepository(db)
    zoneRepo := repository.NewParkingZoneRepository(db) // example pattern

    // Services
    authService := service.NewAuthService(userRepo, cfg.JWT, redis)
    membershipService := service.NewMembershipService(membershipRepo, userRepo, queue)

    // Handlers
    authHandler := handler.NewAuthHandler(authService)
    membershipHandler := handler.NewMembershipHandler(membershipService)

    // Router
    e := echo.New()
    router.Register(e, authHandler, membershipHandler, ...)

    e.Logger.Fatal(e.Start(":" + cfg.Port))
}
```

### 1.3 Request / Response Lifecycle

```
1. Client sends HTTP request
2. Echo Router matches route → Handler
3. Global Middleware: Logger, Recover, CORS, RequestID
4. Auth Middleware: Validate JWT, inject userID & role into Echo Context
5. RBAC Middleware: Check if role has permission for this route
6. Handler:
   a. Bind request body into DTO struct
   b. Validate DTO (required, email format, min/max length, enum values)
   c. Extract userID from context (set by Auth MW)
   d. Call Service method(s)
   e. Map result to Response DTO
   f. Return JSON with appropriate HTTP status
7. Audit Middleware: Log userID, action, IP, timestamp to AccessLog
```

---

## 2. Data Flow Examples

### 2.1 New Donation Flow

```
Driver / Donor
      │
      ▼ POST /api/v1/donations
┌─────────────┐
│   Handler   │──► Validate DTO (zone_id, amount, campaign_id)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Service   │──► 1. Start DB Transaction
│             │    2. Lock campaign row (FOR UPDATE)
│             │    3. Verify campaign is active & not expired
│             │    4. Lock zone row if parking reservation
│             │    5. Check capacity (active_count < total_capacity)
│             │    6. Create Donation record
│             │    7. Create Payment record (pending)
│             │    8. Call Payment Gateway API
│             │    9. On success: update Payment → paid, Donation → confirmed
│             │   10. Update Campaign raised_amount
│             │   11. Create DonationReceipt
│             │   12. Commit Transaction
│             │   13. Publish events: Notification, LiveFeed, Analytics
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Repository │──► INSERT donations, payments, receipts
│  (Tx + Lock)│    UPDATE campaigns (raised_amount)
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Queue     │──► Background: Send Email Receipt, Push Notification,
│   Workers   │    Update Live Donation Feed, Award Badge if milestone
└─────────────┘
```

### 2.2 Volunteer Field Report Submission

```
Volunteer App
      │
      ▼ POST /api/v1/field-activities/:id/reports
┌─────────────┐
│   Handler   │──► Validate report DTO, check volunteer owns this activity
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Service   │──► 1. Verify activity status == 'started'
│             │    2. Validate expense receipts (if any)
│             │    3. Save ActivityReport
│             │    4. Save VolunteerExpense records
│             │    5. Update VolunteerPerformance metrics
│             │    6. Publish event: AdminReviewRequired
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Repository │──► INSERT activity_reports, volunteer_expenses
│             │    UPDATE volunteer_performances
└──────┬──────┘
       │
       ▼
Admin Dashboard
  ──► Admin reviews report, approves expenses
  ──► Status updated: activity → 'completed'
  ──► Gallery photos published
  ──► Donors notified with transparency report
```

### 2.3 Relief Distribution (QR Verification)

```
Field Volunteer Device
      │
      ▼ POST /api/v1/distributions/:id/verify
┌─────────────┐
│   Handler   │──► DTO: qr_code or beneficiary_id, verification_method
└──────┬──────┘
       │
       ▼
┌─────────────┐
│   Service   │──► 1. Start Tx, lock DistributionRecord
│             │    2. Lookup Beneficiary by QR code
│             │    3. Verify beneficiary matches distribution record
│             │    4. Check not already received (idempotent)
│             │    5. Create DistributionVerification
│             │    6. Update DistributionRecord status → 'received'
│             │    7. Create Acknowledgement (signature/photo)
│             │    8. Commit Tx
└──────┬──────┘
       │
       ▼
┌─────────────┐
│  Repository │──► SELECT ... FOR UPDATE on distribution_records
│             │    INSERT distribution_verifications, acknowledgements
│             │    UPDATE distribution_records SET status='received'
└─────────────┘
```

---

## 3. Concurrency & Critical Sections

### 3.1 The "Last Spot" Race Condition

When two volunteers attempt to distribute the final relief package in a zone, or two donors reserve the last parking spot, we must prevent overselling.

**Solution: Optimistic Locking with Retry OR Pessimistic Locking**

ASHRAY uses **Pessimistic Locking** for high-contention operations:

```go
err := db.Transaction(func(tx *gorm.DB) error {
    var zone models.ParkingZone
    // Lock the row so no other transaction can read/write it
    if err := tx.Clauses(clause.Locking{Strength: "UPDATE"}).
        First(&zone, zoneID).Error; err != nil {
        return err
    }

    var activeCount int64
    tx.Model(&models.Reservation{}).
        Where("zone_id = ? AND status = ?", zoneID, "active").
        Count(&activeCount)

    if activeCount >= int64(zone.TotalCapacity) {
        return service.ErrZoneFull // 409 Conflict
    }

    // Safe to create reservation
    return tx.Create(&reservation).Error
})
```

**Rules:**
- Always keep transactions short (only DB ops, no HTTP calls inside Tx).
- Lock the parent/resource row, not the entire table.
- Use `SELECT FOR UPDATE` when checking inventory, capacity, or fund balances.
- Handle `deadlock detected` errors with exponential backoff retry.

### 3.2 Fund Allocation Integrity

When allocating donations to a project, we must ensure:
1. The donation status is `confirmed`.
2. The project budget has `remaining_budget >= allocation_amount`.
3. The allocation is recorded atomically.

```go
tx.Clauses(clause.Locking{Strength: "UPDATE"}).First(&project, projectID)
if project.RemainingBudget < amount {
    return service.ErrInsufficientFunds
}
project.RemainingBudget -= amount
tx.Save(&project)
tx.Create(&fundAllocation)
```

---

## 4. Error Handling Strategy

### 4.1 Centralized Error Handler

```go
// middleware/error.go
func CustomHTTPErrorHandler(err error, c echo.Context) {
    var code int
    var message string
    var errors interface{}

    switch e := err.(type) {
    case *echo.HTTPError:
        code = e.Code
        message = e.Message.(string)
    case validator.ValidationErrors:
        code = http.StatusBadRequest
        message = "Validation failed"
        errors = formatValidationErrors(e)
    case *service.AppError:
        code = e.Code
        message = e.Message
    default:
        code = http.StatusInternalServerError
        message = "Internal server error"
        // Log stack trace internally, never leak to client
    }

    c.JSON(code, response.Envelope{
        Success: false,
        Message: message,
        Errors:  errors,
    })
}
```

### 4.2 Standard Response Envelope

```go
package response

type Envelope struct {
    Success bool        `json:"success"`
    Message string      `json:"message"`
    Data    interface{} `json:"data,omitempty"`
    Errors  interface{} `json:"errors,omitempty"`
    Meta    *Meta       `json:"meta,omitempty"`
}

type Meta struct {
    Page      int   `json:"page"`
    Limit     int   `json:"limit"`
    Total     int64 `json:"total"`
    TotalPages int  `json:"total_pages"`
}
```

### 4.3 HTTP Status Code Mapping

| Status | Usage |
|--------|-------|
| 200 OK | Successful GET, PUT, PATCH, DELETE |
| 201 Created | Successful POST (resource created) |
| 400 Bad Request | Validation errors, malformed JSON |
| 401 Unauthorized | Missing/invalid JWT |
| 403 Forbidden | Valid JWT but insufficient role/permission |
| 404 Not Found | Resource does not exist |
| 409 Conflict | Business logic conflict (zone full, duplicate email, stale data) |
| 422 Unprocessable | Semantic errors (e.g., cannot cancel completed reservation) |
| 429 Too Many Requests | Rate limit exceeded |
| 500 Internal Server Error | Unexpected panic, DB connection failure |

---

## 5. Background Jobs & Queues

Operations that do not need to block the HTTP response are pushed to a Redis-backed queue:

| Job Type | Trigger | Worker Action |
|----------|---------|---------------|
| `send_email` | User registration, donation receipt | SMTP dispatch |
| `send_sms` | OTP delivery, emergency alert | Twilio / local SMS gateway |
| `send_push` | Campaign milestone reached | Firebase Cloud Messaging |
| `update_live_feed` | New donation confirmed | Write to Redis sorted set, publish WS |
| `generate_report` | Admin requests monthly PDF | Query DB, generate PDF, upload S3, notify admin |
| `analytics_snapshot` | Cron every hour | Aggregate counts into `analytics_snapshots` |
| `fraud_scan` | New donation > threshold | Call AI service, flag if fraud_score > 0.8 |
| `backup_database` | Cron daily | `pg_dump`, encrypt, upload S3 |

---

## 6. Multi-Tenancy & Branch Isolation

ASHRAY is multi-branch by design. Most tables include a `branch_id` column. The RBAC middleware automatically injects a `branch_scope` into the repository query for non-super-admin users.

```go
// repository/scope.go
func BranchScope(branchID uint) func(db *gorm.DB) *gorm.DB {
    return func(db *gorm.DB) *gorm.DB {
        return db.Where("branch_id = ?", branchID)
    }
}

// Usage in repository
tx.Scopes(BranchScope(user.BranchID)).Find(&campaigns)
```

Super Admins bypass this scope and can view nationwide data.

---

## 7. Caching Strategy

| Cache Key Pattern | TTL | Invalidation |
|-------------------|-----|--------------|
| `user:{id}` | 15 min | On profile update |
| `zone:{id}:available` | 30 sec | On reservation create/cancel |
| `campaign:{id}:progress` | 1 min | On donation confirmed |
| `dashboard:{user_id}` | 5 min | On data mutation |
| `live_feed:{campaign_id}` | No TTL (sorted set) | Automatic eviction by score |

---

## 8. File Upload & Storage

1. Client requests a **pre-signed upload URL** from `POST /api/v1/files/presign`.
2. Server validates file type (image, pdf, video) and size.
3. Server returns a temporary S3/Cloudinary URL.
4. Client uploads directly to storage.
5. Client confirms upload with `POST /api/v1/files/confirm`, creating a `FileStorage` record.
6. All uploaded files are scanned by ClamAV or a cloud-native malware scanner before public access.

---

## 9. AI Service Integration

The Go backend communicates with a Python microservice via **gRPC** for compute-intensive tasks:

| Feature | gRPC Method | Input | Output |
|---------|-------------|-------|--------|
| Face Verification | `VerifyFace` | Image bytes, userID | Match confidence (0-1) |
| OCR Document Scan | `ScanDocument` | Image/PDF bytes | Extracted text, confidence |
| Fraud Detection | `PredictFraud` | Donation features | Fraud score, reason codes |
| Donation Forecast | `ForecastDonation` | Historical time series | Next 30 days prediction |
| Volunteer Matching | `MatchVolunteer` | Project requirements, volunteer skills | Top N matches with scores |
| Route Optimization | `OptimizeRoute` | Branch ID, vehicle ID, stops | Ordered stops, ETA |

The Go service queues AI jobs asynchronously and stores results in the corresponding AI tables.

---

## 10. Database Connection Pooling (Production)

```go
sqlDB, err := db.DB()
sqlDB.SetMaxOpenConns(25)        // Don't exhaust PostgreSQL max_connections
sqlDB.SetMaxIdleConns(10)        // Keep warm connections ready
sqlDB.SetConnMaxLifetime(30 * time.Minute) // Recycle before NAT/firewall timeout
```

**Why this matters:**
- Without pooling, every HTTP request opens a new TCP connection, causing latency and `too many connections` errors.
- `MaxOpenConns` should be tuned to your PostgreSQL instance size (e.g., RDS db.t3.medium = ~80 max_connections).
- `ConnMaxLifetime` prevents stale connections from being killed by load balancers or cloud NAT.

---

## 11. Testing Strategy

| Test Type | Scope | Tooling |
|-----------|-------|---------|
| Unit | Service methods, utilities | `testing`, `testify/mock` |
| Integration | Handler + DB (testcontainers) | `testify/suite`, `dockertest` |
| Repository | SQL queries, transactions | `sqlmock` or real test DB |
| Load | Concurrent reservation creation | `k6`, `locust` |
| Security | JWT bypass, SQL injection, RBAC bypass | `OWASP ZAP`, custom scripts |

### Example Integration Test Pattern

```go
func TestCreateReservation_Concurrency(t *testing.T) {
    // Setup test DB with dockertest
    // Seed 1 zone with capacity = 1
    // Fire 10 goroutines simultaneously to reserve
    // Assert exactly 1 succeeds (201), 9 fail (409)
}
```

---

## 12. Checklist for Adding a New Module

1. **Models**: Define GORM structs in `internal/models/`. Add `TableName()` methods. Define associations (`belongsTo`, `hasMany`, `many2many`).
2. **DTOs**: Create request and response structs in `internal/dto/{module}.go`. Add validation tags.
3. **Repository**: Create `internal/repository/{module}.go`. Implement CRUD + any custom queries. Use transactions for multi-table writes.
4. **Service**: Create `internal/service/{module}.go`. Implement business rules. Call repository methods. Return domain errors.
5. **Handler**: Create `internal/handler/{module}.go`. Bind DTOs, extract claims, call service, return envelope.
6. **Router**: Register routes in `internal/router/router.go`. Apply middleware chains (Auth, RBAC, Audit).
7. **Tests**: Write unit tests for service, integration tests for handler.
8. **Documentation**: Update the corresponding `docs/MODULE_*.md` file with schema and API specs.
9. **Migration**: Add a GORM automigrate call or create a `.sql` migration file.
10. **Seed Data**: Add seeders for lookup tables (roles, permissions, divisions, districts).

---

*Next: Read the module-specific documentation in `docs/` for complete API and schema specifications.*
