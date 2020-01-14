const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client');
const to = require('await-to-js').default;

/**
 * @typedef ClientCreate
 * @property {string} names.required - nombre completo del cliente - eg: John Doe
 * @property {email} email.required - email del cliente - eg: email@example.com
 * @property {string} cellphone.required - numero celular del cliente - eg: 3111234567
 */

/**
 * @typedef ClientList
 * @property {integer} id
 * @property {string} names - nombre completo del cliente
 * @property {email}  email - email del cliente - eg: email@example.com
 * @property {string} cellphone - numero celular del cliente - eg: 3111234567
 * @property {string} createdAt - fecha de creacion
 * @property {string} updatedAt - fecha de actualizacion
 * @property {string} deletedAt - fecha de eliminacion
 */

/**
 * @typedef AddressCreate
 * @property {integer} clientId.required - id del cliente al que se le creara direccion - eg: 1
 * @property {string} address.required - direccion del cliente = eg: false street 123
 */

/**
 * @typedef AddressesList
 * @property {integer} id
 * @property {string} address - direccion del cliente
 * @property {integer} clientId - id del cliente
 * @property {string} createdAt - fecha de creacion
 * @property {string} updatedAt - fecha de actualizacion
 * @property {string} deletedAt - fecha de eliminacion
 */

/**
 * Crea un nuevo cliente
 * @route post /client/create
 * @group Clientes
 * @param {ClientCreate.model} request.body.required - cuerpo del request en formato json
 * @returns {object} 200 - Registro creado
 * @returns {Error}  default - Error inesperado
 * @produces application/json
 * @consumes application/json
 */
router.post('/client/create', async (req, res) => {
  const [err, data] = await to(clientController.create(req.body));
  if (err) {
    return res.status(200).json({
      error: err.toString()
    });
  }

  return res.status(200).json({
    data
  });
});

/**
 * Lista clientes registrados en el sistema
 * @route get /client/list
 * @group Clientes
 * @returns {Array.<ClientList>} 200 - Array con clientes
 * @returns {Error}  default - Error inesperado
 * @produces application/json
 * @consumes application/json
 */
router.get('/client/list', async (req, res) => {
  const [err, data] = await to(clientController.list());
  if (err) {
    return res.status(200).json({
      error: err.toString()
    });
  }

  return res.status(200).json({
    data
  });
});

/**
 * Crea direcciones para un cliente
 * @route post /client/address/create
 * @group Clientes
 * @param {AddressCreate.model} request.body.required - cuerpo del request en formato json
 * @returns {object} 200 - Registro creado
 * @returns {Error}  default - Error inesperado
 * @produces application/json
 * @consumes application/json
 */
router.post('/client/address/create', async (req, res) => {
  const [err, data] = await to(clientController.createAddress(req.body));
  if (err) {
    return res.status(200).json({
      error: err.toString()
    });
  }

  return res.status(200).json({
    data
  });
});

/**
 * Lista direcciones de un determinado cliente
 * @route get /client/address/list
 * @group Clientes
 * @param {string} clientId.query.required - id del cliente a consultar - eg: 1
 * @returns {Array.<AddressesList>} 200 - Array con clientes
 * @returns {Error}  default - Error inesperado
 * @produces application/json
 * @consumes application/json
 */
router.get('/client/address/list', async (req, res) => {
  const [err, data] = await to(clientController.listAddress(req.query));
  if (err) {
    return res.status(200).json({
      error: err.toString()
    });
  }

  return res.status(200).json({
    data
  });
});


module.exports = router;