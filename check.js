import speakeasy from 'speakeasy';

// Generate a secret
const secret = speakeasy.generateSecret({ length: 20 }); // Adjust length as needed

// Generate OTP
const otp = speakeasy.totp({
    secret: secret.base32,
    digits: 6,
    step: 120, // Time step in seconds, 2 minutes = 120 seconds
});

console.log('Generated OTP:', otp);
