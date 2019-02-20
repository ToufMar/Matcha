var mail = require('nodemailer');

let mailOptionInscription = (link, email) => ({
    from: 'rotureau.martin@gmail.com',
    to: email,
    subject: 'Inscription to Matcha',
    html: "Welcome on Matcha<br/>Please click on this link to confirm your inscription :). <br/><a href="+link+">Click here</a>"
});

let transporter = mail.createTransport({
    service: 'gmail',
    auth: {
        user: 'rotureau.martin@gmail.com',
        pass: 'Cachou37'
    }
});

let sendMail = {
    inscription: (link, email) => {
        transporter.sendMail(mailOptionInscription(link, email), (error, info) => {
            if (error) {
                console.log(error)
            }
            console.log('envoyé')
        })
    },
}

module.exports = sendMail;