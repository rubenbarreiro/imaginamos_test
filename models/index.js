require('pg').defaults.parseInt8 = true;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $ne: Op.ne,
  $gte: Op.gte,
  $gt: Op.gt,
  $lte: Op.lte,
  $lt: Op.lt,
  $not: Op.not,
  $in: Op.in,
  $notIn: Op.notIn,
  $is: Op.is,
  $like: Op.like,
  $notLike: Op.notLike,
  $iLike: Op.iLike,
  $notILike: Op.notILike,
  $regexp: Op.regexp,
  $notRegexp: Op.notRegexp,
  $iRegexp: Op.iRegexp,
  $notIRegexp: Op.notIRegexp,
  $between: Op.between,
  $notBetween: Op.notBetween,
  $overlap: Op.overlap,
  $contains: Op.contains,
  $contained: Op.contained,
  $adjacent: Op.adjacent,
  $strictLeft: Op.strictLeft,
  $strictRight: Op.strictRight,
  $noExtendRight: Op.noExtendRight,
  $noExtendLeft: Op.noExtendLeft,
  $and: Op.and,
  $or: Op.or,
  $any: Op.any,
  $all: Op.all,
  $values: Op.values,
  $col: Op.col
};

const sequelize = new Sequelize('imaginamos_test', 'coldesoft_admin', 'YjJkMTU3OGUwM2I5MDhiY2FmZmQ3N2Nj', {
  operatorsAliases,
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