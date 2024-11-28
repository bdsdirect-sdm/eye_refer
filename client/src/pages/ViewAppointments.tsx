import { useQuery } from '@tanstack/react-query';
import { Local } from '../environment/env';
import api from '../api/axiosInstance';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdOutlineEdit } from "react-icons/md";
// import { AiOutlineDelete } from "react-icons/ai";
import { MdOutlineRemoveRedEye } from "react-icons/md";

const ViewAppointments: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])

  async function updateStatus(appointmentStatus: string, patientId: number, appointmentId: number){
    try {
      const response = await api.post(`${Local.UPDATE_APPOINTMENT_STATUS}`, {appointmentStatus, patientId, appointmentId},
        {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      toast.error(`${err}`);
    }
  }

  const fetchAppointments = async() => {
    try{
      const response = await api.get(`${Local.VIEW_APPOINTMENTS}`, {
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
 
  const { data: Appointments, error, isLoading, isError } = useQuery({
    queryKey: ['appointment'],
    queryFn: fetchAppointments
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

  console.log("Appointment-List------------>", Appointments);
  return (
    <>
    <div>
      <div></div>
      <div>
      <table className="table my-4">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Patient name</th>
      <th scope="col">Date</th>
      <th scope="col">Type</th>
      <th scope="col">Status</th>
      <th scope="col">Complete appointment</th>
      <th scope="col">Cancel appointment</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
  <tbody>
    {Appointments.appointmentList.map((appointment: any, index: number) =>(
      <>
      <tr>
        <td className='fw-bold' > {index+1} </td>
        <td>{appointment.name}</td>
        <td> {appointment.date} </td>
        <td>{appointment.type}</td>
        <td> {appointment.status}</td>
        
        <td>
        <button className='text-green-700' onClick={() => {
            updateStatus("Completed", appointment.patient.uuid, appointment.id)
          }}> Complete </button>
        </td>
        <td>
        <button className='text-red-700' onClick={() => updateStatus("Canceled", appointment.patient.uuid, appointment.id)}> Cancel </button>
        </td>
        <td className="border px-4 py-2">
                <div className='flex flex-row'>
                <button className="btn btn-primary mr-2" onClick={() => { navigate(`/edit-appointment/${appointment.id}`); }}><MdOutlineEdit /></button>
                <button className="btn btn-secondary" onClick={() => { navigate(`/view-appointment/${appointment.id}`); }}><MdOutlineRemoveRedEye /></button>
                </div>
              </td>
      </tr>
      </>
    ))}
  </tbody>
</table>
      </div>
    </div>
    </>
  )
}

export default ViewAppointments