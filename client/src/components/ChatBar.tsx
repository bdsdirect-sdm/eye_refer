import React, { useEffect } from 'react'
import { toast } from 'react-toastify';
import { Local } from '../environment/env';
import api from '../api/axiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import socket from '../utils/socket';

const ChatBar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

    const fetchChatRooms = async (data: any) => {
        try {
            const response = await api.post(`${Local.GET_CHATBAR}`, data, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              return response.data;
        } catch (err) {
            toast.error(`${err}`);
        }
    }

    const { data: Patients, error, isLoading, isError } = useQuery({
        queryKey: ['patient'],
        queryFn: fetchChatRooms
      })

      function joinRoom(roomId: string) {
        if(roomId !== "") {
          socket.emit("joinRoom", {room: "roomId"});
        }
      }

      // console.log("Room-List------------>", Patients);
  return (
    <>
      <div className="flex flex-col p-4 border-r-2 border-gray-300 w-1/4">
        <p className="text-lg font-semibold">Patient</p>
        {Patients.patientList.map((patient: any, index: number) => (
            <div className='bg-teal-700 p-6 m-2 hover:bg-teal-600 cursor-pointer' onClick={() => {
              const roomId = patient.referedby.uuid + patient.referedto.uuid + patient.uuid;
              localStorage.setItem("room", roomId);
              joinRoom(roomId);
              navigate(`/chat/${roomId}`);
            }}>
                <p className="text-lg text-white">{patient?.firstname} {patient?.lastname}</p>
            </div>
            
          ))}
      </div>
    </>
  )
}

export default ChatBar