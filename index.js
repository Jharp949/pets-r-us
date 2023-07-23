//imports

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Customer = require('./models/customer');
const Appointment = require('./models/appointment');

const app = express();
const port = 3000;

const conn = 'mongodb+srv://web340-user1:wysKZJyxGUDvF8Nt@bellevueuniversity.rjtfcfy.mongodb.net/';

mongoose
  .connect(conn)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Not Connected to MongoDB ERROR! ", err);
  });

//Static Files

app.use(express.static('public'));
app.use('/styles', express.static(__dirname + 'public/styles'));
app.use('/images', express.static(__dirname + 'public/images'));
app.use('/js', express.static(__dirname + 'public/js'));

//Set views
app.set('views', './views');
app.use(expressLayouts);
app.set('layout', './layouts/layout');
app.set('view engine', 'ejs');
//index page
app.get('', (req, res) => {
    res.render('index')
});
//grooming page
app.get('/grooming', (req, res) => {
    res.render('grooming')
});
//boarding page
app.get('/boarding', (req, res) => {
    res.render('boarding')
});
//training page
app.get('/training', (req, res) => {
    res.render('training')
});

app.get('/register', (req, res) => {
    res.render('register');
  });

app.get('/customer-list', (req, res) => {
  res.render('customers');
});

app.get('/appointments', (req, res) => {
  res.render('appointments');
});
  
app.post('/register', (req, res) => {
  const { customerId, email } = req.body;
  
  const newCustomer = new Customer({ customerId, email });
  
  newCustomer.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
        console.log(error);
      res.status(500).send('Error registering customer.');
    });
  });

app.get('/booking', (req, res) => {
  // load services from the JSON file
  const services = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'public/data/services.json'), 'utf8'));
    
  res.render('booking', { services });
});

app.get('/api/appointments/:email', async (req, res) => {
  try {
    const appointments = await Appointment.find({ email: req.params.email });
    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

app.post('/appointments', (req, res) => {
  const { userName, firstName, lastName, email, service } = req.body;

  const newAppointment = new Appointment({ userName, firstName, lastName, email, service });

  newAppointment.save()
    .then(() => {
      res.redirect('/');
    })
    .catch(error => {
      console.log(error);
      res.status(500).send('Error registering appointment.');
    });
});

//Listen on port 3000
app.listen(port, () => console.info(`Listening on port ${port}`));
