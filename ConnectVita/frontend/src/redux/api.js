import axios from 'axios';

const Api = axios.create({
    // baseURL :"https://linkedin-backend-be7n.onrender.com"
    // baseURL :"https://brave-pink-necklace.cyclic.app"
    baseURL :"http://localhost:5000/"
})

export const AdminLogin = (ldata) => Api.post('/api/loginnow',ldata);
export const GoogleLogin = (gdata) => Api.post('/api/Googlenow',gdata);
export const selectOption = (userType) => Api.post('/api/select',userType);
export const signUp = (rdata) => Api.post('/api/register',rdata);
export const form1data = (form1) => Api.post('/api/profile/form1',form1);
export const getdata = (_id) => Api.get(`/api/profile/${_id}`);
export const getuser = (_id) => Api.get(`/api/user/${_id}`);
export const getexp = (_id) => Api.get(`/api/exp/${_id}`);
export const getPro = (_id) => Api.get(`/api/Pro/${_id}`);
export const setabout = (adata) => Api.post('/api/profile/about',adata);
export const setexp = (Edata) => Api.post('/api/profile/exp',Edata);
export const setpdata = (pdata) => Api.post('/api/profile/project',pdata);
export const EditexpById = (_id) => Api.get(`/api/EditById/${_id}`);
export const EditProById = (_id) => Api.get(`/api/EProById/${_id}`);
export const updateExpdata = (Edata) => Api.post('/api/Exp/Up',Edata);
export const updateProdata = (pdata) => Api.post('/api/Pro/Up',pdata);
export const savepost = (formData) => Api.post('/api/post',formData);
export const saveEventdata = (formdata) => Api.post('/api/event',formdata);
export const fetchpostdata = () => Api.get('/api/fetchpost');
export const fetcheventdata = () => Api.get('/api/fetchevent');
export const addfollow = (data6) => Api.post('/api/follow',data6)
export const sendreq = (data) => Api.post('/api/request',data)
export const addlikeId = (likedata) => Api.post('/api/like',likedata)
export const commentpost = (cdata) => Api.post('/api/comment',cdata);
export const getnamearray = () => Api.get('/api/getdataname');
export const expdelete = (id)=>Api.delete(`/api/deleteExp/${id}`)
export const Prodelete = (id)=>Api.delete(`/api/deletePro/${id}`)
export const Postdelete = (id)=>Api.delete(`/api/deletePost/${id}`)
export const postmessage = (data) =>Api.post('/api/postmessage',data);
export const getmessage = (data) =>Api.post('/api/getmessage',data);
export const getsmessage = (data) =>Api.post('/api/getsmessage',data);