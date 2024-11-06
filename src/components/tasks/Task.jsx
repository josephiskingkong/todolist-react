import React, { useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import '../../styles/tasks.css';
import cross from '../../images/cross.svg';
import share from '../../images/share.svg';
import edit from '../../images/edit.svg';

const ITEM_TYPE = 'TASK';

function Task({ task, index, onDelete, onUpdate, onShare, onInfo, moveTask }) {
  const [showButtons, setShowButtons] = useState(false);

  const [, dragRef] = useDrag({
    type: ITEM_TYPE,
    item: { index },
  });

  const [, dropRef] = useDrop({
    accept: ITEM_TYPE,
    hover: (draggedItem) => {
      if (draggedItem.index !== index) {
        moveTask(draggedItem.index, index);
        draggedItem.index = index;
      }
    },
  });

  const toggleButtons = () => {
    setShowButtons(!showButtons);
  };

  return (
    <div
      ref={(node) => dragRef(dropRef(node))}
      className="task"
      onClick={toggleButtons}
    >
      <div className="task-wrapper">
        <div className="task-texts">
          <span className="task-title">{task.title}</span>
          <span className="task-description">{task.description}</span>
        </div>
        <button
          className="delete-task-button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(task);
          }}
        >
          <img src={cross} alt="Delete" />
        </button>
      </div>

      {showButtons && (
        <div className="task-buttons">
          <button
            className="task-button"
            onClick={(e) => {
              e.stopPropagation();
              onShare(task);
            }}
          >
            <img src={share} alt="Share" />
          </button>

          <button
            className="task-button"
            onClick={(e) => {
              e.stopPropagation();
              onUpdate(task);
            }}
          >
            <img src={edit} alt="Edit" />
          </button>

          <button
            className="task-button"
            onClick={(e) => {
              e.stopPropagation();
              onInfo(task);
            }}
          >
            i
          </button>
        </div>
      )}
    </div>
  );
}

export default Task;