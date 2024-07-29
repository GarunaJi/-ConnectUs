import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import * as api from '../api';
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

export const setform1p = createAsyncThunk(
  'auth/form1',
  async ({form1,navigate}, { rejectWithValue }) =>{
    try {
      const res = await api.form1data(form1);
      // console.log(res);
      toast(<CustomToast message="Details added succesfully" />, {
        position: "top-center",
      });      // navigate('/profile');
      // window.location.reload();
      return res;
    } catch (error) {
      console.log(error);
      toast(<CustomToastError message={error.response?error.response.data.message:error.message} />, {
        position: "top-center",
      });
      return rejectWithValue(error.response.data);
    }
  }
)

export const setExperience = createAsyncThunk(
  'auth/exp',
  async ({Edata,navigate}, { rejectWithValue })=>{
    try {
      const res = await api.setexp(Edata);
      // console.log(res);
      toast(<CustomToast message="Experience added succesfully" />, {
        position: "top-center",
      });       // navigate('/profile');
      return res;
    } catch (error) {
      console.log(error);
      toast(<CustomToastError message={error.response?error.response.data.message:error.message} />, {
        position: "top-center",
      });
      return rejectWithValue(error.response.data);
    }
  }
)

export const updateExp = createAsyncThunk(
  'auth/update',
  async ({Edata,navigate}) =>{
    try {
      // console.log(Edata);
      const res = await api.updateExpdata(Edata);
      toast(<CustomToast message="Exp Updated succesfully" />, {
        position: "top-center",
      });        // navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  }
)

export const updatePro = createAsyncThunk(
  'auth/update',
  async ({pdata,navigate}) =>{
    try {
      // console.log(Edata);
      const res = await api.updateProdata(pdata);
      toast(<CustomToast message="Project Updated succesfully" />, {
        position: "top-center",
      });       // navigate('/profile');
    } catch (error) {
      console.log(error);
    }
  }
)
export const setaboutdata = createAsyncThunk(
  'auth/about',
  async ({adata,navigate}, { rejectWithValue })=>{
    try {
      // console.log(adata);
      const res = await api.setabout(adata);
      // console.log(res);
      toast(<CustomToast message="About Added"/>, {
        position: "top-center",
      });
      // navigate('/profile');
      return res;
    } catch (error) {
      console.log(error);
      toast(<CustomToastError message={error.response?error.response.data.message:error.message} />, {
        position: "top-center",
      });
      return rejectWithValue(error.response.data);
    }
  }
)

export const getdata = createAsyncThunk(
  'auth/getdata',
  async (_id) =>{
    try {
      console.log(_id);
      const res = await api.getdata(_id);
      // console.log(res);
      // window.location.reload();
      return res;
    } catch (error) {
      console.log(error);
    }
  }
)

export const getuserdata = createAsyncThunk(
  'auth/getuserdata',
  async (_id) =>{
    try {
      const res = await api.getuser(_id);
      // console.log(res);
      return res;
    } catch (error) {
      console.log(error);
    }
  }
)

export const fetchexp = createAsyncThunk(
  'auth/fetchexp',
  async (_id) =>{
    try {
      const res = await api.getexp(_id);
      // console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
)

export const getExpeditId = createAsyncThunk(
'auth/EdiExpId',
async ({_id,navigate}) =>{
  try {
    const res = await api.EditexpById(_id);
    // console.log(res);
    // navigate('/profile');
    return res.data
  } catch (error) {
    console.log(error);
  }
}
)

export const getProeditId = createAsyncThunk(
'auth/EdiProId',
async ({_id,navigate}) =>{
  try {
    const res = await api.EditProById(_id);
    // console.log(res);
    // navigate('/profile');
    return res.data
  } catch (error) {
    console.log(error);
  }
}
)
export const fetctPro = createAsyncThunk(
  'auth/fetchPro',
  async (_id) =>{
    try {
      const res = await api.getPro(_id);
      // console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
)

export const addfollower = createAsyncThunk(
  'auth/follow',
  async (data6) =>{
    try {
      const res = await api.addfollow(data6);
      // console.log(res);
      toast(<CustomToast message="Connection request Send"/>, {
        position: "top-center",
      });      // window.location.reload();
      return res.data;
    } catch (error) {
      console.log(error);
      toast(<CustomToastError message={error.response?error.response.data.message:error.message} />, {
        position: "top-center",
      });
    }
  }
)

export const sendrequest = createAsyncThunk(
  'auth/request',
  async (data) =>{
    try {
      const res = await api.sendreq(data);
      // console.log(res);
      window.location.reload();
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
)

export const setproject = createAsyncThunk(
  'auth/Productadd',
  async({pdata,navigate}, { rejectWithValue }) => {
    try {
      const res = await api.setpdata(pdata)
      // console.log(res);
      toast(<CustomToast message="Project added succesfully" />, {
        position: "top-center",
      });      
            // navigate('/profile');
      return res;
    } catch (error) {
      console.log(error);
      toast(<CustomToastError message={error.response?error.response.data.message:error.message} />, {
        position: "top-center",
      });
      return rejectWithValue(error.response.data);
    }
  }
)

export const authlogin = createAsyncThunk(
  'auth/login',
  async ({ldata,navigate}, { rejectWithValue }) =>{
    try {
      const res = await api.AdminLogin(ldata);
      // console.log(res);
      toast(<CustomToast message={res.data.message} />, {
        position: "top-center",
      });
      navigate('/');
      return res;
    } catch (error) {
      console.log(error);
      toast(<CustomToastError message={error.response?error.response.data.message:error.message} />, {
        position: "top-center",
      });
      return rejectWithValue(error.response.data.message);
    }
  }
)

export const googleauth = createAsyncThunk(
  'auth/google',
  async ({gdata,navigate}, {rejectWithValue})=>{
    try {
        const res = await api.GoogleLogin(gdata);
        // console.log(res);
        navigate('/');
        return res;
      } catch (error) {
        console.log(error);
        toast(<CustomToastError message={error.response?error.response.data.message:error.message} />, {
          position: "top-center",
        });
        return rejectWithValue(error.response.data.message);
      }
  }
)

export const saveselect = createAsyncThunk(
  'auth/select',
  async ({userType,navigate},{rejectWithValue})=>{
    try {
      const res = await api.selectOption(userType);
      // console.log(res);
      return res;
    } catch (error) {
      console.log(error);
      toast(<CustomToastError message={error.response?error.response.data.message:error.message} />, {
        position: "top-center",
      });
      return rejectWithValue(error.response.data.message);
    }
  }
)

export const getname = createAsyncThunk(
  'auth/getname',
  async () =>{
    try {
      const res = await api.getnamearray();
      // console.log(res);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
)

export const deleteExp = createAsyncThunk(
  'delete/Exp',
  async ({id,navigate}) =>{
    try {
      // console.log(id);
      const res = await api.expdelete(id);
      // console.log(res);
      toast(<CustomToast message={'Deleted Successfully'} />, {
        position: "top-center",
      });
      navigate('/')
      return res.data;
    } catch (error) {
      console.log(error);
      toast(<CustomToastError message={error.response?error.response.data.message:error.message} />, {
        position: "top-center",
      });
    }
  }
)

export const deletePro = createAsyncThunk(
  'delete/Pro',
  async ({id,navigate}) =>{
    try {
      // console.log(id);
      const res = await api.Prodelete(id);
      // console.log(res);
      toast(<CustomToast message={'Deleted Successfully'} />, {
        position: "top-center",
      });
      navigate('/')
      return res.data;
    } catch (error) {
      console.log(error);
      toast(<CustomToastError message={error.response?error.response.data.message:error.message} />, {
        position: "top-center",
      });
    }
  }
)
export const deletePost = createAsyncThunk(
  'delete/Post',
  async ({id,navigate}) =>{
    try {
      // console.log(id);
      const res = await api.Postdelete(id);
      // console.log(res);
      toast(<CustomToast message={'Deleted Successfully'} />, {
        position: "top-center",
      });
      navigate('/')
      return res.data;
    } catch (error) {
      console.log(error);
      toast(<CustomToastError message={error.response?error.response.data.message:error.message} />, {
        position: "top-center",
      });
    }
  }
)
export const register = createAsyncThunk(
  'auth/register',
  async ({rdata,navigate})=>{
    try {
      // console.log(rdata);
      const response = await api.signUp(rdata);
      // console.log(response);
      toast(<CustomToast message={response.data.message} />, {
        position: "top-center",
      });
      navigate('/login');
      return response.data;
    } catch (error) {
      console.log(error);
      toast(<CustomToastError message={error.response?error.response.data.message:error.message} />, {
        position: "top-center",
      });
      }
  }
)

const persistedState = localStorage.getItem('profile')
  ?  JSON.parse(localStorage.getItem('profile')) : null;

const persistedState1 = localStorage.getItem('auth')
  ?  JSON.parse(localStorage.getItem('auth')) : false;

const AuthSlice = createSlice({
    name:"auth",
    initialState:{
        isAuthenticated: persistedState1,
        data:persistedState,
        exp:null,
        Pro:null,
        image:null,
        profile:null
    },
    reducers:{
        setUser: (state, action) => {
            state.data = action.payload;
          },
          getdata:(state,action) =>{
            state.profile = action.payload;
          },
          login: (state , action) => {
            state.isAuthenticated = action.payload.data.isauth;
          },
          setLogout: (state) => {
            state.isAuthenticated = false;
            localStorage.clear();
            state.data = null;
          },
          addImage: (state, action) => {
            state.image = action.payload;
          },
    },
    extraReducers:{
      [authlogin.pending]: (state, action) => {
        state.loading = true;
      },
      [authlogin.fulfilled]: (state, action) => {
        state.loading = false;
        localStorage.setItem("auth", JSON.stringify(action.payload.data.token ));
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.data = action.payload;
        state.isAuthenticated = action.payload.data.token;
      },
      [authlogin.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      [googleauth.pending]: (state, action) => {
        state.loading = true;
      },
      [googleauth.fulfilled]: (state, action) => {
        state.loading = false;
        localStorage.setItem("auth", JSON.stringify(action.payload.data.token ));
        localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
        state.data = action.payload;
        state.isAuthenticated = action.payload.data.token;
      },
      [googleauth.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      [getdata.pending]: (state, action) => {
        state.loading = true;
      },
      [getdata.fulfilled]: (state, action) => {
        state.loading = false;
        localStorage.setItem("profiledata", JSON.stringify({ ...action.payload }));
        state.profile = action.payload;
        // state.isAuthenticated = action.payload.data.token;
      },
      [getdata.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      [getuserdata.pending]: (state, action) => {
        state.loading = true;
      },
      [getuserdata.fulfilled]: (state, action) => {
        state.loading = false;
        localStorage.setItem("userdata", JSON.stringify({ ...action.payload }));
        state.data = action.payload;
        // state.isAuthenticated = action.payload.data.token;
      },
      [getuserdata.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      [fetchexp.pending]: (state, action) => {
        state.loading = true;
      },
      [fetchexp.fulfilled]: (state, action) => {
        state.loading = false;
        // localStorage.setItem("profiledata", JSON.stringify({ ...action.payload }));
        state.exp = action.payload;
        // state.isAuthenticated = action.payload.data.token;
      },
      [fetchexp.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      },
      [fetctPro.pending]: (state, action) => {
        state.loading = true;
      },
      [fetctPro.fulfilled]: (state, action) => {
        state.loading = false;
        // localStorage.setItem("profiledata", JSON.stringify({ ...action.payload }));
        state.Pro = action.payload;
        // state.isAuthenticated = action.payload.data.token;
      },
      [fetctPro.rejected]: (state, action) => {
        state.loading = false;
        state.error = action.payload;
      }
    }
})

export const { setUser, setLogout , addImage} = AuthSlice.actions;

export default AuthSlice.reducer;
