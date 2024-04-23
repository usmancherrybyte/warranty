import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import speakeasy from 'speakeasy';
dotenv.config();

const generateAccessToken = (firstName, lastName, email) => {
    return jwt.sign({ firstName, lastName, email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
}

const generateRefreshToken = (firstName, lastName, email) => {
    return jwt.sign({ firstName, lastName, email }, process.env.REFRESH_TOKEN_SECRET);
}



// Function to generate OTP
function generateOTP() {
    // Generate a secret
    const secret = speakeasy.generateSecret({ length: 20 }); // Adjust length as needed

    // Generate OTP
    const otp = speakeasy.totp({
        secret: secret.base32,
        digits: 6,
        step: 120, // Time step in seconds, 2 minutes = 120 seconds
    });

    return otp; // Return the generated OTP
}


export { generateAccessToken, generateRefreshToken, generateOTP};
