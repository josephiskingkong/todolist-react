const { TaskModel } = require("./db/TaskModel");
const { Task } = require("./Task");

class TaskManager {
    async create(title, description) {
        const task = new Task(title, description);
        await task.addToDB();
        return task;
    }

    async find(id) {
        const task = await TaskModel.findOne({ where: { id: id } });
        if (!task) {
            return {};
        }
        return new Task(task.title, task.description, task.id);
    }

    async destroy(id) {
        const task = await TaskModel.findOne({ where: { id: id } });
        if (!task) {
            return;
        }

        await task.destroy();
    }

    async getTasksList() {
        const tasks = await TaskModel.findAll({ order: [ ['id', 'ASC'] ] });
        if (tasks.length === 0) {
            return [];
        }

        return tasks.map(task => {
            return new Task(task.title, task.description, task.id, task.order);
        })
    }

    async updateTask(id, title, description) {
        const task = new Task(null, null, id);
        await task.update(title, description);
    }
}

module.exports = { TaskManager };