const express = require('express');
const router = express.Router();
const { InfoController } = require('../../controllers');
const userRoutes = require('./user.routes');
const earningRoutes = require('./earning.routes');
const purchaseRoutes = require('./purchase.routes');

router.get('/info', InfoController.info);

router.use('/users', userRoutes);

router.use('/earnings', earningRoutes);

router.use('/purchases', purchaseRoutes);

module.exports = router;