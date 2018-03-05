const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const keys = require('./config/keys');
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app); // use the authRoutes
require('./routes/billingRoutes')(app); // Use the billing routes

if (process.env.NODE_ENV === 'production') {
  // make sure express surve prodcution assets like main.css and main.html
  app.use(express.static('client/build'));
  // Express will serve up index.html if it doesn't have a route handles
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`App listening to port ${PORT}`));

//https://fathomless-badlands-95725.herokuapp.com/
