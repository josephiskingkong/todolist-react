const { TaskManager } = require('./src/core/TaskManager');
const taskManager = new TaskManager()
const { TaskModel } = require('./src/core/db/TaskModel');
const { app } = require('./src/config/express');
require('dotenv').config()
const port = process.env.expressPort;

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

