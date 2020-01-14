const Models = require('../models/');
const to = require('await-to-js').default;
const moment = require('moment-timezone');
const _ = require('lodash');

class Driver {
  getOrders(params) {
    return new Promise(async (resolve, reject) => {
      let err, orders;
      Models.DriverOrder.belongsTo(Models.Order, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: 'orderId',
        targetKey: 'id'
      });

      Models.Order.belongsTo(Models.ClientAddress, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: 'clientAddressId',
        targetKey: 'id'
      });

      Models.ClientAddress.belongsTo(Models.Client, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
        foreignKey: 'clientId',
        targetKey: 'id'
      });

      const dateStart = moment(params.date).startOf('day');
      const dateEnd = moment(params.date).endOf('day');

      [err, orders] = await to(Models.DriverOrder.findAll({
        attributes: [
          ['orderId', 'id'],
          [Models.sequelize.col('order.deliveryDate'), 'deliveryDate'],
          [Models.sequelize.col('order.timePeriod'), 'timePeriod'],
          [Models.sequelize.col('order.client_address.address'), 'address'],
          [Models.sequelize.col('order.client_address.client.names'), 'client_name'],
          [Models.sequelize.col('order.client_address.client.cellphone'), 'client_cellphone']
        ],
        raw: true,
        where: {
          driverId: params.driverId,
          '$order.deliveryDate$': {
            $gte: dateStart.format("YYYY-MM-DD HH:mm:ss"),
            $lte: dateEnd.format("YYYY-MM-DD HH:mm:ss")
          }
        },
        include: [{
          attributes: [],
          model: Models.Order,
          required: true,
          include: [{
            model: Models.ClientAddress,
            attributes: [],
            required: true,
            include: [{
              model: Models.Client,
              required: true,
              attributes: []
            }]
          }]
        }]
      }));

      if (err) {
        console.error('driver.js -- 23 >  === ', err);
        return reject(err);
      }

      orders = _.map(orders, order => {
        order.deliveryDate = moment.tz(order.deliveryDate, "UTC").tz('America/Bogota').format("YYYY-MM-DD HH:mm:ss");

        return order;
      });

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
        console.error('client.js -- 23 > err === ', err);
        return reject(new Error('Ocurrio un error al registrar el conductor'));
      }

      return resolve(driver);
    });
  }
}

module.exports = function () {
  return new Driver();
}();