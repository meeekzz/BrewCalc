const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb"}));
app.use((req, res, next) => {
    res.setHeader("Acess-Control-Allow-Origin", "*");
    next();
});



function sendEmail(data) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            host: 'relay.prochiller.com', 
            port: 587,
            secure: false,
          });

          transporter.verify(function(error, success) {
            if (error) {
              console.error('Error connecting to SMTP server:', error);
              reject({ message: 'Error connecting to SMTP server: '+ error});
            } else {
              console.log('SMTP server connection successful');
              resolve({message: 'SMTP server connection successful' + success});
            }
          });
      
          const mailOptions = {
            from: 'BrewloadSurvey@a2plvcpnl12268.prod.iad2.secureserver.net',
            to: 'slidecontroladam@gmail.com',
            subject: 'Brew Calculator Information',
            text: `
            Name: ${data.name}
            Company Name: ${data.busName}
            Location: ${data.location}
            Email: ${data.email}
            Phone Number: ${data.phone}            
          `,
          };
          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.error(error);
              // Include error message in response
              reject({ message: 'An error occurred while sending the email: ' + error });
            } else {
              console.log('Email sent successfully');
              // Include success message in response
              resolve({ message: 'Email sent successfully' + info });
            }
          });
        });
      }


app.get("/", (req,res) => {
  const { name, busName, location, email, phone } = req.query;
    sendEmail( { name, busName, location, email, phone } )
    .then((response) => res.send(response.message))
    .catch((error) => res.status(500).send(error.message));
});

app.listen( () => {
    console.log(`nodemailer is listening at https://brewcalc.prochiller.com`)
});
