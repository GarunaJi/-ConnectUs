import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { uploadImage } from '../redux/features/ImageThunk';

const ImageUpload = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const handleImageUpload = async e => {
        const newImageFile = e.target.files[0];
        if (newImageFile) {
            setImageFile(newImageFile);
            const previewURL = URL.createObjectURL(newImageFile);
            setImagePreview(previewURL);
        }
    };
    const upload = () =>{
        if (imageFile) {
            dispatch(uploadImage(imageFile));
        }
    }
  return (
    <div className='flex flex-col items-center justify-center h-screen bg-gray-100'>
    <div className='w-96 bg-white p-8 rounded-lg shadow-md'>
        <h1 className='text-2xl font-semibold mb-4'>Upload Your Image</h1>
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
                className='pheight max-w-full mb-4'
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
  )
}

export default ImageUpload
