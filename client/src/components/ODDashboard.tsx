import { useQuery } from '@tanstack/react-query';
import { Local } from '../environment/env';
import api from '../api/axiosInstance';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReferralComponents from '../components/ReferralComponents';
import PatientListOD from './PatientListOD';
import Button from "./Button"

const ODDashboard: React.FC = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const doctype = localStorage.getItem("doctype");

    useEffect(() => {
        if (!token) {
            navigate("/login");
        }
    }, [token, navigate]);

    const getUser = async () => {
        const response = await api.get(`${Local.GET_USER}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data; 
    };

    const { data, isError, error, isLoading } = useQuery({
        queryKey: ['dashboard'],
        queryFn: getUser
    });

    if (isLoading) {
        return (
            <>
                <div>Loading...</div>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </>
        );
    }

    if (isError) {
        return (
            <>
                <div>Error: {error.message}</div>
            </>
        );
    }

    return (
        <>

                <div className="flex-grow p-4 bg-gray-200">
                    <h1 className="text-xl font-bold mb-4">Dashboard</h1>
                    <ReferralComponents 
                        // referralCount={data.referralCount}
                        // referralCompleteCount={data.referralCompleteCount}
                        // doctorCount={data.doctorCount}
                        // time={data.lastUpdate} 
                    />
                    <div className='flex justify-between align-items-center'>
                        <h1 className="text-2xl font-bold">Referral Patients</h1>
                        <Button onClick={() => {navigate("/add-patient")}}>+ Add Referral Patient</Button>
                    </div>
                    
                    <PatientListOD/>
                </div>
        </>
    );
};

export default ODDashboard;
