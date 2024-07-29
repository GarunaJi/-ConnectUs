import React,{useEffect,useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getname } from '../redux/features/AuthSlice';
import image from '../assests/camera.png'
import { Sendmessage, getmessagedata, getsenderdata } from "../redux/features/MessageSlice";
import {BiMessageAltCheck} from 'react-icons/bi';
import { useLocation } from 'react-router';

const MessageBox = (props) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const receivedData = location?.state?.data;
    // console.log(receivedData);
    const [names,setname] = useState(null);
    const [combinedArray, setCombinedArray] = useState([]);
    const [start ,setstart] = useState(false);
    const { user } = useSelector((state) => ({ ...state?.auth?.data?.data }));
    // console.log(user);
    useEffect(()=>{
        dispatch(getname()).then((res)=>{
          // console.log(res);
          setname(res.payload); 
        }).catch((error)=>{
          console.log(error);
        })
      },[]);
      const [data,setdata] = useState({
        image:'https://res.cloudinary.com/dlc1gcuag/image/upload/v1693235425/profile_images/ohxfwhgg58zxwqvndgeh.jpg',
        name:'Nipun Khatri',
        id:'',
        userId:user?._id,
        text:""
      })

      const { recieverData,senderData } = useSelector((state) => ({...state?.message}));
      // console.log(recieverData);
      // console.log(senderData);
      let newArray = [];
      useEffect(()=>{
        setdata(receivedData);
        // console.log(recieverData);
        // console.log(senderData);
        if(senderData != "" && recieverData != ""){
          newArray = recieverData?.concat(senderData);
          // console.log(newArray);
          // console.log("hiiii1");
          newArray?.sort((a, b) => new Date(a?.date) - new Date(b?.date));
        setCombinedArray(newArray);
        }
        else if(senderData == "" && recieverData != ""){
          newArray = recieverData;
          // console.log("hiiii2");
          // newArray?.sort((a, b) => new Date(a?.date) - new Date(b?.date));
          setCombinedArray(newArray);
        }
        else if(senderData != "" && recieverData == ""){
          newArray = senderData;
          // newArray?.sort((a, b) => new Date(a?.date) - new Date(b?.date));
          setCombinedArray(newArray);
        }
        else{
            // console.log("hiiii4");
          setCombinedArray([]);
        }
      },[recieverData,senderData])
      // console.log(combinedArray);
      // console.log(combinedArray);

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



      // console.log(receivedData)
      // console.log(data.image)

      const SendMessage = () =>{
        // console.log(receivedData);
        dispatch(Sendmessage(data)).
        then(()=>{
          setdata({...data,text:''})
          dispatch(getsenderdata(data));
          dispatch(getmessagedata(data));
        })
      }
      const handletext = (e) =>{
        setdata({...data,[e.target.name]:e.target.value});
    }
    // console.log(data);
  return (
    <div className='h-screen w-full '>
    <div className='w-full content border-2 '>
    <div className='w-full h-14 bg-white updiv'>
    <li className='flex items-center text-xl font-serif'> <img className='h-12 w-12 mr-3 image-chat' src={receivedData?.image} alt="" /> {receivedData?.name}</li>  
    </div>
    <div className='w-full chath bg-Homecolor'>
      {
        combinedArray?.map((item,index)=>{
          // console.log(item);
          
          const found = recieverData!= ""?recieverData?.find(ele => ele?._id === item?._id):false;
          return(
              <div className={found ? 'chatdata1':'chatdata'} key={index}>{item?.text}</div>
          )
        })
      }
    </div>
    </div>
    <div className='input-chat'>
    <input type="text" placeholder='Chat here ...' className=' h-full w-10/12 text-xl p-3 textbox' name='text' value={data?.text} onChange={handletext}/>
    <button className='h-full w-52 text-2xl font-serif bg-blue-500 ibtn' onClick={SendMessage}>Send</button>
    </div>
    </div>
  )
}

export default MessageBox
