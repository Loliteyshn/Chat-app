import React from 'react'
import { useEffect, useState } from 'react';
import Sidebar from './Sidebar/Sidebar';
import Chat from './Chat/Chat';
import { useNavigate } from 'react-router-dom';

function ChatContainer() {
  const navigate = useNavigate();
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const getUser = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        setCurrentUser(await JSON.parse(localStorage.getItem("chat-app-user")));
      }
    }
    getUser();

  }, [])



  return (
    <div className='App' >
      <div>
        <Sidebar currentChat={currentChat} setCurrentChat={setCurrentChat} />
      </div>
      <div>
        <Chat currentChat={currentChat} currentUser={currentUser} />
      </div>
    </div>
  );
}

export default ChatContainer