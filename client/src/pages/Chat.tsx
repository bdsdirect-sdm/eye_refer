import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ChatBar from "../components/ChatBar";
import ChatBody from "../components/ChatBody";
import socket from "../utils/socket";
import { Local } from "../environment/env";
import api from "../api/axiosInstance";

const Chat = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<Array<any>>([]);
  const roomId = localStorage.getItem("room");
  const { patientName, user } = location.state || {};
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const name = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  // Redirect to login if token is missing
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  // Fetch messages from the database
  const fetchMessage = async () => {
    try {
      const response = await api.get(`${Local.GET_CHATDATA}/${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessageList(response.data.chats || []);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Fetch messages only once when the component mounts
  useEffect(() => {
    fetchMessage();
  }, []); // No dependencies to avoid infinite API calls

  // Send a message
  const sendMessage = async () => {
    if (message.trim() === "") return;

    const messageData = {
      room: roomId,
      author: name,
      message: message,
      sender: doctor?.uuid,
      receiver: user.referedto === doctor.uuid ? user.referedby : doctor.uuid,
      time: new Date().toLocaleTimeString(),
    };

    try {
      // Emit the message for real-time chat
      socket.emit("sendMessage", messageData);

      // Add the message to the local state immediately
      setMessageList((prevMessageList) => [
        ...prevMessageList,
        { ...messageData, isUserMessage: true },
      ]);

      // Optionally save the message in the database (avoid infinite calls here too)
      await api.post(`${Local.SAVE_CHATDATA}`, messageData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessage(""); // Clear the input field
  };

  // Manage socket listener for receiving messages
  useEffect(() => {
    const messageListener = (data: any) => {
      setMessageList((prevMessageList) => [
        ...prevMessageList,
        { ...data, isUserMessage: false },
      ]);
    };

    socket.on("send_message", messageListener);

    return () => {
      socket.off("send_message", messageListener); // Cleanup listener to prevent duplicates
    };
  }, []); // Empty dependency to ensure it runs only once

  return (
    <div className="flex">
      <ChatBar />
      <div className="flex flex-col w-full h-screen">
        <div className="bg-teal-700 p-4 rounded-t-md">
          <h2 className="text-white text-xl">
            {patientName ? patientName : "Patient Name"}
          </h2>
        </div>

        <div className="flex-1 overflow-y-auto mt-4 p-4 bg-gray-50 grow rounded-md border border-gray-300">
          <div className="space-y-4">
            {/* Rendering chat messages in ChatBody */}
            <ChatBody messageList={messageList} doctorId={doctor?.uuid} />
          </div>
        </div>

        <div className="flex items-center mt-4 border-t border-gray-300 pt-4">
          <form className="flex w-full" onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Enter message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
            <button
              onClick={sendMessage}
              type="button"
              className="bg-teal-900 text-white px-4 py-2 rounded-r-md hover:bg-teal-700"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
