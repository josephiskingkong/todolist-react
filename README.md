# 📋 TODO List on Node.js and HTML

This is a small pet project that serves as a TODO List application. The backend is developed with Node.js using the Express.js library, while the frontend is built using HTML, JavaScript, and SASS.

## 🚀 Getting Started

### 1. Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 14 or higher)
- **PostgreSQL** (version 15)
- **SASS**

### 2. Set Up PostgreSQL

- Download and install [PostgreSQL 15](https://www.postgresql.org/download/).
- Create a new database:
  ```sql
  CREATE DATABASE todo;
  ```
- Ensure PostgreSQL is running on port `5432` (default port).

### 3. Install Dependencies and Start the Server

Navigate to the `backend` directory, install the dependencies, and start the server:

```bash
cd backend
npm install
node app.js
```

### 4. Configuration

You may need to configure the database connection in `backend/src/core/db/db.js`:

```javascript
const { Sequelize } = require('sequelize');

const db = new Sequelize(
    'postgres',
    'username',
    'password',
    {
        host: 'host',
        port: 'port',
        dialect: 'postgres'
    }
)

module.exports = { db };
```
Replace `'username'`, `'password'`, `'host'` and `'port'` with your PostgreSQL credentials.

### 5. Enjoy the Application

Once the server is running, you need to run React

```bash
cd ../
npm install
npm run start
```

## 📝 Description

### Initial Screen

Upon the first launch, you will see the main screen with a message saying "No tasks":

![Main Screen](https://i.imgur.com/i2hswfY.png)

### Managing Tasks

You can add, edit, share, or delete tasks using the buttons that appear when you interact with a task:

- **Add Task**: Create a new task by entering a title and description.
- **Share Task**: Share the task details with others.
- **Edit Task**: Modify the details of an existing task.
- **About Task**: Check more info about your task.
- **Delete Task**: Remove a task from the list.

![Main Screen with Tasks](https://i.imgur.com/1QcDwNp.png)

### Deleting a Task

Click the delete button to remove a task from the list:

![Delete Screen](https://i.imgur.com/D8LB5c2.png)

## ✨ Features

- 📝 **Create Tasks**: Add new tasks with a title and description.
- 🖊️ **Edit Tasks**: Modify existing tasks with updated information.
- ✉️ **Share Tasks**: Share your tasks with others using social media.
- 🗑️ **Delete Tasks**: Remove tasks that are no longer needed.
- ☝🏽 **Drag 'n' Drop**: Drag your tasks to change their order.

## 📌 Developed By

**[@josephiskingkong](https://github.com/josephiskingkong)**

