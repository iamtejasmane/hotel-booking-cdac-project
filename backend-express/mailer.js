const mailer = require('nodemailer')

function sendEmail(email, subject, body, callback) {
 // create transport     
    const transport = mailer.createTransport({
    service : "gmail",
    sercure: false,
    auth: {
      user: "mytestacc404@gmail.com",
      pass: "testaccount200"
    }
    
    })
//verify
    transport.verify((error, success)=>{
    if(error)
        console.log(error)
    else
        console.log('Server is ready to our message',success)
    })

    const mailOption = {
        from: '<noreply@accommodationportal@portal.com>',
        to: email,
        subject: subject,
        html: body
    }
//send a mail
    transport.sendMail(mailOption, callback)
}

module.exports = {
  sendEmail: sendEmail
}