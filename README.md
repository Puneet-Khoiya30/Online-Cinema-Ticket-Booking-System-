<!-- # Multiplex Theater Online Booking System

**Course project** — Online ticket booking system for a multiplex (Frontend: PHP, Backend DB: MySQL).  
This repository contains a clean, documented skeleton you can push to GitHub and show on your resume.

## Project Summary
A web-based system that allows users to register, check movie schedules, and book tickets. Admins can manage movies, schedules, and view reports. Counter staff can validate m-tickets and issue physical tickets.

Original project report (PDF) is in `docs/FINALprojectDBMSOnlineTicket.pdf`.

## Features
- User registration, login, password reset (placeholder)
- Browse movies & showtimes
- Book tickets for current-day shows (m-ticket SMS placeholder)
- Admin dashboard: manage movies, schedules, users
- Counter validation: redeem m-ticket codes and issue tickets
- SQL schema + sample seed data included

## Tech Stack
- PHP (vanilla) for server-side code
- MySQL for database
- HTML/CSS for frontend (skeleton)
- Optional: XAMPP / WAMP for local setup

## Repo Structure
```
/ (root)
├─ docs/                            # Project report and diagrams
│  └─ FINALprojectDBMSOnlineTicket.pdf
├─ src/                             # Application source (PHP)
│  ├─ index.php
│  ├─ login.php
│  ├─ register.php
│  ├─ book.php
│  ├─ admin/
│  │  └─ dashboard.php
│  ├─ counter/
│  │  └─ validate.php
│  └─ includes/
│     └─ db.php
├─ sql/
│  └─ schema.sql                     # CREATE TABLE + sample data
├─ .gitignore
├─ LICENSE
└─ README.md
```

## Quick setup (local)
1. Install XAMPP/WAMP and start Apache & MySQL.
2. Copy the `src/` folder to your webroot (e.g., `htdocs/multiplex`).
3. Create a MySQL database (e.g., `multiplex_db`) and import `sql/schema.sql`.
4. Edit `src/includes/db.php` to set MySQL credentials.
5. Open `http://localhost/multiplex/` in your browser.

## How to push to GitHub (example)
```bash
cd path/to/multiplex-online-booking-system
git init
git add .
git commit -m "Initial project skeleton and report"
# create repo on GitHub (or use GitHub CLI), then:
git remote add origin git@github.com:<YOUR_USER>/<REPO_NAME>.git
git branch -M main
git push -u origin main
```

## Resume-friendly project blurb
**Multiplex Theater Online Booking System** — Web application for online cinema ticket booking using PHP & MySQL. Implemented user authentication, movie & schedule management, booking flow with m-ticket verification, and admin reporting. (Project report and database schema included.)

## Notes
- This repository is a skeleton meant to be extended; most PHP pages are minimal templates ready for your implementation.
- See `sql/schema.sql` for table designs that match the project report.

---
Puneet Khoiya — Project prepared during Jan–Jun 2024 (College project).
 -->

# Multiplex Theater — Online Ticket Booking System

&#x20;

> Modernized repo skeleton for the *Multiplex Theater Online Booking System*. This repository preserves your original project report and SQL schema, and replaces the legacy PHP app with a Node.js (Express) backend + React frontend skeleton so you can continue development on a modern stack.

---

## Contents (interactive)

* **Overview & goals**
* **What I created** (high level)
* **Repo initial layout** (collapsible)
* **Tech stack & rationale**
* **Quick setup (dev)** — step-by-step commands
* **Database import**
* **Server & client scripts**
* **Development notes (seat locking, auth, transactions)**
* **How to contribute**
* **License & attribution**

---

## Project overview

This repository is a cleaned and modernized skeleton of the Multiplex Theater Online Booking System. The original project report and SQL schema are preserved in `docs/` and `sql/` respectively so nothing from your academic submission is lost — use them as canonical design and data references.

> The original project report is included in `docs/FINALprojectDBMSOnlineTicket.pdf`. Use it as the specification and design reference for implementing features and business rules.

