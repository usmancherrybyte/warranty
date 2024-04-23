import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String},
    phoneNumber: {type: String},
    address: {type: String},
    image: {type: String},
    OTP: {type: Number, default: 0},
    verfied: {type: Boolean, default: false},
    //forgetPasswordVerification
    forgetPassVerfied: {type: Boolean, default: false},
    loginKey: {type: Number},
    appId: {type: Number},
  });


const User = mongoose.model('User', UserSchema);

export default User;