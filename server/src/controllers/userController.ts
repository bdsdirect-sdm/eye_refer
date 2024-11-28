import { Local } from "../environment/env";
import Address from "../models/Address";
import Patient from "../models/Patient";
import sendOTP from "../utils/mailer";
import User from "../models/User";
import { Response } from 'express';
import jwt from "jsonwebtoken";
import { Op, where } from "sequelize";
import bcrypt from 'bcrypt';
import Appointment from "../models/Appointment";
import Message from "../models/Message";

const Security_Key:any = Local.SECRET_KEY;

const otpGenerator = () => {
    return String(Math.round(Math.random()*10000000000)).slice(0,6);
}

export const  registerUser = async (req:any, res:Response) => {
    try{
        const {firstname, lastname, doctype, email, password} = req.body;
        const isExist = await User.findOne({where:{email:email}});
        if(isExist){
            res.status(401).json({"message":"User already Exist"});
        }
        else{

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = await User.create({firstname,  lastname, doctype, email, password: hashedPassword});
            if(user){
                const OTP = otpGenerator();
                sendOTP(user.email, OTP);
                res.status(201).json({"OTP":OTP, "message":"Data Saved Successfully"});
            }
            else{
                res.status(403).json({"message":"Something Went Wrong"});
            }
        }
    }
        catch(err){
        res.status(500).json({"message": err});
    }
}

export const verifyUser = async (req:any, res:Response) =>{
    try{
        const {email} = req.body;
        const user = await User.findOne({where:{email}});
        if(user){
            user.is_verified = true;
            user.save();
            res.status(200).json({"message": "User Verfied Successfully"});
        }
        else{
            res.status(403).json({"message":"Something Went Wrong"})
        }
    }
    catch(err){
        res.status(500).json({"message":err})
    }
}

export  const loginUser = async (req:any, res:Response) =>{
    try{
        const {email, password} = req.body;
        const user = await User.findOne({where:{email}});
        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                if(user.is_verified){
                    const token = jwt.sign({uuid:user.uuid}, Security_Key);
                    res.status(200).json({"token":token, "user":user, "message":"Login Successfull"});
                }
                else{
                    const OTP = otpGenerator();
                    sendOTP(user.email, OTP);
                    res.status(200).json({"user":user, "OTP":OTP, "message": "OTP sent Successfully"});
                }
            }
            else{
                res.status(403).json({"message":"Invalid Password"});
            }
        }
        else{
            res.status(403).json({"message":"User doesn't Exist"});
        }
    }
    catch(err){
        res.status(500).json({"message":err});
    }
}

export const getUser = async (req:any, res:Response) => {
    try{
        const {uuid} = req.user;
        const user = await User.findOne({where:{uuid:uuid}, include:Address});
        if(user){
            const referCount = await Patient.count({where:{ referedto:uuid }});
            const referCompleted = await Patient.count({where:{ referedto:uuid, referalstatus:1 }});
            let docCount;

            if(user.doctype == 1){
                docCount = await User.count({where:{ is_verified:1 }});
            }
            else{
                docCount = await User.count({where:{ is_verified:1, doctype:1 }});
            }
            res.status(200).json({"user":user, "message":"User Found", "docCount":docCount, "referCount":referCount, "referCompleted":referCompleted});
        }
        else{
            res.status(404).json({"message":"User Not Found"})
        }
    }
    catch(err){
        res.status(500).json({"message":`Error--->${err}`})
    }
}

export const getDocList = async(req:any, res:Response) => {
    try{
        const {uuid} = req.user;
        const user = await User.findOne({where:{uuid:uuid}})
        let docList;
        if(user?.doctype==1){
            docList = await User.findAll({ where: { uuid: {[Op.ne]: uuid} }, include:Address });
        }
        else{
            docList = await User.findAll({ where: { doctype:1, uuid: {[Op.ne]: uuid} }, include:Address });
        }
        if(docList){
            res.status(200).json({"docList":docList, "message": "Docs List Found"});
        }
        else{
            res.status(404).json({"message": "MD List Not Found"});
        }
    }
    catch(err){
        res.status(500).json({"message":`${err}`});
    }

}

