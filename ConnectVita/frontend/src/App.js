import logo from './logo.svg';
import './App.css';
import {Route , Routes} from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import ProfileCompany from './components/ProfileCompany';
import Form1 from './components/Form1';
import Form2 from './components/Form2';
import Form3 from './components/Form3';
import Form4 from './components/Form4';
import withAuth from './withAuth';
import Login from './components/Login';
import Register from './components/Register';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import EditExp from './components/EditExp';
import Form3edit from './components/Form3edit';
import ProEdit from './components/ProEdit';
import Form4edit from './components/Form4edit';
import ImageUpload from './components/ImageUpload';
import PersonPost from './components/PersonPost';
import Event from './components/Event';
import Comment from './components/Comment';
import CompStud from './components/CompStud';
import Message from './components/Message';
import Network from './components/Network';
import ProfileOthers from './components/ProfileOthers';
import MessageBox from './components/MessageBox';

function App() {
  const {isAuthenticated}  = useSelector((state) => ({ ...state.auth }));
  const { user } = useSelector((state) => ({...state?.auth?.data?.data}));
  // console.log(user?.select);
  return (
    <>
    <Navbar/>
    <ToastContainer/>
    <>
    <Routes>
      <Route exact path='/' element={<Home/>}/>
      <Route exact path='/profile/:id' element={<Profile/>}/>
      <Route exact path='/profile/:id' element={<ProfileOthers/>}/>
      <Route exact path='/profilecomany/:id' element={<ProfileCompany/>}/>
      <Route exact path='/profile/form1' element={<Form1/>}/>
      <Route exact path='/profile/form2' element={<Form2/>}/>
      <Route exact path='/profile/form3' element={<Form3/>}/>
      <Route exact path='/profile/form3/edit' element={<Form3edit/>}/>
      <Route exact path='/profile/form4/edit' element={<Form4edit/>}/>
      <Route exact path='/profile/form4' element={<Form4/>}/>
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path='/Register' element={<Register/>}/>
      <Route exact path='/expEdit' element={<EditExp/>}/>
      <Route exact path='/ProEdit' element={<ProEdit/>}/>
      <Route exact path='/Upload' element={<ImageUpload/>}/>
      <Route exact path='/personalpost/:id' element={<PersonPost/>}/>
      <Route exact path='/event' element={<Event/>}/>
      <Route exact path='/comment/:id' element={<Comment/>}/>
      <Route exact path='/select' element={<CompStud/>}/>
      <Route exact path='/message' element={<Message/>}/>
      <Route exact path='/messagebox' element={<MessageBox/>}/>
      <Route exact path='/network' element={<Network/>}/>
    </Routes>
    </>
    </>
  );
}

export default App;
