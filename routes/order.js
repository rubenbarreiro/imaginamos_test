const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const to = require('await-to-js').default;

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

router.get('/order/filter', async (req, res) => {
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