import nodemailer from "nodemailer"

const sendEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    await transporter.sendMail({
        from :process.env.EMAIL_USER,
        to: email,
        subject: "Your Email Verification OTP",
        html: `<h2>Your OTP</h2>
        <h1>${otp}</h1>
        <p>This otp will expire in 5 minutes</p>
        `
    })
}


export default sendEmail;