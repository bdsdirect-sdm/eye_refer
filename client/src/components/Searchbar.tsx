// import { useState } from 'react';
import { IoIosSearch } from 'react-icons/io';
import Button from './Button';
// import api from '../api/axiosInstance';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';    
// import { useQuery } from '@tanstack/react-query';  

const Searchbar = ({ refetch, query, setQuery }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  // const fetchPatient = async () => {
  //   try {
  //     const response = await api.get(`${Local.GET_PATIENT_LIST}?search=${query}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     console.log("SEARCH query", query)
  //     console.log("DATA::::", response.data)
  //     return response.data;
  //   } catch (err) {
  //     toast.error(`${err}`);
  //   }
  // };

  // const { data: Patients, error, isLoading, isError } = useQuery({
  //   queryKey: ['patient'],
  //   queryFn: fetchPatient
  // })

  const handleSearch = () => {
    if (query.trim() === "") {
      toast.error("Please enter a search term");
      return;
    }
    refetch();
    setQuery("")
    console.log("Search initiated with:", query);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // console.log("PATIENT", Patients)

  return (
    <div className="flex mt-4 gap-x-2">
      <input
        type="text"
        className="border-gray-400 p-2 w-1/4 rounded focus:ring-gray-950 "
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown} 
      />
      <Button onClick={handleSearch} className={" items-center gap-x-2"}>
        <IoIosSearch /> <span>Search</span>
      </Button>
    </div>
  );
};

export default Searchbar;