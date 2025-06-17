![Project Status](https://img.shields.io/badge/status-in%20development-yellow)

# 🛡️ Kavach API

A secure and scalable password manager API built using **Node.js**, **Express**, and **MongoDB**.  
This API allows users to store, retrieve, and manage credentials for websites securely.

---

## 🔧 Tech Stack

![Built with Node.js](https://img.shields.io/badge/Built%20with-Node.js-green?logo=node.js)
![Uses MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen?logo=mongodb)
![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow?logo=javascript)
![Framework](https://img.shields.io/badge/Framework-Express.js-lightgrey?logo=express)
![API Type](https://img.shields.io/badge/API-REST%20API-blue)

---

## 👨‍💻 Author

**Akshay Naphade**  
[![LinkedIn](https://img.shields.io/badge/LinkedIn-akshaynaphade-blue?logo=linkedin)](https://www.linkedin.com/in/akshay-naphade-a29a791b6/)  
[![GitHub](https://img.shields.io/badge/GitHub-akshaynaphade-black?logo=github)](https://github.com/akshaynaphade)

![Made with ❤️ by Akshay](https://img.shields.io/badge/Made%20with-%E2%9D%A4%EF%B8%8F%20by%20Akshay-red)

---

## 📝 License ![MIT License](https://img.shields.io/badge/License-MIT-blue)

This project is licensed under the **MIT License**.  
See the [LICENSE](LICENSE) file for more info.

---

## 📁 Sample Endpoints

> ⚠️ Work in Progress — Endpoints may change.

| Method | Endpoint          | Description             |
|--------|-------------------|-------------------------|
| `POST` | `/api/signup`     | Register a new user     |
| `POST` | `/api/login`      | Authenticate user       |
| `POST` | `/api/passwords`  | Save a new password     |
| `GET`  | `/api/passwords`  | Get all saved passwords |
| `DELETE` | `/api/passwords/:id` | Delete a password      |

---

## ⚙️ Setup Instructions

```bash
# 1. Clone the repository
git clone https://github.com/akshaynaphade/kavach-api.git
cd kavach-api

# 2. Install dependencies
npm install

# 3. Add environment variables
Create a `.env` file with the following keys:
- MONGO_URI
- JWT_SECRET

# 4. Start the development server
npm run dev
