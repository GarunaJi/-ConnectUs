import express from 'express';
import { AdminLogin ,GoogleLogin,DeleteExp,handleselect,DeletePost,DeletePro,getnames, Register ,handlepostMessage ,form1,addcomment,addlike,getuserdata,fetchdatPost,authrequest,fetchdatEvent ,ProUp,addexpdata,EditPro,EdataUp,EditExp,fetchProdata,addprodata ,form2, fetchexpdata,getprofiledata, authfollow, getMessage, getsMessage} from '../controllers/Authcontollers.js';
const router = express.Router();

router.post('/loginnow',AdminLogin);
router.post('/Googlenow',GoogleLogin);
router.post('/register',Register);
router.post('/profile/form1',form1);
router.post('/profile/about',form2);
router.get('/profile/:id',getprofiledata);
router.get('/user/:id',getuserdata);
router.post('/profile/exp',addexpdata);
router.post('/profile/project',addprodata);
router.get('/exp/:id',fetchexpdata);
router.get('/Pro/:id',fetchProdata);
router.get('/EditById/:id',EditExp)
router.get('/EProById/:id',EditPro)
router.post('/Exp/Up',EdataUp)
router.post('/Pro/Up',ProUp)
router.get('/fetchpost',fetchdatPost)
router.get('/fetchEvent',fetchdatEvent)
router.post('/follow',authfollow)
router.post('/request',authrequest)
router.post('/like',addlike)
router.post('/comment',addcomment)
router.get('/getdataname',getnames)
router.delete('/deleteExp/:id',DeleteExp)
router.delete('/deletePro/:id',DeletePro)
router.delete('/deletePost/:id',DeletePost)
router.post('/select',handleselect)
router.post('/postmessage',handlepostMessage)
router.post('/getmessage',getMessage)
router.post('/getsmessage',getsMessage)
export default router;