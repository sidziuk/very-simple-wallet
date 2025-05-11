# 💰 Simple Wallet Application

A Spring Boot REST API for managing digital wallets and multi-currency transactions (CZK, EUR).

---

## 🔧 Tech Stack

- Java 17+
- Spring Boot
- JPA
- PostgreSQL
- Docker

---

## 🚀 Build & Run (Locally)

### 📦 Prerequisites

- Java 17+
- Maven
- Docker

### 🏗️ Compile, Package & Build Docker Image

```bash
# Navigate to the backend project
cd backend
```

```bash
# Clean, compile, package the JAR, and build the Docker image
mvn clean install docker:build
```

```bash
# Go to the root of the project where `docker-compose.yml` exists:
cd ..
```

```bash
# Run
docker compose up
```

### 🌐 Access Services

API: http://localhost:8080

pgAdmin: http://localhost:5050

Default pgAdmin credentials (configured via docker-compose.yml):

Email: admin@admin.com

Password: admin
