const express = require("express");
const router = express.Router();

// Utilize Nodemailer for sending emails to me
const nodemailer = require('nodemailer');
const app = require("../app");

const busEmail = 'kjhall.business@gmail.com';
const frontContact = '[WP Email]: ';

// Utilize direct transport
const transporter = nodemailer.createTransport(
    {
        service: 'gmail'
    });

router.post('/', (req, res) => {

    let mail = {
        from: req.body.email,
        to: busEmail,
        subject: frontContact + req.body.subject,
        text: req.body.message
    }

    console.log(mail);
    
    transporter.sendMail(mail, (error, info) => {
        if(error)console.log(error);
        else console.log('Email Sent:' + info.response);
    });

    res.send('Request for email Recieved');
});

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
  });

module.exports = router;