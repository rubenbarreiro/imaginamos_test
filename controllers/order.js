const Models = require('../models/');
const to = require('await-to-js').default;

class Order {
  create(params) {
    return new Promise(async (resolve, reject) => {
      let err, order, driver, clientAddress;
      [err, clientAddress] = await to(Models.ClientAddress.findOne({
        where: {
          id: params.clientAddressId
        }
      }));

      if (err) {
        return reject(err);
      }

      if (!clientAddress) {
        return reject(new Error('La direccion de envio no existe'));
      }

      [err, order] = await to(Models.Order.create(params));
      if (err) {
        console.log('client.js -- 23 > err === ', err);
        return reject(new Error('Ocurrio un error al registrar el conductor'));
      }

      this.assignToDriver(order.toJSON().id);
      return resolve(order);
    });
  }

  async assignToDriver(orderId) {
    let err, driver;
    [err, driver] = await to(Models.Driver.findOne({
      raw: true,
      order: Models.sequelize.random()
    }));

    if (err) {
      return;
    }

    [err] = await to(Models.DriverOrder.create({
      driverId: driver.id,
      orderId
    }));

    if (err) {
      console.error('No fue posible asignar la orden a un conductor', err);
    }

    return;
  }
}

module.exports = function () {
  return new Order();
}();