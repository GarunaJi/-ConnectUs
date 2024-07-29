import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getname } from '../redux/features/AuthSlice';
import image from '../assests/camera.png'
import { Sendmessage, getmessagedata, getsenderdata } from "../redux/features/MessageSlice";
import {BiMessageAltCheck} from 'react-icons/bi';
import MessageBox from './MessageBox';
import { useNavigate } from 'react-router';
const Message = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [names,setname] = useState(null);
    const [combinedArray, setCombinedArray] = useState([]);
    const [start ,setstart] = useState(false);
    const { user } = useSelector((state) => ({ ...state?.auth?.data?.data }));
    // console.log(user);
    const rid = user?._id;
    const {isAuthenticated}  = useSelector((state) => ({ ...state.auth }));
    useEffect(()=>{
      if(isAuthenticated == false){
        navigate('/login');
      }
    },[])

    useEffect(()=>{
        dispatch(getname()).then((res)=>{
          // console.log(res);
          setname(res.payload); 
        }).catch((error)=>{
          console.log(error);
        })
      },[]);
      // console.log(names);
      // console.log(rid);
      let filteredNames;
      const [nameArray ,setNameArray] = useState([]);
      useEffect(()=>{
        filteredNames = names?.filter(ele => ele?._id !== rid);
        setNameArray(filteredNames)
      },[names])
      // console.log(nameArray);
      const { recieverData,senderData } = useSelector((state) => ({...state?.message}));
      // console.log(recieverData);
      // console.log(senderData);
      let newArray = [];
      useEffect(()=>{
        // console.log(recieverData);
        // console.log(senderData);
        if(senderData != "" && recieverData != ""){
          newArray = recieverData?.concat(senderData);
          // console.log(newArray);
          newArray?.sort((a, b) => new Date(a?.date) - new Date(b?.date));
        setCombinedArray(newArray);
        }
        else if(senderData == "" && recieverData != ""){
          newArray = recieverData;
          // newArray?.sort((a, b) => new Date(a?.date) - new Date(b?.date));
          setCombinedArray(newArray);
        }
        else if(senderData != "" && recieverData == ""){
          newArray = senderData;
          // newArray?.sort((a, b) => new Date(a?.date) - new Date(b?.date));
          setCombinedArray(newArray);
        }
        else{
          setCombinedArray([]);
        }
      },[recieverData,senderData])
      // console.log(combinedArray);
      // console.log(combinedArray);
      const [data,setdata] = useState({
        image:'https://res.cloudinary.com/dlc1gcuag/image/upload/v1693235425/profile_images/ohxfwhgg58zxwqvndgeh.jpg',
        name:'Nipun Khatri',
        id:'',
        userId:user?._id,
        text:""
      })

      const handleselect = (name,image,id) =>{
        setCombinedArray([]);
        setstart(true);
        // console.log(name);
        setdata({...data,name:name,image:image,id:id});
        // await setgetdata({...getdata,id:id})
        // console.log(getdata);
      }
      useEffect(()=>{
        if(data?.id != ''){
          dispatch(getmessagedata(data));
        }
      },[data?.id])

      useEffect(()=>{
        if(data?.id != ''){
          dispatch(getsenderdata(data));
        }
      },[data?.id])

      const isMobileWidth = window.matchMedia('(max-width: 640px)').matches;
      // console.log(isMobileWidth);
      
      useEffect(()=>{
        if(data?.id != '' && isMobileWidth){
          navigate('/messagebox',{state:{data:data}})
        }
      },[data?.id])

      // console.log(data)
      // console.log(data.image)

      const SendMessage = () =>{
        // console.log(data);
        dispatch(Sendmessage(data)).
        then(()=>{
          setdata({...data,text:''})
          dispatch(getsenderdata(data));
          dispatch(getmessagedata(data));
        })
      }
      const handletext = (e) =>{
        setdata({...data,[e.target.name]:e.target.value});
        // console.log(data);
      }
  return (
    <div className='h-screen flex w-full bg-slate-200 pt-14'>
    <div className='h-full w-full listname bg-white'>
    <h1 className='text-3xl font-medium font-serif pt-3 pl-3'>Chats</h1>
    <hr className='w-full h-1 bg-slate-500 '/>
    <div className='flex  namelist justify-around flex-col '>
          {nameArray?.map((item, index) => (
    <ul className="list">
            <li key={index} className='flex items-center text-xl font-serif ' onClick={()=>handleselect(item?.name,item?.image,item?._id)}> <img className='h-12 w-12 mr-3 image-chat' src={item?.image} alt="" /> {item?.name}</li>
        </ul>
          ))}
    </div>
    </div>
    <div className='mbox h-full w-full'>
    {
      start?
    <div className='h-full w-full'>
    <div className='w-full content border-2 '>
    <div className='w-full nametop bg-white '>
    <li className='flex items-center text-xl font-serif'> <img className='h-12 w-12 mr-3 image-chat' src={data?.image} alt="" /> {data?.name}</li>  
    </div>
    <div className='w-full chath bg-Homecolor'>
      {
        combinedArray?.map((item,index)=>{
          // console.log(item);
          
          const found = recieverData!= ""?recieverData?.find(ele => ele?._id === item?._id):false;
          return(
              <h1  className={found ? 'chatdata1':'chatdata'} key={index}>{item?.text}</h1>
          )
        })
      }
    </div>
    </div>
    <div className='input-chat'>
    <input type="text" placeholder='Chat here ...' className=' h-full w-10/12 text-xl p-3' name='text' value={data?.text} onChange={handletext}/>
    <button className='h-full w-52 text-2xl font-serif bg-blue-500' onClick={SendMessage}>Send</button>
    </div>
    </div>
    // <MessageBox data={data}/>
    :
    <div className='h-full w-full bg-Homecolor font-serif flex text-3xl justify-center items-center flex-col'>
      <BiMessageAltCheck className='text-6xl'/>
      <h2>Start Messaging</h2>
    </div>
    }
    </div>
    </div>
  )
}

export default Message
