import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { saveselect } from '../redux/features/AuthSlice';

const SelectPopupBox = ({onClose2}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => ({...state?.auth?.data?.data}));
    const [userType, setUserType] = useState({
        userid:user?._id,
        option:''
    });
    const handleUserTypeChange = (event) => {
        setUserType({...userType,option:event.target.value});
    };
    // console.log(userType);
    const handleSubmit = () =>{
        dispatch(saveselect({userType,navigate}))
        .then(()=>{
          // window.location.reload();
        }).catch((error)=>{
          console.log(error);
        })
        onClose2();
    }
  return (
    <div className="popup-container font-serif">
    <div className='h-64 w-120 rounded-md bg-white flex flex-col items-center justify-center p-6'>
    <h1 className='text-2xl mb-6'>Select Your profession !!</h1>
    <label className='flex items-center justify-around'>
      <select className='m-0 p-0 h-10 w-60 pl-4' value={userType.option} onChange={handleUserTypeChange}>
        <option value="">Select...</option>
        <option value="company">Company</option>
        <option value="student">Student/Employee</option>
      </select>
    </label>
    <br />
    <button className='mt-4 h-10 text-xl rounded-md border-2 border-black w-40 bg-slate-200' onClick={handleSubmit}>Update</button>
  </div>
  </div>
  )
}

export default SelectPopupBox
