const Models = require('../models/');
const to = require('await-to-js').default;

class Driver {
  getOrders(params) {
    return new Promise(async (resolve, reject) => {
      Models.DriverOrder.belongsTo(Models.Order, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: 'orderId',
        targetKey: 'id'
      });

      const [err, orders] = await to(Models.DriverOrder.findAll({
        raw: true,
        where: {
          driverId: params.driverId
        },
        include: [Models.Order]
      }));

      if (err) {
        console.error('driver.js -- 23 >  === ', err);
        return reject(err);
      }

      return resolve(orders);
    });
  }

  list() {
    return new Promise(async (resolve, reject) => {
      const [err, data] = await to(Models.Driver.findAll({
        raw: true
      }));
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  }

  create(params) {
    return new Promise(async (resolve, reject) => {
      let err, duplicated, driver;
      [err, duplicated] = await to(Models.Driver.findOne({
        where: {
          document: params.document
        }
      }));

      if (err) {
        return reject(err);
      }

      if (duplicated) {
        return reject(new Error(`Ya existe un conductor con documento [${params.document}]`));
      }

      [err, driver] = await to(Models.Driver.create(params));
      if (err) {
        console.log('client.js -- 23 > err === ', err);
        return reject(new Error('Ocurrio un error al registrar el conductor'));
      }

      return resolve(driver);
    });
  }
}

module.exports = function () {
  return new Driver();
}();