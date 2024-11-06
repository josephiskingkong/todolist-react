import React from 'react';
import '../../../styles/Modals.css';

function DeleteModal({ onConfirm, onCancel }) {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div id="delete-wrapper" onClick={(e) => e.stopPropagation()}>
                <div className="delete-header-line"></div>
                <div className="delete-menu">
                    <span>Delete this task?</span>
                    <div className="delete-buttons">
                        <button id="delete-confirm" className="delete-button" onClick={onConfirm}>Yes</button>
                        <button id="delete-cancel" className="delete-button primary-button" onClick={onCancel}>No</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeleteModal;