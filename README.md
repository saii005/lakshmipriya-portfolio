# 🎈 Lakshmipriya Vinothkumar | MERN Educational Platform

> A full-stack, production-ready MERN platform engineered with a **Children's Playground aesthetic** to inspire young minds, students, parents, and schools with the journey and offerings of **Teacher Lakshmipriya Vinothkumar** (former Zoho Team Lead & Wipro Senior Engineer turned Mind Educator & Child Transformation Pioneer).

---

## 🌟 Live Local URLs

| Service | URL | Description |
|---|---|---|
| **Fullstack Unified Platform** | `http://localhost:5000` | Production Node.js + Express + React unified app |
| **Vite Hot-Reload Dev Server** | `http://localhost:5173` | Interactive React Dev Server with instant HMR |
| **API Healthcheck** | `http://localhost:5000/api/health` | Backend status & MongoDB connectivity |

---

## 🔐 Teacher / Admin Credentials

- **Email:** `admin@lakshmipriya.com`
- **Password:** `PriyaAdmin2026!`
- **Access Route:** `/admin/login` or click **"Teacher Login"** in the top navigation bar.
- *Tip:* An "Auto-fill Admin Credentials" button is provided on the login page for 1-click convenience.

---

## 🏗️ Architecture & Modules

### 1. Dynamic Content / Presentation Deck Reader (`/docs`)
- Hierarchical sections, headings, interactive bullet-point highlights, and reflection quotes.
- Dynamic sidebar navigation linked to document slugs.
- Interactive slide presenter mode with progress bar and completion celebrations.
- Pre-populated with Lakshmipriya's full journey:
  1. *The Grand Adventure: From Coding Machines to Nurturing Young Minds*
  2. *Integral Education: Wonders of Sri Aurobindo Ashram*
  3. *Take Your Flight: Brain Power, Astromath & Life Skills*
  4. *Software Engineering & Enterprise Leadership (Zoho & Wipro)*

### 2. Business & Services Portal (`/services`)
- Dynamic service catalog with category filtering (`Kids & Students`, `Parents & Families`, `Schools & Educators`, `Youth & College`, `Holistic Wellness`).
- Instant interactive enrollment / inquiry modal pre-populating program subjects.
- Institutional leadership showcase (New India Foundation CIO, Uni5 USA Board of Directors, Sri Aurobindo Ashram, Shakti Foundation).

### 3. Student Inspiration Playroom (`/kid-zone`)
- **Pop the Wisdom Balloons:** Interactive balloon popping game with positive empowering quotes and confetti.
- **Astromath Pattern Lab:** Interactive 2-second multiplication trick for 2-digit numbers by 11.
- **Daily Student Quest:** Whimsical quest card with daily curiosity missions.

### 4. Lead Generation Contact Desk (`/contact`)
- Robust contact form with backend Express-Validator rules and MongoDB persistence.
- Verified contact info (+91 7650992525, +91 9790662672, `reachtolakshmipriya@gmail.com`).

### 5. Authentication & Admin Dashboard (`/admin`)
- JWT-authenticated administrator control room.
- Real-time review and status updates of inquiries (`new`, `contacted`, `completed`).
- CRUD management for Presentation Decks and Services.

---

## 🛠️ Tech Stack

- **Frontend:** React 18, Vite, Tailwind CSS (Custom Playground Palette), Framer Motion, Axios, Lucide Icons, Canvas-Confetti.
- **Backend:** Node.js, Express.js (MVC / Service Layer), Helmet, CORS, Morgan, Express-Validator.
- **Database:** MongoDB with Mongoose ODM (with seamless local fallback store).
- **Authentication:** JWT (JSON Web Tokens), Bcrypt.js password hashing.
