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

**Repository:** Online-Cinema-Ticket-Booking-System-  
**Author:** Puneet Khoiya

A cleaned-up, modernized repository skeleton for the **Multiplex Theater Online Booking System** project.  
Originally delivered with a PHP codebase and project report — this repo preserves the original SQL schema and project report but replaces the PHP app with a Node.js (Express) backend and React frontend skeleton so you can continue development with a modern stack.

---

## What I created (high level)

This repository contains a complete skeleton for running and extending the project:

- **README.md** — project overview, setup instructions, structure, and Contributing/License notes (this file).
- **sql/schema.sql** — original `CREATE TABLE` statements and sample seed data.
- **docs/FINALprojectDBMSOnlineTicket.pdf** — original project report (copied into `docs/`).
- **server/** — Express backend skeleton (routes for auth, movies, schedules, bookings).
- **client/** — React frontend skeleton with basic routing & pages.
- **.gitignore**, **LICENSE**, **CONTRIBUTING.md** — repo housekeeping.

### Key changes made
- Removed original PHP `src/` app files.
- Added `server/` (Node.js + Express) with `mysql2` skeleton and route stubs.
- Added `client/` (React) skeleton with basic pages and routing.
- Kept the original SQL schema and project report in `sql/` and `docs/`.
- Updated README and repo layout to reflect the new stack.

---

## New repo layout (high level)

