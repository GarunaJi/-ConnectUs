import React, { useEffect ,useState } from 'react'
import './Event.css'
import land from '../assests/landscape.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { getEvents } from '../redux/features/EventSlice'
import EventPopupBox from './EventPopupBox'
const Event = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getEvents());
    },[])
    const { Event } = useSelector((state)=>({...state?.Event}))
    const { user } = useSelector((state) => ({...state?.auth?.data?.data}));
    const [popupVisible1, setPopupVisible1] = useState(false);
    const openPopup1 = () => {
        setPopupVisible1(true);
      };
    const closePopup1 = () => {
        setPopupVisible1(false);
      };
      const name = user?.FirstName + ' ' + user?.lastname;
    //   console.log(name);
      const filteredEvents = Event?.filter((item) => item?.PersonPosted === name);
  return (
    <div className=' w-full bg-Homecolor pt-16 font-serif'>
        <div className='flex justify-center'>
    <div className='h-24 w-11/12 bg-white flex items-center rounded-md justify-between pr-7 pl-2'>
        <h1 className='text-3xl font-medium'>Events</h1>
        <button className='h-12 w-40 bg-blue-500 rounded-md text-xl text-white' onClick={openPopup1}>Create An Event</button>
    </div>
        </div>
        <div className='flex justify-center items-center'>
    <div className='w-11/12 mt-3 bg-white  items-center rounded-md justify-center'>
        <h1 className='text-xl mt-3  ml-1 underline mb-3 font-medium'>Your Events</h1>
        <div className='mt-4 w-11/12 mb-2 ml-2 grid grid-cols-3 gap-4 gridres'>
        {
            filteredEvents?
            filteredEvents?.map((item,index)=>{
                return(
                    <div className='bg-gray-200 event-container' key={index}>
                    <img src={item?.image} alt="" />
                    <h3 className='flex justify-between m-4 text-lg'>{item?.startdate}, {item.starttime}<li>Live</li></h3>
                    <h2 className='text-xl ml-2'>{item?.eventName}</h2>
                    <br />
                    <h3 className='ml-2 text-lg text-gray-400'>{item?.PersonPosted}</h3>
                    <button className='h-10 event-but ml-2 mt-1 rounded-md border-2 border-blue-300'>View</button>
                </div>
                )
            })
            :
            <></>
        }
        </div>
    </div>
        </div>
        <h2 className='ml-16 mt-5 text-xl underline allebenttext'> All Events</h2>
        <div className='mt-4 w-11/12 m-auto grid grid-cols-3 gap-4 gridres'>
        {
            Event?
            Event?.map((item,index)=>{
                return(
                    <div className='bg-gray-200 event-container' key={index}>
                    <img src={item?.image} alt="" />
                    <h3 className='flex justify-between m-4 text-lg'>{item?.startdate}, {item.starttime}<li>Live</li></h3>
                    <h2 className='text-xl ml-2'>{item?.eventName}</h2>
                    <br />
                    <h3 className='ml-2 text-lg text-gray-400'>{item?.PersonPosted}</h3>
                    <button className='h-10 event-but ml-2 mt-1 rounded-md border-2 border-blue-300'>View</button>
                </div>
                )
            })
            :
            <></>
        }
        </div>
        {popupVisible1 && <EventPopupBox onClose1={closePopup1} />}
    </div>
  )
}

export default Event
