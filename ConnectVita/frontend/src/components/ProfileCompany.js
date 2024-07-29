import React,{useEffect, useState} from "react";
import micro from "../assests/microsoft.jfif";
import microsoft from "../assests/microsoft.jpg";
import camera from "../assests/camera.png";
import eventimg from "../assests/event.jfif";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {AiOutlineLike} from "react-icons/ai"
import {FaRegCommentDots} from "react-icons/fa"
import {GrSend} from "react-icons/gr"
import { useDispatch, useSelector } from "react-redux";
import ImageUploadPopup from "./ImageUploadPopup";
import { fetchexp, fetctPro, getdata, setaboutdata, setform1p ,addfollower} from "../redux/features/AuthSlice";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { AiOutlineEdit } from "react-icons/ai";
import { getEvents } from "../redux/features/EventSlice";
import { fetchpost } from "../redux/features/PostSlice";

const ProfileCompany = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  useEffect(()=>{
      dispatch(getEvents());
      dispatch(fetchpost());
  },[])
  const { user } = useSelector((state) => ({ ...state?.auth?.data?.data }));
  const name = user?.FirstName + ' ' + user?.lastname;
  const { Event } = useSelector((state)=>({...state?.Event}))
  const { post } = useSelector((state)=>({...state?.Post}))
  // console.log(Event);
  // console.log(post);
  // const { result } = useSelector((state) => ({ ...state?.auth?.profile?.data }));
  const [result,setresult] = useState(null)
  const Events = Event?.filter((item) => item?.PersonPosted === name);
  const posts = post?.filter((item) => item?.id === result?._id);
  // console.log(Events)
  // console.log(posts)
  // const events = [
  //   {
  //     date: "Thu, Mar 16, 2023, 8:30 PM",
  //     title: "The Future of Work: Reinventing Productivity with AI",
  //   },
  //   {
  //     date: "Thu, Mar 16, 2023, 8:30 PM",
  //     title: "The Future of Work: Reinventing Productivity with AI",
  //   }
  //   // Add more events here
  // ];
  
  // const Posts = [
  //   {
  //     about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, laudantium?",
  //     img:"https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  //   },
  //   {
  //     about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, laudantium?",
  //     img:"https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  //   },
  //   {
  //     about: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus, laudantium?",
  //     img:"https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D&w=1000&q=80",
  //   }
  // ]
  useEffect(()=>{
    if(result?.select == 'student'){
      navigate(`/profile/${id}`)
    }
  },[result])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
  };
  const { id } = useParams();
  const _id = id;
  useEffect(() => {
    // console.log(_id);
    dispatch(getdata(_id)).then((res)=>{
      // console.log(res);
      setresult(res?.payload?.data?.result)
    }); 
    dispatch(fetchexp(_id));
    dispatch(fetctPro(_id));
  }, [_id]);
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [isPopupOpen1, setPopupOpen1] = useState(false);
  const [my, setmy] = useState(false);
  const CustomToast = ({ message }) => (
    <div style={{ backgroundColor: '#333', color: '#fff', padding: '10px' }}>
      {message}
    </div>
  );
  const [form1,setform1]=useState({
    firstname:result?.FirstName || "",
    headline:result?.headline || "",
    id:result?._id || ""
  })

  useEffect(()=>{
    if (_id == user?._id) {
      setmy(true);
    }
  },[])

  const [adata,setadata] = useState({
    textarea:result?.About||"",
    id:result?._id ||""
  })

  useEffect(()=>{
    if(result?.About != ''){
      setadata({
        textarea:result?.About,
        id:result?._id 
      })
    }
  },[result])

  const handlechange01 = (e) =>{
    setadata({...adata,[e.target.name]:e.target.value});
  }  
  // console.log(adata);

  const sendaboutdata = async (adata) => {
    while (adata.id === '' || adata.id === undefined) {
      setadata({
        ...adata,
        id: result?._id || '',
      });
      // Wait a bit to avoid blocking the loop
      await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust the delay as needed
    }
    
    try {
      await dispatch(setaboutdata({ adata, navigate }));
      setPopupOpen1(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const savedata = async (e) =>{
    e.preventDefault();
    if(adata.id == '' || adata.id == undefined ){
      setadata({
        ...adata,
        id: result?._id || ''
      });
    }
    // console.log(adata);
    // await console.log("Hii");

    await sendaboutdata(adata);
  }

  useEffect(()=>{
    if(result?.FirstName != ''){
      setform1({
        firstname: result?.FirstName,
        headline: result?.headline,
        id: result?._id
      })
    }
  },[result])

  // console.log(form1);

  const handlechange = (e) =>{
    setform1({ ...form1, [e.target.name]: e.target.value });
  }

  const sendataa = async (form1) => {
    while (form1.id === '' || form1.id === undefined) {
      setform1({
        ...form1,
        id: result?._id || '',
      });
      // Wait a bit to avoid blocking the loop
      await new Promise((resolve) => setTimeout(resolve, 100)); // Adjust the delay as needed
    }
    
    try {
      dispatch(setform1p({form1,navigate})).then(()=>{
        setPopupOpen(false);
        window.location.reload();
      }).catch((error)=>{
        console.log(error)
      })
    } catch (error) {
      console.log(error);
    }
  };

  const handlesubmit = async () =>{
    // console.log("HII");
    if(form1.firstname == '' || form1.headline == '' ){
      toast(<CustomToast message="Please fill the details" />, {
        position: "top-center",
      });
      return;
    } 
    if(form1.id == '' || form1.id == undefined ){
      setform1({
        ...form1,
        id: result?._id || user?._id
      });
    }
    await sendataa(form1);
  }

  const data = {
    id:user?._id,
    rid:_id
  }

  const [send,setsend] = useState(false)

  const followNow = () =>{
    dispatch(addfollower(data));
    setsend(true);
  }


  const handleImage = () => {
    setImagePopupOpen(true);
  };
  const handleImagePopupClose = () => {
    setImagePopupOpen(false);
  };
  
  const handleImageUpload = (newImageFile) => {
    setImageFile(newImageFile);
    setImagePopupOpen(false);
  };
  const handlenavigate1 = () => {
    setPopupOpen(true);
  };
  const handlenavigate2 = () => {
    setPopupOpen1(true);
  };
  return (
    <div className="w-7/12 compp h-auto ml-40 company-profile flex flex-col pt-16 font-serif ">
    { my?(
      <>
      <div className="home border-2 border-white bg-white">
        <img src={micro} className="h-56 border-b-black border-2" alt="" />
        <ImageUploadPopup
            isOpen={isImagePopupOpen}
            onClose={handleImagePopupClose}
            onImageUpload={handleImageUpload}
          />
        <div className="imageselect w-36 absolute top-48 left-48 border-2 border-white rounded-full">
          {
            result?.image != null ?(
              <img
              src={result?.image}
              className="h-full w-full rounded-full"
              alt=""
              onClick={handleImage}
            />
            ):(
              <img
              src={camera}
              className="h-full w-full rounded-full"
              alt=""
              onClick={handleImage}
            />
            )
          }
        </div>
        <br />
        <br />
        {result?.headline != undefined ? 
        (
          <div>
            <AiOutlineEdit
                  className="absolute top-30 edit"
                  onClick={handlenavigate1}
                />
                <h1 className="text-3xl ml-10 font-medium mb-3">{result?.FirstName}</h1>
        <h1 className="text-lg ml-10 text-slate-500 font-medium mb-3">
          {result?.headline} 21,178,006 followers
        </h1>
        <button className="h-10 w-40 ml-10 mt-2 mb-4 border-2 border-blue-500 rounded-md">
          Live
        </button>
        <hr className="w-full h-1 bg-slate-300" />
        <div className="flex items-center h-16">
          <button className="h-10 w-32 ">Home</button>
          <button className="h-10 w-32 ">About</button>
          <button className="h-10 w-32 ">Posts</button>
        </div>
        </div>
        ):
        (
          <div className="h-2/4 w-full  flex items-center justify-center">
          <button
            className="h-10 w-40 rounded-2xl mt-2 hover:bg-slate-300 text-black border-2 border-black"
            onClick={()=> setPopupOpen(true)}
          >
            Add Your details
          </button>
        </div>
        )
        }
      </div>
      <br />
      <div className="About">
      {
        result?.About != undefined?
        (
          <>  
          <div className="flex items-center justify-between w-full mb-3">
          <h1 className="text-2xl font-medium ml-8 ">About</h1>
          <AiOutlineEdit
                  className="edit"
                  onClick={handlenavigate2}
                  />
        </div>
        <p className="ml-8 mt-1 text-lg">
         {result?.About}
        </p>
          </>
        )
        :
        (
          <>
          <button className="h-12 w-40 border-2 border-slate-500  rounded-md hover:bg-slate-300" onClick={()=> setPopupOpen1(true)}>Add About Yourself</button>
          </>
        )
      }
      </div>
      <br />
      <div className="Events">
        <h1 className="text-2xl font-medium ml-8 mt-5 mb-3">Past Events</h1>
        {Events?.length > 3 ? (
          <Slider {...settings}>
            {Events?.map((event, index) => {
              return(
              <div
                key={index}
                className="slide w-72 bg-white border-1 border-black rounded-md"
              >
                <img src={event?.image} className="rounded-t-md" alt="" />
                <h1 className="ml-2 mr-2 mt-2">
                  {event.startdate}
                </h1>
                <h1 className="ml-2 mr-2 font-medium text-lg underline">
                {event.eventName}
                </h1>
                <br />
                <button className="w-11/12 h-10 rounded-md border-2 border-blue-300 ml-2 text-xl">
                  View
                </button>
              </div>
          )})}
          </Slider>
        ) : (
          <div className="flex crousal ">
            {Events?.map((event, index) => 
            {
            return(
              <div
                key={index}
                className="slide w-72 bg-white border-1 border-black rounded-md"
              >
                {/* Event content */}
                <img src={event?.image} className="rounded-t-md" alt="" />
                <h1 className="ml-2 mr-2 mt-2">
                  {event.startdate}
                </h1>
                <br />
                <h1 className="ml-2 mr-2 font-medium text-lg underline">
                {event.eventName}
                </h1>
                <br />
                <button className="w-11/12 h-10 rounded-md border-2 border-blue-300 ml-2 text-xl">
                  View
                </button>
              </div>
            )})}
          </div>
        )}
        {/* <hr className='w-full h-1 mt-5 bg-slate-300'/> */}
        {
          Events == null?
          <>
          <button className="w-full h-16 mt-3 text-xl cursor-pointer flex justify-center items-center">
          No Event Posted Yet !
        </button>
          </>
          :
          <></>
        }
      </div>
      <br />
      <div className="Posts">
        <h1 className="text-2xl font-medium ml-8 mt-5 mb-3">Page Posts</h1>
        {posts?.length > 3 ? (
          <Slider {...settings}>
              {posts?.map((event, index) => 
            {
            return(
              <div
                key={index}
                className="slide1 w-72 bg-white border-1 border-black rounded-md"
              >
                {/* Event content */}
                <div className="logodiv">
                  <img src={event?.image} className="h-10 w-10" alt="" />
                  <div className="ml-3">
                  <h1 className="text-xl ml-4">{event?.name}</h1>
                  <h3>21,724,124 followers</h3>
                  </div>
                </div>
                <img src={event?.PostVim} className="rounded-t-md" alt="" />
                <h2 className="p-2">{event?.Like?.length} Likes. {event?.Comment?.length} comments</h2>
                <div className='h-16 w-full m-1 flex justify-around'>
                <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center'>
                <AiOutlineLike className='text-2xl mr-1 text-red-500'/>
                <h2 className='textsize2'>Like</h2>
              </div>
              <div className='h-5/6 w-3/12 flex divl text-xl justify-center items-center'>
                <FaRegCommentDots className='text-2xl mr-1'/>
                <h2 className='textsize2'>Comment</h2>
              </div>
              <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center'>
                <AiOutlineLike className='text-2xl mr-1'/>
                <h2 className='textsize2'>Repost</h2>
              </div>
              <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center'>
                <GrSend className='text-2xl mr-1'/>
                <h2 className='textsize2'>Send</h2>
              </div>
              </div>
              </div>
            )})}
          </Slider>
        ) : (
          <div className="flex crousal ml-1 ">
            {posts?.map((event, index) => 
            {
            return(
              <div
                key={index}
                className="slide1 w-72 bg-white border-1 border-black rounded-md"
              >
                {/* Event content */}
                <div className="logodiv">
                  <img src={event?.image} className="h-10 w-10" alt="" />
                  <div className="ml-3">
                  <h1 className="text-xl ml-4">{event?.name}</h1>
                  <h3>21,724,124 followers</h3>
                  </div>
                </div>
                <img src={event?.PostVim} className="rounded-t-md" alt="" />
                <h2 className="p-2">{event?.Like?.length} Likes. {event?.Comment?.length} comments</h2>
                <div className='h-16 w-full m-1 flex justify-around'>
                <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center'>
                <AiOutlineLike className='text-2xl mr-1 text-red-500'/>
                <h2 className='textsize2'>Like</h2>
              </div>
              <div className='h-5/6 w-3/12 flex divl text-xl justify-center items-center'>
                <FaRegCommentDots className='text-2xl mr-1'/>
                <h2 className='textsize2'>Comment</h2>
              </div>
              <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center'>
                <AiOutlineLike className='text-2xl mr-1'/>
                <h2 className='textsize2'>Repost</h2>
              </div>
              <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center'>
                <GrSend className='text-2xl mr-1'/>
                <h2 className='textsize2'>Send</h2>
              </div>
              </div>
              </div>
            )})}
          </div>
        )}
        {/* <hr className='w-full h-1 mt-5 bg-slate-300'/> */}
        {
          posts == null?
          <button className="w-full h-16 mt-3 text-xl cursor-pointer flex justify-center items-center">
              No Post posted Yet !
        </button>
        :
        <></>
        }
      </div>
      <br />
      {
        isPopupOpen?
        <div className="popupC">
            <button className="close-button" onClick={() => setPopupOpen(false)}>
              Close
            </button>
            {/* Your pop-up content here */}
      <div className=' bg-white border-2 rounded-md border-black '>
        <div className='flex justify-between ml-2 mr-3 items-center'>
        <h1 className='text-black font-medium text-2xl p-4'>Fill Personal Details</h1>
        </div>
        <div  className='w-full h-20 p-5'>
          <input type="text" placeholder='First Name' className='one border-2 h-10  mr-4 rounded-md' name='firstname' onChange={handlechange}  value={form1?.firstname}/>
        </div>
        <div  className='w-full h-20 p-5 mt-5'>
          <input type="text" placeholder='Headline' className='w-full onee border-2 h-10  mr-4 rounded-md' name='headline' onChange={handlechange} value={form1?.headline}/>
        </div>
        <div className='w-full  h-20 flex items-center justify-center p-5 mt-5 '>
          <button className='h-10 w-60 bg-blue-400  border-2 rounded-md' onClick={handlesubmit}>Save</button>
        </div>
      </div>
        </div>     
        :<></>
      }
      {
        isPopupOpen1?
        <div className="popup">
        <button className="close-button" onClick={() => setPopupOpen1(false)}>
          Close
        </button>
        <div className="popup11 bg-white border-2 rounded-md border-slate-300">
    <div className="w-full h-20 bg-slate-200 flex justify-between p-4 items-center">
        <h2 className="text-xl">Edit About</h2>
        {/* <ImCross onClick={handlereturn} className='cursor-pointer'/> */}
    </div>
    <div className="h-90 p-3 mb-2 w-full ">
      <h2 className="text-slate-500 mb-3">{}</h2>
      <textarea id="" className="p-2 border-2 border-slate-400 rounded-md w-full h-72" // Add this inline style
name="textarea" value={adata.textarea} onChange={handlechange01}></textarea>
    </div>
    <div className="text-right w-full mb-6">
      <button className="h-10 bg-blue-600 text-white w-32 mr-4 rounded-md text-xl" onClick={savedata}>Save</button>
    </div>
  </div>
        </div>
        :
        <>
        </>
      }
      </>
      )
      :
      (
      <>
      <div className="home border-2 border-white bg-white">
        <img src={micro} className="h-56 border-b-black border-2" alt="" />
        <ImageUploadPopup
            isOpen={isImagePopupOpen}
            onClose={handleImagePopupClose}
            onImageUpload={handleImageUpload}
          />
        <div className="imageselect w-36 absolute top-48 left-48 border-2 border-white rounded-full">
          {
            result?.image != null ?(
              <img
              src={result?.image}
              className="h-full w-full rounded-full"
              alt=""
              // onClick={handleImage}
            />
            ):(
              <img
              src={camera}
              className="h-full w-full rounded-full"
              alt=""
              // onClick={handleImage}
            />
            )
          }
        </div>
        <br />
        <br />
        {result?.headline != undefined ? 
        (
          <div>
            {/* <AiOutlineEdit
                  className="absolute top-30 edit"
                  onClick={handlenavigate1}
                /> */}
                <h1 className="text-3xl ml-10 font-medium mb-3">{result?.FirstName}</h1>
        <h1 className="text-lg ml-10 text-slate-500 font-medium mb-3">
          {result?.headline} 21,178,006 followers
        </h1>
        {/* <button className="h-10 w-40 ml-10 mt-2 mb-4 border-2 border-blue-500 rounded-md">
          Follow
        </button> */}
        {
          user?.following?.includes(id)?
          <button disabled className="h-10 w-40 ml-10 mt-2 mb-4 border-2 border-blue-500 rounded-md" >  
          Following
        </button>
          :
          <button className="h-10 w-40 ml-10 mt-2 mb-4 border-2 border-blue-500 rounded-md" onClick={followNow}>  
            Connect
          </button>
        }
        <hr className="w-full h-1 bg-slate-300" />
        <div className="flex items-center h-16">
          <button className="h-10 w-32 ">Home</button>
          <button className="h-10 w-32 ">About</button>
          <button className="h-10 w-32 ">Posts</button>
        </div>
        </div>
        ):
        (
          <div className="h-2/4 w-full  flex items-center justify-center">
          <button
            className="h-10 w-40 rounded-2xl mt-2 hover:bg-slate-300 text-black border-2 border-black"
            // onClick={()=> setPopupOpen(true)}
          >
            Add Your details
          </button>
        </div>
        )
        }
      </div>
      <br />
      <div className="About">
      {
        result?.About != undefined?
        (
          <>  
          <div className="flex items-center justify-between w-full mb-3">
          <h1 className="text-2xl font-medium ml-8 ">About</h1>
          {/* <AiOutlineEdit
                  className="edit"
                  onClick={handlenavigate2}
                  /> */}
        </div>
        <p className="ml-8 mt-1 text-lg">
         {result?.About.slice(0,410)}
        </p>
          </>
        )
        :
        (
          <>
          <button className="h-12 w-40 border-2 border-slate-500  rounded-md hover:bg-slate-300" >Add About Yourself</button>
          </>
        )
      }
      </div>
      <br />
      <div className="Events">
        <h1 className="text-2xl font-medium ml-8 mt-5 mb-3">Past Events</h1>
        {Events?.length > 3 ? (
          <Slider {...settings}>
            {Events?.map((event, index) => {
              return(
              <div
                key={index}
                className="slide w-72 bg-white border-1 border-black rounded-md"
              >
                <img src={event?.image} className="rounded-t-md" alt="" />
                <h1 className="ml-2 mr-2 mt-2">
                  {event.startdate}
                </h1>
                <h1 className="ml-2 mr-2 font-medium text-lg underline">
                {event.eventName}
                </h1>
                <br />
                <button className="w-11/12 h-10 rounded-md border-2 border-blue-300 ml-2 text-xl">
                  View
                </button>
              </div>
          )})}
          </Slider>
        ) : (
          <div className="flex crousal ">
            {Events?.map((event, index) => 
            {
            return(
              <div
                key={index}
                className="slide w-72 bg-white border-1 border-black rounded-md"
              >
                {/* Event content */}
                <img src={event?.image} className="rounded-t-md" alt="" />
                <h1 className="ml-2 mr-2 mt-2">
                  {event.startdate}
                </h1>
                <br />
                <h1 className="ml-2 mr-2 font-medium text-lg underline">
                {event.eventName}
                </h1>
                <br />
                <button className="w-11/12 h-10 rounded-md border-2 border-blue-300 ml-2 text-xl">
                  View
                </button>
              </div>
            )})}
          </div>
        )}
        {/* <hr className='w-full h-1 mt-5 bg-slate-300'/> */}
        {
          Events == null?
          <>
          <button className="w-full h-16 mt-3 text-xl cursor-pointer flex justify-center items-center">
          No Event Posted Yet !
        </button>
          </>
          :
          <></>
        }
      </div>
      <br />
      <div className="Posts">
        <h1 className="text-2xl font-medium ml-8 mt-5 mb-3">Page Posts</h1>
        {posts?.length > 3 ? (
          <Slider {...settings}>
              {posts?.map((event, index) => 
            {
            return(
              <div
                key={index}
                className="slide1 w-72 bg-white border-1 border-black rounded-md"
              >
                {/* Event content */}
                <div className="logodiv">
                  <img src={event?.image} className="h-10 w-10" alt="" />
                  <div className="ml-3">
                  <h1 className="text-xl ml-4">{event?.name}</h1>
                  <h3>21,724,124 followers</h3>
                  </div>
                </div>
                <img src={event?.PostVim} className="rounded-t-md" alt="" />
                <h2 className="p-2">{event?.Like?.length} Likes. {event?.Comment?.length} comments</h2>
                <div className='h-16 w-full m-1 flex justify-around'>
                <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center'>
                <AiOutlineLike className='text-2xl mr-1 text-red-500'/>
                <h2 className='textsize2'>Like</h2>
              </div>
              <div className='h-5/6 w-3/12 flex divl text-xl justify-center items-center'>
                <FaRegCommentDots className='text-2xl mr-1'/>
                <h2 className='textsize2'>Comment</h2>
              </div>
              <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center'>
                <AiOutlineLike className='text-2xl mr-1'/>
                <h2 className='textsize2'>Repost</h2>
              </div>
              <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center'>
                <GrSend className='text-2xl mr-1'/>
                <h2 className='textsize2'>Send</h2>
              </div>
              </div>
              </div>
            )})}
          </Slider>
        ) : (
          <div className="flex crousal ml-1 ">
            {posts?.map((event, index) => 
            {
            return(
              <div
                key={index}
                className="slide1 w-72 bg-white border-1 border-black rounded-md"
              >
                {/* Event content */}
                <div className="logodiv">
                  <img src={event?.image} className="h-10 w-10" alt="" />
                  <div className="ml-3">
                  <h1 className="text-xl ml-4">{event?.name}</h1>
                  <h3>21,724,124 followers</h3>
                  </div>
                </div>
                <img src={event?.PostVim} className="rounded-t-md" alt="" />
                <h2 className="p-2">{event?.Like?.length} Likes. {event?.Comment?.length} comments</h2>
                <div className='h-16 w-full m-1 flex justify-around'>
                <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center'>
                <AiOutlineLike className='text-2xl mr-1 text-red-500'/>
                <h2 className='textsize2'>Like</h2>
              </div>
              <div className='h-5/6 w-3/12 flex divl text-xl justify-center items-center'>
                <FaRegCommentDots className='text-2xl mr-1'/>
                <h2 className='textsize2'>Comment</h2>
              </div>
              <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center'>
                <AiOutlineLike className='text-2xl mr-1'/>
                <h2 className='textsize2'>Repost</h2>
              </div>
              <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center'>
                <GrSend className='text-2xl mr-1'/>
                <h2 className='textsize2'>Send</h2>
              </div>
              </div>
              </div>
            )})}
          </div>
        )}
        {/* <hr className='w-full h-1 mt-5 bg-slate-300'/> */}
        {
          posts == null?
          <button className="w-full h-16 mt-3 text-xl cursor-pointer flex justify-center items-center">
              No Post posted Yet !
        </button>
        :
        <></>
        }
      </div>
      <br />
      {
        isPopupOpen?
        <div className="popupC">
            <button className="close-button" onClick={() => setPopupOpen(false)}>
              Close
            </button>
            {/* Your pop-up content here */}
      <div className=' bg-white border-2 rounded-md border-black '>
        <div className='flex justify-between ml-2 mr-3 items-center'>
        <h1 className='text-black font-medium text-2xl p-4'>Fill Personal Details</h1>
        </div>
        <div  className='w-full h-20 p-5'>
          <input type="text" placeholder='First Name' className='one border-2 h-10  mr-4 rounded-md' name='firstname' onChange={handlechange}  value={form1?.firstname}/>
        </div>
        <div  className='w-full h-20 p-5 mt-5'>
          <input type="text" placeholder='Headline' className='w-full onee border-2 h-10  mr-4 rounded-md' name='headline' onChange={handlechange} value={form1?.headline}/>
        </div>
        <div className='w-full  h-20 flex items-center justify-center p-5 mt-5 '>
          <button className='h-10 w-60 bg-blue-400  border-2 rounded-md' onClick={handlesubmit}>Save</button>
        </div>
      </div>
        </div>     
        :<></>
      }
      {
        isPopupOpen1?
        <div className="popup">
        <button className="close-button" onClick={() => setPopupOpen1(false)}>
          Close
        </button>
        <div className=" bg-white border-2 rounded-md border-slate-300">
    <div className="w-full h-20 bg-slate-200 flex justify-between p-4 items-center">
        <h2 className="text-xl">Edit About</h2>
        {/* <ImCross onClick={handlereturn} className='cursor-pointer'/> */}
    </div>
    <div className="h-90 p-3 mb-2 w-full ">
      <h2 className="text-slate-500 mb-3">{}</h2>
      <textarea id="" className="p-2 border-2 border-slate-400 rounded-md w-full h-72" // Add this inline style
name="textarea" value={adata.textarea} onChange={handlechange01}></textarea>
    </div>
    <div className="text-right w-full mb-6">
      <button className="h-10 bg-blue-600 text-white w-32 mr-4 rounded-md text-xl" onClick={savedata}>Save</button>
    </div>
  </div>
        </div>
        :
        <>
        </>
      }
      </>
      )
    }
    </div>
  );
};

export default ProfileCompany;
