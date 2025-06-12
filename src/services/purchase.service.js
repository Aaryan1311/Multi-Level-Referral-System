const { Purchase, User, Earning } = require("../models");
const AppError = require("../utils/error/app-error");
const purchaseRepository = require("../repositories/purchase.repository");
const userRepository = require("../repositories/user.repository");
const earningRepository = require("../repositories/earning.repository");
const { message } = require("../utils/common/error-response");
const { ServerConfig } = require("../config/");
const { emitToUser } = require("../config/socket-server");

const createPurchase = async({userId, amount }) => {
    const transaction = await Purchase.sequelize.transaction();

    try{
        const purchase = await purchaseRepository.createPurchase({
            userId,
            amount
        }, {transaction});

        if(amount <= 1000){
            await transaction.commit();
            return {
                purchase,
                message: "Purchase created successfully, no earnings distributed below 1000",
                distributed: []
            };
        }

        const user = await userRepository.getUserById(userId);
        if(!user) {
            throw new AppError("Purchasing User not found", 404);
        }

        const level1 = user.referrerId ? await userRepository.getUserById(user.referrerId) : null;
        const level2 = level1 && level1.referrerId ? await userRepository.getUserById(level1.referrerId) : null;

        const earnings = [];
        if(level1) {

          const earning1 = await earningRepository.createEarning({
                userId: level1.id,
                sourceUserId: userId,
                purchaseId: purchase.id,
                level: 1,
                amountEarned: amount * 0.05,
            }, {transaction});

            earnings.push(earning1);

            emitToUser(level1.id, {
              level: 1,
              amountEarned: +(amount*0.05).toFixed(2),
              sourceUserId: userId,
              purchaseId: purchase.id
            });
          }

           if(level2){
            const earning2 = await earningRepository.createEarning({
                userId: level2.id,
                sourceUserId: userId,
                purchaseId: purchase.id,
                level: 2,
                amountEarned: amount * 0.01,
            }, {transaction});

            earnings.push(earning2);

            emitToUser(level2.id, {
              level: 2,
              amountEarned: +(amount*0.01).toFixed(2),
              sourceUserId: userId,
              purchaseId: purchase.id
            });
          }

        await transaction.commit();
        return {
            purchase,
            message: "Purchase created successfully, earnings distributed",
            distributed: earnings
        };
    }
    catch (error) {
        console.error("Error creating purchase:", error);
        await transaction.rollback();
        throw new AppError("Error creating purchase", 500);
    }
};

const getPurchaseById = async (id) => {
  try {
    const purchase = await purchaseRepository.getPurchaseById(id);
    if (!purchase) {
      throw new AppError("Purchase not found", 404);
    }
    return purchase;
  } catch (error) {
    throw new AppError("Error fetching purchase", 500);
  }
};

const getPurchasesByUserId = async (userId) => {
  try {
    const purchases = await purchaseRepository.getPurchasesByUserId(userId);
    return purchases;
  } catch (error) {
    throw new AppError("Error fetching purchases for user", 500);
  }
};

module.exports = {
    createPurchase,
    getPurchaseById,
    getPurchasesByUserId
};