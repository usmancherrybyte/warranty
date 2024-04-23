import User from '../models/user.js';
import crypto from 'crypto';
import { generateAccessToken, generateOTP } from '../../utils/authFunctions.js';
import { sendEmail } from '../../utils/mailer.js'


// -------------------- Social SignUp ------------------------
export async function socialSignup(request, response) {
  try {
    let data = {};
    const { firstName, lastName, email, image, type, appId } = request.body;

    if (!firstName || !lastName || !email || !image || !type || !appId) {
      return response.status(404).send({ status: false, message: "User Input Error" });
    }

    console.log("req body--------------", request.body);
    // Check if the username or email already exists
    const user = await User.findOne({ email: email });
    if (user) {
      data.firstName = user.firstName;
      data.lastName = user.lastName;
      data.email = user.email;
      data.image = user.image;
      const accessToken = generateAccessToken(user._id, email);
      return response.status(200).send({ status: true, message: "SignIn Successful", data: data, accessToken: accessToken });
    }
    else {
      // Create new user
      const user = await User.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        image: image,
        type: type,
        appId: appId
      });

      data.firstName = user.firstName;
      data.lastName = user.lastName;
      data.email = user.email;
      data.image = user.image;

      const accessToken = generateAccessToken(user._id, email);
      return response.status(200).send({ status: true, message: "SignIn Successful", data: data, accessToken: accessToken });
    }
  } catch (error) {
    console.log('Error creating user-----------', error);
    return response.status(500).send({ status: false, message: "Error in Social Login" + error });
  }
}

// -------------------- Email SignUp ------------------------
export async function emailSignin(request, response) {
  try {
    let data = {};
    const { email } = request.body;
    if (!email) {
      return response.status(404).send({ status: false, message: "User Input Error" });
    }
    console.log("req body--------------", request.body);
    const user = await User.findOne({ email: email });
    if (user) {
      data.firstName = user.firstName;
      data.lastName = user.lastName;
      data.email = user.email;
      data.image = user.image;
      return response.status(200).send({ status: true, message: "Valid Input Email", data: data });
    }
    else {
      return response.status(404).send({ status: false, message: "User NOT Found" });
    }
  } catch (error) {
    console.log('Error Email Signin-----------', error);
    return response.status(500).send({ status: false, message: "Error in Email Signin" });
  }
}

// -------------------- Password SignUp ------------------------
export async function passwordSignin(request, response) {
  try {
    let data = {};
    const { email, password } = request.body;
    if (!email || !password) {
      return response.status(404).send({ status: false, message: "User Input Error" });
    }
    console.log("req body--------------", request.body);
    const user = await User.findOne({ email: email });
    if (user) {
      data.firstName = user.firstName;
      data.lastName = user.lastName;
      data.email = user.email;
      data.image = user.image;

      const passwordHash = crypto.createHash('sha256').update(password).digest('hex');

      if (passwordHash == user.password) {
        const accessToken = generateAccessToken(user._id, user.email)
        user.forgetPassVerfied = false;
        user.save();
        return response.status(200).send({ status: true, message: "Login Successful", accessToken: accessToken, data: data })
      }
      else {
        return response.status(404).send({ status: false, message: "Invalid Password" });
      }
    }
    else {
      return response.status(404).send({ status: false, message: "User NOT Found" });
    }
  } catch (error) {
    console.log('Error Password Signin-----------', error);
    return response.status(500).send({ status: false, message: "Error in Password Signin" });
  }
}


// -------------------- Email Forget Password ------------------------
export async function emailForgetPassword(request, response) {
  try {
    let data = {};
    const { email } = request.body;
    if (!email) {
      return response.status(404).send({ status: false, message: "User Input Error" });
    }
    console.log("req body--------------", request.body);
    const user = await User.findOne({ email: email });
    if (user) {
      data.firstName = user.firstName;
      data.lastName = user.lastName;
      data.email = user.email;
      data.image = user.image;

      user.OTP = generateOTP();
      user.save()

      let messageData = `Reset Password OTP: ${user.OTP}`

      sendEmail(user, messageData)
        .then(() => {
          console.log('Email sent successfully!');
          return response.status(200).send({ status: true, message: "Email Send Successfully", data: data });
        })
        .catch((error) => {
          console.error('Error sending email:', error);
          return response.status(500).send({ status: true, message: "Error in Sending Email", data: data });
        });
    }
    else {
      return response.status(404).send({ status: false, message: "User NOT Found" });
    }
  } catch (error) {
    console.log('Error Email Reset Password-----------', error);
    return response.status(500).send({ status: false, message: "Error in Email Reset Password" });
  }
}


// -------------------- verify OTP Forget Password ------------------------
export async function verifyOTP(request, response) {
  try {
    let data = {};
    const { email, otp} = request.body;
    if (!email || !otp) {
      return response.status(404).send({ status: false, message: "User Input Error" });
    }
    console.log("req body--------------", request.body);
    const user = await User.findOne({ email: email });
    if (user) {
      data.firstName = user.firstName;
      data.lastName = user.lastName;
      data.email = user.email;
      data.image = user.image;

      if(otp == user.OTP)
      {
        user.forgetPassVerfied = true;
        user.save()
        return response.status(200).send({ status: true, message: "OTP Verification Successful", data: data })
      }
      else
      {
        return response.status(404).send({ status: true, message: "OTP Verification Failed", data: data })
      }
    }
    else {
      return response.status(404).send({ status: false, message: "User NOT Found" });
    }
  } catch (error) {
    console.log('Verify OTP Forget Password-----------', error);
    return response.status(500).send({ status: false, message: "Error in verify OTP Forget Password" });
  }
}


// -------------------- Reset Password ------------------------
export async function resetPassword(request, response) {
  try {
    let data = {};
    const { email, newpassword} = request.body;
    if (!email || !newpassword) {
      return response.status(404).send({ status: false, message: "User Input Error" });
    }
    console.log("req body--------------", request.body);
    const user = await User.findOne({ email: email });
    if (user) {
      data.firstName = user.firstName;
      data.lastName = user.lastName;
      data.email = user.email;
      data.image = user.image;

      if(user.forgetPassVerfied == true)
      {
        const passwordHash = crypto.createHash('sha256').update(newpassword).digest('hex');
        user.password = passwordHash;
        user.save();

        return response.status(200).send({ status: true, message: "OTP Verification Successful", data: data })
      }
      else
      {
        return response.status(404).send({ status: true, message: "OTP Verification NOT Completed", data: data })
      }
    }
    else {
      return response.status(404).send({ status: false, message: "User NOT Found" });
    }
  } catch (error) {
    console.log('Reset Password-----------', error);
    return response.status(500).send({ status: false, message: "Error in Reset Password" });
  }
}