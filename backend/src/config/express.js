const express = require('express');
const app = express()
const cors = require('cors');
const { db } = require('../core/db/db');

app.use(cors());
app.use(express.json());

(async () => {
    const tables = await db.getQueryInterface().showAllTables();
    if (!tables.includes("tasks")) {
        await TaskModel.sync();
    }
})();

module.exports = { app };