import React, { useEffect,useState } from 'react'
import { toast } from 'react-toastify';
import { Local } from '../environment/env';
import api from '../api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import socket from '../utils/socket';

interface Patient{

} 

const ChatBar = () => {
  console.log("scoket", socket.id)
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const [patients, setPatients] = useState<Array<any>>([])
  

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token]);

    const fetchChatRooms = async (data: any) => {
        try {
            const response = await api.get(`${Local.GET_CHATBAR}`, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              console.log ("response.dataresponse.dataresponse.data",response.data.patientsList);
              setPatients(response?.data?.patientsList);
        } catch (err) {
            toast.error(`this is the error`);
        }
    }

    const { data, error, isLoading, isError } = useQuery({
        queryKey: ['patient'],
        queryFn: fetchChatRooms
      })

      function joinRoom(roomId: string) {
        if(roomId !== "") {
          socket.emit("join_room", {room: roomId});
        }
      }

      if(isLoading){
        return(<h1>Loading</h1>)
      }

  //     // console.log("Room-List------------>", Patients);
  return (
    <>
      <div className="flex flex-col py-3  px-2 border-r-2 border-gray-300 w-1/4">
        <p className="text-lg font-semibold">Messages</p>
        <input type='text' placeholder='Search'  className='p-2 border-2 border-gray-300 w-full rounded-sm' />
        {patients?.map((patient: any, index: number) => (
            <div className='bg-[#e8edec] px-4 py-2 w-full my-2 hover:bg-[#c0fae7] cursor-pointer rounded' onClick={() => {
              const roomId = patient.referedby + patient.referedto + patient.uuid;
              localStorage.setItem("room", roomId);
              joinRoom(roomId);
              navigate(`/chat/${roomId}`,{state:{patientName:`${patient?.firstname} ${patient?.lastname}`,
              user:patient},});
            }}>
                <p className="text-base   ">{patient?.firstname} {patient?.lastname}</p>
            </div>
            
          ))}
      </div>
    </>
  )
}

export default ChatBar