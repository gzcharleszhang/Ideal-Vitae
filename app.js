import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import mongodb from './components/Database.js';
import userSchema from './components/models/UserSchema.js';
import config from './config/config.js';
import {
  authRegister,
  addEntry,
} from './components/DbModifier.js';
const localStrategy = require('passport-local').Strategy;

// config the local strategy for passport
passport.use(new localStrategy({ usernameField: "email" },
  async (username, password, done) => {
    try {
      const response = await userSchema.find({ email: username });
      if (!(response && response[0])) {
        return done(null, false, { message: 'Invalid credentials.\n' });
      }
      // since username is unique it should be the first one
      const user = response[0];
      // will compare the encrypted passwords
      const userInfo = await bcrypt.compare(password, user.password);
      if (!userInfo) {
        return done(null, false, { message: 'Invalid credentials.\n' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
))

// passport will store the serialized info in the cookies
passport.serializeUser((user, done) => {
  const {
    id,
  } = user;
  const userObj = {
    id,
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

app.use(function(req, res, next) {
  const allowedOrigins = [...config.origins];
  const origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  //res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:8020');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  return next();
});

// routes
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
        res.status(200).send({ isAuthenticated: true });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

app.get('/authrequired', async (req, res, next) => {
  if (req.user) {
    res.status(200).send({ isAuthenticated: true });
    return;
  }
  res.status(400).send({ isAuthenticated: false });
});

app.post('/register', async (req, res, next) => {
  try {
    // initialize the user object to contain required credentials
    const {
      email,
      lastName,
      password,
      firstName,
      preferredName,
    } = req.body;
    const userDetails = {
      email,
      lastName,
      password,
      firstName,
      preferredName,
      verified: false,
    };
    // add the information to the database
    const result = await authRegister(mongodb, userDetails);
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

app.post('/additionalEntry', async (req, res, next) => {
  // to add additional info to the database for the resume
  try {
    const {
      id,
    } = req.user;
    const {
      keyWords,
      location,
      pointForm,
      sectionSummary,
      topicOfSection,
      titleAndPosition,
      subtopicOfSection,
    } = req.body;
    const newEntry = {
      id,
      sectionOfResume : {
        keyWords,
        location,
        pointType,
        sectionSummary,
        topicOfSection,
        titleAndPosition,
        subtopicOfSection,
      },
    };
    const result = await addEntry(mongodb, newEntry);
    if (result.error) {
      res.status(400).send(result);
    } else {
      res.status(200).send(result);
    }
  } catch (error) {
    next(error);
  }
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
