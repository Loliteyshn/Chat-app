import { useState, useEffect } from "react";
import io from "socket.io-client";
import styles from "./Chat.module.css";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import axios from "axios";
import { getAllMessagesRoute, setMessageRoute } from '../../utils/APIRoutes'
import EditContact from "./EditContact/EditContact";
import { updateContactRoute } from '../../utils/APIRoutes';
import profileImg from '../../assets/images/Без названия.png';

const socket = io("http://localhost:5300"); // Replace with your server address

function Chat({ currentChat, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    firstname: '',
    lastname: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser && currentChat) {
        const response = await axios.post(getAllMessagesRoute, {
          from: currentUser._id,
          to: currentChat._id
        });
        setMessages(response.data);
      }
    }

    fetchData();
  }, [currentChat, messages])

  const handleSendMsg = async (msg) => {
    await axios.post(setMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg
    })
  }

  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };

  const updateContact = async (data) => {
    setFormData(prevState => ({
      ...prevState,
      firstname: data.firstname,
      lastname: data.lastname
    }));
    await axios.put(updateContactRoute, formData);
  }

  return (
    <div className={styles.chatContainer}>
      {currentChat && (<>
        <div className={styles.header}>
          <div className={styles.userDetails} >
            <img src={profileImg} className={styles.profileImg} />
            <h3>{currentChat.firstname} {currentChat.lastname}</h3>
            <button onClick={handleOpenModal} className={styles.editBtn} >Edit chat</button>
            <EditContact show={showModal} onClose={handleCloseModal} currentChat={currentChat}
              formData={formData} setFormData={setFormData} updateContact={updateContact} />
          </div>
          <hr />
        </div>
        <div className={styles.chatMessages}>
          {
            messages.map((message, index) => {
              return (
                <Messages message={message} key={index} />
              )
            })
          }
        </div>
        <div className={styles.chatInput}>
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      </>)}
    </div>

  );
}


export default Chat;