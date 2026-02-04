# 🎉 Event Management API

A simple REST API to manage events and participants using **Node.js**, **TypeScript**, **Prisma ORM** and **MongoDB**.

## 👩‍💻 Developed by

Iara Tassi

This project focuses on clean code, business rules and **Test Driven Development (TDD)**.

---

## 🎯 Project Goal

This project was created as part of a back-end study module focused on NoSQL databases and modern API development.

The main goal is to practice:

- API design
- Business rules implementation
- Test Driven Development (TDD)
- Clean and simple architecture

---

## 📌 Business Rules

### Event

- An event has a **name**, **description**, **location** and **event date**
- An event starts as **not sold out**
- An event contains a list of participants

### Participant

- A participant has a **name** and an **email**
- The participant email must be **unique per event**

---

## ⚙️ Actions

- Create an event
- Delete an event
- List events and participants
- Add a participant to an event
  - The event must not be sold out
  - The event must not have happened
  - A participant with the same email cannot be registered more than once
- Mark an event as sold out
  - The event must not have happened
  - The event must have at least one participant

---

## 🧪 Development Approach

This project is being developed using **Test Driven Development (TDD)**.

- Features are implemented in small steps
- Tests are written before production code
- Each change is versioned with small and clear commits

---

## 🛠 Tech Stack

- Node.js
- TypeScript
- Express
- Prisma ORM
- MongoDB
- Jest (for testing)
- Supertest

---

## ▶️ How to Run

### Install dependencies

```bash
npm install
```

Run the application

```bash
npm run dev
```

Run tests

```bash
npm test
```

Run test coverage

```bash
npm run test:coverage
```

## 📊 Test Coverage

- Controllers: 100%
- Functions: 100%
- Overall coverage: ~94%

Tests include both success and failure scenarios for all business rules.

## 🚀 Project Status

✅ Completed
Project developed using TDD with full implementation of business rules and test coverage.
This project was designed to demonstrate clean architecture, business rule validation and confidence in automated testing.
