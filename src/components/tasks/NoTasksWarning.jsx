import '../../styles/tasks.css';

export default function NoTasksWarning() {
  return (
    <div className="no-tasks-warning">
      <div className="warning-separator"></div>
      <span>No tasks</span>
      <div className="warning-separator"></div>
    </div>
  );
}