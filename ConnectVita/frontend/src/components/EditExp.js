import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deleteExp, fetchexp } from '../redux/features/AuthSlice';
import logo from '../assests/my image.jpeg';
import {AiOutlineEdit} from "react-icons/ai"
import {AiFillDelete} from "react-icons/ai"
import { useNavigate } from 'react-router';

const EditExp = () => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const { user } = useSelector((state) => ({...state?.auth?.data?.data}));
    const { exp } = useSelector((state) => ({...state?.auth}));
    const _id = user?._id;
    useEffect(()=>{
        dispatch(fetchexp(_id));
    },[])
    const handleEditId = (id) =>{
        navigate('/profile/form3/edit',{state : {id:id}})
    }
    const handledelete = (id) =>{
      // console.log(id);
        dispatch(deleteExp({id,navigate}));
    }
  return (
    <div className='expdiv w-2/4  ml-40 pt-24'>
      <div className='h-5/6 w-full bg-white'>
      <h1 className='text-2xl ml-9 pt-4'>Experience</h1>
      {
   exp?.map((item,index)=>{
    return(
      <>
      <div className='mb-5 w-full flex pl-9 pt-4'>
        <img src={item?.image?item?.image:logo} className='h-20 w-20 mr-4' alt="" />
        <div>
          <h1 className='text-lg font-medium'>{item.title}</h1>
          <h3>{item.Company} · {item.type}</h3>
          <h4 className='text-slate-400 text-sm'>{item.startdate} to {item.enddate}</h4>
        </div>
        <AiOutlineEdit className='edit6 mr-3' onClick={() => handleEditId(item._id)}/>
        <AiFillDelete className='edit6' onClick={() => handledelete(item._id)}/>
      </div>
      <ul className='w-10/12 ml-10 h-1 bg-slate-100'></ul>
      </>
    )
  })
}
      </div>
    </div>
  )
}

export default EditExp
