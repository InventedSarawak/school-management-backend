# 📚 School Management Backend

Simple Node.js + Express API for managing schools with MySQL and spatial sorting support. Built with Docker for easy setup.

## ✅ Features

* Add schools with name, address, and coordinates
* List schools sorted by distance from user location
* MySQL integration
* Docker + Docker Compose ready

## 🗂️ Project Structure

```bash
.
├── config/
│   └── database.js             # DB connection setup
├── controllers/
│   └── school.controller.js    # Request handlers
├── docker-compose.yaml         # Docker services
├── Dockerfile                  # App container setup
├── models/
│   └── school.model.sql        # SQL for schools table
├── package.json
├── pnpm-lock.yaml
├── readme.md
├── routes/
│   └── school.routes.js        # API routes
├── server.js                   # App entrypoint
├── services/
│   ├── list-schools-by-distance.service.js
│   └── validation.service.js
└── utils/
    ├── ApiError.js
    ├── ApiResponse.js
    └── AsyncHandler.js
```

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/InventedSarawak/school-management-backend.git
cd school-management-backend
```

### 2. Set up the database

* Create a MySQL DB
* Rename `.env.example` → `.env` and update with your DB config

### 3. Run with Docker Compose

```bash
docker compose up -d
```

App runs at `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint                                  | Description                                  |
| ------ | ----------------------------------------- | -------------------------------------------- |
| POST   | `/addSchool`                              | Add a school (JSON: name, address, lat, lng) |
| GET    | `/listSchools?latitude=...&longitude=...` | List schools sorted by distance              |

---

Let me know if you want to add Swagger docs, unit tests section, or a Postman collection link!
