const uuid = require('uuid/v4');

const config = {
  databaseConnection: "mongodb://127.0.0.1:27017/resumeDB",
  rptNumber: 21,:
  session: {
    genid: (req) => {
      return uuid();
    },
    secret: 'Ful15tacKav3nture93jJEJNF9WNAKNFAEFA8FE9EE2nfejnf8w',
    resave: false,
    saveUninitialied: false,
    cookies: { secure: false } // since http is only currently supported
  },

};

module.exports = config;
