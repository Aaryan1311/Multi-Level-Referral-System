const earningRepository = require('../repositories/earning.repository');
const AppError = require('../utils/error/app-error');

const getEarningsByUserId = async (userId) => {
    try {
        const earnings = await earningRepository.getEarningsByUserId(userId);
        return earnings;
    } catch (error) {
        throw new AppError('Error fetching earnings for user', 500);
    }
};

const getEarningsBySourceUserId = async (sourceUserId) => {
    try {
        const earnings = await earningRepository.getEarningsBySourceUserId(sourceUserId);
        return earnings;
    } catch (error) {
        if (error instanceof AppError) {
            throw error; 
        }
        throw new AppError('Error fetching earnings by source user', 500);
    }
};

const getEarningsByPurchaseId = async (purchaseId) => {
    try {
        const earnings = await earningRepository.getEarningsByPurchaseId(purchaseId);
        if (!earnings || earnings.length === 0) {
            throw new AppError('No earnings found for this purchase ID', 404);
        }
        return earnings;
    } catch (error) {
        if (error instanceof AppError) {
            throw error; 
        }
        throw new AppError('Error fetching earnings by purchase ID', 500);
    }
};

const getTotalEarningsByUserId = async (userId) => {
    try {
        const earnings = await earningRepository.getEarningsByUserId(userId);
        const totalEarnings = earnings.reduce((total, earning) => total + parseFloat(earning.amountEarned), 0);
        return totalEarnings;
    } catch (error) {
        if (error instanceof AppError) {
            throw error; 
        }
        throw new AppError('Error calculating total earnings for user' , 500);
    }
}

module.exports = {
    getEarningsByUserId,
    getEarningsBySourceUserId,
    getEarningsByPurchaseId,
    getTotalEarningsByUserId
};