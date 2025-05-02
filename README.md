# Dummyhub:MERN Auth & Dashboard Web App

A full-stack authentication and dashboard web application built using the MERN stack (MongoDB, Express, React, Node.js) and Vite. Users can sign up, log in, and view protected dashboard data fetched from the DummyJSON API.

---

## Demo Video Link
https://drive.google.com/file/d/1l6baB3MuETcuSXo7Fg4GEKw_cPQCwvQ_/view?usp=sharing

---

## 🚀 Features

- User authentication (Signup/Login) with JWT
- Passwords securely hashed using bcrypt
- Protected dashboard routes (frontend + backend)
- Fetch and display data from DummyJSON API (Products / Users / Posts)
- Responsive UI using Bootstrap 5 and Tailwind CSS
- Loading spinners and error handling
- MongoDB database integration

---

## 🧩 Tech Stack

- **Frontend**: React, React Router DOM, Vite, Tailwind CSS, Bootstrap 5
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: bcrypt, JWT
- **API**: DummyJSON API

---

## 🔧 Prerequisites

- Node.js (v18+ recommended)
- MongoDB (local or cloud, e.g. MongoDB Atlas)
- Git

---

## ⚙️ Installation (Local Development)

### 1. Clone the repository

```bash
git clone https://github.com/Venom1547/Dummyhub.git
cd Dummyhub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environment variables
```bash
Create .env file and setup given envioronment variables:
PORT=5000
DATABASE_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

### 4.Start Backend server
```bash
npm run dev:server
```

### 5. Start the frontend 
```bash
npm run dev
```
---
## 🌐 DummyJSON API Endpoints Used:

https://dummyjson.com/products

https://dummyjson.com/users

https://dummyjson.com/posts

Data is fetched after successful login and displayed on the protected dashboard.

---
## 🛡️ Security Notes
JWT token is stored in localStorage (alternatively, you can switch to cookies for more security).

Backend routes are protected using middleware that verifies the JWT token.

Passwords are hashed using bcryptjs before saving to the database.

---

## 📝 License
This project is licensed under the MIT License.



