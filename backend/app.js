const express = require('express');

const { TaskManager } = require('./src/core/TaskManager');
const taskManager = new TaskManager()

const app = express()
const port = 5001;

const cors = require('cors');
const { db } = require('./src/core/db/db');
const { TaskModel } = require('./src/core/db/TaskModel');
app.use(cors());
app.use(express.json());

(async () => {
    const tables = await db.getQueryInterface().showAllTables();
    if (!tables.includes("tasks")) {
        await TaskModel.sync();
    }
})();

app.get('/getTasks', async (req, res) => {
    res.send(200, await taskManager.getTasksList());
})

app.post('/create', async (req, res) => {
    const { title, description } = req.body;
    const result = await taskManager.create(title, description);
    return res.send(200, result);
})

app.post('/delete', async (req, res) => {
    const { id } = req.body;
    await taskManager.destroy(id);
    return res.send(200, "OK");
})

app.post('/update', async (req, res) => {
    const { id, title, description } = req.body;
    await taskManager.updateTask(id, title, description);
    return res.send(200, "OK");
})

app.post('/reorder', async (req, res) => {
    const { tasks } = req.body; 
    try {
      for (let i = 0; i < tasks.length; i++) {
        await TaskModel.update({ order: i }, { where: { id: tasks[i].id } });
      }
      res.status(200).json({ message: 'Order updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task order' });
    }
  });

app.listen(port, () => {
    console.log(`Started on port ${port}`)
})

