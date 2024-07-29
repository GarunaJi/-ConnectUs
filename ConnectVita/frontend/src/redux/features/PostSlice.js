import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api';
import { toast } from "react-toastify";

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

export const savedata = createAsyncThunk(
    'post/save',
    async ({formData,dispatch}, { rejectWithValue }) =>{
        try {
            // console.log(formData);
            const res = await api.savepost(formData);
            toast(<CustomToast message="Post added succesfully" />, {
                position: "top-center",
              });  
            // console.log(res);
            // const data1 = res.data;
            return res.data;
        } catch (error) {
            // console.log(error);
            toast(<CustomToastError message={error.response?error.response.data.message:error.message} />, {
                position: "top-center",
              });
              return rejectWithValue(error.response.data);
        }
    }
)

export const addlike = createAsyncThunk(
    'post/like',
    async (likedata) =>{
        try {
            const res = await api.addlikeId(likedata);
            // console.log(res);
            // toast.success("Liked the Post !!");
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const savecomment = createAsyncThunk(
    'post/comment',
    async (cdata) =>{
        try {
            // console.log(cdata);
            const res = await api.commentpost(cdata);
            // console.log(res);
            toast.success('Commented Successfully');
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const fetchpost = createAsyncThunk(
    'fetch/post',
    async ()=>{
        try {
            const res = await api.fetchpostdata();
            // console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
)

const PostSlice = createSlice({
    name:'Post',
    initialState:{
        post:null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder.addCase(fetchpost.fulfilled, (state, action) => {
            state.post = action.payload; // Update the state with the data1 payload
        });
    }
})

export const { setPost } = PostSlice.actions;

export default PostSlice.reducer;