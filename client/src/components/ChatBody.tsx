const ChatBody = ({ messageList,doctorId }:any) => {
    return (
      <div>
        <div className="space-y-4">
          {messageList.length > 0 ? (
            messageList.map((msg, index) => (
              <div
                key={ index} // Use `id` if available in the database, otherwise fallback to index
                className={`flex ${
                  msg.sender === doctorId ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-3 py-2  ${
                    msg.sender === doctorId ? "bg-[#bbeada] rounded-l-2xl text-end" : "bg-gray-300 rounded-r-2xl text-start"
                  }`}
                >
                  <p><span className=" font-semibold">{msg.sender === doctorId ? "You" : msg?.author  }</span>: {msg?.message}</p>
                  <span className="text-xs text-gray-500">
                    {msg.time || "Unknown time"}
                  </span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No messages yet</p>
          )}
        </div>

      </div>
    );
  };

  export default ChatBody