import { useState, useEffect, useRef } from "react";
import useStore from "./../store"; // Adjust the path as needed
import Message from "./../components/Message";

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); // Ref for auto-scrolling
  const userName = useStore((state) => state.userName);

  const fetchMessages = async () => {
    const response = await fetch("/api/messages");
    const data = await response.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Auto-scroll to the latest message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim() || message.length > 400) return;
    const response = await fetch("/api/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: userName, message: message }),
    });

    if (response.ok) {
      console.log("Message sent!");
      setMessage("");
      fetchMessages();
    } else {
      console.error("Failed to send message.");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };
  const handleClick = (e) => {
      e.preventDefault();
      sendMessage();
    
  };

  return (
    <div className="Chat">
      <div className="Chat__Inner">
        <div className="Chat__Messages">
          <div className="Chat__Messages__Col1"></div>
          <div className="Chat__Messages__Col2">
            {messages.map((msg, index) => (
              <Message key={`msg${index}`} msg={msg} />
            ))}
            <div ref={messagesEndRef} /> {/* Invisible element for scrolling */}
          </div>
          <div className="Chat__Messages__Col3"></div>
        </div>
        <div className="Chat__Input">
          <div className="Chat__InputInner">
            <form>
              <input
                type="text"
                placeholder={`${userName} says...`}
                value={message}
                onChange={(e) => setMessage(e.target.value.slice(0, 400))} 
                onKeyDown={handleKeyDown}
              />
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
