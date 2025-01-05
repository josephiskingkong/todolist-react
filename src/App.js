import React, { useState, useEffect } from 'react';
import Menu from './components/interface/Menu';
import NoTasksWarning from './components/tasks/NoTasksWarning';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './styles/App.css';
import TasksContainer from './components/tasks/TaskContainer';
import useTaskHandlers from './components/hooks/useTaskHandlers';
import ShareModal from './components/interface/modals/ShareModal';
import DeleteModal from './components/interface/modals/DeleteModal';
import EditModal from './components/interface/modals/EditModal';
import InfoModal from './components/interface/modals/InfoModal';
import { TouchBackend } from 'react-dnd-touch-backend';
import { isMobile } from 'react-device-detect';
import { APIManager } from './managers/APIManager';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks } from './slices/tasksSlice';

function App() {
  const dispatch = useDispatch();
  const tasksFromRedux = useSelector((state) => state.tasks.items);

  const { tasks, setTasks, handleAddTask, handleDeleteTask, handleUpdateTask } = useTaskHandlers();

  const [showShareModal, setShowShareModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  useEffect(() => {
    setTasks(tasksFromRedux);
  }, [tasksFromRedux, setTasks]);

  const handleReorder = async (updatedTasks) => {
    setTasks(updatedTasks);
    await APIManager.updateTaskOrder(updatedTasks);
  };

  const openModal = (type, task) => {
    setCurrentTask(task);
    if (type === 'share') setShowShareModal(true);
    if (type === 'delete') setShowDeleteModal(true);
    if (type === 'edit') setShowEditModal(true);
    if (type === 'info') setShowInfoModal(true);
  };

  const closeModal = () => {
    setShowShareModal(false);
    setShowDeleteModal(false);
    setShowEditModal(false);
    setShowInfoModal(false);
    setCurrentTask(null);
  };

  const confirmDeleteTask = () => {
    if (currentTask) {
      handleDeleteTask(currentTask.id);
      closeModal();
    }
  };

  const saveTaskEdit = (updatedTask) => {
    handleUpdateTask(updatedTask.id, updatedTask.title, updatedTask.description);
    closeModal();
  };

  return (
    <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
      <div className="wrapper">
        <Menu onAddTask={handleAddTask} />

        {tasks.length === 0 ? (
          <NoTasksWarning />
        ) : (
          <TasksContainer
            tasks={tasks}
            onDelete={(task) => openModal('delete', task)}
            onUpdate={(task) => openModal('edit', task)}
            onInfo={(task) => openModal('info', task)}
            onShare={(task) => openModal('share', task)}
            onReorder={handleReorder}
          />
        )}

        {showShareModal && <ShareModal onClose={closeModal} task={currentTask} />}
        {showDeleteModal && <DeleteModal onConfirm={confirmDeleteTask} onCancel={closeModal} />}
        {showEditModal && currentTask && (
          <EditModal
            task={currentTask}
            onSave={saveTaskEdit}
            onCancel={closeModal}
          />
        )}
        {showInfoModal && currentTask && <InfoModal task={currentTask} onClose={closeModal} />}
      </div>
    </DndProvider>
  );
}

export default App;