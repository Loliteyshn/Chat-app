import React, { useEffect, useState } from 'react'
import axios from "axios";
import { deleteContactRoute, getAllUserRoute, updateContactRoute } from '../../utils/APIRoutes';
import ModalWindow from './ModalWindow/ModalWindow';
import styles from "./Sidebar.module.css";
import DeleteChat from './DeleteChat/DeleteChat';

function Contacts({ changeChat, contacts, setContacts, currentChat }) {
  const [showModal, setShowModal] = useState(false);
  const [currentSelected, setCurrentSelected] = useState(undefined);

  useEffect(() => {
    const fetchData = async () => {
      const data = await axios.get(getAllUserRoute)
      setContacts(data.data);
    }
    fetchData();
  }, [contacts]);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  }

  const deleteChat = async (contact) => {
    if (contact) {
      await axios.delete(deleteContactRoute, { data: { contact } });
      window.location.reload();
    }
  }

  const handleOpenModal = (e) => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (<>
    {contacts.map((contact, index) => {
      return <div  key={contact._id} className={styles.contacts}>
        <div className={`${styles.contact} ${index === currentSelected ? styles.selected : ''} `}
          onClick={() => changeCurrentChat(index, contact)}>
          {contact.firstname} {contact.lastname}
        </div>
        <button onClick={handleOpenModal}>Delete</button>
        <DeleteChat show={showModal} onClose={handleCloseModal} deleteChat={deleteChat} 
        contact={contact} currentChat={currentChat} />
      </div>
    })}

  </>
  )
}

export default Contacts