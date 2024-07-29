import { addImage } from './AuthSlice';
import axios from 'axios';  
import {toast} from 'react-toastify'

const CustomToastError = ({ message }) => (
  <div style={{ backgroundColor: '#333', color: 'Red', padding: '10px' }}>
    {message}
  </div>
);

const CustomToast = ({ message }) => (
  <div style={{ backgroundColor: '#333', color: '#fff', padding: '10px' }}>
    {message}
  </div>
);

// Thunk to upload image to Cloudinary and dispatch addImage action
export const uploadImage = (data1,navigate) => async dispatch => {
  try {
    const formData = new FormData();
    formData.append('image', data1.imageFile);
    formData.append('id', data1._id);
    // console.log(formData);
    // console.log("*************************");
    const response = await axios.post('https://linkedin-backend-be7n.onrender.com/upload', formData);
    // console.log('Image uploaded:', response.data.secure_url);
    // console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
    // const data = response.data.secure_url;
    // console.log(data);
    window.location.reload();
  } catch (error) {
    console.error('Error uploading image:', error);
    toast(<CustomToastError message={error.response?error.response.data.message:error.message} />, {
      position: "top-center",
    });
  }
};
