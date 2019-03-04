// this file will be used to route all calls to the backend
const express = require("express");
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./config/config.js');
const mongodb = require('./components/database.js');
const authRegister = require('./components/authentication.js');
const bcrypt = require('bcrypt');
const localStrategy = require('passport-local').Strategy;
const cors = require('cors')
const userSchema = require('./components/models/userSchema.js');

// config the local strategy for passport
passport.use(new localStrategy(
  {usernameField: "email"},
  async (username, password, done) => {
    try {
      const response = await userSchema.find({email: username});
      if (!(response && response[0])) {
        return done(null, false, {message: 'Invalid credentials.\n'});
      }
      // since username is unique it should be the first one
      const user = response[0];
      // will compare the encrypted passwords
      const userInfo = await bcrypt.compare(password, user.password);
      if (!userInfo) {
        return done(null, false, {message: 'Invalid credentials.\n'});
      }
      console.log('Success');
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

// error handling
app.use((error, req, res, next) => {
  console.error(error.stack)
  res.status(500).send({error: error.error});
});

// session should piggy back on cookies
app.use(session(config.session));

// passport will piggy back off express
app.use(passport.initialize());

app.use(passport.session());

app.use(cors());


// routes
app.get('/', (req, res) => {
  res.send(``);
});

/* Will add pools after everything is working so will pretend it is implemented */

app.post('/login', (req, res, next) => {
  // TODO checked if already logged in?
  // standard passportjs custom callback login
  passport.authenticate('local', async (error, user, info) => {
    try {
      // check for issues
      if (info) return res.send(info.message);
      if (error) throw error;
    //  if (!user) return res.redirect('/login');
      req.login(user, async (error) => {
        if (error) {
          return next(error);
        }
        res.status(200).send({isAuthenticated: true});
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

app.get('/authrequired', async (req, res, next) => {
  if (req.user) {
    res.status(200).send({isAuthenticated: true});
    return;
  }
  res.status(400).send({isAuthenticated: false});
});

app.post('/register', async (req, res, next) => {
  try {
    // initialize the user object to contain required credentials
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      preferredName: req.body.preferredName,
      email: req.body.email,
      password: req.body.password,
      verified: false
    };
    // add the information to the database
    const result = await authRegister(mongodb, user);

    // check to see if the user has been registered
    if (result.error) {
      res.status(400).send(result);
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    next(error);
  }
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

app.post('*', (req, res, next) => {
  res.status(404).send({error: "Undefined endpoint was reached"});
});

// for now listen to local LocalHOst
app.listen(2002, () => {
  // something
  console.log("listening on 3000!");
});
