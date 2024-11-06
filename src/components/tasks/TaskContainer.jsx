import React from 'react';
import Task from './Task';
import '../../styles/tasks.css';

function TasksContainer({ tasks, onDelete, onUpdate, onShare, onInfo, onReorder }) {
  const moveTask = (fromIndex, toIndex) => {
    const updatedTasks = [...tasks];
    const [movedTask] = updatedTasks.splice(fromIndex, 1);
    updatedTasks.splice(toIndex, 0, movedTask);
    onReorder(updatedTasks);
  };

  return (
    <div className="tasks">
      {tasks.map((task, index) => (
        <Task
          key={task.id}
          task={task}
          index={index}
          onDelete={onDelete}
          onUpdate={onUpdate}
          onShare={onShare}
          onInfo={onInfo}
          moveTask={moveTask}
        />
      ))}
    </div>
  );
}

export default TasksContainer;