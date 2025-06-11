const purchaseService = require('../services/purchase.service');
const { AppError } = require('../utils/error/app-error');
const { SuccessResponse } = require('../utils/common');

async function createPurchase(req, res, next){
    try {
        const { userId, amount } = req.body;
        const purchase = await purchaseService.createPurchase({ userId, amount });
        SuccessResponse.message = 'Purchase done successfully';
        SuccessResponse.data = purchase;
        return res.status(201).json(SuccessResponse);
    } catch (error) {
        console.log(error);
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return next(error);
    }
};

async function getPurchaseById(req, res, next) {
    try {
        const { purchaseId } = req.params;
        const purchase = await purchaseService.getPurchaseById(purchaseId);
        if (!purchase) {
            throw new AppError('Purchase not found', 404);
        }

        SuccessResponse.message = 'Purchase retrieved successfully';
        SuccessResponse.data = purchase;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return next(error);
    }
};

async function getPurchasesByUserId(req, res, next) {
    try {
        const { userId } = req.params;
        const purchases = await purchaseService.getPurchasesByUserId(userId);
        if (!purchases || purchases.length === 0) {
            throw new AppError('No purchases found for this user', 404);
        }
        SuccessResponse.message = 'Purchases retrieved successfully';
        SuccessResponse.data = purchases;

        return res.status(200).json(SuccessResponse);
    } catch (error) {
        if (error instanceof AppError) {
            return res.status(error.statusCode).json({ error: error.message });
        }
        return next(error);
    }
}

module.exports = {
    createPurchase,
    getPurchaseById,
    getPurchasesByUserId
};