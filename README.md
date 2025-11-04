# 🚀 Fastor CRM Backend

A secure and efficient **Node.js + Express.js** backend for a **Customer Relationship Management (CRM)** system.  
This backend allows employees (counselors) to register, authenticate via JWT, view public client enquiries, and claim leads for private follow-ups.

---

## 📌 Project Overview

Fastor CRM Backend is designed to manage customer leads efficiently.  
It provides REST APIs for:
- Employee registration & login (JWT authentication)
- Public enquiry submissions (without login)
- Viewing unclaimed enquiries (public leads)
- Claiming enquiries to assign them privately to counselors
- Viewing personally claimed leads

---

## 🧩 Tech Stack

- **Node.js** + **Express.js**
- **Sequelize ORM**
- **SQLite / MySQL** (configurable)
- **JWT Authentication**
- **dotenv** for environment management
- **Nodemon** for live development

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository
```bash
git clone https://github.com/Suryakiran1818/fastor-crm-backend.git
cd fastor-crm-backend
2️⃣ Install Dependencies
bash
Copy code
npm install
3️⃣ Environment Configuration
Create a .env file in the root folder:

env
Copy code
PORT=3000
DB_NAME=fastor_crm
DB_USER=root
DB_PASSWORD=
DB_HOST=localhost
DB_DIALECT=sqlite
JWT_SECRET=your_jwt_secret_key
🔒 Note: You can change dialect to mysql or postgres as needed.

4️⃣ Run Server
bash
Copy code
npm run dev
Server will start on
➡️ http://localhost:3000

🧠 API Endpoints Summary
🧍 Employee Routes
Method	Endpoint	Description
POST	/api/employees/register	Register a new employee
POST	/api/employees/login	Login employee and receive JWT token

📥 Enquiry Routes
Method	Endpoint	Description
POST	/api/enquiries/public	Submit a new public enquiry (no auth)
GET	/api/enquiries/public	Get all unclaimed enquiries (auth required)
GET	/api/enquiries/private	Get logged-in counselor's claimed enquiries (auth required)
PATCH	/api/enquiries/:id/claim	Claim an enquiry (auth required)

🔐 Authentication
Use the returned token from login as:

http
Copy code
Authorization: Bearer <your_token_here>
🧱 Folder Structure
bash
Copy code
fastor-crm-backend/
│
├── controllers/       # Business logic for each route
│   ├── employeeController.js
│   ├── enquiryController.js
│   └── leadController.js
│
├── models/            # Sequelize models
│   ├── index.js
│   ├── Employee.js
│   └── PublicEnquiry.js
│
├── routes/            # Express route files
│   ├── employeeRoutes.js
│   ├── enquiryRoutes.js
│   └── leadRoutes.js
│
├── middlewares/       # JWT auth middleware
│
├── server.js          # Main entry point
├── package.json
└── .env.example
🧪 Testing Guide (Postman)
🔸 Public Enquiry
Method: POST

URL: http://localhost:3000/api/enquiries/public

Headers: Content-Type: application/json

Body:

json
Copy code
{
  "name": "Alice",
  "email": "alice@example.com",
  "message": "Interested in your CRM service"
}
🔸 Employee Login
Method: POST

URL: http://localhost:3000/api/employees/login

Body:

json
Copy code
{
  "email": "john@example.com",
  "password": "password123"
}
Copy the returned token and use it in the Authorization header for further requests.

✅ Features Implemented
 Employee registration & login

 JWT-based authentication

 Public enquiry form

 Unclaimed enquiries retrieval

 Lead claiming functionality

 Private lead retrieval

 Database integration with Sequelize ORM

📸 Project Status
✅ 100% Backend Complete & Functional

Next recommended step:

Deploy to Render / Railway / Vercel for public API hosting

Create a frontend (React) client for counselor dashboard

👨‍💻 Author
Suryakiran
🌐 GitHub Profile
