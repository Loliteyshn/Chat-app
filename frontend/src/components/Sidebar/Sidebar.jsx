import React, { useEffect, useState } from 'react';
import axios from "axios";
import Contacts from './Contacts';
import styles from "./Sidebar.module.css";
import { useNavigate } from 'react-router-dom';
import profileImg from '../../assets/images/blank-profile-picture-973460_960_720.webp';
import ContactsContainer from './ContactsContainer';
import { getAllUserRoute } from '../../utils/APIRoutes'; // Ensure this path is correct

function Sidebar({ currentChat, setCurrentChat }) {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [isClicked, setIsClicked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      const response = await axios.get(getAllUserRoute);
      setContacts(response.data);
      setFilteredContacts(response.data); 
    }
    fetchContacts();
  }, []);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleChatChanged = (chat) => {
    setCurrentChat(chat);
  }

  const handleSearch = (e) => {
    setSearchValue(e.target.value);

    if (e.target.value.trim() === "") {
      setFilteredContacts(contacts);
    } else {
      const keyword = e.target.value.toLowerCase();
      const filtered = contacts.filter(contact =>
        contact.firstname.toLowerCase().includes(keyword) ||
        contact.lastname.toLowerCase().includes(keyword)
      );
      setFilteredContacts(filtered);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <div>
          {localStorage.getItem("chat-app-user") ? <img src={profileImg} className={styles.profileImg} /> : null}
        </div>

        <div onClick={() => navigate('/login')} className={styles.login}>
          <button>Log in</button>
        </div>
      </div>

      <div>
        <input
          placeholder='Search chat'
          value={searchValue}
          onChange={handleSearch}
          className={styles.searchInput}
        />
      </div>

      <ContactsContainer
        changeChat={handleChatChanged}
        handleOpenModal={handleOpenModal}
        showModal={showModal}
        handleCloseModal={handleCloseModal}
        contacts={filteredContacts}
        setContacts={setContacts}
        currentChat={currentChat}
      />
    </div>
  )
}

export default Sidebar;
