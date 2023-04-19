import React, { useState } from "react";
import "../styles/Chat.css"

function Chat() {
  const [selectedConversation, setSelectedConversation] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState({
    1: [
      { id: 1, sender: "user", text: "Hello!" },
      { id: 2, sender: "recipient", text: "Hi there!" },
      { id: 3, sender: "user", text: "How are you doing?" },
      { id: 4, sender: "recipient", text: "I'm good, thanks. How about you?" },
    ],
    2: [
      { id: 1, sender: "user", text: "Hey!" },
      { id: 2, sender: "recipient", text: "Hi there!" },
      { id: 3, sender: "user", text: "How's your day going?" },
    ],
    3: [
      { id: 1, sender: "user", text: "Yo!" },
      { id: 2, sender: "recipient", text: "Hi there!" },
      { id: 3, sender: "user", text: "My back hurts." },
    ],
    4: [

    ],
  });

  const handleConversationClick = (conversationId) => {
    setSelectedConversation(conversationId);
  };

  const handleMessageSubmit = (event) => {
    event.preventDefault();
    const newMessage = { id: messages[selectedConversation].length + 1, sender: "user", text: message };
    setMessages({
      ...messages,
      [selectedConversation]: [...messages[selectedConversation], newMessage],
    });
    setMessage("");
  };

  return (
    <div className="messaging-app">
<div className="sidebar">
  <ul>
    <li>
      <button onClick={() => handleConversationClick(1)}>
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdrwilderman.com%2Fwp-content%2Fuploads%2F2018%2F01%2FDoctor-50x50-1.png&f=1&nofb=1&ipt=80d57b5e8f64352ffd06a8e0fc5a6c6ef8bba2e654bd1f0fba31c2a675d50bec&ipo=images" alt="profile" />
        <span>Doctor 1</span>
      </button>
    </li>
    <li>
      <button onClick={() => handleConversationClick(2)}>
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdrwilderman.com%2Fwp-content%2Fuploads%2F2018%2F01%2FDoctor-50x50-1.png&f=1&nofb=1&ipt=80d57b5e8f64352ffd06a8e0fc5a6c6ef8bba2e654bd1f0fba31c2a675d50bec&ipo=images" alt="profile" />
        <span>Doctor 2</span>
      </button>
    </li>
    <li>
      <button onClick={() => handleConversationClick(3)}>
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdrwilderman.com%2Fwp-content%2Fuploads%2F2018%2F01%2FDoctor-50x50-1.png&f=1&nofb=1&ipt=80d57b5e8f64352ffd06a8e0fc5a6c6ef8bba2e654bd1f0fba31c2a675d50bec&ipo=images" alt="profile" />
        <span>Doctor 3</span>
      </button>
    </li>
    <li>
      <button onClick={() => handleConversationClick(4)}>
        <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fdrwilderman.com%2Fwp-content%2Fuploads%2F2018%2F01%2FDoctor-50x50-1.png&f=1&nofb=1&ipt=80d57b5e8f64352ffd06a8e0fc5a6c6ef8bba2e654bd1f0fba31c2a675d50bec&ipo=images" alt="profile" />
        <span>Doctor 4</span>
      </button>
    </li>
  </ul>
</div>
      <div className="main">
        {selectedConversation ? (
          <div>
            <h2>Conversation {selectedConversation}</h2>
            <ul className="message-list">
              {messages[selectedConversation].map((message) => (
                <li key={message.id} className={`message ${message.sender}`}>
                  {message.text}
                </li>
              ))}
            </ul>
            <form onSubmit={handleMessageSubmit}>
              <input
                type="text"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              />
              <button type="submit">Send</button>
            </form>
          </div>
        ) : (
          <p>Please select a conversation.</p>
        )}
      </div>
    </div>
  );
}

export default Chat;