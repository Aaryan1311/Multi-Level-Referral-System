const express = require('express');
const router = express.Router();

const { PurchaseController } = require('../../controllers');
const { purchaseMiddleware } = require('../../middlewares');
const { userMiddleware } = require('../../middlewares');

router.post('/', 
    purchaseMiddleware.validatePurchase,
    PurchaseController.createPurchase
);

router.get('/:purchaseId', 
    purchaseMiddleware.validatePurchaseIdParam,
    PurchaseController.getPurchaseById);

router.get('/user/:userId', 
    userMiddleware.validateUserIdParam,
    PurchaseController.getPurchasesByUserId);

module.exports = router;