const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const logger = require('morgan');
// const Sequelize = require('sequelize');
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

app.listen(port, () => console.log(`Example app listening on port ${port}!`));