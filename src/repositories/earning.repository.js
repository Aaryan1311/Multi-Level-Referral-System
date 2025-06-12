const { Earning }  = require("../models");
const AppError = require("../utils/error/app-error");

const createEarning = async (data, options) => {
    try {
        const earning = await Earning.create(data, options);
        return earning;
    } catch (error) {
        throw new AppError("Error creating earning", 500);
    }
};

const getEarningsByUserId = async (userId) => {
    try {
        const earnings = await Earning.findAll({
            where: { userId },
            order: [["createdAt", "DESC"]],
        });
        if (!earnings || earnings.length === 0) {
            throw new AppError("No earnings found for this user", 404);
        }
        return earnings;
    } catch (error) {
        if (error instanceof AppError) {
            throw error; 
        }
        throw new AppError("Error fetching earnings for user", 500);
    }
};

const getEarningsBySourceUserId = async (sourceUserId) => {
    try {
        const earnings = await Earning.findAll({
            where: { sourceUserId },
            order: [["createdAt", "DESC"]],
        });

        if (!earnings || earnings.length === 0) {
            throw new AppError("No earnings found for this source user", 404);
        }
        return earnings;
    } catch (error) {
        if( error instanceof AppError) {
            throw error; 
        }
        throw new AppError("Error fetching earnings by source user", 500);
    }
};

const getEarningsByPurchaseId = async (purchaseId) => {
    try {
        const earnings = await Earning.findAll({
            where: { purchaseId },
            order: [["createdAt", "DESC"]],
        });
        if (!earnings || earnings.length === 0) {
            throw new AppError("No earnings found for this purchase ID", 404);
        }
        return earnings;
    } catch (error) {
        if (error instanceof AppError) {
            throw error; 
        }
        throw new AppError("Error fetching earnings by purchase ID", 500);
    }
};

module.exports = {
    createEarning,
    getEarningsByUserId,
    getEarningsBySourceUserId,
    getEarningsByPurchaseId
};