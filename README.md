# OPD Token Allocation Engine

A simple Node.js + Express backend system to manage OPD token booking for doctors.

## Features

- Create doctors
- Create slots with fixed capacity
- Book tokens
- Waiting list handling
- Automatic reallocation on cancellation
- Priority-based allocation

---

## Tech Stack

- Node.js
- Express.js
- UUID
- In-memory data storage

---

## Setup

1. Clone the repository

git clone https://github.com/adityadhanraj12/opd-token-engine.git
cd opd-token-engine


2. Install dependencies

npm install


3. Start the server

node server.js


Server runs at:

http://localhost:3000


---

## API Endpoints

### Create Doctor
POST `/doctors`

{
"name": "Dr Sharma"
}


### Create Slot
POST `/slots`

{
"doctor_id": "doctor_id_here",
"start_time": "09:00",
"end_time": "10:00",
"max_capacity": 2
}


### Book Token
POST `/tokens`

{
"slot_id": "slot_id_here",
"patient_name": "Ramesh",
"type": "ONLINE"
}


If slot is full → token goes to waiting list.

### Cancel Token
PUT `/tokens/:id/cancel`

Automatically promotes next waiting token.

### Get All Tokens
GET `/tokens`

---

## How It Works

- Each slot has a fixed capacity.
- If capacity is full → tokens are added to waiting.
- On cancellation → highest priority waiting token is promoted.
- Priority order:
  EMERGENCY > PAID > FOLLOW_UP > ONLINE > WALK_IN

---

## Author

Aditya Dhanraj  
https://github.com/adityadhanraj12
After saving:

git add .
git commit -m "Updated README"
git push
