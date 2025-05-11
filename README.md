
# 📝 Todo App Backend

This project is a simple **Todo App backend** built with **Node.js**, **Express**, and **MongoDB (local instance)**. It supports **user authentication**, **authorization**, and **CRUD operations** for todo items. JWT-based authentication is used, and sensitive configurations are managed through environment variables.

---

## 🔧 Tech Stack

- **Backend Framework**: Node.js, Express.js
- **Database**: MongoDB (Local Instance)
- **Authentication**: JWT, bcrypt
- **Environment Config**: dotenv
- **Cookie Handling**: cookie-parser

---

## 📁 Project Structure

```
todo-backend/
│
├── db/
│   └── dbConnection.js                   # MongoDB connection setup
│
├── controllers/
│   ├── authController.js       # Handles signup, signin, signout
│   └── todoController.js       # Handles todo CRUD operations
│
├── middleware/
│   └── auth.js                 # JWT auth verification middleware
│
├── models/
│   ├── User.js                 # User schema (username, email, password)
│   └── Todo.js                 # Todo schema (title, description, status, userId)
│
├── routes/
│   ├── authRoutes.js           # Routes: /signup, /signin, /signout
│   └── todoRoutes.js           # Routes: /add-todo, /get-todos, etc.
│
├── .env                        # Environment variables (JWT secret, DB URI)
├── .gitignore                  # Ignore node_modules, .env
├── app.js                      # Entry point – setup express, routes, middleware
├── package.json                # Project metadata & dependencies
└── README.md                   # Project overview and usage instructions

```

---

## 📦 Features

- User Signup & Login (JWT authentication)
- Passwords hashed using bcrypt
- Auth middleware protects routes
- Add, update, delete, and view todos
- Retrieve all todos or only incomplete ones
- Token stored in cookies (`token=jwt_token`)
- Environment-secured configuration

---

## 🚀 Getting Started

### 1. Prerequisites

- Node.js & npm
- MongoDB (running locally on default port)
- Postman (for testing)

### 2. Installation

```bash
git clone https://github.com/Mahmoud-Ahmed200/To-Do-app.git
cd todo-app-backend
npm install
````
### 3. Run the App

```bash
npm start
```

The server will run on: `http://localhost:3000`

---

## 📚 API Endpoints

### 🔐 Auth Routes

| Method | Endpoint   | Description       |
| ------ | ---------- | ----------------- |
| POST   | `/signup`  | Register user     |
| POST   | `/signin`  | Login & get token |
| POST   | `/signout` | Logout user       |

### ✅ Todo Routes (Protected)

| Method | Endpoint             | Description                      |
| ------ | -------------------- | -------------------------------- |
| POST   | `/add-todo`          | Add new todo                     |
| PUT    | `/change-status/:id` | Toggle todo status               |
| DELETE | `/delete-todo/:id`   | Delete specific todo             |
| GET    | `/getById/:id`       | Get todo by ID                   |
| GET    | `/get-todos`         | Get all todos (user)             |
| GET    | `/get-remain-todo`   | Get remaining (incomplete) todos |

---

## 🔐 Authentication & Authorization

* **JWT** used for access control.
* Auth middleware checks and verifies the token.
* Token is saved as a cookie named `token`.
* `req.userId` is populated for use in controllers.

---

## 🔐 Authentication Routes

### 1. **POST /signup** – Register a new user

**Request:**

```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "secure123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "User registered successfully"
}
```

---

### 2. **POST /signin** – Log in user and return token (saved in cookie)

**Request:**

```json
{
  "email": "john@example.com",
  "password": "secure123"
}
```

**Response:**

```json
{
  "success": true,
  "user": {
    "id": "64fdbcc65fd90ad8763be0aa",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
// Sets cookie: token=jwt_token
```

---

### 3. **POST /signout** – Log out user

**Response:**

```json
{
  "success": true,
  "message": "User signed out successfully"
}
// Cookie is cleared
```

---

## 🧾 Todo Routes (Protected)

### 4. **POST /add-todo** – Add a new todo

**Request:**

```json
{
  "title": "Buy groceries",
  "description": "Milk, Bread, Eggs",
  "status": false
}
```

**Response:**

```json
{
  "success": true,
  "message": "Todo added successfully",
  "todo": {
    "id": "65abcde12345f67890",
    "title": "Buy groceries",
    "description": "Milk, Bread, Eggs",
    "status": false,
    "userId": "64fdbcc65fd90ad8763be0aa"
  }
}
```

---

### 5. **PUT /change-status/\:id** – Change the status of a todo

**Request URL:**

```
/change-status/65abcde12345f67890
```

**Response:**

```json
{
  "success": true,
  "message": "Todo status updated successfully"
}
```

---

### 6. **DELETE /delete-todo/\:id** – Delete a todo

**Request URL:**

```
/delete-todo/65abcde12345f67890
```

**Response:**

```json
{
  "success": true,
  "message": "Todo deleted successfully"
}
```

---

### 7. **GET /getById/\:id** – Get a specific todo

**Request URL:**

```
/getById/65abcde12345f67890
```

**Response:**

```json
{
  "success": true,
  "todo": {
    "id": "65abcde12345f67890",
    "title": "Buy groceries",
    "description": "Milk, Bread, Eggs",
    "status": false,
    "userId": "64fdbcc65fd90ad8763be0aa"
  }
}
```

---

## 👤 User-Specific Todo Routes

### 8. **GET /get-todos** – Get all todos for the logged-in user

**Response:**

```json
{
  "success": true,
  "todos": [
    {
      "id": "65abcde12345f67890",
      "title": "Buy groceries",
      "description": "Milk, Bread, Eggs",
      "status": false,
      "userId": "64fdbcc65fd90ad8763be0aa"
    },
    {
      "id": "65bcde09876ff4321",
      "title": "Read a book",
      "description": "Finish chapter 5",
      "status": true,
      "userId": "64fdbcc65fd90ad8763be0aa"
    }
  ]
}
```

---

### 9. **GET /get-remain-todo** – Get only incomplete todos

**Response:**

```json
{
  "success": true,
  "remainingTodos": [
    {
      "id": "65abcde12345f67890",
      "title": "Buy groceries",
      "description": "Milk, Bread, Eggs",
      "status": false,
      "userId": "64fdbcc65fd90ad8763be0aa"
    }
  ]
}
```

---

## ⚠️ Important Notes

* Port **3000** is used as required.
* All passwords are hashed with bcrypt.
* Use **middleware** for authentication protection.
* Follows RESTful API design best practices.
* Uses **cookie-parser** to store JWT token securely.

---




