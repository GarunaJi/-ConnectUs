import React,{useEffect, useState} from 'react'
import link from "../assests/Component 4 (2).png"
import {AiOutlineSearch} from "react-icons/ai"
import {AiFillHome} from "react-icons/ai"
import {BsFillPeopleFill} from "react-icons/bs"
import {FaSuitcase} from "react-icons/fa"
import {AiOutlineMessage} from "react-icons/ai"
import {IoMdNotifications} from "react-icons/io"
import {BsFillPersonFill} from "react-icons/bs"
import {IoMdArrowDropdownCircle} from 'react-icons/io'
import { GiHamburgerMenu } from 'react-icons/gi';
import {BiLogOut} from "react-icons/bi"
import {BiNetworkChart} from "react-icons/bi"

import './Navbar.css'
import linkk from '../assests/Component 6 (1).png'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { useNavigate } from 'react-router-dom'
import logo from '../assests/my image.jpeg';
import { getname } from '../redux/features/AuthSlice'
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeLink, setActiveLink] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  const handleInputFocus = () => {
    setIsInputFocused(true);
  };
  const {isAuthenticated}  = useSelector((state) => ({ ...state.auth }));
  const { user } = useSelector((state) => ({...state?.auth?.data?.data}));
  // console.log(user);
  // console.log(isAuthenticated);
  const [login , setlogin] = useState(false);
  useEffect(()=>{ 
    if(user != null){
      setlogin(true);
    }
  },[user])
  const handleInputBlur = () => {
    setIsInputFocused(false);
  };
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLinkClick = (id) => {
    // console.log(id);
    setShowDropdown(false)
    navigate(`/profile/${id}`)
    // setActiveLink(link);
  };
  const handlesearch = (id) => {
    // console.log(id);
    navigate(`/profile/${id}`)
    setMatchingNames([])
    setSearchTerm('');
  };

  const linkStyle = (link) => ({
    color: link === activeLink ? 'black' : '#666666',
    borderBottom:link === activeLink ? '2px solid black' : 'none',
  });

  // console.log(isInputFocused);
  const inputStyle = {
    backgroundColor: isInputFocused ? 'white' : 'white',
    // border:isInputFocused? '2px s':'none'
  };

  const handleReg = () =>{
    navigate('/register')
  }
  
  const handleEvent = () =>{
    navigate('/event');
  }

  const handlelogout = () =>{
    // e.preventDefault();
    try {
      localStorage.clear();
      // localStorage.removeItem('auth'); // Replace 'authToken' with your token key
      // navigate('/login');
      window.location.reload();
    } catch (error) {
      console.error('Error navigating:', error);
    }
  }
  const [names,setname] = useState(null);

  useEffect(()=>{
    dispatch(getname()).then((res)=>{
      // console.log(res);
      setname(res.payload); 
    }).catch((error)=>{
      console.log(error);
    })
  },[]);

  const handleclickEvent = () =>{
    setShowDropdown(false);
  }

  // console.log(names)

  const [searchTerm, setSearchTerm] = useState('');
  const [matchingNames, setMatchingNames] = useState([]);


  const handleSearchChange = (event) => {
    const newSearchTerm = event.target.value;
    setSearchTerm(newSearchTerm);

    const filteredNames = names.filter((item) =>
      item?.name.toLowerCase().includes(newSearchTerm.toLowerCase())
    );
    // console.log(filteredNames);
    setMatchingNames(filteredNames);
  };

  const handleclicksearch = () =>{
    setMatchingNames([]);
  }
  const handledropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const closenav = () =>{
    setShowDropdown(false);
  }
  return (
    <>
    {
    login==true?
    <div style={inputStyle} className='h-14 w-full fullnav fixed border-b-2 flex z-10 font-serif ' onClick={handleclicksearch}>
      <div className='resdiv'>
      <div className='h-full w-5/12 flex  items-center ml-10'>
        <img className='h-11 w-11 mr-5' src={link} alt="" />
        {/* <div className='flex'> */}
        <AiOutlineSearch className='relative left-6 text-lg font-extrabold  text-slate-500'/>
        <input onFocus={handleInputFocus}
      onBlur={handleInputBlur} value={searchTerm} onChange={handleSearchChange} type="text"  placeholder='Search' className='place h-9 w-72 pl-8 focus:outline-none  rounded-sm border-0 bg-navinput' />
        {/* <input className='h-10 w-80 rounded-xl bg-slate-900'></input> */}
      </div>
      <GiHamburgerMenu className="drop" onClick={handledropdown} />
        {/* <IoMdArrowDropdownCircle className='drop' onClick={handledropdown}/> */}
      </div>
      {/* </div> */}
      {matchingNames?
        <ul className="dropdown-list">
          {matchingNames?.map((item, index) => (
            <li key={index} className='flex items-center' onClick={()=>handlesearch(item?._id)}> <img className='h-7 w-7 mr-3' src={item?.image} alt="" /> {item?.name}</li>
          ))}
        </ul>
        :<></>
      }
      <div className={`flex justify-evenly w-5/12 items-center ${showDropdown ? 'dropdownopen' : 'dropdownclose'}`}>
        <Link to='/' style={linkStyle('link1')}
        onClick={() => handleLinkClick('link1')} className='flex-col mt-2 flex w-14 items-center '>
        <AiFillHome className='text1 ml-1'/>
        <h1 className='text'>Home</h1>
        </Link>
        <Link to={"/event"} style={linkStyle('link3')}onClick={handleclickEvent}
         className='flex-col mt-2 flex items-center '>
        <FaSuitcase className='text1 ml-1'/>
        <h1 className='text'>Events</h1>
        </Link>
        <Link to={"/network"} style={linkStyle('link3')}onClick={handleclickEvent}
         className='flex-col network mt-2 flex items-center '>
        <BiNetworkChart className='text1 ml-1'/>
        <h1 className='text'>Network</h1>
        </Link>
        <Link to={'/message'} style={linkStyle('link4')}
        className='flex-col mt-2 flex items-center '>
        <AiOutlineMessage className='text1 ml-1'/>
        <h1 className='text'>Message</h1>
        </Link>
        <Link style={linkStyle('link5')}
        onClick={() => handleLinkClick('link5')} className='flex-col mt-2 flex items-center '>
        <IoMdNotifications className='text1 ml-1 '/>
        <h1 className='text'>Notification</h1>
        </Link>
        <Link to={`/profile/${user?._id}`} onClick={closenav} className='flex-col mt-2 flex w-14 items-center '>
          {
            user?.image?
            <img className='hda'  src={user?.image?(user?.image):logo} alt="" />
            :
            <>
            <BsFillPersonFill className='text1 ml-1'/>
            <h1 className='text'>Me</h1>
            </>
          }
        </Link>
        <Link  className='flex-col mt-2 flex items-center resflex' onClick={handlelogout}>
        <BiLogOut className='text1 ml-1'/>
        <h1 className='text'>LogOut</h1>
        </Link>
      </div>
    </div>
    :
    <>
    <div style={inputStyle} className='h-14 w-full fixed border-b-2 flex justify-between  mr-3 items-center z-10 font-serif mobile-nav'>
       <img src={linkk} className='h-12 w-50 img-mobile ' alt="" />
       <div className=' flex justify-center items-center m1-div'>
        <Link to={"/register"} className='h-10 w-28 flex items-center justify-center mr-5  rounded-md'>Join Now</Link>
        <Link to={"/login"} className='h-10 w-28 border-2 flex items-center justify-center border-slate-500 rounded-md ml-mobile'>Sign In</Link>
       </div>
    </div>
    </>
    }
    </>
  )
}

export default Navbar
