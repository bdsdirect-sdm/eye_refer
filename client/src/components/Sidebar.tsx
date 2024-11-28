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
        <nav className="bg-white p-6 border-r-2"> 
            <div className=' flex-row justify-around text-base'>
            <ul className="flex flex-col space-y-2 text-left"> 
                {token && (
                    <>
                        <li className='flex justify-start hover:bg-teal-100    cursor-pointer '>
                            <Link to="/dashboard" className='flex flex-row px-4 py-3  hover:text-teal-400 hover:border-l-2 '>
                                <GoHome className='text-2xl'/>
                                <span className="nav-link rounded px-2 ">Dashboard</span>
                            </Link>
                            
                        </li>
                        {doctype == 2 ? (
                            <li className='flex justify-start hover:bg-teal-100  cursor-pointer '>
                                <Link to="/patient-od" className='flex flex-row px-4 py-3  hover:text-teal-400 hover:border-l-2 '>
                                    <LiaUserInjuredSolid className='text-xl'/>
                                    <span className="nav-link rounded px-2 ">Patients</span>
                                </Link>
                                
                            </li>
                            // <li className='flex justify-start hover:bg-teal-100 px-4 py-3 rounded hover:text-teal-400 hover:border-l-teal-700 cursor-pointer'>
                            //     <LiaUserInjuredSolid className='text-2xl'/>
                            //     <Link to="/patient-od" className="nav-link rounded  text-[#232A2E] border-l-4">Patients</Link>
                            // </li>
                        ) : 
                        (
                            <li className='flex justify-start hover:bg-teal-100    cursor-pointer '>
                            <Link to="/patient-md" className='flex flex-row px-4 py-3  hover:text-teal-400 hover:border-l-2 '>
                                <LiaUserInjuredSolid className='text-2xl'/>
                                <span className="nav-link rounded px-2 ">Patients</span>
                            </Link>
                            
                        </li>
                        )
                        }
                        
                        {doctype == 1 && (
                            <li className='flex justify-start hover:bg-teal-100  cursor-pointer '>
                                <Link to="/view-appointments" className='flex flex-row px-4 py-3  hover:text-teal-400 hover:border-l-2 '>
                                    <MdOutlineDateRange className='text-xl'/>
                                    <span className="nav-link rounded px-2 ">Appointments</span>
                                </Link>
                                
                            </li>
                        )}

                            <li className='flex justify-start hover:bg-teal-100  cursor-pointer '>
                                <Link to="/doctor" className='flex flex-row px-4 py-3  hover:text-teal-400 hover:border-l-2 '>
                                    <PiStethoscope className='text-xl'/>
                                    <span className="nav-link rounded px-2 ">Doctors</span>
                                </Link>
                                
                            </li>

                            <li className='flex justify-start hover:bg-teal-100  cursor-pointer '>
                                <Link to="/chat" className='flex flex-row px-4 py-3  hover:text-teal-400 hover:border-l-2 '>
                                    <CiChat1 className='text-xl'/>
                                    <span className="nav-link rounded px-2 ">Chat</span>
                                </Link>
                                
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