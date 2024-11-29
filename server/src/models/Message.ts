import { DataTypes } from "sequelize";
import sequelize from "../config/db";

const Message = sequelize.define("message", {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    author: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
    message: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
    room: {
        type: DataTypes.STRING,
        allowNull: true
    },
    time: {
        type: DataTypes.STRING,
        allowNull: true
    },
    sender:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    receiver:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{
    timestamps: true,
})

export default Message;


//room should reference the id in ChatRooms