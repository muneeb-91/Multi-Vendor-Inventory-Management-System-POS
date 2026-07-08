# Saas based Multi-Vendor Inventory Management System and POS

## Currently Working on This Project

A full-stack SaaS Inventory & Point of Sale (POS) application where multiple vendors can manage their inventory, suppliers, categories, products, and sales. Each vendor can have multiple managers with role-based access, while the Super Admin can monitor vendors, approve registrations, and manage the overall platform.

This project is divided into two directories:

- `frontend` – React.js
- `backend` – Node.js & Express.js

MongoDB is used as the primary database.

---

## 📷 Screenshots

### Vendor Register

![Vendor Register]([link](https://github.com/muneeb-91/Multi-Vendor-Inventory-Management-System-POS/blob/2a61dc1ec383e71b84396d8ead40bbf0975e466f/screenshots/SF-register-vendor.png))

### Home Page

![Home Page]([link](https://github.com/muneeb-91/Multi-Vendor-Inventory-Management-System-POS/blob/2a61dc1ec383e71b84396d8ead40bbf0975e466f/screenshots/SF-home.png))

### Admin Pannel
![Admin Pannel]([link](https://github.com/muneeb-91/Multi-Vendor-Inventory-Management-System-POS/blob/2a61dc1ec383e71b84396d8ead40bbf0975e466f/screenshots/SF-admin-pannel.png))

### Vendor Pannel
![Vendor Pannel](https://github.com/muneeb-91/Multi-Vendor-Inventory-Management-System-POS/blob/2a61dc1ec383e71b84396d8ead40bbf0975e466f/screenshots/SF-vendor-pannel.png)

### Manager Pannel
![Manager Pannel]([link](https://github.com/muneeb-91/Multi-Vendor-Inventory-Management-System-POS/blob/2a61dc1ec383e71b84396d8ead40bbf0975e466f/screenshots/SF-manager-pannel.png))

---
## 📂 Project Structure  

```bash
root
├── backend # Express server (API)
└── frontend # React client
```
---

## 🚀 Getting Started  

### 1️⃣ Clone the Repository  

```bash
git clone https://github.com/muneeb-91/Multi-Vendor-Inventory-Management-System-POS.git
cd project_name
```

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```
#### Create .env file inside backend

```bash
MONGO_URI = your_mongoDB_Atlas_connection_string
PORT= your_backend_port
JWT_SECRET_KEY= your_jwt_secret
```

#### Run the backend
With nodemon:

```bash
nodemon server.js
```
OR with "dev" script:

```bash
npm run dev
```
OR normally with:

```bash
node server.js
```
### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
```
#### Create .env file inside frontend

```bash
VITE_BACKEND_URL= your_backend_url_with_same_port
```

#### Run the frontend

```bash
npm run dev
```
Frontend will run at httplocalhost5173

---

## 📸 Features

**→ Multi-tenant SaaS architecture with Vendor, Manager, and Super Admin roles**

**→ Inventory management (Products, Categories, Suppliers & Stock)**

**→ Secure JWT authentication with role-based authorization**

**→ Sales management with dashboard and analytics (In Progress)**

---

## ⚙️ Tech Stack

**→ Frontend: React.js, Vite, Tailwind CSS**

**→ Backend: Node.js, Express.js**

**→ Backend Validation: Joi**

**→ Database: MongoDB, Mongoose**

**→ Authentication: JWT, bcrypt**

**→ State Management: Redux Toolkit (Frontend)**

**→ API Testing: Postman**
