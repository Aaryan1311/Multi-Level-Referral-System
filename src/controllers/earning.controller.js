const earningService = require('../services/earning.service');
const { SuccessResponse } = require('../utils/common');
const AppError = require('../utils/error/app-error');

async function getEarningsByUserId(req, res, next) {
    try {
        const { userId } = req.params;
        const earnings = await earningService.getEarningsByUserId(userId);
        if (!earnings || earnings.length === 0) {
            throw new AppError('No earnings found for this user', 404);
        }
        SuccessResponse.message = 'Earnings retrieved successfully';
        SuccessResponse.data = earnings;
        return res.status(200).json(SuccessResponse);
    } catch (error) {
        console.error('Error retrieving earnings by user ID:', error);
        return next(error);
    }
};

const getEarningsBySourceUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        // console.log('Fetching earnings for source user ID:', userId);
        const earnings = await earningService.getEarningsBySourceUserId(userId);
        if (!earnings || earnings.length === 0) {
            throw new AppError('No earnings found for this source user', 404);
        }
        SuccessResponse.message = 'Earnings by source user retrieved successfully';
        SuccessResponse.data = earnings;

        return res.status(200).json(SuccessResponse);
    } catch (error) {
        // console.error('Error retrieving earnings by source user ID:', error);
        return next(error);
    }
};

const getEarningsByPurchaseId = async (req, res, next) => {
    try {
        const { purchaseId } = req.params;
        const earnings = await earningService.getEarningsByPurchaseId(purchaseId);
        if (!earnings || earnings.length === 0) {
            throw new AppError('No earnings found for this purchase ID', 404);
        }

        SuccessResponse.message = 'Earnings by purchase ID retrieved successfully';
        SuccessResponse.data = earnings;

        return res.status(200).json(SuccessResponse);
    } catch (error) {
        return next(error);
    }
};

const getTotalEarningsByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const totalEarnings = await earningService.getTotalEarningsByUserId(userId);
        if (totalEarnings === null) {
            throw new AppError('No earnings found for this user', 404);
        }
        SuccessResponse.message = 'Total earnings retrieved successfully';
        SuccessResponse.data = { totalEarnings };

        return res.status(200).json(SuccessResponse);
    } catch (error) {
        return next(error);
    }
};

module.exports = {
    getEarningsByUserId,
    getEarningsBySourceUserId,
    getEarningsByPurchaseId,
    getTotalEarningsByUserId
};