import React from 'react';
import img1 from "../Assets/diversity_2.png"
import img2 from "../Assets/diversity_2(1).png"
import img3 from "../Assets/diversity_2(2).png"

// const ReferralComponents = ({ "referralCount", referralCompleteCount, doctorCount, time }) => {
    const ReferralComponents = () => {
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-6 py-3 ">
      <div className="flex flex-col p-3 border border-gray-200 justify-evenly rounded-lg shadow-md bg-white">
        <div className="flex justify-between">
          <img src={img1} alt="Logo" className="w-11 h-11" />
          <p className="text-2xl font-bold">212</p>
        </div>
        {/* <p className="text-2xl font-bold">{referralCount}</p>
        <p className="text-sm text-gray-600">Last update: {time}</p> */}
        <div  className="flex justify-between">
          <h5 className=" text-base font-sans font-medium text-start">{`Referrals placed`}</h5>
          <p className="text-sm font-normal text-gray-500">Last update: 5.40</p>
        </div>
      </div>

      <div className="fflex flex-col p-3 border border-gray-200 justify-evenly rounded-lg shadow-md bg-white">
        <div className="flex justify-between">
          <img src={img2} alt="Logo" className="w-11 h-11" />
          <p className="text-2xl font-bold">212</p>
        </div>
        {/* <p className="text-2xl font-bold">{referralCompleteCount}</p> 
        <p className="text-sm text-gray-600">Last update: {time}</p> */}
        <div  className="flex justify-between">
          <h5 className="text-start text-base font-sans font-medium">{`Referrals completed`}</h5>
          <p className="text-sm font-normal text-gray-500">Last update: 5.40</p>
        </div>
      </div>

      <div className="flex flex-col justify-between p-3 border border-gray-200  rounded-lg shadow-md bg-white">
        <div className="flex justify-between">
          <img src={img3} alt="Logo" className="w-12 h-12" />
          <p className="text-2xl font-bold">212</p>
        </div>
        {/* <p className="text-2xl font-bold">{doctorCount}</p>
        <p className="text-sm text-gray-600">Last update: {time}</p> */}
        <div  className="flex justify-between">
        <h5 className="text-start text-base font-sans font-medium">{`Doctor OD/MD`}</h5>
        <p className="text-sm font-normal text-gray-500">Last update: 5.40</p>
        </div>
      </div>
    </div>
  );
};

export default ReferralComponents;
