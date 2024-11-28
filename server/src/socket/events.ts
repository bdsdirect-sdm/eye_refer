import Message from '../models/Message';

export const joinRoom = (socket: any) => {
    socket.on("joinRoom", (data: string) => {
        socket.join(data);
        console.log(`User ${socket.id} has joined room`, data);
        socket.to(data).emit("message",{message:`New User Just joined the room ${data}`, socketId:socket.id});
    })
}

export const sendMessage = (socket: any) => {
    socket.on("sendMessage", async (data: any) => {
        console.log("Message received", data);
        const room = data.room;
        const author = data.author;
        const message = data.message;
        const time = data.time;
        const sender = data.sender;
        const receiver = data.receiver;
        // io.to(room).emit("message", data);
        const messages = await Message.create( {room, author, message, time,sender,receiver });
        if(messages) {}

        socket.emit("message", data)  //data sent to frontend
    })
}

