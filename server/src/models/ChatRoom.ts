import { DataTypes } from "sequelize";
import sequelize from "../config/db";
import Message from "./Message";

const ChatRoom = sequelize.define("chatroom", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    roomName: {
        type: DataTypes.STRING,
        allowNull: true
    }
})

ChatRoom.hasMany(Message, {foreignKey: "room", onDelete: 'CASCADE', onUpdate: 'CASCADE'});
Message.belongsTo(ChatRoom, {foreignKey: "room", onDelete: 'CASCADE', onUpdate: 'CASCADE'});
//Each message is linked to a specific chat room. This is represented by using the belongsTo method, which indicates that each Message is associated with one ChatRoom.

export default ChatRoom;