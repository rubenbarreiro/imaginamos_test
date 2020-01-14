const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const to = require('await-to-js').default;

/**
 * @typedef OrderCreate
 * @property {integer} clientAddressId.required - id de la direccion del cliente -
 * @property {string} deliveryDate.required - fecha de entrega - eg: 666
 * @property {Array.<Point>} Point
 */

/**
 * Crea una orden de servicio
 * @api {post} /order/create
 * @route post /order/create 
 * @group Ordenes
 * @param {OrderCreate.model} request.body.required - cuerpo del request en formato json
 * @returns {object} 200 - An array of user info
 * @returns {Error}  default - Unexpected error
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