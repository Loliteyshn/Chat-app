import React from 'react';
import styles from "./Chat.module.css";

function Messages({ message }) {
  return (
    <div
      className={`${styles.message} ${message.fromSelf ? styles.sended : styles.received}`} >
      <div className={styles.content}>
        <p>
          {message.message}
        </p>
      </div>
    </div>
  )
}

export default Messages