import React,{useState,useEffect} from 'react'
import {useDispatch, useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom'
import {AiOutlineEdit} from "react-icons/ai"
import { deletePro, getProeditId, updatePro } from '../redux/features/AuthSlice';
import {AiFillDelete} from "react-icons/ai"

const ProEdit = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
    const [isPopupOpen, setPopupOpen] = useState(false);
    const { Pro } = useSelector((state) => ({...state?.auth}));
    const [_id,setid] = useState('');
    const { user } = useSelector((state) => ({...state?.auth?.data?.data}));
    const handleclick = (id) =>{
      // navigate('/profile/form4/edit',{state:{id:id}})
      setid(id);
      setPopupOpen(true);
    }
    // console.log(_id);
    useEffect(()=>{
      dispatch(getProeditId({_id,navigate}))
      .then((response) => {
        // console.log(response.payload);
      //   setEditedData(response.payload[0]);
        setpdata(response.payload[0])
    })  
    .catch((err) => {
        console.log(err);
    });
    },[_id])
  
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
  
    const savedata = (e)=>{
      e.preventDefault();
      // dispatch(setproject({pdata,navigate}));
      dispatch(updatePro({pdata,navigate}))
      .then(()=>{
        setPopupOpen(false);
        navigate(`/profile/${user?._id}`)
      }).catch((error)=>{
        console.log(error)
      })
    }
    const handledelete = (id) =>{
      // console.log(id);
        dispatch(deletePro({id,navigate}));
    }
  return (
    <div className='expdiv w-2/4  ml-40 pt-24'>
    <div className='mb-5 w-full mt-5 bg-white'>
    <div className='flex items-center justify-between'>
  <h1 className='text-2xl pl-9 pt-4 font-semibold'>Projects</h1>
  <div>
  {/* <AiFillFileAdd className='absolute top-30  edit1 mr-20' onClick={handlenavigate4}/> */}  </div>
    </div>
    {
  Pro?.map((item,index)=>{
    return(
      <>
      <div  className='mb-5 w-full pl-9 pt-4'>
      <AiOutlineEdit className='edit7' onClick={()=>handleclick(item._id)}/>
      <AiFillDelete className='edit8' onClick={() => handledelete(item._id)}/>
        <h1 className='text-xl font-medium'>{item.ProjectName}</h1>
        <h3 className='text-slate-400 mb-4'>Mar 2023 - Mar 2023</h3>
        <button className='h-10 rounded-md mb-4 w-40 border-2 border-black'><Link target='_blank' to={item.ProjectLink}>Show Project</Link></button>
        <p className='text-md w-10/12'>{item.AboutP}</p>
      </div>
      <ul className='w-10/12 ml-10 h-1 bg-slate-200'></ul>
      </>
    )
  })
}
</div>
{
  isPopupOpen?
  <div className="popup3">
  <button className="close-button" onClick={() => setPopupOpen(false)}>
    Close
  </button>
  <div className=" bg-white border-2 rounded-md border-slate-300 ">
      <div className="w-full h-20 bg-slate-200 flex justify-between p-4 items-center">
          <h2 className="text-xl">Add New Project</h2>
        </div>
        {/* <h2 className='pl-4 pt-2 text-xl font-medium'>Add New Project</h2> */}
        <div className='p-4'>
          {/* <label htmlFor=""> Project Name</label> */}
          <input type="text" placeholder='Project Name' name='ProjectName' value={pdata.ProjectName} onChange={handlechange} className='h-10 pnamer w-96 pl-3 border-2 border-slate-300 rounded-md'/>
        </div>
        <textarea className='border-2 textareares  border-slate-300 rounded-md ml-4 pl-2' name='AboutP' value={pdata.AboutP} onChange={handlechange} placeholder='Write about Your Project' cols="70" rows="5"></textarea>
        <div className="mb-4 ml-5">
            <div className='w-96 st'>
            <label className="block mt-4 text-lg font-medium text-gray-600">
              Start Date
            </label>
            <input
              type="date"
              name="startdate"
              value={pdata.startdate}
              onChange={handlechange}
              className="w-full p-2 border rounded-md mt-1"
              />
            </div>
            <div className='w-96 ed'>
            <label className="block mt-4 text-lg font-medium text-gray-600">
              End Date
            </label>
            <input
              type="date"
              name="enddate"
              value={pdata.enddate}
              onChange={handlechange}
              className="w-full p-2 border rounded-md mt-1"
              />
              </div>
            </div>
        <input type="text" placeholder='Project Link' className='h-10 w-96 ires pl-3 ml-4 mt-3 border-2 border-slate-300 rounded-md' name='ProjectLink' value={pdata.ProjectLink} onChange={handlechange}/>
        <div className="text-right btnres w-full">
          <button className="h-10 bg-blue-600 text-white w-32 mr-4 rounded-md text-xl" onClick={savedata}>Save</button>
        </div>
      </div>
  </div>
  :<></>
}
</div>
  )
}

export default ProEdit
