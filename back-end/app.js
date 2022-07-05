const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session')
require('./services/oauth2/passport-setup')
require('dotenv').config();
const db = require("./database");
const bodyParser = require('body-parser');
const cors = require('cors');
const userRoute = require('./src/routes/userRoutes');
const carRoute = require('./src/routes/carRoute');

const favorisRoute = require('./src/routes/favorisRoute');

const historicalRoute = require('./src/routes/historicalRoute');
const chpRoute = require('./src/routes/chpRoutes')
const rsvRoutes = require('./src/routes/rsvRoutes')
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(bodyParser.json())

app.use(cookieSession({
  name: 'tuto-session',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use("/api/users", userRoute);
app.use("/api/cars", carRoute);
app.use("/api/favoris", favorisRoute);
app.use("api/historical", historicalRoute);

const isLoggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.status(401);
  }
}

app.get('/', (req, res) => res.send('Example Home page!'))
app.get('/failed', (req, res) => res.send('You Failed to log in!'))

// In this route you can see that if the user is logged in u can acess his info in: req.user
app.get('/good', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user.displayName}!`))

// Auth Routes
app.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failed' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/good');
  }
);

app.use("/api/chp", chpRoute);
app.use("/api/rsv", rsvRoutes);


module.exports = app;