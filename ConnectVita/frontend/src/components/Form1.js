import React, { useEffect, useState } from 'react'
import {ImCross} from "react-icons/im"
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { getdata, setform1p } from '../redux/features/AuthSlice'
import { useSelector } from 'react-redux'
const Form1 = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => ({...state?.auth?.data?.data}));
  // console.log(user)
  const idd = user?._id;
  const handlereturn = () =>{
    navigate(`/profile/${idd}`)
  }
  const [form1,setform1]=useState({
    firstname:user.FirstName?user.FirstName:"",
    lastname:user.lastname?user.lastname:"",
    headline:user.headline?user.headline:"",
    Education:user.Education?user.Education:"",
    Country:user.Country?user.Country:"",
    id:user?._id, 
    City:user.City?user.City:"",
    CurrentPos:user.CurrentPos?user.CurrentPos:""
  })

  const handlechange = (e) =>{
    setform1({ ...form1, [e.target.name]: e.target.value });
  }

  // console.log(form1);

  useEffect(()=>{
    const id = form1?.id;
    dispatch(getdata(id));
  },[])

  const handlesubmit = () =>{
    if(form1.firstname == '' || form1.lastname == '' || form1.id == '' || form1.headline == '' || form1.City == '' || form1.Country == "" || form1.Education == ''){
      return;
    } 
    dispatch(setform1p({form1,navigate}))
  }

  return (
    <div className='form1'>
      <div className='nikki bg-white border-2 rounded-md border-black '>
        <div className='flex justify-between ml-2 mr-3 items-center'>
        <h1 className='text-black font-medium text-2xl p-4'>Fill Personal Details</h1>
        <ImCross onClick={handlereturn} className='cursor-pointer'/>
        </div>
        <div  className='w-fullh-20 p-5'>
          <input type="text" placeholder='First Name' className='one border-2 h-10  mr-4 rounded-md' name='firstname' onChange={handlechange}  value={form1.firstname}/>
          <input type="text" placeholder='Last Name' className='two border-2 rounded-md h-10' name='lastname' onChange={handlechange} value={form1.lastname}/>
        </div>
        <div  className='w-full h-20 p-5 mt-5'>
          <input type="text" placeholder='Headline' className='w-full onee border-2 h-10  mr-4 rounded-md' name='headline' onChange={handlechange} value={form1.headline}/>
        </div>
        <div  className='w-full  h-20 p-5 mt-5'>
          <input type="text" placeholder='Education' className='one  border-2 rounded-md h-10 w-2/5 mr-4' name='Education' onChange={handlechange} value={form1.Education}/>
          <input type="text" placeholder='Country' className='two  border-2 rounded-md h-10 w-2/5' value={form1.Country} onChange={handlechange} name='Country'/>
        </div>
        <div  className='w-full  h-20 p-5 mt-5 '>
          <input type="text" placeholder='City' className='one   border-2 rounded-md h-10 w-2/5 mr-4' value={form1.City} onChange={handlechange} name='City'/>
          <input type="text" placeholder='Current Position' className='two  border-2 rounded-md h-10 w-2/5' value={form1.CurrentPos} onChange={handlechange} name='CurrentPos'/>
          {/* <input type="text" placeholder='Last Name' className='two h-10 w-2/5'/> */}
        </div>
        <div className='w-full  h-20 flex items-center justify-center p-5 mt-5 '>
          <button className='h-10 w-60 bg-blue-400  border-2 rounded-md' onClick={handlesubmit}>Save</button>
        </div>
      </div>
    </div>
  )
}

export default Form1
