// ChatRoom.jsx
import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import ImageUpload from "./ImageUpload";
import { API_URL, BACKEND_URL, IMAGE_URL } from "../../constant/default_data";
import AudioVideoUpload from "./AudioVideoUpload";

const ChatRoom = () => {
  const [messages, setMessages] = useState<any>([]);
  const [user, setUser] = useState("");
  const [message, setMessage] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const socketRef: any = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(API_URL + "messages");
        const data = await res.json();
        setMessages(data);
      } catch (err) {
        console.error("Error fetching messages:", err);
      }
    };
    fetchMessages();

    socketRef.current = io(BACKEND_URL);

    socketRef.current.on("connect", () => {
      console.log("Connected to socket server:", socketRef.current.id);
    });

    socketRef.current.on("message", (newMessage: any) => {
      setMessages((prev: any) => [...prev, newMessage]);
    });

    socketRef.current.on("disconnect", (reason: any) => {
      console.log("Socket disconnected:", reason);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off("message");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const getFileExtensionFromUrl = (url: string | null) => {
    if (!url) return null;
    // Extract the part after the last dot in the pathname
    const parts = url.split('.');
    const extension = parts.pop(); 

    // Handle cases where there might not be an extension or the URL ends with a dot
    if (extension === "") {
      return null; 
    }

    return extension; // e.g., 'jpg', 'pdf', 'txt'
}

  const sendMessage = () => {
    if (!user || !message) return;
    let fileType = null;
    if (fileUrl) {
      fileType = getFileExtensionFromUrl(fileUrl);
    } else if (imageUrl) {
      fileType = getFileExtensionFromUrl(imageUrl);
    }
    const payload = { user, message, imageUrl, fileUrl, fileType };
    // send via socket
    if (socketRef.current && socketRef.current.connected) {
      socketRef.current.emit("sendMessage", payload);
    } else {
      console.warn("Socket not connected. Falling back to POST (optional).");
    }
    setMessage("");
  };

  console.log("Rendering ChatRoom with messages:", socketRef.current);

  return (
    <div>
      <h2>---------------</h2>
      <h2>Chat Room</h2>
      <ul>
        {messages.map((msg: any) => (
          <li key={msg._id}>
            <strong>{msg.user}:</strong> {msg.message} {msg?.imageUrl && <img src={`${IMAGE_URL}${msg?.imageUrl}`} alt="attachment" style={{ maxWidth: '100px' }} />}
            {msg?.fileUrl && (<video width="200" height="150" controls>
              <source src={`${IMAGE_URL}${msg?.fileUrl}`} type={`video/${getFileExtensionFromUrl(msg?.fileUrl)}`} />
              Your browser does not support the video tag.
            </video>)}

          </li>
        ))}
      </ul>
      <div>
        <ImageUpload onImageSend={(imageUrl: any) => {
          setImageUrl(imageUrl);
        }} />
        <AudioVideoUpload onAudioVideoSend={(fileUrl: any) => {
          setFileUrl(fileUrl);
        }} />
        <input
          type="text"
          placeholder="Your name"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        />
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default ChatRoom;
