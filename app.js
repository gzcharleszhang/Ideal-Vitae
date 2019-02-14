// this file will be used to route all calls to the backend
const express = require("express");

// will need routes for login, register, make resume, add content, edit content, remove info, replace basic info

// look into pools for db connection (make connection here then pass it along)

// start simple w/ username/password auth then proceed to try other things

// do research on proper ways to structure database / code base before starting to write code

// keep trying stuff on the test repo to save time in the future

// files needed for auth/login things, resume saving/adding info, more to discuss later

// make the server
const app = express();

// middleware (add some more later)
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
