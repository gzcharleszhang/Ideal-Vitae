import uuid from 'uuid/v4';

const config = {
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
  origins: ['http://127.0.0.1:3000',
            'http://localhost:3000',
            'http://localhost:3000/#/addEntry',
            'http://localhost:3000/#/additionalContact',
            'http://localhost:3000/#/displayData',
          ],
};

export default config;
