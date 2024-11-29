const ChatBody = ({ messageList }:any) => {
    return (
      <div>
        {messageList.map((msg: string, index) => (
          <div key={index} className={`message ${msg.isOwnMessage ? 'own-message' : ''}`}>
            <p>{msg.author}: {msg.message}</p>
            <small>{msg.time}</small>
          </div>
        ))}
        No data
      </div>
    );
  };

  export default ChatBody