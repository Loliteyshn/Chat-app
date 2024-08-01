import React, { useEffect } from 'react';
import styles from './DeleteChat.module.css';

function DeleteChat({ show, onClose, deleteChat, contact, currentChat }) {
    if (!show) {
        return null;
    }

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleDelete = () => {
        deleteChat(contact);
        onClose();
    }

    return (
        <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
            <div className={styles.modalContent}>
                <span className={styles.closeButton} onClick={onClose}>&times;</span>
                <div>
                    <h3>Are you sure you want to delete this chat?</h3>
                    <div>
                        <button onClick={handleDelete}>Yes</button>
                        <button onClick={onClose}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DeleteChat