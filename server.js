const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./src/schema/schema');

const dotenv = require('dotenv');
dotenv.config();

const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
  console.log('mongoose connection established');
});

console.log(
  'Mongoose connection string---',
  process.env.MONGOOSE_CONNECTION_STRING
);
mongoose.connect(process.env.MONGOOSE_CONNECTION_STRING);

const app = express();

app.use(
  '/graphql',
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(4000, () => {
  console.log('Listening on port 4000');
});
