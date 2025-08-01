# Doctor Appointment Booking System (NestJS)

A backend API for booking doctor appointments. Built with NestJS, TypeORM, PostgreSQL, and Basic Authentication.

## Features

- View list of doctors (with optional specialization filter)
- View available time slots for a doctor
- Book an appointment (no overlapping slots allowed)
- Basic Authentication for all routes
- Swagger/OpenAPI documentation
- Sqlite integration via TypeORM
- Seed script to populate initial doctor data

## Authentication

All routes require Basic Authentication.

- **Username**: admin
- **Password**: secret123

Pass the credentials in the `Authorization` header using Basic Auth format.

Example header:

```
Authorization: Basic YWRtaW46c2VjcmV0MTIz
```

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/daksh's-username/daksh's-repo-name.git
cd doctor-appointment-backend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run the Seed Script

```bash
npm run seed
```

### 4. Start the Application

```bash
npm run start:dev
```

### 5. Access Swagger UI

Open `http://localhost:3000/api` in your browser.

Use the "Authorize" button to enter the Basic Auth credentials.

## Endpoints Overview

| Method | Endpoint                           | Description                                |
| ------ | ---------------------------------- | ------------------------------------------ |
| GET    | /doctors                           | List all doctors                           |
| GET    | /doctors?specialization=cardiology | Filter doctors by specialization           |
| GET    | /doctors/:id/slots                 | Available time slots for a doctor          |
| POST   | /appointments                      | Book an appointment                        |
| GET    | /appointments/:patientName         | Appointment of any patient for receptonist |

## Notes

- Appointments with overlapping times are rejected with `400 Bad Request`
- The system enforces no double-booking for doctors
