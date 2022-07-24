const nodemailer = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST || 'smtp.gmail.com',
      service: process.env.SERVICE || 'Gmail',
      port: 587,
      secure: true,
      auth: {
        user: process.env.USER || 'verify.influensup@gmail.com',
        pass: process.env.PASS || 'molhmxshjifzbzpe',

      },
    });

    await transporter.sendMail({
      from: process.env.USER ||  'Influensup <verify.influensup@gmail.com>',
      to: email,
      subject: subject,
      text: text,
    }, (err)=>{console.log(err)});
    console.log("email sent sucessfully");
    // res.send("check email");
  } catch (error) {
    console.log("email not sent");
    console.log(error);
  }
};

module.exports = sendEmail;