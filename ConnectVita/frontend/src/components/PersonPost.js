import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router'
import {AiOutlineLike} from "react-icons/ai"
import {FaRegCommentDots} from "react-icons/fa"
import {AiFillPlusCircle} from "react-icons/ai"
import { addlike, fetchpost, savecomment } from '../redux/features/PostSlice';
import {AiFillDelete} from "react-icons/ai"
import { deletePost } from '../redux/features/AuthSlice';

const PersonPost = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {id} = useParams();
    const { post } = useSelector((state)=>({...state?.Post}))
    const { user } = useSelector((state) => ({...state?.auth?.data?.data}));
    const filteredPosts = post?.filter(post => post.id === id);
    const handlenavigate =(id) =>{
        navigate(`/profile/${id}`)
      }
      const [openCommentId, setOpenCommentId] = useState(null);
      const [cdata ,setcdata] = useState({
        comment:"",
        _id:user?._id,
        postid:''
      })
      const [like,setlike] = useState(false)

      let likedata = {
        _id:user?._id,
        postid:''
      }
      const handlecomment = (e) =>{
        setcdata({...cdata,[e.target.name]:e.target.value})
      } 
      const toggleComment = (postId) => {
        if (openCommentId === postId) {
          setOpenCommentId(null);
        } else {
          setOpenCommentId(postId);
        }
      };
    
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
      const handledelete = (id) =>{
        // console.log(id);
          dispatch(deletePost({id,navigate}));
      }
  return (
    <div className='w-full bg-Homecolor pt-16'>
    <div className=' divv'>
    <div className='w-full hhh '>
    {
      filteredPosts?.map((item,index)=>{
        return(
          <>
          <div className='widthp block m-auto mt-4 h-full '>
          <div className='h-20 w-full flex justify-between items-center' key={index}>
      <div className='w-60 h-full flex'>
        <img src={item?.image} onClick={()=>handlenavigate(item.id)} className='h-full w-20 p-1 cursor-pointer' alt="" />
        <div className='h-full w-40 flex ml-1 mt-1 flex-col'>
          <h1 className='text-lg cursor-pointer' onClick={()=>handlenavigate(item.id)} >{item?.name}</h1>
          <h1 className='text-gray-500'>Made With &#10084;&#65039;</h1>
        </div>
      </div>

      <div className='h-full w-24 mt-5 mr-5'>
      <div className='delete-button' onClick={() => handledelete(item._id)}>
        {
          (item?.id == user?._id)?
          <AiFillDelete className='cursor-pointer text-xl text-red-500' />
          :
          <></>
        }
  </div>
        {/* <h1 className='text-lg w-full h-10 rounded-xl cursor-pointer flex justify-center items-center text-blue-700'><AiFillPlusCircle className='mr-2 text-xl text-blue-500'/> Follow</h1> */}
      </div>
    </div>
    <div className='hi w-full'>
        <div className='h-16 p-1 text-s'>
          {item?.text}
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
              <h2>26 comments</h2>
            </div>
            <div className='h-16 w-full m-1 flex justify-around'>
              {
                item?.Like.includes(user?._id)?
                <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center' onClick={()=>handleDislike(item?._id)}>
                <AiOutlineLike className='text-2xl mr-1 text-red-500'/>
                <h2 className='textsize1'>Like</h2>
              </div>
              :
                <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center' onClick={()=>handleLike(item?._id)}>
                <AiOutlineLike className='text-2xl mr-1'/>
                <h2 className='textsize1'>Like</h2>
              </div>
              }
              <div className='h-5/6 w-3/12 flex divl text-xl justify-center items-center' onClick={() => toggleComment(item?._id)}>
                <FaRegCommentDots className='text-2xl mr-1'/>
                <h2 className='textsize1'>Comment</h2>
              </div>
              <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center'>
                <AiOutlineLike className='text-2xl mr-1'/>
                <h2 className='textsize1'>Repost</h2>
              </div>
              <div className='h-5/6 w-1/5 flex divl text-xl justify-center items-center'>
                <AiOutlineLike className='text-2xl mr-1'/>
                <h2 className='textsize1'>Send</h2>
              </div>
              </div>
          </div>
                {openCommentId === item?._id && (
            <div className='comment-box'>
              {/* Comment input field, comment display, or any other components */}
              <h2 className='text-xl p-2 ml-2 font-medium font-serif underline'>Comments</h2>
              <div className='flex items-center justify-between'>
              <input type="text" className='h-12 w-10/12 ml-2 rounded-md pl-4 border-2 border-slate-500' name='comment' value={cdata?.comment} onChange={handlecomment} />
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
  </div>
  )
}

export default PersonPost
