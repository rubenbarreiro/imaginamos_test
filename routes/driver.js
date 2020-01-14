const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driver');
const to = require('await-to-js').default;

/**
 * @typedef DriverCreate
 * @property {string} names.required - nombre completo del conductor - eg: Pepito Perez
 * @property {email} document.required - numero de documento del conductor - eg: 11144477
 * @property {string} cellphone.required - numero celular del conductor - eg: 3111234567
 */

/**
 * @typedef DriverList
 * @property {integer} id
 * @property {string} names - nombre completo del conductor
 * @property {string} document - numero de documento del conductor - eg: 11144477
 * @property {string} cellphone - numero celular del conductor - eg: 3111234567
 * @property {string} createdAt - fecha de creacion
 * @property {string} updatedAt - fecha de actualizacion
 * @property {string} deletedAt - fecha de eliminacion
 */

/**
 * @typedef OrderList
 * @property {integer} id
 * @property {string} deliveryDate - fecha de entrega
 * @property {string} timePeriod - franja de hora - eg: 5h
 * @property {string} address - direccion de entrega - eg: mi casa #123
 * @property {string} client_name - nombre del cliente - eg: Juan Tabares
 * @property {string} client_cellphone - numero de celular del cliente - eg: 3054114477
 */

/**
 * Crea un nuevo conductor
 * @route post /driver/create
 * @group Conductores
 * @param {DriverCreate.model} request.body.required - cuerpo del request en formato json
 * @returns {object} 200 - Registro creado
 * @returns {Error}  default - Error inesperado
 * @produces application/json
 * @consumes application/json
 */
router.post('/driver/create', async (req, res) => {
  const [err, data] = await to(driverController.create(req.body));
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
 * Lista conductores registrados en el sistema
 * @route get /driver/list
 * @group Conductores
 * @returns {Array.<DriverList>} 200 - Array con conductores
 * @returns {Error}  default - Error inesperado
 * @produces application/json
 * @consumes application/json
 */
router.get('/driver/list', async (req, res) => {
  const [err, data] = await to(driverController.list());
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
 * Lista los pedidos asociados a un conductor
 * @route get /driver/orders
 * @group Conductores
 * @param {string} driverId.query.required - id del conductor a consultar - eg: 1
 * @param {string} date.query.required - fecha a consultar - eg: 2020-01-14
 * @returns {Array.<OrderList>} 200 - Array con ordenes
 * @returns {Error}  default - Error inesperado
 * @produces application/json
 * @consumes application/json
 */
router.get('/driver/orders', async (req, res) => {
  const [err, data] = await to(driverController.getOrders(req.query));
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