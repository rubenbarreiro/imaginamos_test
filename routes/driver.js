const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driver');
const to = require('await-to-js').default;

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