const express = require('express');
     const path = require('path');
     const axios = require('axios');
     const qs = require('qs'); 
     require('dotenv').config();
     const app = express();
     const port = 3000;

     app.use(express.urlencoded({ extended: true }));
     app.use(express.static(path.join(__dirname, 'public')));

     app.get('/', (req, res) => {
       res.sendFile(path.join(__dirname, 'public', 'index.html'));
     });

     app.post('/submit', async (req, res) => {
       const { name, age, 'h-captcha-response': hCaptchaResponse } = req.body;
       console.log('Form data:', { name, age, hCaptchaResponse: hCaptchaResponse ? 'present' : 'missing' });
       console.log('Secret Key:', process.env.HCAPTCHA_SECRET_KEY ? 'present' : 'missing');

       const errors = [];
       if (!name) errors.push('Name is required');
       if (!age || isNaN(age) || age <= 0) errors.push('Valid age is required');
       if (!hCaptchaResponse) errors.push('CAPTCHA response is missing');
       if (!process.env.HCAPTCHA_SECRET_KEY) errors.push('Secret Key is missing');
       if (errors.length > 0) {
         console.log('Validation errors:', errors);
         return res.status(400).send(`Invalid input: ${errors.join(', ')}.`);
       }

       try {
         const verifyUrl = 'https://hcaptcha.com/siteverify';
         const secretKey = process.env.HCAPTCHA_SECRET_KEY;
         const response = await axios.post(
          verifyUrl,
          qs.stringify({ secret: secretKey, response: hCaptchaResponse }),
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        );
         console.log('SK:', secretKey);
         console.log('hCaptchaResponse:', hCaptchaResponse)
         console.log('hCAPTCHA API response:', response.data);
         if (response.data.success) {
           res.redirect(`/success?name=${encodeURIComponent(name)}&age=${age}`);
         } else {
           console.log('hCAPTCHA verification failed:', response.data);
           res.status(400).send(`CAPTCHA verification failed: ${response.data['error-codes']?.join(', ') || 'Unknown error'}.`);
         }
       } catch (error) {
         console.error('hCAPTCHA verification error:', error.message);
         res.status(500).send('Server error during CAPTCHA verification.');
       }
     });

     app.get('/success', (req, res) => {
       res.sendFile(path.join(__dirname, 'public', 'success.html'));
     });

     app.listen(port, () => {
       console.log(`Server running at http://127.0.0.1:${port}`);
     });