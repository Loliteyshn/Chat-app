import React, { useState } from 'react'
import Contacts from './Contacts';
import ModalWindow from './ModalWindow/ModalWindow';
import axios from 'axios';
import { createUserRoute } from '../../utils/APIRoutes';

function ContactsContainer({ changeChat, handleOpenModal, showModal, handleCloseModal, contacts, setContacts, currentChat }) {

    const createChat = async (data) => {
        try {
            const response = await axios.post(createUserRoute, data);
            handleCloseModal();
            window.location.reload();
        } catch (error) {
            console.error('Error creating chat:', error);
        }
    };

    return (
        <div>
            <div>
                <button onClick={handleOpenModal}>Create new chat</button>
                <ModalWindow show={showModal} onClose={handleCloseModal} createChat={createChat} buttonText={"Create new chat"} />
            </div>
            <Contacts changeChat={changeChat} contacts={contacts} setContacts={setContacts} currentChat={currentChat} />
        </div>
    )
}

export default ContactsContainer