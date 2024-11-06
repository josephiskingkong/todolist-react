import { ENDPOINT } from "../constants";

export class APIManager {
    static async fetchTasks() {
        try {
            const response = await fetch(`${ENDPOINT}/getTasks`);
            if (!response.ok) {
                throw new Error('Error while fetching tasks');
            }
            const tasks = await response.json();
            return tasks.sort((a, b) => a.order - b.order);
        } catch (error) {
            console.error('Error:', error);
            return [];
        }
    }

    static async addTask(title, description) {
        try {
            const body = {
                title: title,
                description: description
            };

            let response = await fetch(`${ENDPOINT}/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error('Error while adding task');
            }

            const createdTask = await response.json();
            return createdTask;
        } catch (error) {
            console.error('Error:', error);
            alert('Error');
            return null;
        }
    }

    static async deleteTask(id) {
        try {
            const body = {
                id: id
            };

            let response = await fetch(`${ENDPOINT}/delete`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error('Error while adding task');
            }

            return;
        } catch (error) {
            console.error('Error:', error);
            alert('Error');
            return null;
        }
    }

    static async updateTask(id, title, description) {
        try {
            const body = {
                id: id,
                title: title,
                description: description
            };

            let response = await fetch(`${ENDPOINT}/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });

            if (!response.ok) {
                throw new Error('Error while adding task');
            }

            return;
        } catch (error) {
            console.error('Error:', error);
            alert('Error');
            return null;
        }
    }

    static async updateTaskOrder(tasks) {
        try {
            const response = await fetch(`${ENDPOINT}/reorder`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tasks })
            });

            if (!response.ok) throw new Error('Failed to update task order');
        } catch (error) {
            console.error('Error updating task order:', error);
        }
    }
}