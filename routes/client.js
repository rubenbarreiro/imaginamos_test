const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client');
const to = require('await-to-js').default;

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

router.get('/client/address/list', async (req, res) => {
  const [err, data] = await to(clientController.listAddress());
  if (err) {
    return res.status(200).json({
      error: err.toString()
    });
  }

  return res.status(200).json({
    data
  });
});

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

module.exports = router;