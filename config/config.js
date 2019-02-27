const uuid = require('uuid/v4');

const config = {
  database: {
    connection: "mongodb://127.0.0.1:27017/userDataz", // TODO: get mongo atlas set up
    requirements: { useNewUrlParser: true,
                    useFindAndModify: false,
                    useCreateIndex: true,
                    poolSize: 10}
  },
  rptNumber: 10,
  session: {
    genid: (req) => {
      return uuid();
    },
    secret: 'Ful15tacKav3nture93jJEJNF9WNAKNFAEFA8FE9EE2nfejnf8w', // random
    resave: false,
    saveUninitialized: false,
    cookies: { secure: false } // since http is only currently supported
  },

};

module.exports = config;
