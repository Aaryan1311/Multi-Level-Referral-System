const { Purchase } = require("../models");
const AppError = require("../utils/error/app-error");

const createPurchase = async (data) => {
  try {
    const purchase = await Purchase.create(data);
    
    return purchase;
  } catch (error) {
    throw new AppError("Error creating purchase", 500);
  }
};

const getPurchaseById = async (id) => {
  try {
    const purchase = await Purchase.findByPk(id);
    if (!purchase) {
      throw new AppError("Purchase not found", 404);
    }
    return purchase;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Error fetching purchase", 500);
  }
};

const getPurchasesByUserId = async (userId) => {
  try {
    const purchases = await Purchase.findAll({
      where: { userId },
      order: [["createdAt", "ASC"]],
    });
    if (!purchases || purchases.length === 0) {
      throw new AppError("No purchases found for this user", 404);
    }
    return purchases;
  } catch (error) {
    if (error instanceof AppError) {
      throw error;
    }
    throw new AppError("Error fetching purchases for user", 500);
  }
};

module.exports = {
  createPurchase,
  getPurchaseById,
  getPurchasesByUserId,
};
