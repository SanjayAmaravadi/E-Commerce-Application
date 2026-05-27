# 🚀 E-Commerce Backend (Spring Boot)

Backend for the Full Stack E-Commerce Product Catalog Application.

Built using:

- Spring Boot
- Spring Security
- JWT Authentication
- MySQL
- Razorpay
- Spring Data JPA

---

# 🧰 Backend Tech Stack

| Technology | Purpose |
|---|---|
| Java 21 | Programming Language |
| Spring Boot | Backend Framework |
| Spring Security | Authentication |
| JWT | Authorization |
| Spring Data JPA | ORM |
| Hibernate | Database ORM |
| MySQL | Database |
| Razorpay | Payments |
| Swagger | API Documentation |

---

# 📁 Backend Structure

```text
src/main/java/com/app/productcatalog
├── config
├── controller
├── dto
├── exception
├── jwt
├── model
├── payload
├── repository
├── service
└── util
````

---

# ⚙️ application.properties

```properties
spring.application.name=E-commerce

# Database
spring.datasource.url=jdbc:mysql://localhost:3306/Store
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQLDialect
spring.jpa.show-sql=true

server.error.include-message=always

# MAIL CONFIGURATION
spring.mail.host=smtp.gmail.com
spring.mail.port=587
spring.mail.properties.mail.smtp.auth=true
spring.mail.properties.mail.smtp.starttls.enable=true

spring.profiles.active=dev
```

---

# ⚙️ application-dev.properties

```properties
spring.application.name=E-commerce

# Database CONFIGURATION
spring.datasource.username=
spring.datasource.password=

# MAIL CONFIGURATION
spring.mail.username=
spring.mail.password=

# SUPER ADMIN
super.admin.name=
super.admin.email=
super.admin.phone=
super.admin.password=

# RazorPay
razorpay.key.id=
razorpay.key.secret=
```

---

# 🗄️ Database Setup

Create database:

```sql
CREATE DATABASE Store;
```

---

# ▶️ Run Backend

```bash
mvn spring-boot:run
```

Backend URL:

```text
http://localhost:8080
```

---

# 📘 API Endpoints

## 🔐 Authentication APIs

| Method | Endpoint                  |
| ------ | ------------------------- |
| POST   | /api/auth/register        |
| POST   | /api/auth/login           |
| POST   | /api/auth/verify-otp      |
| POST   | /api/auth/resend-otp      |
| POST   | /api/auth/forgot-password |
| POST   | /api/auth/reset-password  |

---

## 👤 Profile APIs

| Method | Endpoint                     |
| ------ | ---------------------------- |
| GET    | /api/profile                 |
| PUT    | /api/profile                 |
| PUT    | /api/profile/change-password |

---

## 📦 Product APIs

| Method | Endpoint           |
| ------ | ------------------ |
| GET    | /api/products      |
| GET    | /api/products/{id} |
| POST   | /api/products      |

---

## 🛒 Cart APIs

| Method | Endpoint                    |
| ------ | --------------------------- |
| GET    | /api/cart                   |
| POST   | /api/cart                   |
| PUT    | /api/cart/decrease/{itemId} |
| DELETE | /api/cart/{itemId}          |

---

## ❤️ Wishlist APIs

| Method | Endpoint                  |
| ------ | ------------------------- |
| GET    | /api/wishlist             |
| POST   | /api/wishlist/{productId} |
| DELETE | /api/wishlist/{id}        |

---

## 📦 Order APIs

| Method | Endpoint                           |
| ------ | ---------------------------------- |
| POST   | /api/orders/checkout               |
| GET    | /api/orders/my-orders              |
| GET    | /api/orders/admin/all              |
| PUT    | /api/orders/admin/{orderId}/status |

---

## 💳 Payment APIs

| Method | Endpoint                   |
| ------ | -------------------------- |
| POST   | /api/payments/create-order |
| POST   | /api/payments/verify       |

---

## ⚙️ Settings APIs

| Method | Endpoint            |
| ------ | ------------------- |
| GET    | /api/admin/settings |
| PUT    | /api/admin/settings |

---

# 🔐 Security Features

* JWT Authentication
* Role-Based Authorization
* Password Encryption
* Protected APIs
* OTP Verification
* Secure Payment Verification

---

# 👨‍💻 Author

AMARAVADI SANJAY

---

# 📜 License

This project is for learning and educational purposes.
