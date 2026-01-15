# AnyComp Backend – Specialist Management API

This repository contains the **backend system** for the AnyComp Specialist Management application.  
It is a **production-grade REST API** built with Node.js, Express, TypeORM, and PostgreSQL.

The backend powers the full lifecycle of **Specialists**, including creation, editing, publishing, pricing logic, and media/service management.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **TypeORM**
- **PostgreSQL**
- **TypeScript**
- **Zod** (validation)
- **JWT** (authentication – bonus)

---

## 📦 Features

### Core Features

- RESTful API architecture
- Environment-based configuration (`.env`)
- Global error handling
- Request validation using Zod
- JSON-based client–server communication

### Business Logic

- Specialist CRUD (Create, Read, Update, Publish)
- Draft vs Published workflow
- Platform fee calculation
- Media management
- Service offerings management
- Slug generation & uniqueness
- Sorting & pagination
- Soft delete support

### Performance & Quality

- Proper database relationships
- Indexes on frequently queried columns
- Cascade save & delete handling
- Seed script for initial system setup

### Bonus

- JWT Authentication
- Admin-only protected routes

---

## 🗂️ Database Entities

The backend uses the following tables (as required):

- `specialists`
- `service_offerings`
- `media`
- `platform_fee`

> Table names and columns were **not changed**.  
> Only **foreign keys, indexes, and constraints** were added where necessary.

---

## 🔐 Authentication

- JWT-based authentication
- Admin-only access for mutating routes
- Public access for read-only endpoints

### Admin Credentials (Seeded)

Email: admin@anycomp.com

Password: admin123

---

## 📑 API Overview

Live API: https://anycomp-backend.up.railway.app

### Specialists

| Method | Endpoint                       | Description                                        |
| ------ | ------------------------------ | -------------------------------------------------- |
| GET    | `/api/specialists`             | Get all specialists (filters, sorting, pagination) |
| GET    | `/api/specialists/:id`         | Get single specialist with media & services        |
| POST   | `/api/specialists`             | Create specialist (admin)                          |
| PATCH  | `/api/specialists/:id`         | Update specialist (admin)                          |
| PATCH  | `/api/specialists/:id/publish` | Publish specialist                                 |
| DELETE | `/api/specialists/:id`         | Soft delete specialist                             |

### Media

| Method | Endpoint                    |
| ------ | --------------------------- |
| POST   | `/api/media`                |
| GET    | `/api/media/specialist/:id` |
| DELETE | `/api/media/:id`            |

### Service Offerings

| Method | Endpoint                                |
| ------ | --------------------------------------- |
| POST   | `/api/service-offerings`                |
| GET    | `/api/service-offerings/specialist/:id` |
| DELETE | `/api/service-offerings/:id`            |

### Platform Fee

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/platform-fees` |
| GET    | `/api/platform-fees` |

---

## 🔄 Sorting & Pagination

Supported query parameters:
?status=published
?page=1
&limit=10
&sortBy=created_at
&order=desc

Allowed sort fields:

- `created_at`
- `base_price`
- `final_price`

---

## 💰 Pricing Logic

- Prices are stored as `DECIMAL(10,2)`
- Platform fee is calculated dynamically on creation
- Monetary values are returned as **strings** to preserve precision

---

## 🌱 Seed Script

A seed script is provided to initialize required system data.

### What it seeds:

- Default `platform_fee`
- Admin credentials (documented)

### Run seed:

```bash
npm run seed
```

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

PORT=5000  
DB_HOST=localhost  
DB_PORT=5432  
DB_USERNAME=postgres  
DB_PASSWORD=postgres  
DB_NAME=anycomp  
JWT_SECRET=your_jwt_secret  
JWT_EXPIRES_IN=7d

---

## ▶️ Running the Project

Install dependencies:
npm install

Start development server:
npm run dev

Run seed script:
npm run seed

## 🧠 Design Decisions

- Draft-first workflow: Specialists are created as drafts and published explicitly.
- Cascade relations: Media and service offerings are saved/deleted automatically.
- Slug-based URLs: SEO-friendly and unique slugs generated from titles.
- Defensive backend logic: Fail-fast validation and error handling.
- Index optimization: Added indexes on frequently queried columns.

---

## ✅ Assessment Compliance

✔ Required tech stack  
✔ RESTful architecture  
✔ Database schema respected  
✔ Full CRUD implementation  
✔ Publishing flow implemented  
✔ Optional JWT & RBAC included  
✔ Production-grade practices applied

---

## 👤 Author

Al Amin Sheikh  
Full-Stack Developer (MERN / PERN)

---

## 📌 Notes

This backend was built focusing on:

- Clean architecture
- Maintainability
- Real-world backend practices

Frontend integration can be done using any modern framework (e.g., Next.js).
