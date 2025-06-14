# Multi-Level Referral and Earning System

This project implements a **Multi-Level Referral and Earning System** where users can refer others and earn a percentage of their referred users' purchases. The system supports:

- User registration with optional referral
- Direct and indirect earnings from purchases
- Real-time updates via WebSocket.
- Full analytics on purchases and earnings

---



## Features

- ✅ Referral limit: One user can refer up to 8 people
- ✅ Earnings only triggered for purchases above ₹1000
- ✅ Level 1 earnings: 5%, Level 2 earnings: 1%
- ✅ Updates Real-time earnings
- ✅ Robust error handling and validations
- ✅ Modular code with Clean Architecture
- ✅ Swagger documentation at /api-docs
- ✅ Public Postman collection with examples
- ✅ Environment variables for configuration
- ✅ Comprehensive API documentation with Swagger UI
- ✅ Detailed Postman collection for easy testing: [Join Postman Collection](https://app.getpostman.com/join-team?invite_code=b4ee25f00a4447a296819e77a438a8fd7cd9e8343c72f1ae44daa0adceade51b&target_code=cb923c864aca5b4e38f1cb1a628097ca)



---


## Tech Stack

- Backend: Node.js, Express.js
- Database: PostgreSQL
- ORM: Sequelize
- WebSocket: socket.io
- Swagger: API Documentation
- Postman: API Testing

---

## 📁 Project Structure

```

public/ # test.html for Socket Test
src/
├── config/ # Configuration (DB, Server, Socket)
├── controller/ # Request handlers for all modules
├── middleware/ # Request validation and error handling
├── migration/ # Sequelize migration files
├── model/ # Sequelize models (User, Purchase, Earning)
├── repositories/ # DB queries and data access layer
├── routes/
│ └── v1/ # API route definitions (user, purchase, earning)
├── seeder/ # Seed files for dummy data
├── service/ # Business logic
├── util/
│ ├── common/ # Success and error response formatters
│ └── error/ # Custom AppError class

```

---

##  Getting Started


### Prerequisites

- Node.js ( >= 14.x)
- PostgreSQL 
- Sequelize CLI

### Setup

1. Clone the repository:

```
git clone https://github.com/Aaryan1311/Multi-Level-Referral-System
```
2. Install Dependencies

```
npm i
```
3. Setup environment variable in .env

```
PORT=3000
```

4. Get config.json

```
cd ./src/
npx sequelize init
```

5. Setup config.json

```
{
  "development": {
    "username": "<your_username>",
    "password": "<your_password>",
    "database": "<database_name>",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "postgres"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

6. Create Database

```
npx sequelize db:create
```

7. Run migrations 

```
npx sequelize db:migrate
```

8. Start server

```
npm run dev
```

---

# API Documentation

- Swagger UI:  [http://localhost:3000/api-docs](http://localhost:5000/api-docs)
- Postman Collection: [link](https://app.getpostman.com/join-team?invite_code=b4ee25f00a4447a296819e77a438a8fd7cd9e8343c72f1ae44daa0adceade51b&target_code=cb923c864aca5b4e38f1cb1a628097ca)

## Running test

### User Routes

```
POST /api/v1/users
```
Create a new user. Optionally provide a referrer ID.

Body Parameters (x-www-form-urlencoded):

- name: string (min 1 character)
- email: valid, unique email
- referrerId: (optional) existing user ID

```
GET /api/v1/users/:id
```
Fetch user information by ID.

```
GET /api/v1/users/:id/referrals
```
Get users referred by the given user.

### Purchase Routes

```
POST /api/v1/purchases/
```
Create a new purchase.

Body Parameters (x-www-form-urlencoded):

- userId: existing user ID
- amount: purchase amount (must be > 0)

Note:
If amount > ₹1000, earnings are distributed:

5% to Level 1 referrer
1% to Level 2 referrer

### Real-Time Earnings update

As purchase is made, in case of any earning. It will be reflected in real-time using socket.io.


Steps:

- Open [http://localhost:3000/test.html?userId=1](http://localhost:3000/test.html?userId=1) 
- Ensure to give notifications and pop-up permissions to your browser.
- Change userId in query to check the real-time earning of user before creating purchase.

```
GET /api/v1/purchases/:id
```
Fetch purchase by its ID.
```
GET /api/v1/purchases/user/:id
```
Fetch all purchases made by the given user.

### Earning Routes
```
GET /api/v1/earnings/user/:id
```
Get all earnings received by a user.
```
GET /api/v1/earnings/source/:id
```
Get earnings received due to purchases made by the user with this ID.
```
GET /api/v1/earnings/purchase/:id
```
Get earnings generated from a specific purchase.
```
GET /api/v1/earnings/user/:id/total
```
Get the total amount earned by a user.

---

## 👨‍💻 Author

### Aaryan Tripathi