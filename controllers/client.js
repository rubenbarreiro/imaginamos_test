const Models = require('../models/');
const to = require('await-to-js').default;

class Client {
  list() {
    return new Promise(async (resolve, reject) => {
      const [err, data] = await to(Models.Client.findAll({
        raw: true
      }));
      if (err) {
        return reject(err);
      }

      return resolve(data);
    });
  }

  listAddress() {
    return new Promise(async (resolve, reject) => {
      const [err, data] = await to(Models.ClientAddress.findAll({
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
      let err, duplicated, client;
      [err, duplicated] = await to(Models.Client.findOne({
        where: {
          email: params.email
        }
      }));

      if (err) {
        return reject(err);
      }

      if (duplicated) {
        return reject(new Error(`Ya existe un cliente con email [${params.email}]`));
      }

      [err, client] = await to(Models.Client.create(params));
      if (err) {
        console.log('client.js -- 23 > err === ', err);
        return reject(new Error('Ocurrio un error al registrar el cliente'));
      }

      return resolve(client);
    });
  }

  createAddress(params) {
    return new Promise(async (resolve, reject) => {
      let err, client, duplicated, address;
      [err, client] = await to(Models.Client.findOne({
        where: {
          id: params.clientId
        }
      }));
      if (err) {
        return reject(err);
      }

      if (!client) {
        return reject(new Error('El cliente enviado no existe!'));
      }

      [err, duplicated] = await to(Models.ClientAddress.findOne({
        where: {
          clientId: params.clientId,
          address: params.address
        }
      }));
      if (err) {
        return reject(err);
      }

      if (duplicated) {
        return reject(new Error('La direccion ya se ecuentra asociada al cliente'));
      }

      [err, address] = await to(Models.ClientAddress.create({
        clientId: params.clientId,
        address: params.address
      }))


      return resolve(address);
    });
  }
};

module.exports = function () {
  return new Client();
}();