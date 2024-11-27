import { useQuery } from '@tanstack/react-query';
import { Local } from '../environment/env';
import api from '../api/axiosInstance';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Searchbar from "../components/Searchbar"

const DoctorList: React.FC = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const doctype = localStorage.getItem("doctype");

  useEffect(()=>{
    if(!token){
      navigate('/login')
    }
  },[])

  const fetchDoctors = async() => {
    try{
      const response = await api.get(`${Local.VIEW_DOCTORS}`, {
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
 
  const { data: Doctors, error, isLoading, isError } = useQuery({
    queryKey: ['doctor'],
    queryFn: fetchDoctors
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

  console.log("Doctor-List------------>", Doctors);
  return (
    <>
    <Searchbar/>
    <div className='m-8' >
  <div className='overflow-x-auto'>
    <table className="table-auto w-full my-4 border border-gray-300">
      <thead className="bg-gray-400">
        <tr>
          <th scope="col" className="border px-4 py-2">#</th>
          <th scope="col" className="border px-4 py-2">Doctor Name</th>
          <th scope="col" className="border px-4 py-2">Referral Placed</th>
          <th scope="col" className="border px-4 py-2">Referral Completed</th>
          <th scope="col" className="border px-4 py-2">Avg Time of Contact</th>
          <th scope="col" className="border px-4 py-2">Avg Time of Consult</th>
          <th scope="col" className="border px-4 py-2">Phone</th>
          <th scope="col" className="border px-4 py-2">Email</th>
          <th scope="col" className="border px-4 py-2">Type</th>
        </tr>
      </thead>
      <tbody className='bg-white'>
        {Doctors.docList.map((doctor: any, index: number) => (
          <tr key={doctor.uuid} className="hover:bg-gray-100">
            <td className='fw-bold border px-4 py-2'>{index + 1}</td>
            <td className="border px-4 py-2">{doctor.firstname} {doctor.lastname}</td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2"></td>
            <td className="border px-4 py-2">{doctor.phone}</td>
            <td className="border px-4 py-2">{doctor.email}</td>
            <td className="border px-4 py-2">{doctype === "2" ? "OD" : "MD"}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </>
  )
}

export default DoctorList