* A complete repo skeleton with `README.md`, SQL schema, a preserved project report PDF, license, and contributing notes.
* A Node.js Express **server/** skeleton (with route stubs for `auth`, `movies`, `schedules`, `bookings`).
* A React **client/** skeleton (basic routing and placeholder pages: `Home`, `Movies`).
* `sql/schema.sql` — original `CREATE TABLE` statements + sample seed data.
* `docs/FINALprojectDBMSOnlineTicket.pdf` — your uploaded project report (copied).
* Housekeeping files: `.gitignore`, `LICENSE`, `CONTRIBUTING.md`.

- Removed the original PHP `src/` files and replaced them with `server/` and `client/` skeletons.
- `server/` uses `mysql2` driver and contains commented route skeletons so you can implement controllers quickly.
- `client/` is a minimal React skeleton (Vite or CRA compatible) with sample pages and sample fetch/axios calls to the server API.
- README updated to reflect new stack and developer workflow.

---

## Repo initial layout (high level)

```
/ (root)
├─ docs/
│  └─ FINALprojectDBMSOnlineTicket.pdf
├─ sql/
│  └─ schema.sql
├─ server/
│  ├─ package.json
│  ├─ index.js
│  ├─ .env.example
│  ├─ db/
│  │  └─ index.js
│  └─ routes/
│     ├─ auth.js
│     ├─ movies.js
│     ├─ schedules.js
│     ├─ my-bookings.js
│     └─ bookings.js
├─ client/
│  ├─ package.json
│  └─ src/
│     ├─ index.js
│     ├─ index.css
│     ├─ App.jsx
│     └─ pages/
│        ├─ Home.jsx
│        ├─ Booking.jsx
│        ├─ My-Bookings.jsx
│        ├─ Schedules.jsx
│        └─ Movies.jsx
|
├─ README.md
├─ LICENSE
└─ CONTRIBUTING.md
```

> Note: all route handlers and UI pages are intentionally minimal — they contain clear TODO comments so you can fill in the app logic easily.

---

## Tech stack (recommended)

* **Backend:** Node.js + Express
* **Database:** MySQL (schema preserved in `sql/schema.sql`)
* **Frontend:** React
* **DB driver:** `mysql2` (or use an ORM like `knex`/`sequelize` later)
* **Auth:** JWT for stateless authentication (skeleton included)

---

## Quick setup (development)

> Run these commands from the repo root. The commands below assume you have Node.js and MySQL installed.

### 1) Clone the repo

```bash
git clone https://github.com/Puneet-Khoiya30/Online-Cinema-Ticket-Booking-System-.git
cd Online-Cinema-Ticket-Booking-System-
```

### 2) Create the database & import the schema

```bash
# Create database (interactive password prompt)
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS multiplex_db;"
# Import schema into the database
mysql -u root -p multiplex_db < sql/schema.sql
```

If you prefer a GUI: import `sql/schema.sql` into a database named `multiplex_db` in your MySQL client.

### 3) Server setup

```bash
cd server
cp .env  # edit .env to add DB credentials and JWT secret
npm install
npm run dev   # or npm start depending on package.json
```

Example `.env` keys :

```
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=yourpassword
DB_NAME=multiplex_db
JWT_SECRET=replace_with_secure_secret
PORT=5000
```

### 4) Client setup

```bash
cd ../client
npm install
npm start
```

Visit `http://localhost:3000` (client) and `http://localhost:5000` (server) by default.

---

## Important development notes

* **Seat selection & concurrency:** booking must be transaction-safe. Use database transactions and row-level locks when deducting seats to avoid double-booking.
* **Auth & roles:** add role-based guards for admin endpoints (create/edit movies, schedules).
* **Input validation & sanitization:** always use prepared statements or parameterized queries to prevent SQL injection.
* **Testing:** add unit tests for booking logic and integration tests for the full flow.

---

## How I used my project report

The original project report (design, objectives, limitations, ER diagram, dataflow and activity diagrams) is preserved under `docs/FINALprojectDBMSOnlineTicket.pdf`. Used it as the authoritative specification while implementing the new server and client code.

---

## Contributing

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Implement changes & tests
4. Commit & push: `git push origin feature/your-feature`
5. Open a Pull Request with a clear description

For major changes (DB schema changes, API contract changes), please open an issue first to discuss design.

---

## License

This project is licensed under the MIT License — see the `LICENSE` file for details.

---

## Basics

* Implement the full `server/routes/*` business logic (CRUD + transactions)
* Add JWT auth & role-based routes
* Implement seat selection UI and booking flow in `client/`
* Add CI (GitHub Actions) to run tests and linting on PRs

If you want any (or all) of those implemented now, tell me which one to start with.

---
