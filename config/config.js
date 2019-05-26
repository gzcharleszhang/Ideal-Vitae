import uuid from 'uuid/v4';
import unknown from './unknown.js';

const config = {
  database: {
    connection: `mongodb+srv://${unknown.username}:${unknown.password}@cluster0-orevf.mongodb.net/test?retryWrites=true`,
    requirements: {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      poolSize: 10,
    },
  },
  rptNumber: 10,
  session: {
    genid: (req) => {
      return uuid();
    },
    secret: unknown.secret, // Will Change Later
    resave: false,
    saveUninitialized: false,
    cookies: {
      secure: false,
    }, // since http is only currently supported
  },
  origins: [
    `${unknown.url}`,
    `${unknown.url}/#/addEntry`,
    `${unknown.url}/#/additionalContact`,
    `${unknown.url}/#/displayData`,
  ],
};

export default config;
