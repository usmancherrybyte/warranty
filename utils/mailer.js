import nodemailer from 'nodemailer';

// Send mail from my gmail account
const sendEmail = (user, data) => {
    console.log('-------------------->', user.email);

    const config = {
        service: 'gmail',
        auth: {
            user: 'sikandarmiirza@gmail.com',
            pass: 'yhortpsrzknkxnsa'
        }
    };

    const transporter = nodemailer.createTransport(config);

    const message = {
        from: 'sikandarmiirza@gmail.com',
        to: user.email,
        subject: 'Test Email',
        text: `${data}`
    };

    return transporter.sendMail(message);
};

export {sendEmail};
