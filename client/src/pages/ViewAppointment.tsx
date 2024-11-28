import { useQuery } from '@tanstack/react-query';
import { Local } from '../environment/env';
import api from '../api/axiosInstance';
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
// import { socket } from '../utils/socket';

const ViewAppointment = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const { id } = useParams();

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
    
  },[])

  const fetchAppointment = async() => {
    try{
        
      const response = await api.get(`${Local.VIEW_APPOINTMENT}/${id}`, {
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
 
  const { data: Appointment, error, isLoading, isError } = useQuery({
    queryKey: ['patient'],
    queryFn: fetchAppointment
  })

//   console.log(Patient.Patient.gender)
console.log("APPOINTMENT::", Appointment)

  return (
    <>
  <div>
    <div>
      <h2 className='text-2xl font-bold'>Basic Information</h2>
      <div className='bg-gray-300 p-4 m-4 w-full rounded-md'>
        <div className='flex flex-wrap'>
          <p className='text-lg p-2 w-1/2'>Patient Name: {Appointment?.appointmentData.Patient.firstname} {Appointment?.appointmentData.Patient.lastname}</p>
          <p className='text-lg p-2 w-1/2'>Type: {Appointment?.appointmentData.type}</p>
          <p className='text-lg p-2 w-1/2'>Appointment Date: {Appointment?.appointmentData.date}</p>
          <p className='text-lg p-2 w-1/2'>Notes: {Appointment?.appointmentData.notes}</p>
        </div>
      </div>
    </div>
  </div>
</>
  )
}

export default ViewAppointment