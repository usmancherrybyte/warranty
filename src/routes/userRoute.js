import express from 'express';
const userRouter = express.Router();
import { socialSignup, emailSignin, passwordSignin, emailForgetPassword, verifyOTP, resetPassword} from '../controllers/authController.js';


userRouter.post('/social-signup', socialSignup);
userRouter.post('/email-signin', emailSignin);
userRouter.post('/password-signin', passwordSignin);
userRouter.post('/email-forgetpassword', emailForgetPassword);
userRouter.post('/verifyOTP-forgetpassword', verifyOTP);
userRouter.post('/resetpassword', resetPassword);

export default userRouter;
