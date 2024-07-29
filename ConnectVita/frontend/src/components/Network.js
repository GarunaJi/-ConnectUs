import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { sendrequest } from '../redux/features/AuthSlice';
import { toast } from 'react-toastify';
import {AiOutlineCheckCircle} from "react-icons/ai"
import {ImCross} from "react-icons/im"

const Network = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({...state?.auth?.data?.data}));
    const [data,setdata] = useState({
        request:'',
        id:user?._id,
        rid:''
      }) 
      const CustomToast = ({ message }) => (
        <div style={{ backgroundColor: '#333', color: '#fff', padding: '10px' }}>
          {message}
        </div>
      );
      
    const handleallow = async (id) =>{
        await setdata({...data, rid:id, request:"accept"});
        if(data?.request != '' && data?.rid != ''){
          dispatch(sendrequest(data)).then(()=>{
            toast(<CustomToast message="Request Accepted"/>, {
              position: "top-center",
            }); 
            window.location.reload();
          })
    
        }
      }

      const handlereject = async (id) =>{
        await setdata({...data, rid:id, request:"reject"});
        if(data?.request != '' && data?.rid != ''){
        dispatch(sendrequest(data)).then(()=>{
          toast(<CustomToast message="Request Rejected"/>, {
            position: "top-center",
          }); 
          window.location.reload();
        })
        }
      }
  return (
    <div className='w-2/5 h-full flex ml-5  items-start flex-col'>
        <div className='h-5/6 leftup1 mt-20 w-7/12 bg-white rounded-2xl'>
            <h1 className='mt-5 ml-5 text-xl mb-4'>Pending Requests</h1>
            {
              user?.request?.map((item,index)=>{
                return(
                <div className='flex items-center h-16 w-11/12 bg-slate-100 ml-5 justify-evenly' key={index}>
                  <img src={item.image} className='h-10 w10 rounded-md' alt="" />
                  <h2 className='text-lg'>{item.name}</h2>
                  <div className='h-10 items-center flex  rounded-full' onClick={() => handleallow(item?.id)}>
                    <AiOutlineCheckCircle className='text-2xl cursor-pointer' />
                  </div>
                  <div className='h-10  items-center flex  rounded-full'onClick={() =>handlereject(item?.id)}>
                    <ImCross className='text-s cursor-pointer' onClick={() =>handlereject(item?.id)}/>
                  </div>
                </div>
                )
              })
            }
        </div>
      </div>
  )
}

export default Network
