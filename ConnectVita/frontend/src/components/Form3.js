import React, { useState } from "react";
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { setExperience } from "../redux/features/AuthSlice";

const Form3 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => ({...state?.auth?.data?.data}));
  const idd = user?._id;
  const handlereturn = () =>{
    navigate(`/profile/${idd}`)
  }

  const [Edata,setEdata] = useState({
    title:"",
    type:"Full Time",
    Company:'',
    Location:'',
    Ltype:"On-Site",
    id:user?._id
  })

  const handlechange  = (e) =>{
    setEdata({...Edata,[e.target.name]:e.target.value})
  }

  const handleTypeChange = (event) => {
    const selectedType = event.target.value;
    setEdata((prevData) => ({
      ...prevData,
      type: selectedType,  // Update the 'type' field with the selected value
    }));
  };

  const handleTypeChange1 = (event) => {
    const selectedType = event.target.value;
    setEdata((prevData) => ({
      ...prevData,
      Ltype: selectedType,  // Update the 'type' field with the selected value
    }));
  };

  // console.log(Edata);

  const savedata = (e) =>{
    e.preventDefault();
    dispatch(setExperience({Edata,navigate}))
  }

  return (
    <div className="form3">
      <div className="nikki2 bg-white border-2 rounded-md border-slate-300 ">
        {/* <div className="nikki1 bg-white border-2 rounded-md border-slate-300 "> */}
        <div className="w-full h-20 bg-slate-200 flex justify-between p-4 items-center">
          <h2 className="text-xl">Add Experience</h2>
          <ImCross onClick={handlereturn} className="cursor-pointer" />
        </div>
        <form action="">
          <div className="h-24 p-3 w-full  flex flex-col">
            <label htmlFor="" className="text-xl mb-1">Title</label>
            <input className="h-16 rounded-md pl-6 border-2 border-gray-400" name="title" value={Edata?.title} onChange={handlechange} type="text" placeholder="Ex: Retail Sales Manager" />
          </div>
          <div className="h-30 p-3 w-full flex flex-col">
          <label htmlFor="" className="text-xl mb-2">Employment Type</label>
            <select className="h-10 mb-3 rounded-md pl-4 border-2 border-gray-400" name="Please select" onChange={handleTypeChange} value={Edata.type} id="">
              <option value="Full Time">Full Time</option>
              <option value="Part Time">Part Time</option>
              <option value="Freelance">Freelance</option>
              <option value="internship">Internship</option>
            </select>
            <h1 className="text-md text-gray-400">Learn more about <span className="text-blue-400">employment types.</span></h1>
          </div>
          <div className="h-24 p-3 w-full flex flex-col">
            <label htmlFor="" className="text-xl mb-1">Company Name</label>
            <input className="h-16 border-2 border-gray-400 rounded-md pl-6" name="Company" value={Edata.Company} onChange={handlechange} type="text" placeholder="Ex: Microsoft" />
          </div>
          <div className="h-24 p-3 w-full  flex flex-col">
            <label htmlFor="" className="text-xl mb-1">Location</label>
            <input className="h-16 border-2 border-gray-400 rounded-md pl-6" name="Location" value={Edata.Location} onChange={handlechange} type="text" placeholder="Ex: London, United Kingdom" />
          </div>
          <div className="h-24 p-3 w-full  flex flex-col">
            <label htmlFor="" className="text-xl mb-1">Location Type</label>
            {/* <input className="h-16 rounded-md pl-6 " type="text" placeholder="Ex: Retail Sales Manager" /> */}
            <select className="h-16 border-2 border-gray-400  rounded-md pl-4" name="Please select" onChange={handleTypeChange1} value={Edata.Ltype} id="">
              <option value="On-Site">On-Site</option>
              <option value="Hybrid">Hybrid</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </form>
        <button className="h-10 w-36 m-1 rounded-md bg-blue-400 float-right" onClick={savedata}>Save</button>
        {/* </div> */}
      </div>
    </div>
  );
};

export default Form3;
