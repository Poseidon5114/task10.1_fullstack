const express = require('express');
const bodyParser = require('body-parser');
const mailgun = require('mailgun-js');

const app = express();


const API_KEY = 'd96bf24ff18a34518b22d35e423e3e4b-324e0bb2-dec1b10b';
const DOMAIN = 'https://app.mailgun.com/app/sending/domains/sandbox7b355470ab314b4a887bde96aeefb28e.mailgun.org';
const mg = mailgun({ apiKey: API_KEY, domain: DOMAIN });


app.use(bodyParser.urlencoded({ extended: false }));



app.post('/subscribe', (req, res) => {
    const { email } = req.body;
  
    const data = {
      from: 'olympian.hb@gmail.com',
      to: 'olympian.hb@gmail.com',
      subject: 'susbscription mail',
      text: 'Thanks for getting the newsletter',
    };
  
    mg.messages().send(data, (error, body) => {
      if (error) {
        console.error('Error sending email:', error);
        res.status(500).json({ error: 'Error sending email.' });
      } else {
        console.log('Email sent:', body);
        res.json({ message: 'Welcome email sent successfully.' });
      }
    });
  });

// for start of server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});