const express = require('express');
const router = express.Router();

const { EarningController } = require('../../controllers');
const { userMiddleware } = require('../../middlewares');
const { purchaseMiddleware } = require('../../middlewares');


router.get('/user/:userId', 
    userMiddleware.validateUserIdParam,
    EarningController.getEarningsByUserId);

router.get('/source/:userId', 
    userMiddleware.validateUserIdParam,
    EarningController.getEarningsBySourceUserId);

router.get('/purchase/:purchaseId', 
    purchaseMiddleware.validatePurchaseIdParam,
    EarningController.getEarningsByPurchaseId);

router.get('/user/:userId/total', 
    userMiddleware.validateUserIdParam,
    EarningController.getTotalEarningsByUserId);

module.exports = router;