export const getPatientList = async(req:any, res:Response) => {
    try{
        const {uuid} = req.user;
        const { search } = req.query
        const user = await User.findOne({where:{uuid:uuid}});
        // console.log("SEARCHHHHHHHH", search, "helojnd")
        // console.log("HELEOEOOE::::::::::::::")
        if (user) {

            const whereCondition: any = {
              [Op.or]: [{ referedby: uuid }, { referedto: uuid }],
            };
      
            if (search) {
              whereCondition.firstname = {
                [Op.like]: `%${search}%`,
              };
            }

            const patientList: any = await Patient.findAll({ where: whereCondition });
            if(patientList){
                const plist: any[] = [];
                
                for (const patient of patientList) {
                    const [referedtoUser, referedbyUser, address] = await Promise.all([
                        User.findOne({ where: { uuid: patient.referedto } }),
                        User.findOne({ where: { uuid: patient.referedby } }),
                        Address.findOne({ where: { uuid: patient.address } }),
                    ]);

                    const appointment = await Appointment.findOne({ where: {patient: patient.uuid}});
                    // console.log("APPOINTMENT:::::::::", appointment)

                    const newPatientList: any = {
                        uuid: patient.uuid,
                        firstname: patient.firstname,
                        lastname: patient.lastname,
                        disease: patient.disease,
                        referalstatus: patient.referalstatus,
                        referback: patient.referback,
                        referedon: patient.createdAt,
                        updatedAt: patient.updatedAt,
                        referedto: referedtoUser,
                        referedby: referedbyUser,
                        address: address,
                        dob: patient.dob,
                        appointmentDate: appointment?.date,
                        notes: appointment?.notes,
                        appointmentType: appointment?.type
                    };

                    plist.push(newPatientList);
                }
                
                // console.log("Data----->", plist);
                res.status(200).json({"patientList":plist, "message":"Patient List Found"});
            }
            else{
                res.status(404).json({"message":"Patient List Not Found"});
            }
        }
        else{
            res.status(404).json({"message":"User Not Found"});
        }
    }
    catch(err){
        res.status(500).json({"message":`${err}`});
    }
}

export const addPatient = async(req:any, res:Response) => {
    try{
        const {uuid} = req.user;
        const user = await User.findOne({where:{uuid:uuid}});
        if(user){
            const {dob,
                email,
                phone,
                firstname,
                lastname,
                gender,
                disease,
                laterality,
                referback,
                timing,
                referedto,
                address,
                notes} = req.body;
            const  medicaldocs  = req.file.path;
            // console.log("USERRRRRR", req.body.dob)
            // console.log("USERRRRRR", req.file)
            const patient = await Patient.create({ dob,
                email,
                phone,
                firstname,
                lastname,
                gender,
                disease,
                laterality,
                referback,
                timing,
                referedto,
                address,
                notes, referedby:uuid, medicaldocs });
            if(patient){
                res.status(200).json({"message": "Patient added Successfully"});
            }
        }
        else{
            res.status(401).json({"message":"you're not Authorised"});
        }
    }
    catch(err){
        res.status(500).json({"message":`${err}`});
    }
}

//tbc
export const addAddress = async(req:any, res:Response) => {
    try{
        const {uuid} = req.user;
        console.log("USER:::::::::::::::::", uuid);
        const user = await User.findOne({where:{uuid:uuid}});  //find current doc
        if(user){
            const {street, district, city, state, pincode, phone} = req.body;
            const address = await Address.create({street, district, city, state, pincode, phone, user:uuid});
            if(address){
                res.status(200).json({"message": "Address added Successfully"});
            }
            else{
                res.status(400).json({"message":"Error in Saving Address"});
            }
        }
        else{
            res.status(401).json({"message":"you're not Authorised"});
        }
    }
    catch(err){
        res.status(500).json({"message":`${err}`});
    }
}

//tbc
export const dashboardData = () => {
    const referralCount = Patient.count();
    const referralCompletedCount = Appointment.findAll({ where: { status: "completed" }})
    const docCount = User.count();
} 

export const getReferredPatients = async (req: any, res: any) => {
    try {
        const {uuid} = req.user;
        const user = await User.findOne({where:{uuid:uuid}});  //finds current doc
        const patients = await Patient.findAll({where: {referedto: uuid}});  //gets all patients referred to current doc
        // console.log("USERRRRRRRRR", patients)
        res.status(200).json({"patientList":patients, "message":"Patient List Found"});
    } catch (err) {
        res.status(500).json({message: "internal server error", err});
    }
}

