// this file will be used to route all calls to the backend
const express = require("express");S
const session = require('express-session');
const bodyParser = require('body-parser');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bycrypt = require('bycrpt');
const config = require('./config/config.js');
const mongodb = require('./components/database.js');

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

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('There was an issue.');
});

// routes
app.get('/', (req, res) => {
  res.send(``);
});

app.post('/login', (req, res) => {
  // insert passport js authentication
});

app.get('/authrequired', (req, res) => {
  // used later for authentication
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
app.listen(3000, () => {
  // something
});
