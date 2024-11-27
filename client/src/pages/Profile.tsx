import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <p className='text-2xl font-bold text-center my-4'>Profile</p>
      <div className='flex flex-row items-center justify-start min-h-screen'>
        <div className='flex flex-row justify-between w-full max-w-5xl p-4'>

          <div className='bg-gray-300 shadow-md rounded-lg p-6 text-center m-4 flex-1'>
            <h2 className='text-xl font-semibold mb-4'>Basic Information</h2>
            <div className='flex flex-col'>
              <label className='font-medium'>Name:</label>
              <span className='text-gray-600'>John Doe</span>
              <label className='font-medium'>Gender:</label>
              <span className='text-gray-600'>Male</span>
              <label className='font-medium'>Phone:</label>
              <span className='text-gray-600'>123-456-7890</span>
              <label className='font-medium'>Email:</label>
              <span className='text-gray-600'>johndoe@example.com</span>
            </div>
          </div>
          <div className='bg-gray-300 shadow-md rounded-lg p-6 text-center m-4 flex-1'>
            <h2 className='text-xl font-semibold mb-4'>Address Information</h2>
            <button 
              className='text-white bg-blue-600 hover:bg-blue-700 rounded-md py-2 px-4 transition duration-300' 
              onClick={() => navigate("/add-address")}
            >
              Add Address +
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
