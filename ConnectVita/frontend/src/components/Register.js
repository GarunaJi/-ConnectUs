import React, { useState , useEffect } from 'react'
import { useDispatch } from "react-redux";
import { register } from '../redux/features/AuthSlice';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Register = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const {isAuthenticated}  = useSelector((state) => ({ ...state.auth }));
  // console.log(isAuthenticated);
  useEffect(()=>{
    if(isAuthenticated != false){
      navigate('/');
    }
  },[])
  const dispatch = useDispatch();
  const [rdata,setrdata] = useState({
    email:'',
    Password:''
  })

  const handleChange = (e) => {
    setrdata({ ...rdata, [e.target.name]: e.target.value });
  };

  // console.log(rdata)

  const CustomToast = ({ message }) => (
    <div style={{ backgroundColor: '#333', color: '#fff', padding: '10px' }}>
      {message}
    </div>
  );

  const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };
  

  const handleSignIn = async (e) =>{
    e.preventDefault();
    if(rdata.email == '' || rdata.Password == ''){
      toast(<CustomToast message="Please fill the details" />, {
        position: "top-center",
      });
      return;
    }
      const emailIsValid = isValidEmail(rdata.email);

      if (!emailIsValid) {
        toast(<CustomToast message="Invalid email" />, {
          position: "top-center",
        });
        return;
      }
    
      if (rdata.Password.length < 5) {
        toast(<CustomToast message="Password should be at least 8 characters long" />, {
          position: "top-center",
        });
        return;
      }

      setEmail(rdata.email);
      // Assuming `dispatch` is an asynchronous action
      await dispatch(register({ rdata, navigate }));
  }


  return (
    <div className='mobile-reg h-screen flex flex-col items-center justify-center w-full pt-16 bg-slate-500 font-serif'>
      <h1 className='text-3xl mb-7'>Make the most of your professional life</h1>
      <div className='hei1 div-mobile'>
      <h2 className='text-3xl p-4'>Join ConnectVita</h2>
      <input placeholder='Email' type="text" value={rdata.email} onChange={handleChange} name='email' className='h-12 pl-3 ml-5 rounded-md w-5/6 border-2 text-xl border-slate-400'/>
      <input placeholder='Password' type="text" value={rdata.Password} onChange={handleChange} name='Password' className='h-12 pl-3 mt-4 ml-5 rounded-md w-5/6 border-2 text-xl border-slate-400'/>
      <div className='flex justify-center items-center w-full p-6 text-center'>
        <p>By clicking Agree & Join, you agree to the LinkedIn <span className='text-blue-600'> User Agreement, Privacy Policy, and Cookie Policy.</span></p>
      </div>
      <button className='h-12 w-80 bg-blue-600 ml-8 text-white text-xl rounded-md agree-mobile' onClick={handleSignIn}>Agree & Join</button>
      <div className='flex mt-2 pl-6 pr-7 items-center'>
            <hr  className='hrw h-0.5 text-black'/>
            or
            <hr  className='hrw h-0.5 text-black'/>
            </div>
      <h1 className='text-center mt-3 text-md font-medium'>Already on LinkedIn?<span className='text-blue-600'><Link to="/login"> Sign in</Link></span></h1>
      </div>
    </div>
  )
}

export default Register
