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

export const saveEvent = createAsyncThunk(
    'event/save',
    async (formdata, { rejectWithValue }) =>{
        try {
            const res = await api.saveEventdata(formdata);
            toast(<CustomToast message="Event added succesfully" />, {
                position: "top-center",
            });  
            // console.log(res);
            // const data1 = res.data;
            // window.location.reload();
            return res.data;
        } catch (error) {
            console.log(error);
            toast(<CustomToastError message={error.response?error.response.data.message:error.message} />, {
                position: "top-center",
              });
              return rejectWithValue(error.response.data);
        }
    }
)

export const getEvents = createAsyncThunk(
    'fetch/Events',
    async () =>{
        try {
            const res = await api.fetcheventdata();
            // console.log(res);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    }
)

const EventSlice = createSlice({
    name:'Event',
    initialState:{
        Event:null
    },
    reducers:{},
    extraReducers:{
        [getEvents.fulfilled]: (state,action) =>{
            state.Event = action.payload;
        }
    }
})
export const { setEvent } = EventSlice.actions;

export default EventSlice.reducer;