const nodemailer = require("nodemailer")


let main = async function (message){
    let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: testAccount.user, // generated ethereal user
    pass: testAccount.pass // generated ethereal password
  }
}, (error, info) => {
    if (error) {
        console.log('Error occurred');
        console.log(error.message);
        return process.exit(1);
    }

    console.log('Message sent successfully!');
    console.log(nodemailer.getTestMessageUrl(info));
});
console.log(message);
transporter.sendMail(message)
}

module.exports = main