# CodeVector Task

## Overview

This project implements a backend service for browsing a large product catalog (~200,000 products) with:

* Cursor-based pagination
* Category filtering
* PostgreSQL database
* Drizzle ORM
* Express.js

The API returns products ordered by newest first and is designed to remain efficient even with large datasets.

---

## Live Demo Notes

The application is connected to a hosted PostgreSQL database.

To avoid exposing database credentials publicly, the database connection string is not included in this repository.

## Tech Stack

* Node.js
* Express.js
* PostgreSQL
* Drizzle ORM
* Railway (Hosting)

---

## Design Decisions

### Why PostgreSQL?

PostgreSQL provides excellent support for indexing, sorting, and large datasets while remaining simple to deploy and maintain.

### Why Cursor Pagination?

Offset pagination becomes slower as page numbers increase and can produce duplicate or missing records when new products are inserted while a user is browsing.

Cursor pagination avoids these issues by continuing from the last record seen.

### Sorting Strategy

Products are ordered by:

* `updatedAt DESC`
* `id DESC`

The `id` column acts as a tie-breaker when multiple products share the same timestamp.

---

## Database Indexes

To support efficient pagination and filtering:

* `(updatedAt, id)`
* `(category, updatedAt, id)`

These indexes match the query patterns used by the API.

---

## API

### Get Products

GET `/products`

Query Parameters:

* `limit`
* `category`
* `cursorId`
* `cursorUpdatedAt`

Example:

GET `/products?limit=20&category=sport`

Response:

```json
{
  "data": [...],
  "nextCursor": {
    "cursorId": 123,
    "cursorUpdatedAt": "2026-06-24T12:00:00.000Z"
  }
}
```

### Create Product

POST `/products`

Request Body:

```json
{
  "name": "Football",
  "category": "sport",
  "price": 500
}
```

---

## Seeding

A seed script generates 200,000 products.

Records are inserted in batches of 5,000 to avoid performing 200,000 individual database operations.

Run:

```bash
npm run seed
```



---

## Running Locally

Install dependencies:

```bash
npm install
```

Apply schema:

```bash
npx drizzle-kit push
```

Start server:

```bash
npm start
```

Seed database:

```bash
npm run seed
```

---

## Future Improvements

* Snapshot-based cursors for stronger consistency during concurrent updates
* Additional filtering options
* Product search
* API validation with Zod

---

## AI Usage

ChatGPT was used as a development assistant for the seed.js script and for some minor improvements.

