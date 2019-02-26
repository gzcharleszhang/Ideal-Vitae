// this file will be used to route all calls to the backend
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config/config.js');
const mongodb = require('./components/database.js');
//const auth = require('./components/authentication.js');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;

// config the local strategy for passport
passport.use(new localStrategy(
  {usernameField: "username"},
  async (username, password, done) => {
    try {
      const response = await userSchema.find({username: username});
      if (!(response || response[0])) {
        return done(null, false, {message: 'Invalid credentials.\n'});
      }
      // since username is unique it should be the first one
      const userInfo = await bcrypt.compare(password, response[0].password);
      if (!userInfo) {
        return done(null, false, {message: 'Invalid credentials.\n'});
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
))

// passport will store the serialized info in the cookies
passport.serializeUser((user, done) => {
  let userObj = {
    username: user.username
  };
  done(null, userObj);
});

passport.deserializeUser((info, done) => {
    done(null, info);
    return;
});

// make the server
const app = express();

// middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(session(config.session));

app.use(passport.initialize());

app.use(passport.session());

app.use((req, res, next) => {
  res.status(404).send("No such endpoint!");
});

app.use((error, req, res, next) => {
  console.error(error.stack)
  res.status(500).send('There was an issue.');
});

// routes
app.get('/', (req, res) => {
  res.send(``);
});

/* Will add pools after everything is working so will pretend it is implemented */

app.post('/login', (req, res, next) => {
  // have a wrapper to  deal with issue later
  passport.authenticate('local', async (error, user, info) => {
    try {
      if (info) return res.send(info.message);
      if (error) throw error;
      if (!user) return res.redirect('/login');
      req.login(user, async (error) => {
        if (error) {
          return next(error);
        }
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
  // insert passport js authentication
});

app.get('/authrequired', async (req, res, next) => {
  // used later for authentication
  if (req.user) {
    res.status(200);
    return;
  }
  res.status(400);
});

app.post('/register', (res, req) => {
  // will add new user
});

app.post('/additionalEntry', (req, res) => {
  // to add additional info to the database for the resume
});

app.post('/editEntry', (req, res) => {
  // update info in the database
});

app.get('/generateResume', (req, res) => {
  // should send back a json type object
});

// for now listen to local LocalHOst
app.listen(3001, () => {
  // something
});
