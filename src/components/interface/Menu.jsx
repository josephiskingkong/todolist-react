import { useState } from 'react';
import crossLogo from '../../images/cross.svg';
import '../../styles/Menu.css';

export default function Menu({ onAddTask }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleAddClick = () => {
        if (title && description) {
            onAddTask(title, description);
            setTitle('');
            setDescription('');
        } else {
            alert('Please enter both title and description');
        }
    };

    return (
        <div className="add-menu">
            <div className="menu-inputs">
                <input 
                    id="title-input" 
                    placeholder="Title..." 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                />
                <textarea 
                    id="description-input" 
                    placeholder="About..." 
                    value={description} 
                    onChange={(e) => setDescription(e.target.value)} 
                ></textarea>
            </div>
            <button id="menu-button" onClick={handleAddClick}>
                <img src={crossLogo} alt="cross" id="menu-button-cross" />
            </button>
        </div>
    );
}