const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const logger = require('morgan');
const expressSwagger = require('express-swagger-generator')(app);
const port = 3000;

// models
const clientRoutes = require('./routes/client');
const driverRoutes = require('./routes/driver');
const orderRoutes = require('./routes/order');

app.use(logger('dev'));
app.use(bodyParser.json());

app.use('/api', clientRoutes);
app.use('/api', driverRoutes);
app.use('/api', orderRoutes);

app.get('/', (req, res) => res.send('Hello World!'))

expressSwagger({
  swaggerDefinition: {
    info: {
      description: 'Imaginamos test API',
      title: 'Test',
      version: '0.0.1',
    },
    host: 'localhost:3000',
    basePath: '/api',
    produces: [
      "application/json",
      "application/xml"
    ],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "",
      }
    },
    schemes: ['http']
  },
  basedir: __dirname, //app absolute path
  files: ['./routes/**/*.js'] //Path to the API handle folder
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));