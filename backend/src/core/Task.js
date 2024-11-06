const { TaskModel } = require("./db/TaskModel");

class Task {
    id;
    title;
    description;
    order;

    constructor(title = null, description = null, id = null, order = 0) {
        this.title = title;
        this.description = description;
        this.id = id;
        this.order = order;
    }

    async addToDB() {
        const maxOrder = await TaskModel.max('order');
    
        const instance = await TaskModel.create({
            title: this.title,
            description: this.description,
            order: maxOrder !== null ? maxOrder + 1 : 0
        });
    
        this.id = instance.id;
        this.order = instance.order;
    }

    async update(title, description) {
        const instance = await TaskModel.findOne({ where: { id: this.id } });
        if (!instance) {
            throw new Error(`Can't find task`);
        }
        instance.title = title;
        instance.description = description;
        
        await instance.save();
        
        this.title = title;
        this.description = description;
    }
}

module.exports = { Task }