const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const to = require('await-to-js').default;

/**
 * @typedef OrderCreate
 * @property {integer} clientAddressId.required - id de la direccion del cliente -
 * @property {string} deliveryDate.required - fecha de entrega - eg: 2020-01-15
 * @property {string} timePeriod.required - hora de entrega - eg: 1h a 8h
 */

/**
 * Crea una orden o pedido
 * @route post /order/create
 * @group Ordenes
 * @param {OrderCreate.model} request.body.required - cuerpo del request en formato json
 * @returns {object} 200 - Registro creado
 * @returns {Error}  default - Error inesperado
 * @produces application/json
 * @consumes application/json
 */
router.post('/order/create', async (req, res) => {
  const [err, data] = await to(orderController.create(req.body));
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