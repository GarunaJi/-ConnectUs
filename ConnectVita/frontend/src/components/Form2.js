import React, { useState } from "react";
import {ImCross} from "react-icons/im"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router'
import { setaboutdata } from "../redux/features/AuthSlice";

const Form2 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({...state?.auth?.data?.data}));
  
  const idd = user?._id;
  const handlereturn = () =>{
    navigate(`/profile/${idd}`)
  }
  const [adata,setadata] = useState({
    textarea:user.About?user.About:"",
    id:user?._id
  })

  const handlechange = (e) =>{
    // e.preventDefault();
    setadata({...adata,[e.target.name]:e.target.value});
  }  
  // console.log(adata);

  const savedata = (e) =>{
    e.preventDefault();
    dispatch(setaboutdata({adata,navigate}));
  }

  return (
    <div className="form2">
      <div className="nikki1 bg-white border-2 rounded-md border-slate-300 ">
        <div className="w-full h-20 bg-slate-200 flex justify-between p-4 items-center">
            <h2 className="text-xl">Edit About</h2>
            <ImCross onClick={handlereturn} className='cursor-pointer'/>
        </div>
        <div className="h-90 p-3 mb-2 w-full ">
          <h2 className="text-slate-500 mb-3">You can write about your years of experience, industry, or skills. People also talk about their achievements or previous job experiences.</h2>
          <textarea id="" className="p-2 border-2 border-slate-400 rounded-md" cols="85" rows="10" name="textarea" value={adata.textarea} onChange={handlechange}></textarea>
        </div>
        <div className="text-right w-full">
          <button className="h-10 bg-blue-600 text-white w-32 mr-4 rounded-md text-xl" onClick={savedata}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default Form2;
