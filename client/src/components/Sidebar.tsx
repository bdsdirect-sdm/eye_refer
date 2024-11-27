import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoHome } from "react-icons/go";
import { LiaUserInjuredSolid } from "react-icons/lia";
import { MdOutlineDateRange } from "react-icons/md";
import { PiStethoscope } from "react-icons/pi";
import { CiChat1 } from "react-icons/ci";

const Navbar = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const doctype: any = localStorage.getItem("doctype");

    const handleLogout = () => {
        localStorage.clear();
        navigate("/login");
    };

    return (
        <nav className="bg-white w-1/5 p-4 border-r-2"> 
            <div className='p-8 flex-row justify-around'>
            <ul className="flex flex-col space-y-2 text-left"> 
                {token && (
                    <>
                        <li className='flex justify-start hover:bg-teal-100  hover:text-teal-400 p-4 cursor-pointer'>
                            <GoHome className='text-2xl'/>
                            <Link to="/dashboard" className="nav-link rounded px-2 text-[#232A2E]">Dashboard</Link>
                        </li>
                        {doctype == 2 ? (
                            <li className='flex justify-start hover:bg-teal-100 p-4 rounded hover:text-teal-400 cursor-pointer'>
                                <LiaUserInjuredSolid className='text-2xl'/>
                                <Link to="/patient-od" className="nav-link rounded px-2 text-[#232A2E] border-l-4">Patients</Link>
                            </li>
                        ) : 
                        (
                            <li className='flex justify-start hover:bg-teal-100 p-4 rounded hover:text-teal-400 cursor-pointer'>
                                <LiaUserInjuredSolid className='text-2xl' />
                                <Link to="/patient-md" className="nav-link rounded px-2  text-[#232A2E] border-l-4">Patients</Link>
                            </li>
                        )
                        }
                        
                        {doctype == 1 && (
                            <li className='flex justify-start hover:bg-teal-100 p-4 rounded hover:text-teal-400 cursor-pointer'>
                                <MdOutlineDateRange className='text-2xl' />
                                <Link to="/view-appointments" className="nav-link rounded px-2 text-[#232A2E] border-l-4">Appointments</Link>
                            </li>
                        )}
                        <li className='flex justify-start hover:bg-teal-100 p-4 rounded hover:text-teal-400 cursor-pointer'>
                            <PiStethoscope className='text-2xl' />
                            <Link to="/doctor" className="nav-link rounded px-2 text-[#232A2E] border-l-4">Doctors</Link>
                        </li>
                        <li className='flex justify-start hover:bg-teal-100 p-4 rounded hover:text-teal-400 cursor-pointer'>
                            <CiChat1 className='text-2xl' />
                            <Link to="/chat" className="nav-link rounded px-2 text-[#232A2E] border-l-4">Chat</Link>
                        </li>
                        {/* <li className='flex justify-start hover:bg-teal-100 p-4 rounded hover:text-teal-400 cursor-pointer'>
                            <img src={staff}/>
                            <Link to="/staff" className="nav-link rounded px-2 hover:text-teal-400 text-[#232A2E] border-l-4">Staff</Link>
                        </li> */}
                        {doctype == 2 && (
                            <li className='flex justify-start hover:bg-teal-100 p-4 rounded hover:text-teal-400 cursor-pointer'>
                                <Link to="/add-patient" className="nav-link rounded px-2 text-[#232A2E] border-l-4">Add Referral Patient</Link>
                            </li>
                        )}
                    </>
                )}
            </ul>
            {/* <button className='px-3 py-2' onClick={handleLogout}>Logout</button> */}
            </div>

        </nav>
    );
}

export default Navbar;