export const addAppointments = async (req: any, res: any) => {
    try {
        const {uuid} = req.user;
        const user = uuid;
        const {patient, date, type, notes} = req.body;
        // console.log("REQ:::::::::::::::",req.body)
        const appointment = await Appointment.create({patient, date, type, notes, user, status: "Scheduled"});
        if(appointment) {
            res.status(200).json({message: "Appointment added successfully."})
        }
        else {
            res.status(400).json({message: "Error in saving appointment."})
        }
    } catch (err) {
        res.status(500).json({message: "internal server error", err});
    }
}

export const viewAppointments = async(req: any, res: any) => {
    try {
        const uuid = req.user.uuid;  //current doc id
        const appointmentList = await Appointment.findAll({where: {user: uuid}});
        const apList = [];
        for(const appointment of appointmentList) {
            const patient = await Patient.findOne({where: {uuid: appointment.patient}})
            const newAppointmentList = {
                name: patient?.firstname + " " + patient?.lastname,
                date: appointment.date,
                type: appointment.type,
                status: appointment.status,
            }
            apList.push(newAppointmentList);
        }
        
        res.status(200).json({"appointmentList": apList, "message":"Appointment List Found"});
    } catch (err) {
        res.status(500).json({message: "Internal server error", err});
    }
}

//tbc
export const updateAppointmentStatus = async (req: any, res: any) => {
    try {
        const { appointmentStatus, patientId, appointmentId } = req.body;
        const appointment = await Appointment.findOne({where: [{patient: patientId}, {uuid: appointmentId}]});
        if(appointment) {
            appointment.status = appointmentStatus
        }
        await appointment?.save();
    } catch (err) {
        res.status(500).json({message: "Internal server error", err});
    }
}

export const deletePatient = async (req: any, res: any) => {
    try {

    } catch (err) {
        res.status(500).json({message: "Internal server error", err})
    }
}

export const viewPatient = async (req: any, res: any) => {
    try {
        const id = req.params.id;
        const patient = await Patient.findOne({where: {uuid: id}, include: [{model: User}, {model: Address}, {model: Appointment}]});
        res.status(200).json({"patientData":patient, "message": "Patient data received"});
    } catch (err) {
        res.status(500).json({message: "Internal server error", err})
    }
}

export const viewAppointment = async(req: any, res: any) => {
    try {
        const { id } = req.params;
        console.log("ID:::::::::::", id)
        const appointment = await Appointment.findOne({where: {uuid: id}, include: Patient} );
        res.status(200).json({"appointmentData": appointment, "message": "Appointment data received"});
    } catch (err) {
        res.status(500).json({message: "Internal server error", err});
    }
}

//tbc
export const editPatient = async (req: any, res: any) => {
    try {
        const id = req.params.id;

        const {dob,
            phone,
            firstname,
            lastname,
            gender,
            disease,
            laterality,
            referback,
            timing,
            referedto,
            address,
            note,uuid} = req.body;
        const  medicaldocs  = req.file.path;
        const patient = await Patient.findOne({where: {uuid: id}, include: [{model: User}, {model: Address}, {model: Appointment}]});
        if(patient) {
            patient.dob = dob;
            patient.phone = phone,
            patient.firstname = firstname,
            patient.lastname = lastname,
            patient.gender = gender,
            patient.disease = disease,
            patient.laterality = laterality,
            patient.referback = referback,
            patient.timing = timing,
            patient.referedto = referedto,
            patient.address = address,
            patient.note = note
        }
        await patient?.save();
    } catch (err) {
        res.status(500).json({message: "Internal server error", err})
    }
}

export const chatRooms = async(req: any, res: any) => {
    //show patient as room where doc in referedto or referedby
    try {
        const { uuid } = req.user;
        //check patient appointment is pending or not
        const patientsList = await Patient.findAll({where:{[Op.or]:[{referedby:uuid},{referedto:uuid}]}});
        console.log(patientsList);
        res.status(200).json({success:true,message: "patients found",patientsList});
    } catch (err) {}
}

export const chatData = async (req: any, res: any) => {
    try {
        const {roomId} = req.params;
        console.log("dsdfsdfsdfsdf",roomId)
        const chatList = await Message.findAll({where:{room:roomId}});
        console.log("chatList",chatList)

        if (!chatList) {
            return res.status(404).json({ message: "No chats found for this room" });
        }
        res.status(200).json({ chats: chatList, message: "Chats found" });
    } catch (err) {
        console.error("Error fetching chat data:", err);
        res.status(500).json({ message: "An error occurred while fetching chat data" });
    }
};
