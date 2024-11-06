import { useState, useEffect } from 'react';
import { APIManager } from '../../managers/APIManager';

export default function useTaskHandlers() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function loadTasks() {
      const fetchedTasks = await APIManager.fetchTasks();
      setTasks(fetchedTasks);
    }
    loadTasks();
  }, []);

  const handleAddTask = async (title, description) => {
    const newTask = await APIManager.addTask(title, description);
    if (newTask) {
      setTasks(prevTasks => [...prevTasks, newTask]);
    }
  };

  const handleDeleteTask = async (taskId) => {
    await APIManager.deleteTask(taskId);
    setTasks(prevTasks => prevTasks.filter(task => task.id !== taskId));
  };

  const handleUpdateTask = async (id, title, description) => {
    await APIManager.updateTask(id, title, description);
    setTasks(prevTasks => prevTasks.map(task => 
      task.id === id ? { ...task, title, description } : task
    ));
  };

  return {
    tasks,
    setTasks,
    handleAddTask,
    handleDeleteTask,
    handleUpdateTask,
  };
}