import React from 'react';
import copyIcon from '../../../images/share/copy.svg';
import vkIcon from '../../../images/share/vk.svg';
import telegramIcon from '../../../images/share/telegram.svg';
import whatsappIcon from '../../../images/share/whatsapp.svg';
import facebookIcon from '../../../images/share/facebook.svg';
import '../../../styles/Modals.css';

function ShareModal({ onClose, task }) {
    const handleShare = (platform) => {
        if (!task) return;

        const text = `Title: ${task.title}\nDescription: ${task.description}`;
        
        const platforms = {
            copy: () => {
                navigator.clipboard.writeText(text)
                    .then(() => alert('Task information copied to clipboard!'))
                    .catch(err => console.error('Failed to copy text: ', err));
            },
            vk: () => {
                const url = `https://vk.com/share.php?${new URLSearchParams({ title: task.title, description: task.description })}`;
                window.open(url, '_blank');
            },
            telegram: () => {
                const url = `https://t.me/share/url?${new URLSearchParams({ url: window.location.href, text })}`;
                window.open(url, '_blank');
            },
            whatsapp: () => {
                const url = `https://wa.me/?${new URLSearchParams({ text })}`;
                window.open(url, '_blank');
            },
            facebook: () => {
                const url = `https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({ u: window.location.href, quote: text })}`;
                window.open(url, '_blank');
            }
        };

        if (platforms[platform]) {
            platforms[platform]();
        }
        
        onClose(); 
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div id="share-menu" onClick={(e) => e.stopPropagation()}>
                <div className="share-buttons">
                    <button className="share-button" onClick={() => handleShare('copy')}>
                        <img src={copyIcon} alt="Copy" />
                    </button>
                    <button className="share-button" onClick={() => handleShare('vk')}>
                        <img src={vkIcon} alt="VK" />
                    </button>
                    <button className="share-button" onClick={() => handleShare('telegram')}>
                        <img src={telegramIcon} alt="Telegram" />
                    </button>
                    <button className="share-button" onClick={() => handleShare('whatsapp')}>
                        <img src={whatsappIcon} alt="WhatsApp" />
                    </button>
                    <button className="share-button" onClick={() => handleShare('facebook')}>
                        <img src={facebookIcon} alt="Facebook" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ShareModal;