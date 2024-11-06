import React, { useState } from 'react';
import '../../../styles/Modals.css';

function EditModal({ task, onSave, onCancel }) {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);

    const handleSave = () => {
        onSave({ ...task, title, description });
    };

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div id="edit-wrapper" onClick={(e) => e.stopPropagation()}>
                <div className="edit-menu">
                    <div className="edit-inputs">
                        <input 
                            type="text" 
                            id="edit-title" 
                            className="edit-input" 
                            value={title} 
                            onChange={(e) => setTitle(e.target.value)} 
                        />
                        <textarea 
                            id="edit-description" 
                            className="edit-input" 
                            value={description} 
                            onChange={(e) => setDescription(e.target.value)} 
                        />
                    </div>
                    <div className="edit-buttons">
                        <button id="edit-confirm" className="edit-button" onClick={handleSave}>Save</button>
                        <button id="edit-cancel" className="edit-button" onClick={onCancel}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditModal;