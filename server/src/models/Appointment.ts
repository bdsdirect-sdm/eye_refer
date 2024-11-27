import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";
import { v4 as UUIDV4 } from "uuid";
import User from "./User";
import Patient from "./Patient";

class Appointment extends Model{
    public uuid!: number;
    public patient!: string;
    public user!: string;
    public date!: Date;
    public type!: string;
    public notes!: string;
    public status!: string
}

Appointment.init({
    uuid:{
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY,
    },
    type: {
        type: DataTypes.ENUM,
        values: ["consultation", "surgery"]
    },
    notes:{
        type: DataTypes.STRING,
    },
    status:{
        type: DataTypes.STRING,
    }
},{
    sequelize,
    modelName:'Appointment'
})

User.hasMany(Appointment, {foreignKey: "user", onDelete: 'CASCADE', onUpdate: 'CASCADE'});
Appointment.belongsTo(User, {foreignKey: "user", onDelete: 'CASCADE', onUpdate: 'CASCADE'});

Patient.hasMany(Appointment, {foreignKey: "patient", onDelete: 'CASCADE', onUpdate: 'CASCADE'});
Appointment.belongsTo(Patient, {foreignKey: "patient", onDelete: 'CASCADE', onUpdate: 'CASCADE'})

export default Appointment;
