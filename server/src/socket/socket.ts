import {Server} from 'socket.io'
import { joinRoom, sendMessage } from './events';

function setSocket(server:any) {
    var io = new Server(server ,{
        cors: {
            origin: "*",
            }
    })
    
    io.on("connection", (socket) => {
        console.log("Connection established!", socket.id);
        joinRoom(socket);
        sendMessage(socket,io);

        // socket.on("sendMessage", (messageData))
    })
}

export default setSocket;