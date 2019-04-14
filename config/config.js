import uuid from 'uuid/v4';

export default const config = {
  database: {
    connection: "mongodb+srv://simple:resume@cluster0-orevf.mongodb.net/test?retryWrites=true",
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
    secret: 'Ful15tacKav3nture93jJEJNF9WNAKNFAEFA8FE9EE2nfejnf8w', // random
    resave: false,
    saveUninitialized: false,
    cookies: {
      secure: false,
    }, // since http is only currently supported
  },
};
