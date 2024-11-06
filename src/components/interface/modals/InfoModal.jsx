import React from 'react';
import '../../../styles/Modals.css';

function InfoModal({ task, onClose }) {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div id="info-wrapper" onClick={(e) => e.stopPropagation()}>
                <div className="info-menu">
                    <p className="info-header">Task info</p>
                    <div className="info-texts">
                        <p id="info-title" className="info-title">{task.title}</p>
                        <p id="info-description" className="info-description">{task.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InfoModal;