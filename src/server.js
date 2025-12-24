require('module-alias/register');
const express = require('express');
const cors = require('cors');

const response = require('./utils/response');
const notFound = require('./middleware/notFound.middleware');

const routes = require('./routes');

const app = express();

const whitelist = [
  'http://localhost:5173',
  'https://node-buoi-02.onrender.com',
  process.env.CLIENT_URL
];
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      return callback(null, true);
    }

    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(response);

app.use('/api', routes);

const PORT = process.env.PORT || 3000;

app.use(notFound);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
