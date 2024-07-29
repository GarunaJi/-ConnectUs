import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadImage } from '../redux/features/ImageThunk';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

const ImageUploadPopup = ({ isOpen, onClose, onImageUpload }) => {
  const [imageFile, setImageFile] = useState(null);
  const [loading , setloading] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => ({...state?.auth?.data?.data}));
  const handleImageUpload = (e) => {
    const newImageFile = e.target.files[0];
    if (newImageFile) {
      setImageFile(newImageFile);
    //   onImageUpload(newImageFile);
      const previewURL = URL.createObjectURL(newImageFile);
      setImagePreview(previewURL);
    }
  };
  const CustomToastError = ({ message }) => (
    <div style={{ backgroundColor: '#333', color: 'Red', padding: '10px' }}>
      {message}
    </div>
  );
  // console.log(imageFile);
  const data1 = {
    imageFile : imageFile?imageFile:"",
    _id : user?._id
  }
  // console.log(data1);
  const upload = () =>{
    if (imageFile != '') {
      setloading(true);
      dispatch(uploadImage(data1,navigate))
      .then(()=>{
        setloading(true)
      }).catch((error)=>{
        console.log(error)
      });
    }
    else{
      toast(<CustomToastError message={'Please.Upload An Image'} />, {
        position: "top-center",
      });
    }
}
  
  return isOpen ? (
    <div className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-75'>
    <div className='w-96 bg-white p-8 rounded-lg shadow-md'>
        {loading ? 
         <div className="bouncing-loader-container">
         <div className="bouncing-loader">
           <div></div>
           <div></div>
           <div></div>
         </div>
       </div>
      : <div>{/* Render the fetched data */}</div>}
        <div className='flex justify-between mb-4'>
        <h1 className='text-2xl font-semibold mb-4'>Upload Your Image</h1>
        <button className='bg-blue-500 text-white px-4 py-2 rounded-md' onClick={onClose}>
    Close
</button>
        </div>
        <input
            type='file'
            className='hidden'
            accept='image/*'
            id='fileInput'
            onChange={handleImageUpload}
        />
        <label
            htmlFor='fileInput'
            className='cursor-pointer flex items-center justify-center  w-full h-10 bg-blue-500 text-white text-center rounded-lg p-4 hover:bg-blue-600 mb-4'
        >
            Select Image
        </label>
        {imagePreview && (
            <img
                src={imagePreview}
                alt='Image Preview'
                className='mx-auto max-w-full h-auto mb-4'
            />
        )}
        {imagePreview && (
            <button
                className='w-full bg-green-500 hover:bg-green-600 text-white rounded-lg px-4 py-2'
                onClick={upload}
            >
                Upload
            </button>
        )}
    </div>
</div>
  ) : null;
};

export default ImageUploadPopup;