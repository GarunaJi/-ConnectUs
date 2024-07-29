import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api';
import {toast} from 'react-toastify'

export const Sendmessage = createAsyncThunk(
    'message/post',
    async(data) =>{
        try {
            // console.log(data);
            const res = await api.postmessage(data);
            // console.log(res);
            toast.success("Message send");
            return res;
        } catch (error) {
            console.log(error);
        }
    }
)

export const getsenderdata = createAsyncThunk(
    'message/gets',
    async(data) =>{
        try {
            const res = await api.getsmessage(data);
            // console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
)

export const getmessagedata = createAsyncThunk(
    'message/get',
    async(data) =>{
        try {
            const res = await api.getmessage(data);
            // console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
)

const MessageSlice = createSlice({
    name:"message",
    initialState:{
        loading:false,
        recieverData:[],
        senderData:[]
    },
    reducers:{
        setMess:(state , action )=>{
            state.senderData = action.payload;
        },
        GetMess:(state , action )=>{
            state.reciverData = action.payload;
        }
    },
    extraReducers:{
        [getmessagedata.pending]: (state, action) => {
            state.loading = true;
          },
          [getmessagedata.fulfilled]: (state, action) => {
            state.loading = false;
            state.recieverData = action.payload;
          },
          [getmessagedata.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
        [getsenderdata.pending]: (state, action) => {
            state.loading = true;
          },
          [getsenderdata.fulfilled]: (state, action) => {
            state.loading = false;
            state.senderData = action.payload;
          },
          [getsenderdata.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
          },
    }
})

export const {  } = MessageSlice.actions;

export default MessageSlice.reducer;