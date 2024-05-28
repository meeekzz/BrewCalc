const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 4000;
const https = require('https');
const fs = require('fs');

//Make sure to keep this process running, either by keeping the terminal session open or using tools like pm2, forever, or 
//systemd for process management as mentioned earlier. These tools ensure that your Node.js application continues to run even 
//if the terminal session is closed or the server is restarted.


// Certificate
const privateKey = fs.readFileSync('/etc/letsencrypt/live/brewcalc.prochiller.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/brewcalc.prochiller.com/fullchain.pem', 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate,
};

app.use(cors());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb"}));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://brewcalc.prochiller.com:4000");//Modify the CORS settings in your Express app to allow requests from your React app's domain. You can replace '*' with your React app's domain or IP address.
    next();
});


function sendEmail( {name, busName, location, email, phone} ) {
    return new Promise((resolve, reject) => {
        var transporter = nodemailer.createTransport({
            host: 'relay.prochiller.com', 
            port: 587,
            secure: false,
            ignoreTLS: true,
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
            from: 'brewcalc@prochiller.com',
            to: 'slidecontroladam@gmail.com',
            subject: 'Brew Calculator Information',
            text: `
            Name: ${name}
            Company Name: ${busName}
            Location: ${location}
            Email: ${email}
            Phone Number: ${phone}            
          `,
          };

          transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
              console.error(error);
             return reject({ message: 'An error occurred while sending the email: ' + error });
            }

              return resolve({ message: 'Email sent successfully' + info });

          });
        });
      }


app.get("/", (req,res) => {
  console.log("Received GET request at /");
  sendEmail(req.query)
  .then((response) => {
    console.log("Email sent successfully:", response.message);
    res.status(200).send(response.message);
  })
  .catch((error) => {
    console.error("Error sending email:", error.message);
    res.status(500).send(error.message);  
  });
});

// Create HTTPS server
const httpsServer = https.createServer(credentials, app);

// Start HTTPS server
httpsServer.listen(port, () => {
    console.log(`nodemailer is listening at https://localhost:${port}`);
});