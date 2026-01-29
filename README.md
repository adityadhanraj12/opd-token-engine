# 🏥 OPD Token Allocation Engine

A backend system for managing OPD (Outpatient Department) token allocation for doctors with:

- Slot-based scheduling
- Capacity enforcement
- Priority-based token allocation
- Waiting list management
- Automatic reallocation on cancellation
- Clean layered architecture using Express.js

---

## 🚀 Tech Stack

- Node.js
- Express.js
- UUID
- In-memory data store (for simulation)
- Postman for API testing

---

## 📂 Project Structure

```
opd-token-engine/
│
├── config/              # Configuration files (priority logic)
├── controllers/         # Request handling layer
├── data/                # In-memory storage
├── routes/              # API route definitions
├── services/            # Business logic layer
├── server.js            # Application entry point
└── package.json
```

---

## 🧠 System Architecture

The project follows a clean layered architecture:

### 1️⃣ Routes
Defines API endpoints and maps them to controllers.

### 2️⃣ Controllers
Handles request validation and response formatting.

### 3️⃣ Services
Contains core business logic:
- Slot allocation
- Waiting queue handling
- Cancellation logic
- Priority sorting

### 4️⃣ Data Layer
Uses in-memory arrays to simulate a database.

---

## 🎯 Features

- Hard slot capacity enforcement
- Priority-based token allocation
- FIFO ordering within same priority
- Automatic promotion from waiting list
- Clean modular code structure
- RESTful API design

---

## 🛠 Installation & Setup

### 1. Clone Repository

```bash
git clone https://github.com/adityadhanraj12/opd-token-engine.git
cd opd-token-engine
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Server

```bash
node server.js
```

Server will run at:

```
http://localhost:3000
```

---

## 📌 API Endpoints

---

### ✅ 1. Create Doctor

**POST** `/doctors`

Request Body:
```json
{
  "name": "Dr Sharma"
}
```

Response:
```json
{
  "id": "uuid",
  "name": "Dr Sharma"
}
```

---

### ✅ 2. Create Slot

**POST** `/slots`

Request Body:
```json
{
  "doctor_id": "doctor_uuid",
  "start_time": "09:00",
  "end_time": "10:00",
  "max_capacity": 2
}
```

---

### ✅ 3. Book Token

**POST** `/tokens`

Request Body:
```json
{
  "slot_id": "slot_uuid",
  "patient_name": "Ramesh",
  "type": "ONLINE"
}
```

If slot is full:
```json
{
  "message": "Slot full. Added to waiting list.",
  "token": { ... }
}
```

---

### ✅ 4. Cancel Token

**PUT** `/tokens/:id/cancel`

Automatically reallocates next waiting token.

---

### ✅ 5. Get All Tokens

**GET** `/tokens`

Returns full token list.

---

## 🏆 Priority System

Tokens are allocated based on priority:

| Type        | Priority |
|------------|----------|
| EMERGENCY  | 1        |
| PAID       | 2        |
| FOLLOW_UP  | 3        |
| ONLINE     | 4        |
| WALK_IN    | 5        |

Lower number = Higher priority.

If slot is full:
- Token is added to waiting list.
- On cancellation, highest priority waiting token is promoted.

---

## 🔄 Allocation Flow

1. Check slot capacity
2. If space available → Book
3. If full → Add to waiting
4. On cancellation → Reallocate highest priority waiting token

---

## 🧪 Testing

Use:

- Postman
- Thunder Client
- PowerShell (Invoke-RestMethod)

Ensure:
- Method is correct (POST/PUT)
- Body type is `raw → JSON`
- Header includes `Content-Type: application/json`

---

## 📈 Future Improvements

- MongoDB integration
- Redis-based real-time queue
- No-show detection logic
- Emergency override reallocation
- Slot overbooking with predictive analytics
- Authentication (JWT)
- Deployment on Render/Railway

---

## 🎓 Learning Outcomes

This project demonstrates:

- REST API design
- Layered backend architecture
- Priority queue logic
- Capacity management system
- Real-world OPD token simulation
- Git & GitHub workflow

---

## 👨‍💻 Author

Aditya Dhanraj  
GitHub: https://github.com/adityadhanraj12
