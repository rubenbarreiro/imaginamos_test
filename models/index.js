require('pg').defaults.parseInt8 = true;
const Sequelize = require('sequelize');

const sequelize = new Sequelize('imaginamos_test', 'postgres', 'postgres', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize.authenticate()
  .then(() => {
    console.log('conectado a la base de datos');
    const models = [
      'Client',
      'ClientAddress',
      'Driver',
      'DriverOrder',
      'Order'
    ];

    models.forEach(function (model) {
      module.exports[model] = sequelize.import(__dirname + '/' + model);
    });

    sequelize.sync();
  })
  .catch(ex => {
    console.error('error de conexion a la base de datos', ex);
    process.exit(0)
  });

// export connection
module.exports.sequelize = sequelize;