# Shop Inventory and Sales Management System

## Overview

This project is a backend system designed to manage inventory and sales for a small shop. It allows users to add items to the inventory, create bills for sales transactions, and automatically update the inventory.

## Setup and Installation

### Prerequisites

- **Node.js** and **npm** (Node Package Manager) installed. You can download them from [nodejs.org](https://nodejs.org/).
- **MongoDB** installed and running. You can download it from [mongodb.com](https://www.mongodb.com/try/download/community).

### Project Setup

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd shop-inventory-system
   ```

2. **Install Dependencies**

   Ensure you are in the project directory and run:

   ```bash
   npm install
   ```

3. **Replace Connection String Of MongoDB in Server.js File**

4. **Start MongoDB**

   Ensure MongoDB is running. You can start it using:

   ```bash
   mongod
   ```

5. **Start the Server**

   Run the following command to start the server:

   ```bash
   npm start
   ```

   The server will be running on `http://localhost:3000`.

## API Endpoints

### 1. **Add New Item to Inventory**

- **Endpoint:** `POST /items`
- **Description:** Adds a new item to the inventory.
- **Request Body:**

  ```json
  {
      "name": "apple",
      "price": 200,
      "quantity": 1
  }
  ```

- **Response Example:**

  ```json
  {
      "_id": "64d4f0bf5f0abc1234567890",
      "name": "apple",
      "price": 200,
      "quantity": 1,
      "__v": 0
  }
  ```

### 2. **Retrieve All Items**

- **Endpoint:** `GET /items`
- **Description:** Retrieves a list of all items in the inventory.
- **Response Example:**

  ```json
  [
      {
          "_id": "64d4f0bf5f0abc1234567890",
          "name": "apple",
          "price": 200,
          "quantity": 1,
          "__v": 0
      },
      {
          "_id": "64d4f0bf5f0abc1234567891",
          "name": "banana",
          "price": 100,
          "quantity": 10,
          "__v": 0
      }
  ]
  ```

### 3. **Create a Bill**

- **Endpoint:** `POST /bills`
- **Description:** Creates a new bill for a sale transaction.
- **Request Body:**

  ```json
  {
      "customerName": "John Doe",
      "items": [
          {
              "itemId": "64d4f0bf5f0abc1234567890",
              "quantity": 2
          },
          {
              "itemId": "64d4f0bf5f0abc1234567891",
              "quantity": 1
          }
      ]
  }
  ```

- **Response Example:**

  ```json
  {
      "_id": "64d4f0bf5f0abc1234567892",
      "customerName": "John Doe",
      "items": [
          {
              "itemId": "64d4f0bf5f0abc1234567890",
              "name": "apple",
              "price": 200,
              "quantity": 2
          },
          {
              "itemId": "64d4f0bf5f0abc1234567891",
              "name": "banana",
              "price": 100,
              "quantity": 1
          }
      ],
      "totalAmount": 500,
      "date": "2024-08-10T12:34:56.789Z",
      "__v": 0
  }
  ```

### 4. **Retrieve All Bills**

- **Endpoint:** `GET /bills`
- **Description:** Retrieves a list of all bills.
- **Response Example:**

  ```json
  [
      {
          "_id": "64d4f0bf5f0abc1234567892",
          "customerName": "John Doe",
          "items": [
              {
                  "itemId": "64d4f0bf5f0abc1234567890",
                  "name": "apple",
                  "price": 200,
                  "quantity": 2
              },
              {
                  "itemId": "64d4f0bf5f0abc1234567891",
                  "name": "banana",
                  "price": 100,
                  "quantity": 1
              }
          ],
          "totalAmount": 500,
          "date": "2024-08-10T12:34:56.789Z",
          "__v": 0
      }
  ]
  ```

### 5. **Retrieve a Specific Bill**

- **Endpoint:** `GET /bills/:id`
- **Description:** Retrieves details of a specific bill.
- **Response Example:**

  ```json
  {
      "_id": "64d4f0bf5f0abc1234567892",
      "customerName": "John Doe",
      "items": [
          {
              "itemId": "64d4f0bf5f0abc1234567890",
              "name": "apple",
              "price": 200,
              "quantity": 2
          },
          {
              "itemId": "64d4f0bf5f0abc1234567891",
              "name": "banana",
              "price": 100,
              "quantity": 1
          }
      ],
      "totalAmount": 500,
      "date": "2024-08-10T12:34:56.789Z",
      "__v": 0
  }
  ```

## Example Usage

1. **Add a New Item:**

   - Use Postman or cURL to POST to `http://localhost:3000/items` with the item details in the body.

2. **Create a Bill:**

   - POST to `http://localhost:3000/bills` with the bill details in the body.

3. **Retrieve Items or Bills:**

   - Use GET requests to `http://localhost:3000/items` or `http://localhost:3000/bills`.

4. **Retrieve a Specific Bill:**

   - Use GET requests to `http://localhost:3000/bills/:id`, replacing `:id` with the actual bill ID.
