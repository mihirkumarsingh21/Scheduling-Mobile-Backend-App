# 📱 Scheduling-Mobile-Backend-App

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue?logo=postgresql)
![Prisma](https://img.shields.io/badge/Prisma-4.x-blue?logo=prisma)
![License](https://img.shields.io/badge/License-MIT-yellow)

A **Scheduling-Mobile-Backend-App** built with **TypeScript**, **PostgreSQL**, and **Prisma ORM**.  
This project demonstrates **real-world backend development** including authentication, role-based access, appointment booking, and provider management.

---

## 🔑 Features

- **Authentication**
  - User registration, login, logout
  - Forgot password & reset password
  - JWT-based auth
- **Appointment Booking**
  - Users can book appointments with providers
  - Cancel appointments
- **Provider Management**
  - Admin can create and delete providers
  - Users can view provider list and details
- **Role-based Access Control**
  - Separate roles for Users and Admin
- **Database**
  - PostgreSQL with Prisma ORM
  - Soft delete support using `isDeleted` flag

---

## 📂 Project Structure

<img width="1360" height="717" alt="Project Structure" src="https://github.com/user-attachments/assets/83f5a4e0-6228-4a38-8aae-5525527c416d" />
<img width="1365" height="721" alt="Project Structure 2" src="https://github.com/user-attachments/assets/94826266-2398-4079-b871-4b9d3e8adb7e" />

---

## 📌 API Routes  

### 👤 User Routes

<details>
<summary>View User APIs</summary>

- `POST /api/v1/register-user` → Register a new user  
- `POST /api/v1/verify-email` → Verify user email  
- `POST /api/v1/login-user` → Login user  
- `POST /api/v1/forgot-password` → Forgot password  
- `POST /api/v1/reset-password` → Reset password  

</details>

---

### 📅 Appointment Routes

<details>
<summary>View Appointment APIs</summary>

- `POST /api/v1/appointments/:providerId` → Book an appointment with a provider  
- `GET /api/v1/appointments/all` → Get all appointments of logged-in user  
- `PATCH /api/v1/appointments/:id/cancel` → Cancel an appointment  

#### 🧠 Features
- Users can book appointments with specific providers  
- Each appointment is linked with a provider  
- Users can view their own appointments  
- Soft cancellation (status update instead of delete)  

</details>

---

### 🧑‍⚕️ Provider Routes

<details>
<summary>View Provider APIs</summary>

- `POST /api/v1/providers/create` → Create a new provider (**Admin only**)  
- `GET /api/v1/providers/all` → Get all providers  
- `GET /api/v1/providers/:id` → Get provider by ID  
- `DELETE /api/v1/providers/:id` → Delete provider (**Admin only**)  

#### 🧠 Features
- Admin can manage providers (create/delete)  
- Users can view all providers  
- Provider details can be fetched individually  
- Soft delete supported using `isDeleted` flag  

</details>

---

## 🔐 Authorization & Roles

| Role  | Permissions |
|-------|-------------|
| 👤 User  | Book appointment, view appointments, cancel appointment |
| 🛠️ Admin | Create provider, delete provider |

---

## 📸 Screenshots

### 👤 User Authentication
- **Register User**
<img width="1350" height="715" alt="Register User" src="https://github.com/user-attachments/assets/43328203-81bc-4dac-859d-90fa593c0fd0" />

- **Login User**
<img width="1365" height="726" alt="Login User" src="https://github.com/user-attachments/assets/f22d69a0-60f6-4229-9a4e-49f83b3ea398" />

### 📧 Email Verification
- **Verify Email**
<img width="1365" height="720" alt="Verify Email" src="https://github.com/user-attachments/assets/e1e7d0de-3129-4432-bdb3-bdc6ef15b915" />

- **Send Verification Mail**
<img width="1047" height="552" alt="Send Verification Mail" src="https://github.com/user-attachments/assets/fa56045c-f4e7-4da9-aff1-db0c8617f5fa" />

### ✉️ Password Reset Email
<img width="1014" height="563" alt="Password Reset Email 1" src="https://github.com/user-attachments/assets/142e1206-12e7-473d-aec7-cebcc1ccbf7b" />
<img width="1359" height="725" alt="Password Reset Email 2" src="https://github.com/user-attachments/assets/d976577d-d7df-4062-9e12-188a64d49523" />

### Create Provider ( ADMIN ONLY )
<img width="1356" height="724" alt="Screenshot 2026-04-05 192723" src="https://github.com/user-attachments/assets/d28141be-57d1-461a-85af-72d6ff566d7f" />

### All Provider With Pagination
<img width="1363" height="720" alt="Screenshot 2026-04-05 193004" src="https://github.com/user-attachments/assets/da5330e4-2c34-48b2-ac93-8bff42ee8cd5" />

### Delete Provider (ADMIN ONLY )
<img width="1365" height="727" alt="Screenshot 2026-04-05 193204" src="https://github.com/user-attachments/assets/d0ce369e-02a9-440b-8966-6b9add42851e" />

### Create Appointment
<img width="1360" height="724" alt="Screenshot 2026-04-05 193345" src="https://github.com/user-attachments/assets/6153cb3c-1f38-4e6b-a796-e5b14008f4fe" />

### All Appointment With Pagination
<img width="1365" height="717" alt="Screenshot 2026-04-05 193535" src="https://github.com/user-attachments/assets/11057ffc-95c9-404e-8f7e-671c3f28adef" />

### Cancle Appointment
<img width="1341" height="724" alt="Screenshot 2026-04-05 193655" src="https://github.com/user-attachments/assets/a328865a-b31e-44db-800f-a5c08e7f6a9e" />


---

## ⚡ Highlights

- ✅ JWT-based authentication  
- ✅ Role-based access control (RBAC)  
- ✅ Prisma ORM with PostgreSQL  
- ✅ Clean modular architecture  
- ✅ Soft delete implementation (`isDeleted`)  
- ✅ Scalable API structure  

---

