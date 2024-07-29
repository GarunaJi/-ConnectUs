import React, { useState } from 'react'
import logo from '../assests/logo.png';
import './Navbar.css'
import { Link } from 'react-router-dom'
import {AiFillCodeSandboxSquare} from "react-icons/ai"
import {BsFillBookmarkFill} from "react-icons/bs"
import {BsCardImage} from "react-icons/bs"
import {BsCalendarEvent} from "react-icons/bs"
import {BiSolidVideos} from "react-icons/bi"
import {GrArticle} from "react-icons/gr"
import {GrSend} from "react-icons/gr"
import {AiOutlineCheckCircle} from "react-icons/ai"
import {AiFillPlusCircle} from "react-icons/ai"
import {ImCross} from "react-icons/im"
import {AiOutlineLike} from "react-icons/ai"
import {FaRegCommentDots} from "react-icons/fa"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { useEffect } from 'react';
import { addfollower, getdata, getuserdata, sendrequest } from '../redux/features/AuthSlice';
import Imagepopupbox from './Imagepopupbox';
import { addlike, fetchpost, savecomment } from '../redux/features/PostSlice';
import EventPopupBox from './EventPopupBox';
import { toast } from 'react-toastify';
import SelectPopupBox from './SelectPopupBox';
const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupVisible1, setPopupVisible1] = useState(false);
  const [popup,setpopup] = useState(false);
  const openPopup = () => {
    setPopupVisible(true);
  };
  const openPopup1 = () => {
    setPopupVisible1(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };
  const closePopup1 = () => {
    setPopupVisible1(false);
  }
  const closePopup2 = () => {
    setpopup(false);
  }
  const {isAuthenticated}  = useSelector((state) => ({ ...state.auth }));
  const { user } = useSelector((state) => ({...state?.auth?.data?.data}));
  const { post } = useSelector((state)=>({...state?.Post}))
  // console.log(post);
  // console.log(user);
  const _id = user?._id;
  // console.log(user?.select);
  useEffect(()=>{
    // console.log(_id);
    // console.log("######################################################")
    if(_id != undefined){
      dispatch(getuserdata(_id));
    }
  },[_id])
  useEffect(()=>{
    if(user?.select == undefined || user?.select == ''){
      // console.log("******************************************")
      setpopup(true);
    }
    else{
      setpopup(false)
    }
  },[user]);
  // console.log(user?.select);
  useEffect(()=>{
    dispatch(fetchpost());
  },[])

  // console.log(isAuthenticated);
  useEffect(()=>{
    if(isAuthenticated == false){
      navigate('/login');
    }
  },[])

  const handlenavigate =(id) =>{
    navigate(`/profile/${id}`)
    // window.location.reload();
  }

  const [data,setdata] = useState({
    request:'',
    id:user?._id,
    rid:''
  }) 
  const CustomToast = ({ message }) => (
    <div style={{ backgroundColor: '#333', color: '#fff', padding: '10px' }}>
      {message}
    </div>
  );
  

  const handleallow = async (id) =>{
    await setdata({...data, rid:id, request:"accept"});
    if(data?.request != '' && data?.rid != ''){
      dispatch(sendrequest(data)).then(()=>{
        toast(<CustomToast message="Request Accepted"/>, {
          position: "top-center",
        }); 
        window.location.reload();
      })

    }
  }

  const handlereject = async (id) =>{
    await setdata({...data, rid:id, request:"reject"});
    if(data?.request != '' && data?.rid != ''){
    dispatch(sendrequest(data)).then(()=>{
      toast(<CustomToast message="Request Rejected"/>, {
        position: "top-center",
      }); 
      window.location.reload();
    })
    }
  }

  const data5 ={
    id:user?._id,
    rid:''
  }
  const [send,setsend] = useState(false)

  const followNow = (id) =>{
    const data6 = { ...data5, rid: id }; // Update the 'rid' property with the provided 'id'
    setsend(true);
    dispatch(addfollower(data6));
  }
  const [like,setlike] = useState(false)

  let likedata = {
    _id:user?._id,
    postid:''
  }

  const handleLike = (id) =>{
    setlike(true);
    likedata = {...likedata , postid:id}
    dispatch(addlike(likedata)).then(()=>{
      dispatch(fetchpost());
    }).catch((error)=>{
      console.log(error);
    })
  }
  const handleDislike = (id) =>{
    setlike(false);
    likedata = {...likedata , postid:id}
    dispatch(addlike(likedata)).then(()=>{
      dispatch(fetchpost());
    }).catch((error)=>{
      console.log(error);
    })
  }
  const [openCommentId, setOpenCommentId] = useState(null);

  const toggleComment = (postId) => {
    if (openCommentId === postId) {
      setOpenCommentId(null);
    } else {
      setOpenCommentId(postId);
    }
  };

  const [cdata ,setcdata] = useState({
    comment:"",
    _id:user?._id,
    postid:''
  })

  const handlecomment = (e) =>{
    setcdata({...cdata,[e.target.name]:e.target.value})
  } 

  // console.log(cdata);

  const handlesavecomment = async (id) =>{
    const updatedCdata = await { ...cdata, postid: id };
    setcdata(updatedCdata);
    // console.log(cdata);
    dispatch(savecomment(cdata)).then(()=>{
      window.location.reload();
    }).catch((error)=>{
      console.log(error)
    })
  }

  const navigateProfile = (id) =>{
    navigate(`/profile/${id}`)
  }



  return (
    <>
    <div className=' w-full flex bg-Homecolor pt-16 font-serif'>
      <div className='wwd h-full flex mt-5 mr-5 items-end flex-col hresleft'>
        <div className='h-2/3 leftup w-7/12 bg-white rounded-2xl'>
          <div className='h-16 w-full rounded-t-lg bg-black'>
            <Link to={`/profile/${user?._id}`}>
              <img src={user?.image?(user?.image):logo} alt="" className='h-20 w-20 relative top-6 left-20 rounded-full bg-slate-300'/>
            </Link>
          </div>
          <div className='h-3/5 w-full flex flex-col mt-5 items-center mid bg-white'>
            <br />
            <h2 className='text-lg mb-1'>{(user?.FirstName)?(user.FirstName):''} {user?.lastname?user.lastname:''}</h2>
            <p className='text-center text-slate-500'>{user?.headline?user?.headline:""}</p>
            <br />
            <hr className='w-full h-2 text-black'/>
            <div className='flex justify-around w-full mb-1 mt-2 cursor-pointer'>
              <h3 className='text-slate-500'>My followers</h3>
              <h3 className='text-blue-700'>{user?.followers?.length}</h3>
            </div>
            <div className='flex justify-around w-full cursor-pointer'>
              <h3 className='text-slate-500'>Impressions of your post</h3>
              <h3 className='text-blue-700'>0</h3>
            </div>
            <br />
            <hr className='w-full h-2 text-black'/>
            <div className=' w-full p-2'>
              <h3 className='text-xs text-slate-400'>Access exclusive tools & insights</h3>
              {/* <img src="" alt="" /> */}
              <div className='flex'>
              <AiFillCodeSandboxSquare className='text-2xl'/>
              <h3 className='underline font'>Get Hired faster .Try Premium free</h3>
              </div>
            </div>
          </div>
            <hr className='w-full h-2 text-black'/>
            <div className='flex ml-5 h-9 items-center cursor-pointer'>
              <BsFillBookmarkFill className='text-slate-500'/>
              <h2 className='ml-3 font'>My Items</h2>
            </div>
        </div>
      </div>
      <div className='divv'>
        <div className='wd h-36 m-5 bg-white'>
            <div className='w-full hsdd flex items-center h-3/6 '>
            <Link to={`/profile/${user?._id}`}>
              <img className='hd' src={user?.image?user?.image:logo} alt=""  />
              </Link>
              <input type="text" placeholder='Start a Post' className='h-3/5 with ml-3' name="" id="" />
            </div>
            <div className='w-full h-16 flex  items-center'>
              <div className='h-5/6 flex items-center pl-5 ww1 '  onClick={openPopup}>
                <BsCardImage className='text-xl image1'/>
                <h3 className='pl-3 text-s'>Photo</h3>
              </div>
              <div className='h-5/6 flex items-center pl-5 ww1 '  onClick={openPopup}>
                <BiSolidVideos className='text-xl image1'/>
                <h3 className='pl-3 text-s'>Video</h3>
              </div>
              <div className='h-5/6 flex items-center pl-5 ww1 'onClick={openPopup1}>
                <BsCalendarEvent className='text-xl image1'/>
                <h3 className='pl-3 text-s'>Event</h3>
              </div>
              <div className='h-5/6 flex items-center pl-5 ww1 '>
                <GrArticle className='text-xl image1'/>
                <h3 className='pl-3 text-s'>Article</h3>
              </div>
            </div>
        </div>
        <div className='w-full hhh '>
          {
            post==null?
            <div className='contain'>
            <div class="loader"></div>
            </div>
            :
            <></>
          }
          {
            post?.map((item,index)=>{
              return(
                <>
                <div className='width block m-auto mt-4 h-full '>
              <div className='h-20 w-full flex justify-between items-center' key={index}>
              <div className='w-60 h-full flex'>
              <div>
              <img src={item?.image} onClick={()=>navigateProfile(item?.id)} className='h-full w-20 p-1 cursor-pointer' alt="" />
              </div>
              <div className='h-full w-40 flex ml-1 flex-col mt-1'>
                <Link to={`/profile/${item.id}`}>
                <h1 className='text-lg cursor-pointer' >{item?.name}</h1>
                </Link>
                <h1 className='text-gray-500 text-sm'>Made With &#10084;&#65039;</h1>
              </div>
            </div>
            <div className='h-full w-24 mr-2 items-center justify-center flex'>
              {
                (item?.id == user?._id)?
                <></>
                :
                user?.following?.includes(item?.id)?
                <h1 className='text-lg w-full h-10 rounded-xl cursor-pointer flex justify-center items-center border-blue-500 text-white-700'>Following</h1>
                :
                <h1 className='text-lg w-full h-10 rounded-xl cursor-pointer flex justify-center items-center text-blue-700' onClick={() => followNow(item?.id)}><AiFillPlusCircle className='mr-2 text-xl text-blue-500'/> Follow</h1>
              }
            </div>
          </div>
          <div className='hi w-full'>
              <div className='h-16 p-1 text-s'>
                {item?.text.slice(0, 83)}
              </div>
              <div className='divimg'>
                {
                  item.type == 'image'?
                  <img src={item?.PostVim} className='imagepost' alt="" />
                  :
                  <video src={item?.PostVim} width="800" height="400" controls />
                }
              </div>
          </div>
          <div className='h-24 w-full '>
            <div className='h-8 p-1 mt-3 w-full flex justify-between'>
              <h2>{item?.Like?.length} Likes</h2>
              <h2>{item?.Comment?.length} Comments</h2>
            </div>
            <div className='h-16 w-full m-1 flex justify-around'>
              {
                item?.Like.includes(user?._id)?
                <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center' onClick={()=>handleDislike(item?._id)}>
                <AiOutlineLike className='text-2xl image3 mr-1 text-red-500'/>
                <h2 className='textsize1 '>Like</h2>
              </div>
              :
                <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center' onClick={()=>handleLike(item?._id)}>
                <AiOutlineLike className='text-2xl mr-1'/>
                <h2 className='textsize1'>Like</h2>
              </div>
              }
              <div className='h-5/6 w-3/12 flex divl text-xl justify-center items-center' onClick={() => toggleComment(item?._id)}>
                <FaRegCommentDots className='text-2xl image3 mr-1'/>
                <h2 className='textsize1'>Comment</h2>
              </div>
              <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center'>
                <AiOutlineLike className='text-2xl image3 mr-1'/>
                <h2 className='textsize1'>Repost</h2>
              </div>
              <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center'>
                <GrSend className='text-2xl image4 mr-1'/>
                <h2 className='textsize1'>Send</h2>
              </div>
              </div>
          </div>
                {openCommentId === item?._id && (
            <div className='comment-box'>
              {/* Comment input field, comment display, or any other components */}
              <h2 className='text-xl p-2 ml-2 font-medium font-serif underline comrestext'>Comments</h2>
              <div className='flex items-center justify-between'>
              <input type="text" className='inputcomment h-12 w-10/12 ml-2 rounded-md pl-4 border-2 border-slate-500' name='comment' value={cdata?.comment} onChange={handlecomment} />
              <button className='h-10 btnnn border-2 border-black rounded-md mr-1 hover:bg-slate-300 text-xl font-serif' onClick={()=>handlesavecomment(item?._id)}>Post</button>
              </div>
              <hr  className='h-1 mt-2 w-full bg-slate-200'/>
              {
                item?.Comment?.map((item,index)=>{
                  return (
                  <div className='flex m-3 mt-2 items-center' key={index}>
                <img src={item?.image} className='h-10 w-10 rounded-full mr-2' alt="" />
                <div>
                <h3 className='text-slate-400'>Posted By {item?.name}</h3>
                <p>{item?.comment}</p>
                </div>
              </div>
                  )
                })
              }
            </div>
          )}
          </div>
          </>
              )
            })
        }
        </div>
      </div>
      <div className='w-2/5 h-full flex mt-5 ml-5  items-start flex-col hresright'>
        <div className='h-2/3 leftup1 w-7/12 bg-white rounded-2xl'>
            <h1 className='mt-5 ml-5 text-xl mb-4'>Pending Requests</h1>
            {
              user?.request?.map((item,index)=>{
                return(
                <div className='flex items-center h-16 w-11/12 bg-slate-100 ml-5 justify-evenly' key={index}>
                  <img src={item.image} className='h-10 w10 rounded-md' alt="" />
                  <h2 className='text-lg'>{item.name}</h2>
                  <div className='h-10 items-center flex  rounded-full' onClick={() => handleallow(item?.id)}>
                    <AiOutlineCheckCircle className='text-2xl cursor-pointer' />
                  </div>
                  <div className='h-10  items-center flex  rounded-full'onClick={() =>handlereject(item?.id)}>
                    <ImCross className='text-s cursor-pointer' onClick={() =>handlereject(item?.id)}/>
                  </div>
                </div>
                )
              })
            }
        </div>
      </div>
    </div>
    {popupVisible && <Imagepopupbox onClose={closePopup} />}
    {popupVisible1 && <EventPopupBox onClose1={closePopup1} />}
    {popup && <SelectPopupBox onClose2={closePopup2}/>}
    </>
  )
}

export default Home
