import React, { useState } from 'react'
import { ImCross } from "react-icons/im";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from "react-router";
import { setproject } from '../redux/features/AuthSlice';
const Form4 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const { user } = useSelector((state) => ({...state?.auth?.data?.data}));
  
  const idd = user?._id;
  const handlereturn = () =>{
    navigate(`/profile/${idd}`)
  }
  const [pdata,setpdata] = useState({
    ProjectName:"",
    AboutP:"",
    ProjectLink:"",
    id:user?._id
  })


  const handlechange = (e) =>{
    setpdata({...pdata,[e.target.name]:e.target.value})
  }

  // console.log(pdata);

  const save = (e)=>{
    e.preventDefault();
    dispatch(setproject({pdata,navigate}));
  }
  
  return (
    <div className="form4">
      <div className="nikki3 bg-white border-2 rounded-md border-slate-300 ">
      <div className="w-full h-20 bg-slate-200 flex justify-between p-4 items-center">
          <h2 className="text-xl">Add New Project</h2>
          <ImCross onClick={handlereturn} className="cursor-pointer" />
        </div>
        {/* <h2 className='pl-4 pt-2 text-xl font-medium'>Add New Project</h2> */}
        <div className='p-4'>
          {/* <label htmlFor=""> Project Name</label> */}
          <input type="text" placeholder='Project Name' name='ProjectName' value={pdata.ProjectName} onChange={handlechange} className='h-10 w-96 pl-3 border-2 border-slate-300 rounded-md'/>
        </div>
        <textarea className='border-2  border-slate-300 rounded-md ml-4 pl-2' name='AboutP' value={pdata.AboutP} onChange={handlechange} placeholder='Write about Your Project' cols="70" rows="5"></textarea>
        <input type="text" placeholder='Project Link' className='h-10 w-96 pl-3 ml-4 mt-3 border-2 border-slate-300 rounded-md' name='ProjectLink' value={pdata.ProjectLink} onChange={handlechange}/>
        <div className="text-right w-full">
          <button className="h-10 bg-blue-600 text-white w-32 mr-4 rounded-md text-xl" onClick={save}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Form4
