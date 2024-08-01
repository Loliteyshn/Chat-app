import React, { useState } from 'react'
import styles from "./Chat.module.css";

function ChatInput({ handleSendMsg }) {
    const [msg, setMsg] = useState('');

    const sendChat = (event) => {
        event.preventDefault();
        if (msg.length > 0) {
            handleSendMsg(msg);
            setMsg('');
        }
    }

    return (
        <div className={styles.chatContainer}>
            <form action="" onSubmit={(e) => sendChat(e)}>
                <input className={styles.input} type="text" placeholder='type your message here'
                value={msg} onChange={(e) => setMsg(e.target.value)} />
                <button  className={styles.submit}>Send</button>
            </form>

        </div>
    )
}

export default ChatInput