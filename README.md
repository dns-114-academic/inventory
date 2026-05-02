# Inventory System (Node.js + MongoDB)


---

## Description

A **real-time stock management** web application built with Node.js, Express, and MongoDB (via Mongoose). Every stock modification immediately updates the interface and triggers visual alerts when stock falls below a defined threshold.

---

## Project Structure

```
inventory/
├── server.js              # Express server + API routes
├── package.json           # Node.js dependencies
├── models/
│   └── Product.js         # Mongoose product schema
├── public/
│   └── index.html         # Web interface (HTML + CSS + vanilla JS)
└── en/
    └── README.md          # This file
```

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Backend | Node.js + Express |
| Database | MongoDB (local) via Mongoose |
| Frontend | HTML / CSS / Vanilla JavaScript |

---

## Data Model (`Product`)

| Field | Type | Constraints |
|-------|------|-------------|
| `name` | String | Required, unique |
| `category` | String | Enum: Électronique, Mobilier, Consommables |
| `quantity` | Number | Minimum 0 |
| `minThreshold` | Number | Default 5 (alert threshold) |
| `lastUpdated` | Date | Auto-updated on each modification |

---

## REST API

| Method | Route | Description |
|--------|-------|-------------|
| `GET` | `/api/products?category=X` | Get all products (optional category filter) |
| `POST` | `/api/products` | Create a product (400 error if name already exists) |
| `PATCH` | `/api/products/:id/stock` | Update stock (`add` or `remove` + amount) |
| `DELETE` | `/api/products/:id` | Delete a product (only if quantity = 0) |

---

## Web Interface

- Creation form with validations
- Dropdown to filter products by category
- Product table/cards with dynamic updates (no page reload)
- Visual alert (red background / `.low-stock` class) if `quantity <= minThreshold`
- `+` / `-` buttons to adjust stock via `fetch PATCH`

---

## Prerequisites & Setup

### Requirements
- **Node.js** (v16+)
- **MongoDB** running locally (port 27017)

### Installation & Launch
```bash
# Install dependencies
npm install

# Start the server
node server.js
# → http://localhost:3000
```

> MongoDB must be running before starting the server.
