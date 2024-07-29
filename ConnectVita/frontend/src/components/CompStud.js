import React,{useState} from 'react'
import './UserTypeSelector.css'; // Import the CSS file
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { saveselect } from '../redux/features/AuthSlice';

const CompStud = () => {
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
        dispatch(saveselect({userType,navigate}));
    }
  return (
    <div className="user-type-container">
    <h1 className='text-2xl'>User Type Selector</h1>
    <label>
      Select user type:
      <select value={userType.option} onChange={handleUserTypeChange}>
        <option value="">Select...</option>
        <option value="company">Company</option>
        <option value="student">Student/Employee</option>
      </select>
    </label>
    <button className='mt-4 h-8 rounded-md border-2 border-black w-40 bg-slate-200' onClick={handleSubmit}>Save</button>
  </div>
  )
}

export default CompStud
