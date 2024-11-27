import { useQuery } from '@tanstack/react-query';
import { Local } from '../environment/env';
import api from '../api/axiosInstance';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import socket from '../utils/socket';
import moment from 'moment';
import { MdOutlineEdit } from "react-icons/md";
import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import Searchbar from "../components/Searchbar"
import Pagination from "../components/Pagination"


const PatientListOD: React.FC = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token")

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])

  const fetchPatient = async() => {
    try{
      const response = await api.get(`${Local.GET_PATIENT_LIST}?search=${query}`, {
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      return response.data;
    }
    catch(err){
      toast.error(`${err}`);
    }
  }
 
  const { data: Patients, error, isLoading, isError, refetch } = useQuery({
    queryKey: ['patient'],
    queryFn: fetchPatient
  })

  if(isLoading){
    return(
      <>
        <div>Loading...</div>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </>
    )}

  if(isError){
    return(
      <>
      <div className='text-danger' >Error: {error.message}</div>
      </>
      )}

  console.log("Patient-List------------>", Patients);

  function joinRoom(roomId: string) {
    // console.log("ROOOOOOOOOOOOOOOm")
    if(roomId !== "") {
      socket.emit("joinRoom", roomId);
      
    }
  }

  return (
    <>
  <>
  <Searchbar refetch={refetch} query={query} setQuery={setQuery} />
  <div className=" max-w-full m-8">
    <table className="table-auto w-full my-4 border border-gray-300 overflow-x-auto">
      <thead>
        <tr className="">
          <th scope="col" className="border px-4 py-2">#</th>
          <th scope="col" className="border px-4 py-2">Patient Name</th>
          <th scope="col" className="border px-4 py-2">DOB</th>
          <th scope="col" className="border px-4 py-2">Referred On</th>
          <th scope="col" className="border px-4 py-2">Referred To</th>
          <th scope="col" className="border px-4 py-2">Consultation Date</th>
          <th scope="col" className="border px-4 py-2">Surgery Date</th>
          <th scope="col" className="border px-4 py-2">Status</th>
          <th scope="col" className="border px-4 py-2">Return to Referrer</th>
          <th scope="col" className="border px-4 py-2">Consult Note</th>
          <th scope="col" className="border px-4 py-2">Direct Message</th>
          <th scope="col" className="border px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody className='bg-white'>
        {Patients.patientList.map((patient: any, index: number) => (
          <tr key={patient.uuid} className="hover:bg-gray-100">
            <td className='fw-bold border px-4 py-2'>{index + 1}</td>
            <td className="border px-4 py-2">{patient.firstname} {patient.lastname}</td>
            <td className="border px-4 py-2">{moment(new Date(patient.dob)).format('MMM-D-YYYY')}</td>
            <td className="border px-4 py-2">{moment(new Date(patient.referedon)).format('MMM-D-YYYY')}</td>
            <td className="border px-4 py-2">{patient.referedto.firstname} {patient.referedto.lastname}</td>
            {patient.appointmentType === "consultation" ? (
                <>
                  <td className="border px-4 py-2">{moment(new Date(patient.appointmentDate)).format('MMM-D-YYYY')}</td>
                  <td className="border px-4 py-2"></td>
                </>
              ) : (
                <>
                  <td className="border px-4 py-2"></td>
                  <td className="border px-4 py-2">{moment(new Date(patient.appointmentDate)).format('MMM-D-YYYY')}</td>
                </>
              )}
            <td className="border px-4 py-2">{patient.referalstatus ? "Completed" : "Pending"}</td>
            <td className="border px-4 py-2">{patient.referback ? "Yes" : "No"}</td>
            <td className="border px-4 py-2"><a className='text-blue-500 underline'>Note</a></td>
            <td className="border px-4 py-2">
              <a className="underline text-blue-600 hover:cursor-pointer" onClick={() => {
                const roomId = patient.referedby.uuid + patient.referedto.uuid + patient.uuid;
                localStorage.setItem("room", roomId);
                console.log("ROOOOOOOOOOOOOOOm")
                joinRoom(roomId);
                navigate(`/chat/${patient.referedby.uuid}${patient.referedto.uuid}${patient.uuid}`);
              }}>
                Link
              </a>
            </td>
            <td className="border px-4 py-2">
                <div className='flex flex-row'>
                <button className="btn btn-primary mr-2" onClick={() => { navigate(`/edit-patient/${patient.uuid}`); }}><MdOutlineEdit /></button>
                <button className="btn btn-danger mr-2"><AiOutlineDelete /></button>
                <button className="btn btn-secondary" onClick={() => { navigate(`/view-patient/${patient.uuid}`); }}><MdOutlineRemoveRedEye /></button>
                </div>
              </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
   <Pagination listing={Patients?.patientList} />
</>

</>

  )
}

export default PatientListOD